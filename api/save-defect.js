// api/save-defect.js
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { 
        equipment_name, 
        operator_name, 
        defect_description, 
        severity, 
        verified_by 
    } = req.body;

    if (!equipment_name || !defect_description) {
        return res.status(400).json({ error: 'Equipment name and defect description are required.' });
    }

    try {
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
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}