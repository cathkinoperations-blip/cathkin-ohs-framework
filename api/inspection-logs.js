import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        try {
            const logs = await sql`
                SELECT id, log_date, hours_meter as hours, operator_name as operator, 
                       manager_initials as manager, ppe_data as ppe, 
                       results_data as results, defects_data as defects, 
                       inspection_type, created_at
                FROM inspection_logs 
                ORDER BY id DESC;
            `;
            return res.status(200).json(logs);
        } catch (error) {
            console.error('Database fetch error:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'POST') {
        try {
            const { logDate, hours, operator, manager, ppe, results, defects, inspectionType } = req.body;
            
            const newLog = await sql`
                INSERT INTO inspection_logs (log_date, hours_meter, operator_name, manager_initials, ppe_data, results_data, defects_data, inspection_type)
                VALUES (${logDate}, ${hours}, ${operator}, ${manager}, ${JSON.stringify(ppe)}, ${JSON.stringify(results)}, ${JSON.stringify(defects)}, ${inspectionType || 'Daily'}) 
                RETURNING id, log_date, hours_meter as hours, operator_name as operator, manager_initials as manager, ppe_data as ppe, results_data as results, defects_data as defects, inspection_type;
            `;
            
            return res.status(201).json({ success: true, log: newLog[0] });
        } catch (error) {
            console.error('Database insert error:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}