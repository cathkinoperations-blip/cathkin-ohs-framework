import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { category } = req.query;
      let query = 'SELECT * FROM checklist_items';
      let params = [];

      if (category) {
        const categories = category.split(',').map(c => c.trim().toLowerCase());
        query += ' WHERE LOWER(category) = ANY($1)';
        params = [categories];
      }
      query += ' ORDER BY id ASC';

      const { rows } = await pool.query(query, params);
      return res.status(200).json(rows);
    } 
    
    if (req.method === 'POST') {
      const { category, component, description, frequency, risk_level } = req.body;
      const query = `
        INSERT INTO checklist_items (category, component, description, frequency, risk_level) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
      `;
      const values = [category.toLowerCase(), component, description, frequency, risk_level];
      const { rows } = await pool.query(query, values);
      return res.status(201).json(rows[0]);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: error.message });
  }
}