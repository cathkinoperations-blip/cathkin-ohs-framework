import { Pool } from 'pg';
import { GoogleGenAI } from '@google/genai';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const ai = new GoogleGenAI();

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const action = req.query.action || req.body.action;

    try {
        if (req.method === 'GET' && action === 'list') {
            const result = await pool.query(`SELECT * FROM incident_register WHERE status != 'Closed' ORDER BY incident_date DESC;`);
            return res.status(200).json({ success: true, incidents: result.rows });
        }
        
        if (req.method === 'GET' && action === 'history') {
            const result = await pool.query(`SELECT * FROM incident_register WHERE status = 'Closed' ORDER BY verified_at DESC;`);
            return res.status(200).json({ success: true, incidents: result.rows });
        }

        // AI Intake Analysis from Photo
        if (req.method === 'POST' && action === 'analyze-intake') {
            const { imageBase64, mimeType } = req.body;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [
                    {
                        inlineData: {
                            data: imageBase64,
                            mimeType: mimeType || 'image/jpeg'
                        }
                    },
                    {
                        text: `Analyze this incident or hazard photo for an OHS estate register. Return strict JSON with keys: 
                        "incident_type" (choose strictly from: Injury, Occupational Illness, Property Damage, Near-Miss), 
                        "location" (suggest estate area if visible, else general), 
                        "description" (detailed professional safety description), 
                        "severity" (choose strictly from: Minor, Moderate, Severe, Reportable (Section 24)), 
                        "corrective_action" (suggested CAPA), 
                        "responsible_person" (suggest role like Estate Manager or Maintenance Lead).`
                    }
                ],
                config: { responseMimeType: 'application/json' }
            });

            return res.status(200).json({ success: true, analysis: JSON.parse(response.text) });
        }

        // AI Close-Out Verification Assessment from Photo
        if (req.method === 'POST' && action === 'analyze-close') {
            const { imageBase64, mimeType, description, corrective_action } = req.body;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [
                    {
                        inlineData: {
                            data: imageBase64,
                            mimeType: mimeType || 'image/jpeg'
                        }
                    },
                    {
                        text: `You are an OHS compliance auditor. Evaluate this remediation/close-out photo against the original incident description: "${description}" and planned corrective action: "${corrective_action}". 
                        Return strict JSON with keys: 
                        "satisfactory" (boolean true or false), 
                        "assessment_notes" (detailed justification explaining why the fix is satisfactory or what deficiencies remain).`
                    }
                ],
                config: { responseMimeType: 'application/json' }
            });

            return res.status(200).json({ success: true, evaluation: JSON.parse(response.text) });
        }

        if (req.method === 'POST' && action === 'create') {
            const { incident_date, reported_by, incident_type, location, description, severity, corrective_action, responsible_person, incident_image_url } = req.body;
            const query = `INSERT INTO incident_register (incident_date, reported_by, incident_type, location, description, severity, corrective_action, responsible_person, status, incident_image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Open', $9) RETURNING *;`;
            const result = await pool.query(query, [incident_date, reported_by, incident_type, location, description, severity, corrective_action, responsible_person, incident_image_url]);
            return res.status(200).json({ success: true, incident: result.rows[0] });
        }

        if (req.method === 'POST' && action === 'close') {
            const { id, close_image_url, ai_close_assessment } = req.body;
            const result = await pool.query(`UPDATE incident_register SET status = 'Closed', verified_at = NOW(), close_image_url = $2, ai_close_assessment = $3 WHERE id = $1 RETURNING *;`, [id, close_image_url, ai_close_assessment]);
            return res.status(200).json({ success: true, incident: result.rows[0] });
        }

        return res.status(400).json({ success: false, error: 'Invalid action parameter' });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}