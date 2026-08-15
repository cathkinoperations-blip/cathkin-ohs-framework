import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        try {
            const { logDate, hours, operator, manager, ppe, results, defects } = req.body;
            
            const newLog = await sql`
                INSERT INTO inspection_logs (log_date, hours_meter, operator_name, manager_initials, ppe_data, results_data, defects_data)
                VALUES (${logDate}, ${hours}, ${operator}, ${manager}, ${JSON.stringify(ppe)}, ${JSON.stringify(results)}, ${JSON.stringify(defects)}) 
                RETURNING *;
            `;
            
            return res.status(201).json({ success: true, log: newLog[0] });
        } catch (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}