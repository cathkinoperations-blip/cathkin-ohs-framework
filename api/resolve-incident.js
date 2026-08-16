import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, error: 'Incident ID is required' });
        }

        const query = `
            UPDATE incident_register 
            SET status = 'Closed', verified_at = NOW() 
            WHERE id = $1 
            RETURNING *;
        `;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, error: 'Incident not found' });
        }

        return res.status(200).json({ success: true, incident: result.rows[0] });
    } catch (error) {
        console.error('Error closing incident:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}