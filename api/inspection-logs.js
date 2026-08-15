import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { logDate, hours, operator, manager, ppe, results, defects } = req.body;
      
      const query = `
        INSERT INTO inspection_logs (log_date, hours_meter, operator_name, manager_initials, ppe_data, results_data, defects_data)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
      `;
      
      const values = [
        logDate, 
        hours, 
        operator, 
        manager, 
        JSON.stringify(ppe), 
        JSON.stringify(results), 
        JSON.stringify(defects)
      ];

      const { rows } = await pool.query(query, values);
      return res.status(201).json({ success: true, log: rows[0] });
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  res.setHeader('Allow', ['POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}