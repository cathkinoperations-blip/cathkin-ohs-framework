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
            const { risk_id } = req.query;
            if (risk_id) {
                const steps = await sql`SELECT * FROM risk_steps WHERE risk_id = ${risk_id} ORDER BY id ASC`;
                return res.status(200).json(steps);
            }
            const allSteps = await sql`SELECT * FROM risk_steps ORDER BY risk_id, id ASC`;
            return res.status(200).json(allSteps);
        } 
        
        if (req.method === 'POST') {
            const { risk_id, task_sequence, hazard, likelihood, severity, risk_score, controls } = req.body;
            const newStep = await sql`
                INSERT INTO risk_steps (risk_id, task_sequence, hazard, likelihood, severity, risk_score, controls)
                VALUES (${risk_id}, ${task_sequence}, ${hazard}, ${likelihood}, ${severity}, ${risk_score}, ${controls})
                RETURNING *;
            `;
            return res.status(200).json(newStep[0]);
        }

        if (req.method === 'PUT') {
            const { id, task_sequence, hazard, likelihood, severity, risk_score, controls } = req.body;
            const updatedStep = await sql`
                UPDATE risk_steps 
                SET task_sequence = ${task_sequence}, hazard = ${hazard}, likelihood = ${likelihood}, severity = ${severity}, risk_score = ${risk_score}, controls = ${controls}
                WHERE id = ${id}
                RETURNING *;
            `;
            return res.status(200).json(updatedStep[0]);
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            await sql`DELETE FROM risk_steps WHERE id = ${id}`;
            return res.status(200).json({ success: true });
        }

        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: error.message });
    }
}