import { GoogleGenAI } from '@google/genai'; // Or your preferred LLM SDK

app.post('/api/import-sop', async (req, res) => {
    try {
        const { fileBase64, mimeType, slug, category } = req.body;

        // 1. Send document to Gemini to parse into standard SOP JSON structure
        const ai = new GoogleGenAI();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    inlineData: { data: fileBase64, mimeType: mimeType }
                },
                {
                    text: `Analyze this SOP or manual document. Extract and return a strict JSON object with this exact schema:
                    {
                      "reference": "SOP Code (e.g. SOP 02)",
                      "title": "Document Title",
                      "alert": { "type": "danger", "title": "...", "text": "..." } (or null if none),
                      "sections": [
                        {
                          "heading": "Section Heading",
                          "items": ["bullet point 1", "bullet point 2"]
                        }
                      ]
                    }`
                }
            ],
            responseMimeType: 'application/json'
        });

        const parsedData = JSON.parse(response.text);

        // 2. Insert into PostgreSQL database
        const query = `
            INSERT INTO sops (slug, reference, title, category, alert_json, sections_json) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;
        `;
        
        const values = [
            slug,
            parsedData.reference,
            parsedData.title,
            category || 'General Operations',
            parsedData.alert ? JSON.stringify(parsedData.alert) : null,
            JSON.stringify(parsedData.sections)
        ];

        const dbResult = await pool.query(query, values);

        res.json({ success: true, sopId: dbResult.rows[0].id, title: parsedData.title });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
