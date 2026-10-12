import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
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
        const { fileBase64, fileName, mimeType, slug, category } = req.body;

        if (!fileBase64 || !slug) {
            return res.status(400).json({ success: false, error: 'Missing file data or slug.' });
        }

        // 1. Save uploaded file to the local 'Reference' folder
        // Strip out the base64 header prefix if present (e.g. "data:application/vnd.openxmlformats...")
        const base64Data = fileBase64.replace(/^data:.*;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        
        // Define target directory and ensure it exists
        const refDirectory = path.join(process.cwd(), 'Reference');
        if (!fs.existsSync(refDirectory)) {
            fs.mkdirSync(refDirectory, { recursive: true });
        }

        // Construct safe filename (fall back to slug if no filename provided)
        const safeFileName = fileName || `${slug}.docx`;
        const filePath = path.join(refDirectory, safeFileName);
        
        // Write file to disk
        fs.writeFileSync(filePath, buffer);
        console.log(`Saved uploaded file to: ${filePath}`);

        // 2. Send document to Gemini to parse content into structured JSON
        const ai = new GoogleGenAI();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
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

        // 3. Insert/Update record in PostgreSQL database
        const query = `
            INSERT INTO sops (slug, reference, title, category, alert_json, sections_json, updated_at) 
            VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
            ON CONFLICT (slug) 
            DO UPDATE SET 
                reference = EXCLUDED.reference,
                title = EXCLUDED.title,
                category = EXCLUDED.category,
                alert_json = EXCLUDED.alert_json,
                sections_json = EXCLUDED.sections_json,
                updated_at = CURRENT_TIMESTAMP
            RETURNING id;
        `;

        const values = [
            slug,
            parsedData.reference || 'SOP GEN',
            parsedData.title || 'Standard Operating Procedure',
            category || 'Safe Work Procedures',
            parsedData.alert ? JSON.stringify(parsedData.alert) : null,
            JSON.stringify(parsedData.sections || [])
        ];

        const dbResult = await pool.query(query, values);

        return res.status(200).json({ 
            success: true, 
            sopId: dbResult.rows[0].id, 
            title: parsedData.title,
            slug: slug,
            savedPath: `/Reference/${safeFileName}`
        });

    } catch (err) {
        console.error('SOP Import & Save Error:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
}
