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
        const { incident_date, reported_by, incident_type, location, description, severity, corrective_action, responsible_person } = req.body;

        const query = `
            INSERT INTO incident_register 
            (incident_date, reported_by, incident_type, location, description, severity, corrective_action, responsible_person, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Open') 
            RETURNING *;
        `;
        const values = [incident_date, reported_by, incident_type, location, description, severity, corrective_action, responsible_person];
        const result = await pool.query(query, values);

        return res.status(200).json({ success: true, incident: result.rows[0] });
    } catch (error) {
        console.error('Error creating incident:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}