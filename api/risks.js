import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);

    // Enable CORS so your GitHub Pages site can talk to this Vercel endpoint
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const risks = await sql`SELECT * FROM risk_register ORDER BY id ASC`;
            return res.status(200).json(risks);
        } 
        
        if (req.method === 'POST') {
            const { activity, hazard, inherent_score, controls, residual_score } = req.body;
            
            const newRisk = await sql`
                INSERT INTO risk_register (activity, hazard, inherent_score, controls, residual_score)
                VALUES (${activity}, ${hazard}, ${inherent_score}, ${controls}, ${residual_score})
                RETURNING *;
            `;
            return res.status(200).json(newRisk[0]);
        }

        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: error.message });
    }
}