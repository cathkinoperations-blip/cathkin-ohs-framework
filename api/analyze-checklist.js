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

        // Take the first uploaded image/scan
        const img = images[0];
        const base64Data = img.imageBase64.replace(/^data:image\/\w+;base64,/, '');

        // Prompt Gemini using the current Gemini 3.5 Flash model
        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: [
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: img.mimeType || 'image/jpeg'
                    }
                },
                {
                    text: `Analyze this completed tractor inspection checklist document. 
                    Extract the following into a strict JSON object:
                    - 'log_date' (YYYY-MM-DD string)
                    - 'hours_meter' (string)
                    - 'operator_name' (string)
                    - 'manager_initials' (string)
                    - 'results': An array of objects for each checklist item found, where each object has:
                      - 'component': name of the part/check item
                      - 'status': 'Pass', 'Fail', or 'N/A'
                      - 'note': any handwritten defect or comment (or empty string)
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