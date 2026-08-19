import { Pool } from 'pg';
import { GoogleGenAI } from '@google/genai';
import nodemailer from 'nodemailer';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Configure Nodemailer Transporter using Vercel Environment Variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// Helper: Query active user emails dynamically from estate_users by assigned roles
async function getEmailsByRoles(roles = []) {
    if (!roles || roles.length === 0) return [];
    try {
        const query = `
            SELECT DISTINCT email 
            FROM estate_users 
            WHERE role = ANY($1::text[]) 
              AND is_active = true 
              AND email IS NOT NULL;
        `;
        const res = await pool.query(query, [roles]);
        return res.rows.map(r => r.email).filter(Boolean);
    } catch (err) {
        console.error('Error fetching role emails from estate_users:', err);
        return [];
    }
}

// Helper: Dispatch formatted HTML notifications
async function sendNotification({ to, subject, title, bodyHtml }) {
    const recipientList = Array.isArray(to) ? [...new Set(to.filter(Boolean))] : [to];
    if (recipientList.length === 0) return;

    const emailContent = `
        <div style="font-family: Arial, sans-serif; color: #2d3748; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background: #1a202c; color: #ffffff; padding: 16px 20px; text-align: center;">
                <h2 style="margin: 0; font-size: 18px;">Cathkin Estates HOA — OHS Register</h2>
            </div>
            <div style="padding: 24px; background: #ffffff;">
                <h3 style="color: #2b6cb0; margin-top: 0;">${title}</h3>
                ${bodyHtml}
            </div>
            <div style="background: #edf2f7; padding: 12px 20px; font-size: 12px; color: #718096; text-align: center;">
                Cathkin Estates Health, Safety & Environmental Governance System
            </div>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"Cathkin Operations" <${process.env.GMAIL_USER}>`,
            to: recipientList.join(','),
            subject: `[Cathkin OHS] ${subject}`,
            html: emailContent
        });
    } catch (err) {
        console.error('Failed to send email notification:', err);
    }
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const action = req.query.action || req.body.action;

    try {
        // Initialize Gemini AI Client
        const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
        const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

        // Action: List Open Incidents
        if (req.method === 'GET' && action === 'list') {
            const result = await pool.query(`SELECT * FROM incident_register WHERE status != 'Closed' ORDER BY incident_date DESC;`);
            return res.status(200).json({ success: true, incidents: result.rows });
        }
        
        // Action: List Closed Incidents
        if (req.method === 'GET' && action === 'history') {
            const result = await pool.query(`SELECT * FROM incident_register WHERE status = 'Closed' ORDER BY verified_at DESC;`);
            return res.status(200).json({ success: true, incidents: result.rows });
        }

        // Action: AI Intake Analysis from Multiple Photos (up to 5)
        if (req.method === 'POST' && action === 'analyze-intake') {
            if (!ai) {
                return res.status(500).json({ success: false, error: "GEMINI_API_KEY is missing from Environment Variables." });
            }
            const { images } = req.body;
            
            const imageParts = (images || []).map(img => {
                let base64Data = img.imageBase64;
                if (base64Data.includes(',')) {
                    base64Data = base64Data.split(',')[1];
                }
                return {
                    inlineData: {
                        data: base64Data,
                        mimeType: img.mimeType || 'image/jpeg'
                    }
                };
            });

            const response = await ai.models.generateContent({
                model: 'gemini-3.5-flash',
                contents: [
                    ...imageParts,
                    {
                        text: `Analyze these incident or hazard photos (up to 5 provided) for an OHS estate register. Synthesize the visual evidence and return strict JSON with keys: 
                        "incident_type" (choose strictly from: Injury, Occupational Illness, Property Damage, Near-Miss), 
                        "location" (suggest estate area if visible, else general), 
                        "description" (detailed professional safety description covering all visual angles provided), 
                        "severity" (choose strictly from: Minor, Moderate, Severe, Reportable (Section 24)), 
                        "corrective_action" (suggested CAPA), 
                        "responsible_person" (suggest role like Estate Manager or Maintenance Lead).`
                    }
                ],
                config: { responseMimeType: 'application/json' }
            });

            return res.status(200).json({ success: true, analysis: JSON.parse(response.text) });
        }

        // Action: AI Close-Out Verification Assessment from Multiple Photos (up to 5)
        if (req.method === 'POST' && action === 'analyze-close') {
            if (!ai) {
                return res.status(500).json({ success: false, error: "GEMINI_API_KEY is missing from Environment Variables." });
            }
            const { images, description, corrective_action } = req.body;

            const imageParts = (images || []).map(img => {
                let base64Data = img.imageBase64;
                if (base64Data.includes(',')) {
                    base64Data = base64Data.split(',')[1];
                }
                return {
                    inlineData: {
                        data: base64Data,
                        mimeType: img.mimeType || 'image/jpeg'
                    }
                };
            });

            const response = await ai.models.generateContent({
                model: 'gemini-3.5-flash',
                contents: [
                    ...imageParts,
                    {
                        text: `You are an OHS compliance auditor. Evaluate these remediation/close-out photos against the original incident description: "${description}" and planned corrective action: "${corrective_action}". 
                        Return strict JSON with keys: 
                        "satisfactory" (boolean true or false), 
                        "assessment_notes" (detailed justification explaining why the fix is satisfactory or what deficiencies remain across the provided images).`
                    }
                ],
                config: { responseMimeType: 'application/json' }
            });

            return res.status(200).json({ success: true, evaluation: JSON.parse(response.text) });
        }

        // Action: Check Nearing & Overdue Deadlines (Vercel Cron Trigger)
        if (action === 'check-deadlines') {
            let nearingCount = 0;
            let overdueCount = 0;

            // 1. Check for incidents nearing deadline (Exactly 3 days remaining)
            const nearingRes = await pool.query(`
                SELECT * FROM incident_register 
                WHERE status = 'Open' 
                AND expected_close_date = CURRENT_DATE + INTERVAL '3 days';
            `);

            if (nearingRes.rowCount > 0) {
                const nearingRoles = await getEmailsByRoles(['Admin', 'Manager', 'Tester']);
                for (const inc of nearingRes.rows) {
                    const recipients = [...new Set([...nearingRoles])].filter(Boolean);
                    if (recipients.length > 0) {
                        await sendNotification({
                            to: recipients,
                            subject: `Reminder: Incident #${inc.id} Nearing Deadline`,
                            title: '⏳ CAPA Deadline Approaching',
                            bodyHtml: `
                                <p>Incident <strong>#${inc.id}</strong> (${inc.incident_type} at <strong>${inc.location}</strong>) is scheduled for completion on <strong>${inc.expected_close_date}</strong> (3 days remaining).</p>
                                <p><strong>Assigned Responsible Person:</strong> ${inc.responsible_person || 'Unassigned'}</p>
                                <p><strong>Planned Action:</strong> ${inc.corrective_action || 'None recorded'}</p>
                            `
                        });
                        nearingCount++;
                    }
                }
            }

            // 2. Check for overdue incidents (Passed completion date)
            const overdueRes = await pool.query(`
                SELECT * FROM incident_register 
                WHERE status = 'Open' 
                AND expected_close_date < CURRENT_DATE;
            `);

            if (overdueRes.rowCount > 0) {
                const overdueRoles = await getEmailsByRoles(['Admin', 'Manager', 'HSE', 'Board', 'Tester']);
                for (const inc of overdueRes.rows) {
                    const recipients = [...new Set([inc.reporter_email, ...overdueRoles])].filter(Boolean);
                    if (recipients.length > 0) {
                        await sendNotification({
                            to: recipients,
                            subject: `OVERDUE ESCALATION: Incident #${inc.id}`,
                            title: '⚠️ Overdue Remediation Escalation',
                            bodyHtml: `
                                <p>Incident <strong>#${inc.id}</strong> at <strong>${inc.location}</strong> has passed its scheduled close-out date of <strong>${inc.expected_close_date}</strong>.</p>
                                <p><strong>Type / Severity:</strong> ${inc.incident_type} | ${inc.severity}</p>
                                <p><strong>Assigned Responsible Person:</strong> ${inc.responsible_person || 'Unassigned'}</p>
                                <p><strong>Description:</strong> ${inc.description}</p>
                            `
                        });
                        overdueCount++;
                    }
                }
            }

            return res.status(200).json({ 
                success: true, 
                nearingNotified: nearingCount, 
                overdueNotified: overdueCount 
            });
        }

        // Action: Create Incident
        if (req.method === 'POST' && action === 'create') {
            const { 
                incident_date, expected_close_date, reported_by, reporter_email, 
                incident_type, location, description, severity, corrective_action, 
                responsible_person, incident_image_url 
            } = req.body;

            const query = `
                INSERT INTO incident_register (
                    incident_date, expected_close_date, reported_by, reporter_email, 
                    incident_type, location, description, severity, corrective_action, 
                    responsible_person, status, incident_image_url
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'Open', $11) RETURNING *;
            `;

            const result = await pool.query(query, [
                incident_date, expected_close_date, reported_by, reporter_email, 
                incident_type, location, description, severity, corrective_action, 
                responsible_person, incident_image_url
            ]);

            const newInc = result.rows[0];

            // Recipients: Reporter + Admin, Manager, HSE, Board, Tester roles
            const roleEmails = await getEmailsByRoles(['Admin', 'Manager', 'HSE', 'Board', 'Tester']);
            const recipients = [...new Set([reporter_email, ...roleEmails])].filter(Boolean);

            await sendNotification({
                to: recipients,
                subject: `New Incident Logged: ${incident_type} (${location})`,
                title: '🚨 New Incident Logged',
                bodyHtml: `
                    <p><strong>Reporter:</strong> ${reported_by} (${reporter_email || 'No email provided'})</p>
                    <p><strong>Type:</strong> ${incident_type} | <strong>Severity:</strong> ${severity}</p>
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Expected Close-Out Date:</strong> ${expected_close_date}</p>
                    <p><strong>Description:</strong><br>${description}</p>
                    <p><strong>CAPA / Corrective Action:</strong><br>${corrective_action || 'Pending initial review'}</p>
                `
            });

            return res.status(200).json({ success: true, incident: newInc });
        }

        // Action: Close Incident
        if (req.method === 'POST' && action === 'close') {
            const { id, close_image_url, ai_close_assessment, verified_by } = req.body;
            
            const result = await pool.query(
                `UPDATE incident_register SET status = 'Closed', verified_at = NOW(), close_image_url = $2, ai_close_assessment = $3 WHERE id = $1 RETURNING *;`, 
                [id, close_image_url, ai_close_assessment]
            );

            const closedInc = result.rows[0];

            // Extract and format AI findings for email body
            let aiFindingsText = 'No detailed AI notes provided.';
            let aiStatusBadge = '';

            if (ai_close_assessment) {
                try {
                    const parsedAi = typeof ai_close_assessment === 'string' 
                        ? JSON.parse(ai_close_assessment) 
                        : ai_close_assessment;

                    aiFindingsText = parsedAi.assessment_notes || aiFindingsText;
                    aiStatusBadge = parsedAi.satisfactory 
                        ? '<span style="background: #c6f6d5; color: #22543d; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; display: inline-block; margin-bottom: 6px;">✅ Verification Approved</span>'
                        : '<span style="background: #fed7d7; color: #742a2a; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; display: inline-block; margin-bottom: 6px;">⚠️ Deficiencies Flagged</span>';
                } catch (e) {
                    aiFindingsText = ai_close_assessment;
                }
            }

            // Recipients: Reporter + HSE, Board, Tester roles
            const roleEmails = await getEmailsByRoles(['HSE', 'Board', 'Tester']);
            const recipients = [...new Set([closedInc.reporter_email, ...roleEmails])].filter(Boolean);

            await sendNotification({
                to: recipients,
                subject: `Incident Verified & Closed: Ref #${closedInc.id}`,
                title: '✅ Incident Remediation Verified & Closed',
                bodyHtml: `
                    <p>The following incident record has been officially verified and closed.</p>
                    <p><strong>Incident Ref:</strong> #${closedInc.id}</p>
                    <p><strong>Location:</strong> ${closedInc.location}</p>
                    <p><strong>Verified By:</strong> ${verified_by || 'Estate Management'}</p>
                    
                    <div style="background: #f7fafc; border-left: 4px solid #2b6cb0; padding: 12px; margin: 16px 0; border-radius: 4px;">
                        <strong style="color: #2b6cb0; display: block; margin-bottom: 6px;">🤖 AI Close-Out Verification Findings:</strong>
                        <div>${aiStatusBadge}</div>
                        <p style="margin: 0; font-size: 13px; color: #2d3748;">${aiFindingsText}</p>
                    </div>

                    <p><strong>Description:</strong> ${closedInc.description}</p>
                `
            });

            return res.status(200).json({ success: true, incident: closedInc });
        }

        return res.status(400).json({ success: false, error: 'Invalid action parameter' });
    } catch (err) {
        console.error('API Error Details:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
}