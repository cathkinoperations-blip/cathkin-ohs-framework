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

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const { fileBase64, mimeType, slug, category } = req.body;

        if (!fileBase64 || !slug) {
            return res.status(400).json({ success: false, error: 'Missing file data or slug.' });
        }

        const base64Data = fileBase64.replace(/^data:.*;base64,/, "");

        // 1. Initialize Gemini correctly using the standard library pattern
        const ai = new GoogleGenAI({}); // Picks up process.env.GEMINI_API_KEY automatically

        // 2. Send document to Gemini to parse content into structured JSON
        const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: [
                {
                    inlineData: { data: base64Data, mimeType: mimeType || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
                },
                {
                    text: `Analyze this manual or SOP document thoroughly. Extract and return a strict JSON object with this exact schema:
                    {
                      "reference": "SOP Code or Reference (e.g. SOP 02)",
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

        const parsedData = JSON.parse(response.text);

        // 3. Insert/Update record in PostgreSQL database (storing file base64 directly)
        const query = `
            INSERT INTO sops (slug, reference, title, category, alert_json, sections_json, file_data, updated_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
            ON CONFLICT (slug) 
            DO UPDATE SET 
                reference = EXCLUDED.reference,
                title = EXCLUDED.title,
                category = EXCLUDED.category,
                alert_json = EXCLUDED.alert_json,
                sections_json = EXCLUDED.sections_json,
                file_data = EXCLUDED.file_data,
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
            fileBase64
        ];

        const dbResult = await pool.query(query, values);

        return res.status(200).json({ 
            success: true, 
            sopId: dbResult.rows[0].id, 
            title: parsedData.title,
            slug: slug 
        });

    } catch (err) {
        console.error('SOP Import Error:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
}
