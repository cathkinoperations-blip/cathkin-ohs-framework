// api/analyze-checklist.js (Vercel Serverless Function)
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

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

        // Prompt Gemini to extract the fields from the checklist photo
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: img.mimeType || 'image/jpeg'
                    }
                },
                {
                    text: "Analyze this completed tractor inspection checklist document. Extract the following details into a strict JSON object with these exact keys: 'log_date' (YYYY-MM-DD format if possible), 'hours_meter' (string, e.g. '1420 hrs'), 'operator_name' (string), and 'manager_initials' (string). If a field is missing, leave it as an empty string."
                }
            ]
        });

        const textResponse = response.text.trim();
        // Clean up markdown code blocks if the model wrapped the JSON
        const jsonString = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        const extractedData = JSON.parse(jsonString);

        return res.status(200).json({ success: true, extraction: extractedData });
    } catch (error) {
        console.error('AI checklist analysis error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}