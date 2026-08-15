import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const { category } = req.query;
            
            if (category) {
                const categories = category.split(',').map(c => c.trim().toLowerCase());
                // Using Neon's tagged template with array matching
                const items = await sql`
                    SELECT * FROM checklist_items 
                    WHERE LOWER(category) = ANY(${categories}) 
                    ORDER BY id ASC
                `;
                return res.status(200).json(items);
            } else {
                const items = await sql`SELECT * FROM checklist_items ORDER BY id ASC`;
                return res.status(200).json(items);
            }
        } 
        
        if (req.method === 'POST') {
            const { category, component, description, frequency, risk_level } = req.body;
            const newItem = await sql`
                INSERT INTO checklist_items (category, component, description, frequency, risk_level) 
                VALUES (${category.toLowerCase()}, ${component}, ${description}, ${frequency}, ${risk_level}) 
                RETURNING *;
            `;
            return res.status(201).json(newItem[0]);
        }

        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: error.message });
    }
}