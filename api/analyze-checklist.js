// api/analyze-checklist.js (Vercel Serverless Function)
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY 
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { images } = req.body;
        if (!images || images.length === 0) {
            return res.status(400).json({ error: 'No images provided for analysis.' });
        }

        // Map all uploaded images/pages into the contents array so multi-page forms are fully read
        const imageParts = images.map(img => ({
            inlineData: {
                data: img.imageBase64.replace(/^data:image\/\w+;base64,/, ''),
                mimeType: img.mimeType || 'image/jpeg'
            }
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: [
                ...imageParts,
                {
                    text: `Analyze this multi-page completed Massey Ferguson 268 Xtra Tractor & Slasher inspection checklist document. 
                    Extract the header details and all checklist items into a strict JSON object with:
                    - 'log_date' (Format as YYYY-MM-DD, e.g., from '17/08/2026' extract '2026-08-17')
                    - 'hours_meter' (string, e.g., '05036')
                    - 'operator_name' (string)
                    - 'manager_initials' (string)
                    - 'results': An array of objects for each checklist item found across all pages. IMPORTANT: Deduplicate any repeated line items so each unique component is only listed once. Each object needs:
                      - 'component': name of the part/check item
                      - 'status': 'Pass', 'Fail', or 'N/A'
                      - 'note': any handwritten comments (e.g., 'oil full, coolant full' or 'badly damaged')
                    Return ONLY valid JSON with no extra commentary.`
                }
            ]
        });

        const textResponse = response.text ? response.text.trim() : '';
        const jsonString = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        const extractedData = JSON.parse(jsonString);

        return res.status(200).json({ success: true, extraction: extractedData });
    } catch (error) {
        console.error('AI checklist analysis error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
