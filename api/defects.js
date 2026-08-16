import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const action = req.query.action || req.body?.action;

    try {
        // 1. Fetch active open defects
        if (req.method === 'GET' && action === 'list') {
            const result = await pool.query(
                `SELECT * FROM equipment_defects WHERE status != 'Verified & Closed' AND status != 'Closed' ORDER BY created_at DESC;`
            );
            return res.status(200).json({ success: true, defects: result.rows });
        }

        // 2. Fetch historical closed defects
        if (req.method === 'GET' && action === 'history') {
            const result = await pool.query(
                `SELECT * FROM equipment_defects WHERE status = 'Closed' OR status = 'Verified & Closed' ORDER BY verified_at DESC;`
            );
            return res.status(200).json({ success: true, defects: result.rows });
        }

        // 3. Save a new equipment defect
        if (req.method === 'POST' && action === 'create') {
            const { equipment_name, operator_name, defect_description, severity, verified_by } = req.body;

            if (!equipment_name || !defect_description) {
                return res.status(400).json({ success: false, error: 'Equipment name and defect description are required.' });
            }

            const query = `
                INSERT INTO equipment_defects 
                (equipment_name, operator_name, defect_description, severity, status, verified_by, created_at) 
                VALUES ($1, $2, $3, $4, 'Open', $5, NOW())
                RETURNING id;
            `;
            const values = [
                equipment_name, 
                operator_name || 'Unknown Operator', 
                defect_description, 
                severity || 'Moderate', 
                verified_by || null
            ];

            const result = await pool.query(query, values);
            return res.status(200).json({ 
                success: true, 
                message: 'Defect logged successfully with lifecycle tracking.',
                defectId: result.rows[0].id 
            });
        }

        // 4. Resolve/Close an equipment defect
        if (req.method === 'POST' && action === 'close') {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ success: false, error: 'Defect ID is required' });
            }

            const query = `
                UPDATE equipment_defects 
                SET status = 'Closed', verified_at = NOW() 
                WHERE id = $1 
                RETURNING *;
            `;
            const result = await pool.query(query, [id]);

            if (result.rowCount === 0) {
                return res.status(404).json({ success: false, error: 'Defect not found' });
            }

            return res.status(200).json({ success: true, defect: result.rows[0] });
        }

        return res.status(400).json({ success: false, error: 'Invalid or missing action parameter' });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}