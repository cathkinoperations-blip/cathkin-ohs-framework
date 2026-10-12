import { GoogleGenAI } from '@google/genai';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        // --- HANDLE GET REQUESTS ---
        if (req.method === 'GET') {
            // Action to fetch dropdown options from risk_register
            if (req.query.action === 'risks') {
                const risks = await pool.query('SELECT id, activity, hazard, inherent_score, residual_score FROM risk_register ORDER BY id ASC');
                return res.json({ success: true, risks: risks.rows });
            }

            const slug = req.query.slug;
            
            if (slug) {
                const sop = await pool.query(`
                    SELECT s.*, r.activity, r.hazard, r.inherent_score, r.residual_score 
                    FROM sops s 
                    LEFT JOIN risk_register r ON s.risk_id = r.id 
                    WHERE s.slug = $1
                `, [slug]);

                if (sop.rows.length === 0) {
                    return res.status(404).json({ success: false, error: 'SOP not found' });
                }
                return res.json({ success: true, sop: sop.rows[0] });
            }
            
            // Query all SOPs joined with risk_register, sorted by score
            const allSops = await pool.query(`
                SELECT s.id, s.slug, s.reference, s.title, s.category, s.risk_id, s.updated_at,
                       r.activity, r.inherent_score, r.residual_score
                FROM sops s
                LEFT JOIN risk_register r ON s.risk_id = r.id
                ORDER BY CAST(COALESCE(r.inherent_score, '0') AS INTEGER) DESC, s.reference ASC
            `);
            return res.json({ success: true, sops: allSops.rows });
        }

        // --- HANDLE POST REQUESTS (AI Document Upload & Risk Link) ---
        if (req.method === 'POST') {
            const { fileBase64, mimeType, slug, category, risk_id } = req.body;

            if (!fileBase64 || !slug) {
                return res.status(400).json({ success: false, error: 'Missing file data or slug.' });
            }

            const base64Data = fileBase64.replace(/^data:.*;base64,/, "");
            const ai = new GoogleGenAI({});

            const response = await ai.models.generateContent({
                model: 'gemini-3.5-flash-lite',
                contents: [
                    {
                        inlineData: { data: base64Data, mimeType: mimeType || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
                    },
                    {
                        text: `Analyze this manual or SOP document thoroughly. Extract and return a strict JSON object with this exact schema:
                        {
                          "reference": "SOP Code or Reference (e.g. SOP 01)",
                          "title": "Document Title",
                          "alert": { 
                            "type": "danger", 
                            "title": "Alert Title / Risk Category", 
                            "text": "Detailed warning description" 
                          } (or null if no alert box is present),
                          "sections": [
                            {
                              "heading": "Section Heading",
                              "items": ["bullet point 1", "bullet point 2"],
                              "images": []
                            }
                          ]
                        }`
                    }
                ],
                responseMimeType: 'application/json'
            });

            const rawText = response.text;
            const cleanedText = rawText.replace(/```json\s*([\s\S]*?)\s*```/, '$1').replace(/```\s*([\s\S]*?)\s*```/, '$1').trim();
            const parsedData = JSON.parse(cleanedText);

            const query = `
                INSERT INTO sops (slug, reference, title, category, alert_json, sections_json, file_data, risk_id, updated_at) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
                ON CONFLICT (slug) 
                DO UPDATE SET 
                    reference = EXCLUDED.reference,
                    title = EXCLUDED.title,
                    category = EXCLUDED.category,
                    alert_json = EXCLUDED.alert_json,
                    sections_json = EXCLUDED.sections_json,
                    file_data = EXCLUDED.file_data,
                    risk_id = EXCLUDED.risk_id,
                    updated_at = CURRENT_TIMESTAMP
                RETURNING id;
            `;

            const values = [
                slug,
                parsedData.reference || 'SOP GEN',
                parsedData.title || 'Standard Operating Procedure',
                category || 'Safe Work Procedures',
                parsedData.alert ? JSON.stringify(parsedData.alert) : null,
                JSON.stringify(parsedData.sections || []),
                fileBase64,
                risk_id ? parseInt(risk_id, 10) : null
            ];

            const dbResult = await pool.query(query, values);

            return res.status(200).json({ 
                success: true, 
                sopId: dbResult.rows[0].id, 
                title: parsedData.title,
                slug: slug 
            });
        }

        return res.status(405).json({ success: false, error: 'Method not allowed' });

    } catch (err) {
        console.error('SOP Endpoint Error:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
}
