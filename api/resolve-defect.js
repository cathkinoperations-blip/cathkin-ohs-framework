import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
    if (req.method !== 'POST' && req.method !== 'PATCH') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
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
        const values = [id];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, error: 'Defect not found' });
        }

        return res.status(200).json({ success: true, defect: result.rows[0] });
    } catch (error) {
        console.error('Error resolving defect:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}