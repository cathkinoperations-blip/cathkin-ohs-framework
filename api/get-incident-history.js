import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const query = `
            SELECT * FROM incident_register 
            WHERE status = 'Closed' 
            ORDER BY verified_at DESC;
        `;
        const result = await pool.query(query);
        return res.status(200).json({ success: true, incidents: result.rows });
    } catch (error) {
        console.error('Error fetching incident history:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}