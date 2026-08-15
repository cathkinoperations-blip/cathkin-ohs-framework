import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
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

        if (req.method === 'PUT') {
            const { id, activity, hazard, inherent_score, controls, residual_score } = req.body;
            const updatedRisk = await sql`
                UPDATE risk_register 
                SET activity = ${activity}, hazard = ${hazard}, inherent_score = ${inherent_score}, controls = ${controls}, residual_score = ${residual_score}
                WHERE id = ${id}
                RETURNING *;
            `;
            return res.status(200).json(updatedRisk[0]);
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            await sql`DELETE FROM risk_register WHERE id = ${id}`;
            return res.status(200).json({ success: true });
        }

        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: error.message });
    }
}