import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const action = req.query.action || req.body.action;

    try {
        if (req.method === 'GET' && action === 'list') {
            const result = await pool.query(`SELECT * FROM incident_register WHERE status != 'Closed' ORDER BY incident_date DESC;`);
            return res.status(200).json({ success: true, incidents: result.rows });
        }
        
        if (req.method === 'GET' && action === 'history') {
            const result = await pool.query(`SELECT * FROM incident_register WHERE status = 'Closed' ORDER BY verified_at DESC;`);
            return res.status(200).json({ success: true, incidents: result.rows });
        }

        if (req.method === 'POST' && action === 'create') {
            const { incident_date, reported_by, incident_type, location, description, severity, corrective_action, responsible_person } = req.body;
            const query = `INSERT INTO incident_register (incident_date, reported_by, incident_type, location, description, severity, corrective_action, responsible_person, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Open') RETURNING *;`;
            const result = await pool.query(query, [incident_date, reported_by, incident_type, location, description, severity, corrective_action, responsible_person]);
            return res.status(200).json({ success: true, incident: result.rows[0] });
        }

        if (req.method === 'POST' && action === 'close') {
            const { id } = req.body;
            const result = await pool.query(`UPDATE incident_register SET status = 'Closed', verified_at = NOW() WHERE id = $1 RETURNING *;`, [id]);
            return res.status(200).json({ success: true, incident: result.rows[0] });
        }

        return res.status(400).json({ success: false, error: 'Invalid action parameter' });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}