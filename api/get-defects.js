const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const query = `
    SELECT * FROM equipment_defects 
    WHERE status != 'Closed' 
    ORDER BY created_at DESC;
`;

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const result = await pool.query(
            `SELECT * FROM equipment_defects WHERE status != 'Verified & Closed' ORDER BY created_at DESC;`
        );
        return res.status(200).json({ success: true, defects: result.rows });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}