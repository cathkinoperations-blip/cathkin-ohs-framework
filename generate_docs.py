import os

# Files dictionary containing filename -> HTML content
documents = {

# ==========================================
# MODULE 03: INCIDENT REPORTING & COIDA
# ==========================================
"03_module_incident_reporting_coida.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module 03: Incident Reporting & COIDA | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 0 20px; background-color: #fcfcfd; }
        .header-banner { background-color: #1a365d; color: #ffffff; padding: 24px; border-radius: 6px; margin-bottom: 25px; border-bottom: 5px solid #3182ce; }
        .header-banner h1 { font-size: 18pt; margin: 0 0 6px 0; font-weight: 700; color: #ffffff; }
        .header-banner .subtitle { font-size: 11pt; color: #e2e8f0; margin: 0; font-weight: 300; }
        .header-banner .meta-bar { margin-top: 15px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.2); font-size: 8.5pt; color: #cbd5e0; display: flex; justify-content: space-between; flex-wrap: wrap; }
        h2 { font-size: 13pt; color: #1a365d; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px; font-weight: 700; }
        p, li { font-size: 9.5pt; text-align: justify; }
        .callout { background-color: #ebf8ff; border-left: 4px solid #3182ce; padding: 12px 16px; margin: 15px 0; border-radius: 0 4px 4px 0; font-size: 9pt; }
        .callout-title { font-weight: bold; color: #1a365d; margin-bottom: 4px; }
        .action-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .action-card { background: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #3182ce; padding: 15px; border-radius: 4px; }
        .action-card h4 { margin: 0 0 8px 0; color: #1a365d; font-size: 10pt; }
        .action-card p { font-size: 8.5pt; margin-bottom: 12px; color: #4a5568; }
        .btn-link { display: inline-block; background-color: #3182ce; color: #ffffff; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-size: 8.5pt; font-weight: bold; }
        .btn-link:hover { background-color: #2b6cb0; }
        .nav-footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; }
        .nav-footer a { background-color: #1a365d; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-size: 9pt; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header-banner">
        <h1>MODULE 03: INCIDENT REPORTING & COIDA COMPLIANCE</h1>
        <div class="subtitle">Operational Health & Safety Governance Manual | Cathkin Estates HOA</div>
        <div class="meta-bar">
            <span><strong>Document Ref:</strong> OHS-MOD-003</span>
            <span><strong>Regulatory Standard:</strong> GAR 9 & COIDA (Act 130 of 1993)</span>
            <span><strong>Workplace Scope:</strong> Small Workplace (&lt;20 Employees)</span>
        </div>
    </div>

    <h2>1. Statutory Reporting Requirements</h2>
    <p>Under General Administrative Regulation 9 and the Compensation for Occupational Injuries and Diseases Act (COIDA), all workplace injuries, occupational illnesses, and near-miss events occurring on Cathkin Estates must be formally recorded, investigated, and reported.</p>
    
    <div class="callout">
        <div class="callout-title">SECTION 24 REPORTABLE INCIDENTS</div>
        Any incident resulting in death, permanent disability, loss of limb, unconsciousness, or incapacitation for more than 14 days must be reported immediately to the Department of Employment and Labour (Form WCL 1/2) within 7 days.
    </div>

    <h2>2. Incident Investigation Flow</h2>
    <ol>
        <li><strong>Immediate First Aid / Emergency Response:</strong> Secure the area and render medical aid.</li>
        <li><strong>Scene Preservation:</strong> Do not disturb the incident scene if severe injury or fatality has occurred.</li>
        <li><strong>Formal Investigation:</strong> Conducted by the Section 16(2) Appointee / Estate Manager within 7 days using Form WCL 1/2 and GAR Annexure 1.</li>
        <li><strong>Operations Committee Review:</strong> All incidents and near-misses are tabled at the next Operations Committee meeting to confirm corrective actions.</li>
    </ol>

    <h2>3. Linked Forms & Templates</h2>
    <div class="action-card-grid">
        <div class="action-card">
            <h4>GAR Annexure 1 Incident Register</h4>
            <p>Statutory register for tracking all workplace injuries, property damage, and near-misses.</p>
            <a href="03_sub_gar_annexure_1_register.html" class="btn-link" target="_blank">Open Incident Register &rarr;</a>
        </div>
        <div class="action-card">
            <h4>WCL 2 Employer's Report Form</h4>
            <p>Official COIDA occupational injury report template for submission to the Compensation Commissioner.</p>
            <a href="03_sub_wcl2_incident_form.html" class="btn-link" target="_blank">Open WCL 2 Form &rarr;</a>
        </div>
    </div>

    <div class="nav-footer">
        <a href="02_module_hira.html">&larr; Back to Module 02</a>
        <a href="04_module_sop_safe_work.html">Go to Module 04 &rarr;</a>
    </div>
</body>
</html>""",

"03_sub_gar_annexure_1_register.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GAR Annexure 1 Incident Register | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 950px; margin: 30px auto; padding: 20px; background-color: #f7fafc; }
        h1 { font-size: 16pt; color: #1a365d; border-bottom: 3px solid #2b6cb0; padding-bottom: 8px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; background: white; font-size: 8.5pt; margin-bottom: 25px; }
        th { background-color: #1a365d; color: white; padding: 8px; text-align: left; }
        td { padding: 8px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
        tr:nth-child(even) { background-color: #f8fafc; }
        .nav-link { display: inline-block; margin-bottom: 15px; color: #3182ce; text-decoration: none; font-weight: bold; font-size: 9pt; }
    </style>
</head>
<body>
    <a href="03_module_incident_reporting_coida.html" class="nav-link">&larr; Back to Module 03</a>
    <h1>Cathkin Estates HOA — GAR Annexure 1 Incident & Near-Miss Log</h1>
    <table>
        <thead>
            <tr>
                <th>Incident ID</th>
                <th>Date & Time</th>
                <th>Injured Person / Item</th>
                <th>Description of Event</th>
                <th>Root Cause</th>
                <th>Corrective Action Implemented</th>
                <th>COIDA Ref / Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>INC-2026-01</td>
                <td>2026-07-12 10:15</td>
                <td>Maintenance Staff</td>
                <td>Minor abrasion to forearm during brush cutting / slasher clearing.</td>
                <td>PPE gloves worn were degraded and worn out.</td>
                <td>Replaced leather aprons/gloves for all field staff; reviewed pre-start PPE checks.</td>
                <td>Internal First Aid (Closed)</td>
            </tr>
            <tr>
                <td>INC-2026-02</td>
                <td>2026-08-02 14:00</td>
                <td>MF268 Xtra Tractor Guard</td>
                <td>Slasher blade struck concealed rock on road verge; guard bent.</td>
                <td>High grass concealed road margin debris.</td>
                <td>Pre-slashing foot inspection required on thick grass verges before tractor run.</td>
                <td>Property Damage (Closed)</td>
            </tr>
        </tbody>
    </table>
</body>
</html>""",

"03_sub_wcl2_incident_form.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WCL 2 Incident Report | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 25px; background-color: #ffffff; border: 1px solid #cbd5e0; }
        h1 { font-size: 14pt; color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 6px; margin-bottom: 15px; text-transform: uppercase; }
        h2 { font-size: 10.5pt; color: #2b6cb0; margin-top: 15px; margin-bottom: 6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; }
        p, li { font-size: 9pt; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 8.5pt; }
        td { padding: 6px 8px; border: 1px solid #cbd5e0; vertical-align: top; }
        .label { font-weight: bold; background-color: #f7fafc; width: 30%; }
        .nav-link { display: inline-block; margin-bottom: 15px; color: #3182ce; text-decoration: none; font-weight: bold; font-size: 9pt; }
        .btn-print { background-color: #3182ce; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; float: right; }
        @media print { .btn-print, .nav-link { display: none; } body { border: none; margin: 0; padding: 0; } }
    </style>
</head>
<body>
    <button class="btn-print" onclick="window.print()">🖨️ Print Form</button>
    <a href="03_module_incident_reporting_coida.html" class="nav-link">&larr; Back to Module 03</a>
    <h1>COIDA FORM WCL 2 — EMPLOYER'S REPORT OF AN ACCIDENT</h1>
    
    <h2>1. Employer Details</h2>
    <table>
        <tr><td class="label">Employer Registered Name</td><td>Cathkin Estates Homeowners Association</td></tr>
        <tr><td class="label">COIDA Registration Number</td><td>990000XXXX (Estate Operations)</td></tr>
        <tr><td class="label">Physical Address</td><td>Cathkin Estates, Winterton, Drakensberg, KZN, 3340</td></tr>
        <tr><td class="label">Responsible Manager</td><td>Estate Manager / Section 16(2) Delegate</td></tr>
    </tr>
    </table>

    <h2>2. Injured Employee Details</h2>
    <table>
        <tr><td class="label">Full Name & Surname</td><td>________________________________________________</td></tr>
        <tr><td class="label">ID / Passport Number</td><td>________________________________________________</td></tr>
        <tr><td class="label">Occupation / Job Title</td><td>________________________________________________</td></tr>
        <tr><td class="label">Date & Time of Accident</td><td>202___-___-___ at ______ : ______</td></tr>
    </table>

    <h2>3. Accident Description & Medical Treatment</h2>
    <table>
        <tr><td class="label">Location of Accident</td><td>________________________________________________</td></tr>
        <tr><td class="label">Activity at Time of Injury</td><td>________________________________________________</td></tr>
        <tr><td class="label">Nature of Injury</td><td>________________________________________________</td></tr>
        <tr><td class="label">Medical Facility / Doctor</td><td>________________________________________________</td></tr>
    </table>
</body>
</html>""",

# ==========================================
# MODULE 04: SOPs & SAFE WORK PROCEDURES
# ==========================================
"04_module_sop_safe_work.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module 04: Standard Operating Procedures | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 0 20px; background-color: #fcfcfd; }
        .header-banner { background-color: #1a365d; color: #ffffff; padding: 24px; border-radius: 6px; margin-bottom: 25px; border-bottom: 5px solid #3182ce; }
        .header-banner h1 { font-size: 18pt; margin: 0 0 6px 0; font-weight: 700; color: #ffffff; }
        .header-banner .subtitle { font-size: 11pt; color: #e2e8f0; margin: 0; font-weight: 300; }
        .header-banner .meta-bar { margin-top: 15px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.2); font-size: 8.5pt; color: #cbd5e0; display: flex; justify-content: space-between; flex-wrap: wrap; }
        h2 { font-size: 13pt; color: #1a365d; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px; font-weight: 700; }
        p, li { font-size: 9.5pt; text-align: justify; }
        .action-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .action-card { background: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #3182ce; padding: 15px; border-radius: 4px; }
        .action-card h4 { margin: 0 0 8px 0; color: #1a365d; font-size: 10pt; }
        .action-card p { font-size: 8.5pt; margin-bottom: 12px; color: #4a5568; }
        .btn-link { display: inline-block; background-color: #3182ce; color: #ffffff; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-size: 8.5pt; font-weight: bold; }
        .btn-link:hover { background-color: #2b6cb0; }
        .nav-footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; }
        .nav-footer a { background-color: #1a365d; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-size: 9pt; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header-banner">
        <h1>MODULE 04: SAFE OPERATING PROCEDURES (SOP)</h1>
        <div class="subtitle">Operational Health & Safety Governance Manual | Cathkin Estates HOA</div>
        <div class="meta-bar">
            <span><strong>Document Ref:</strong> OHS-MOD-004</span>
            <span><strong>Regulatory Standard:</strong> OHS Act §8(2)(e)</span>
            <span><strong>Equipment Focus:</strong> MF268 Xtra, Road Repair & Power Tools</span>
        </div>
    </div>

    <h2>1. Purpose & Administrative Scope</h2>
    <p>Safe Operating Procedures (SOPs) define mandatory operational steps to protect estate staff and property from harm. All operators must be formally trained on these SOPs before being authorized to operate estate equipment.</p>

    <h2>2. Key Estate Operational SOPs</h2>
    <div class="action-card-grid">
        <div class="action-card">
            <h4>SOP 01: Massey Ferguson 268 Xtra Tractor & Slasher</h4>
            <p>Mandatory safe operating rules for driving, PTO engagement, slashing on slopes, and pre-start inspections.</p>
            <a href="04_sub_sop_tractor_slasher.html" class="btn-link" target="_blank">Open Tractor SOP &rarr;</a>
        </div>
        <div class="action-card">
            <h4>SOP 02: Road Repairs & Asphalt Maintenance</h4>
            <p>Safety procedures for double chip & spray, hot-mix patching, and interlocking paver repair work.</p>
            <a href="04_sub_sop_road_maintenance.html" class="btn-link" target="_blank">Open Road Repair SOP &rarr;</a>
        </div>
    </div>

    <div class="nav-footer">
        <a href="03_module_incident_reporting_coida.html">&larr; Back to Module 03</a>
        <a href="05_module_contractor_management.html">Go to Module 05 &rarr;</a>
    </div>
</body>
</html>""",

"04_sub_sop_tractor_slasher.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SOP: Tractor & Slasher | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 25px; background-color: #ffffff; border: 1px solid #cbd5e0; }
        h1 { font-size: 15pt; color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 6px; margin-bottom: 15px; }
        h2 { font-size: 11pt; color: #2b6cb0; margin-top: 18px; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
        p, li { font-size: 9pt; }
        .nav-link { display: inline-block; margin-bottom: 15px; color: #3182ce; text-decoration: none; font-weight: bold; font-size: 9pt; }
        .btn-print { background-color: #3182ce; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; float: right; }
        @media print { .btn-print, .nav-link { display: none; } body { border: none; margin: 0; padding: 0; } }
    </style>
</head>
<body>
    <button class="btn-print" onclick="window.print()">🖨️ Print SOP Document</button>
    <a href="04_module_sop_safe_work.html" class="nav-link">&larr; Back to Module 04</a>
    <h1>SOP 01: MASSEY FERGUSON 268 XTRA TRACTOR & SLASHER OPERATION</h1>

    <h2>1. Mandatory PPE Required</h2>
    <ul>
        <li>Steel-toe safety boots (SANS approved).</li>
        <li>Hearing protection (Earmuffs or earplugs, Class 4 minimum).</li>
        <li>High-visibility vest.</li>
        <li>Safety glasses / eye protection against flying debris.</li>
    </ul>

    <h2>2. Pre-Operation Checks</h2>
    <ul>
        <li>Inspect fuel, oil, and coolant levels on the MF268 Xtra.</li>
        <li>Ensure the PTO master shield and slasher rubber/chain guards are fully intact and secure.</li>
        <li>Verify brake pedals are latched together for road travel.</li>
    </ul>

    <h2>3. Operational Safety Rules</h2>
    <ul>
        <li><strong>No Passengers:</strong> Never allow extra riders on the tractor or trailing equipment.</li>
        <li><strong>Exclusion Zone:</strong> Maintain a 50-meter clear radius around the slasher during operation.</li>
        <li><strong>Slope Rules:</strong> Drive straight up and down steep inclines—never traverse high slopes laterally to prevent rollover.</li>
        <li><strong>Lockout Rule:</strong> Turn off engine, remove ignition key, and wait for all parts to stop completely before clearing slasher blockages.</li>
    </ul>
</body>
</html>""",

"04_sub_sop_road_maintenance.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SOP: Road Repairs | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 25px; background-color: #ffffff; border: 1px solid #cbd5e0; }
        h1 { font-size: 15pt; color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 6px; margin-bottom: 15px; }
        h2 { font-size: 11pt; color: #2b6cb0; margin-top: 18px; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
        p, li { font-size: 9pt; }
        .nav-link { display: inline-block; margin-bottom: 15px; color: #3182ce; text-decoration: none; font-weight: bold; font-size: 9pt; }
        .btn-print { background-color: #3182ce; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; float: right; }
        @media print { .btn-print, .nav-link { display: none; } body { border: none; margin: 0; padding: 0; } }
    </style>
</head>
<body>
    <button class="btn-print" onclick="window.print()">🖨️ Print SOP Document</button>
    <a href="04_module_sop_safe_work.html" class="nav-link">&larr; Back to Module 04</a>
    <h1>SOP 02: ESTATE ROAD MAINTENANCE & ASPHALT PATCHING</h1>

    <h2>1. Worksite Traffic Control</h2>
    <ul>
        <li>Place traffic cones and "Roadworks Ahead" warning signs 30 meters ahead of the work area in both directions.</li>
        <li>All personnel must wear Class 2 High-Visibility reflective vests at all times.</li>
    </ul>

    <h2>2. Handling Hot-Mix Asphalt & Emulsions</h2>
    <ul>
        <li>Wear thermal heat-resistant gloves and long sleeves when handling hot-mix asphalt or hot binder.</li>
        <li>Avoid inhalation of fumes; work in well-ventilated outdoor areas.</li>
        <li>Keep a chemical spill kit and fire extinguisher accessible on the work vehicle.</li>
    </ul>
</body>
</html>""",

# ==========================================
# MODULE 05: CONTRACTOR GOVERNANCE
# ==========================================
"05_module_contractor_management.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module 05: Contractor Management | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 0 20px; background-color: #fcfcfd; }
        .header-banner { background-color: #1a365d; color: #ffffff; padding: 24px; border-radius: 6px; margin-bottom: 25px; border-bottom: 5px solid #3182ce; }
        .header-banner h1 { font-size: 18pt; margin: 0 0 6px 0; font-weight: 700; color: #ffffff; }
        .header-banner .subtitle { font-size: 11pt; color: #e2e8f0; margin: 0; font-weight: 300; }
        .header-banner .meta-bar { margin-top: 15px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.2); font-size: 8.5pt; color: #cbd5e0; display: flex; justify-content: space-between; flex-wrap: wrap; }
        h2 { font-size: 13pt; color: #1a365d; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px; font-weight: 700; }
        p, li { font-size: 9.5pt; text-align: justify; }
        .action-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .action-card { background: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #3182ce; padding: 15px; border-radius: 4px; }
        .action-card h4 { margin: 0 0 8px 0; color: #1a365d; font-size: 10pt; }
        .action-card p { font-size: 8.5pt; margin-bottom: 12px; color: #4a5568; }
        .btn-link { display: inline-block; background-color: #3182ce; color: #ffffff; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-size: 8.5pt; font-weight: bold; }
        .btn-link:hover { background-color: #2b6cb0; }
        .nav-footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; }
        .nav-footer a { background-color: #1a365d; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-size: 9pt; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header-banner">
        <h1>MODULE 05: CONTRACTOR SAFETY MANAGEMENT</h1>
        <div class="subtitle">Operational Health & Safety Governance Manual | Cathkin Estates HOA</div>
        <div class="meta-bar">
            <span><strong>Document Ref:</strong> OHS-MOD-005</span>
            <span><strong>Regulatory Standard:</strong> OHS Act §37(2) & Construction Regulations</span>
            <span><strong>Workplace Scope:</strong> Mandatory for All On-Site Contractors</span>
        </div>
    </div>

    <h2>1. Section 37(2) Mandate</h2>
    <p>Under Section 37(2) of the OHS Act, Cathkin Estates HOA is liable for acts or omissions of contractors unless a formal written agreement is executed transferring OHS compliance duties to the contractor prior to work commencing.</p>

    <h2>2. Mandatory Gate Access Requirements</h2>
    <p>No contractor or subcontractor may enter Cathkin Estates to perform work without providing:</p>
    <ul>
        <li>Signed Section 37(2) Mandate Agreement.</li>
        <li>Valid COIDA Letter of Good Standing from the Compensation Commissioner.</li>
        <li>Task-Specific Risk Assessment and Method Statement.</li>
    </ul>

    <h2>3. Linked Documents & Agreements</h2>
    <div class="action-card-grid">
        <div class="action-card">
            <h4>Section 37(2) Mandate Agreement</h4>
            <p>Legally binding agreement shifting OHS statutory compliance to contractor entities.</p>
            <a href="05_sub_section37_2_contractor_agreement.html" class="btn-link" target="_blank">Open 37(2) Agreement &rarr;</a>
        </div>
        <div class="action-card">
            <h4>Contractor Compliance Checklist</h4>
            <p>Verification register for estate gate control and estate management auditing.</p>
            <a href="05_sub_contractor_compliance_checklist.html" class="btn-link" target="_blank">Open Checklist &rarr;</a>
        </div>
    </div>

    <div class="nav-footer">
        <a href="04_module_sop_safe_work.html">&larr; Back to Module 04</a>
        <a href="06_module_hazmat_environmental.html">Go to Module 06 &rarr;</a>
    </div>
</body>
</html>""",

"05_sub_section37_2_contractor_agreement.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Section 37(2) Contractor Agreement | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 25px; background-color: #ffffff; border: 1px solid #cbd5e0; }
        h1 { font-size: 14pt; color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 6px; margin-bottom: 15px; text-transform: uppercase; }
        p, li { font-size: 9pt; text-align: justify; }
        .nav-link { display: inline-block; margin-bottom: 15px; color: #3182ce; text-decoration: none; font-weight: bold; font-size: 9pt; }
        .btn-print { background-color: #3182ce; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; float: right; }
        @media print { .btn-print, .nav-link { display: none; } body { border: none; margin: 0; padding: 0; } }
    </style>
</head>
<body>
    <button class="btn-print" onclick="window.print()">🖨️ Print Agreement</button>
    <a href="05_module_contractor_management.html" class="nav-link">&larr; Back to Module 05</a>
    <h1>SECTION 37(2) MANDATE AGREEMENT</h1>
    <p><strong>WRITTEN AGREEMENT ENTERED INTO BETWEEN:</strong></p>
    <p><strong>CATHKIN ESTATES HOMEOWNERS ASSOCIATION</strong> (Mandator)</p>
    <p>AND</p>
    <p><strong>__________________________________________________</strong> (Mandatary / Contractor)</p>

    <h2>1. Statutory Acknowledgment</h2>
    <p>The Mandatary hereby acknowledges that it is an employer in its own right with duties as prescribed in the Occupational Health and Safety Act (Act 85 of 1993) and agrees to ensure that all work performed on Cathkin Estates property complies with all statutory requirements.</p>

    <h2>2. COIDA & Compensation</h2>
    <p>The Mandatary warrants that it is registered with the Compensation Commissioner and holds a valid Letter of Good Standing under COIDA (Act 130 of 1993).</p>

    <div style="margin-top: 40px; display: flex; justify-content: space-between;">
        <div style="width: 45%;">
            <p>_____________________________________<br>Signed on behalf of Mandator (HOA)</p>
        </div>
        <div style="width: 45%;">
            <p>_____________________________________<br>Signed on behalf of Mandatary (Contractor)</p>
        </div>
    </div>
</body>
</html>""",

"05_sub_contractor_compliance_checklist.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contractor Compliance Audit Checklist | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 20px; background-color: #f7fafc; }
        h1 { font-size: 15pt; color: #1a365d; border-bottom: 2px solid #2b6cb0; padding-bottom: 8px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; background: white; font-size: 8.5pt; }
        th { background-color: #1a365d; color: white; padding: 8px; text-align: left; }
        td { padding: 8px; border-bottom: 1px solid #e2e8f0; }
        .nav-link { display: inline-block; margin-bottom: 15px; color: #3182ce; text-decoration: none; font-weight: bold; font-size: 9pt; }
    </style>
</head>
<body>
    <a href="05_module_contractor_management.html" class="nav-link">&larr; Back to Module 05</a>
    <h1>Contractor Gate Access Verification Checklist</h1>
    <table>
        <thead>
            <tr>
                <th>Requirement / Item</th>
                <th>Mandatory Standard</th>
                <th>Verified Yes/No</th>
                <th>Notes / Comments</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Section 37(2) Agreement</strong></td>
                <td>Signed by authorized contractor representative.</td>
                <td>[  ]</td>
                <td>Mandatory prior to entry.</td>
            </tr>
            <tr>
                <td><strong>COIDA Letter of Good Standing</strong></td>
                <td>Valid and active date verified.</td>
                <td>[  ]</td>
                <td>Must cover contract duration.</td>
            </tr>
            <tr>
                <td><strong>Task Risk Assessment</strong></td>
                <td>Specific to estate site scope.</td>
                <td>[  ]</td>
                <td>Required for hot work or civil work.</td>
            </tr>
        </tbody>
    </table>
</body>
</html>""",

# ==========================================
# MODULE 06: HAZMAT & ENVIRONMENTAL
# ==========================================
"06_module_hazmat_environmental.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module 06: Hazardous Chemical Substances | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 0 20px; background-color: #fcfcfd; }
        .header-banner { background-color: #1a365d; color: #ffffff; padding: 24px; border-radius: 6px; margin-bottom: 25px; border-bottom: 5px solid #3182ce; }
        .header-banner h1 { font-size: 18pt; margin: 0 0 6px 0; font-weight: 700; color: #ffffff; }
        .header-banner .subtitle { font-size: 11pt; color: #e2e8f0; margin: 0; font-weight: 300; }
        .header-banner .meta-bar { margin-top: 15px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.2); font-size: 8.5pt; color: #cbd5e0; display: flex; justify-content: space-between; flex-wrap: wrap; }
        h2 { font-size: 13pt; color: #1a365d; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px; font-weight: 700; }
        p, li { font-size: 9.5pt; text-align: justify; }
        .action-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .action-card { background: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #3182ce; padding: 15px; border-radius: 4px; }
        .action-card h4 { margin: 0 0 8px 0; color: #1a365d; font-size: 10pt; }
        .action-card p { font-size: 8.5pt; margin-bottom: 12px; color: #4a5568; }
        .btn-link { display: inline-block; background-color: #3182ce; color: #ffffff; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-size: 8.5pt; font-weight: bold; }
        .btn-link:hover { background-color: #2b6cb0; }
        .nav-footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; }
        .nav-footer a { background-color: #1a365d; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-size: 9pt; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header-banner">
        <h1>MODULE 06: HAZARDOUS CHEMICAL SUBSTANCES & ENVIRONMENTAL PROTECTION</h1>
        <div class="subtitle">Operational Health & Safety Governance Manual | Cathkin Estates HOA</div>
        <div class="meta-bar">
            <span><strong>Document Ref:</strong> OHS-MOD-006</span>
            <span><strong>Regulatory Standard:</strong> Regulations for Hazardous Chemical Agents (2021)</span>
            <span><strong>Scope:</strong> Herbicides, Fuels, Solvents & Bunded Storage</span>
        </div>
    </div>

    <h2>1. Executive Overview</h2>
    <p>Cathkin Estates operations require the safe storage and application of herbicides (alien invasive plant control), fuels (diesel for MF268 Xtra, petrol for brush cutters), and road binders. Control measures must protect worker health and prevent environmental contamination in sensitivity zones.</p>

    <h2>2. Storage Standards</h2>
    <ul>
        <li>All bulk chemicals and flammables must be stored in a dedicated, lockable chemical store with 110% secondary bunding.</li>
        <li>Safety Data Sheets (SDS) must be immediately accessible at the store entrance for every chemical present.</li>
        <li>Spill kits must be present at the main store and on chemical transport vehicles.</li>
    </ul>

    <h2>3. Linked Documents & Registers</h2>
    <div class="action-card-grid">
        <div class="action-card">
            <h4>HCS Register & SDS Index</h4>
            <p>Inventory log of estate chemicals, active ingredients, and safety data sheet locations.</p>
            <a href="06_sub_hcs_register_sds.html" class="btn-link" target="_blank">Open Chemical Register &rarr;</a>
        </div>
        <div class="action-card">
            <h4>Chemical Spill Protocol</h4>
            <p>Emergency response procedures for chemical and diesel spills on estate land.</p>
            <a href="06_sub_spill_response_protocol.html" class="btn-link" target="_blank">Open Spill Protocol &rarr;</a>
        </div>
    </div>

    <div class="nav-footer">
        <a href="05_module_contractor_management.html">&larr; Back to Module 05</a>
        <a href="07_module_checklists_inspections.html">Go to Module 07 &rarr;</a>
    </div>
</body>
</html>""",

"06_sub_hcs_register_sds.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HCS Chemical Inventory Register | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 20px; background-color: #f7fafc; }
        h1 { font-size: 15pt; color: #1a365d; border-bottom: 3px solid #2b6cb0; padding-bottom: 8px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; background: white; font-size: 8.5pt; }
        th { background-color: #1a365d; color: white; padding: 8px; text-align: left; }
        td { padding: 8px; border-bottom: 1px solid #e2e8f0; }
        .nav-link { display: inline-block; margin-bottom: 15px; color: #3182ce; text-decoration: none; font-weight: bold; font-size: 9pt; }
    </style>
</head>
<body>
    <a href="06_module_hazmat_environmental.html" class="nav-link">&larr; Back to Module 06</a>
    <h1>Hazardous Chemical Substances (HCS) Register</h1>
    <table>
        <thead>
            <tr>
                <th>Chemical Name</th>
                <th>Active Ingredient</th>
                <th>Primary Use</th>
                <th>Storage Location</th>
                <th>SDS Available</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Glyphosate 360</strong></td>
                <td>Glyphosate isopropylamine</td>
                <td>Alien weed eradication</td>
                <td>Bunded Chem Store</td>
                <td>Yes (File #01)</td>
            </tr>
            <tr>
                <td><strong>Commercial Diesel</strong></td>
                <td>Hydrocarbon blend</td>
                <td>MF268 Tractor / Equipment fuel</td>
                <td>500L Bunded Tank</td>
                <td>Yes (File #02)</td>
            </tr>
            <tr>
                <td><strong>Bitumen Emulsion (SS1)</strong></td>
                <td>Asphalt binder</td>
                <td>Road chip & spray patching</td>
                <td>Maintenance Yard</td>
                <td>Yes (File #03)</td>
            </tr>
        </tbody>
    </table>
</body>
</html>""",

"06_sub_spill_response_protocol.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chemical Spill Protocol | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 25px; background-color: #ffffff; border: 1px solid #cbd5e0; }
        h1 { font-size: 15pt; color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 6px; margin-bottom: 15px; }
        h2 { font-size: 11pt; color: #2b6cb0; margin-top: 18px; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
        p, li { font-size: 9pt; }
        .nav-link { display: inline-block; margin-bottom: 15px; color: #3182ce; text-decoration: none; font-weight: bold; font-size: 9pt; }
    </style>
</head>
<body>
    <a href="06_module_hazmat_environmental.html" class="nav-link">&larr; Back to Module 06</a>
    <h1>EMERGENCY SPILL RESPONSE PROTOCOL</h1>

    <h2>1. Spill Response Actions (STOP - CONTAIN - CLEAN)</h2>
    <ol>
        <li><strong>STOP:</strong> Shut off source if safe to do so (turn valve, right overturned container).</li>
        <li><strong>PROTECT:</strong> Put on nitrile gloves, apron, and face protection from the spill kit.</li>
        <li><strong>CONTAIN:</strong> Deploy absorbent booms/socks to prevent chemical from reaching stormwater channels or soil.</li>
        <li><strong>CLEAN:</strong> Apply absorbent granules, sweep into hazardous waste bags, and dispose of via certified hazardous waste collector.</li>
    </ol>
</body>
</html>""",

# ==========================================
# MODULE 07: INSPECTIONS & CHECKLISTS
# ==========================================
"07_module_checklists_inspections.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module 07: Checklists & Inspections | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 0 20px; background-color: #fcfcfd; }
        .header-banner { background-color: #1a365d; color: #ffffff; padding: 24px; border-radius: 6px; margin-bottom: 25px; border-bottom: 5px solid #3182ce; }
        .header-banner h1 { font-size: 18pt; margin: 0 0 6px 0; font-weight: 700; color: #ffffff; }
        .header-banner .subtitle { font-size: 11pt; color: #e2e8f0; margin: 0; font-weight: 300; }
        .header-banner .meta-bar { margin-top: 15px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.2); font-size: 8.5pt; color: #cbd5e0; display: flex; justify-content: space-between; flex-wrap: wrap; }
        h2 { font-size: 13pt; color: #1a365d; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px; font-weight: 700; }
        p, li { font-size: 9.5pt; text-align: justify; }
        .action-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .action-card { background: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #3182ce; padding: 15px; border-radius: 4px; }
        .action-card h4 { margin: 0 0 8px 0; color: #1a365d; font-size: 10pt; }
        .action-card p { font-size: 8.5pt; margin-bottom: 12px; color: #4a5568; }
        .btn-link { display: inline-block; background-color: #3182ce; color: #ffffff; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-size: 8.5pt; font-weight: bold; }
        .btn-link:hover { background-color: #2b6cb0; }
        .nav-footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; }
        .nav-footer a { background-color: #1a365d; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-size: 9pt; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header-banner">
        <h1>MODULE 07: OPERATIONAL INSPECTIONS & CHECKLISTS</h1>
        <div class="subtitle">Operational Health & Safety Governance Manual | Cathkin Estates HOA</div>
        <div class="meta-bar">
            <span><strong>Document Ref:</strong> OHS-MOD-007</span>
            <span><strong>Regulatory Standard:</strong> OHS Act General Machinery & Electrical Regulations</span>
            <span><strong>Digitization:</strong> Paper Forms & Airtable Integration</span>
        </div>
    </div>

    <h2>1. Executive Summary</h2>
    <p>Routine inspections prevent equipment failure and ensure continuous statutory compliance. All daily, weekly, and monthly pre-start checklists are logged physically on site or submitted directly into the estate's <strong>Airtable Operational Management Base</strong>.</p>

    <h2>2. Operational Inspection Suite</h2>
    <div class="action-card-grid">
        <div class="action-card">
            <h4>Daily Tractor Pre-Start Checklist</h4>
            <p>Pre-start inspection form for MF268 Xtra tractor, PTO guard, slasher, and hydraulics.</p>
            <a href="07_sub_checklist_tractor.html" class="btn-link" target="_blank">Open Tractor Checklist &rarr;</a>
        </div>
        <div class="action-card">
            <h4>Monthly First Aid & Fire Inspection</h4>
            <p>Audit form for First Aid Kit contents (GSR 3) and fire extinguisher pressures.</p>
            <a href="07_sub_checklist_firstaid_fire.html" class="btn-link" target="_blank">Open First Aid/Fire Form &rarr;</a>
        </div>
    </div>

    <div class="nav-footer">
        <a href="06_module_hazmat_environmental.html">&larr; Back to Module 06</a>
        <a href="08_module_audit_review.html">Go to Module 08 &rarr;</a>
    </div>
</body>
</html>""",

"07_sub_checklist_tractor.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tractor Daily Pre-Start Checklist | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 25px; background-color: #ffffff; border: 1px solid #cbd5e0; }
        h1 { font-size: 14pt; color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 6px; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; font-size: 8.5pt; margin-bottom: 15px; }
        th { background-color: #2d3748; color: white; padding: 6px 8px; text-align: left; }
        td { padding: 6px 8px; border-bottom: 1px solid #e2e8f0; }
        .nav-link { display: inline-block; margin-bottom: 15px; color: #3182ce; text-decoration: none; font-weight: bold; font-size: 9pt; }
        .btn-print { background-color: #3182ce; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; float: right; }
        @media print { .btn-print, .nav-link { display: none; } body { border: none; margin: 0; padding: 0; } }
    </style>
</head>
<body>
    <button class="btn-print" onclick="window.print()">🖨️ Print Form</button>
    <a href="07_module_checklists_inspections.html" class="nav-link">&larr; Back to Module 07</a>
    <h1>MF268 TRACTOR & SLASHER DAILY PRE-START LOG</h1>
    <p><strong>Operator Name:</strong> ________________________ <strong>Date:</strong> _______________ <strong>Hours:</strong> _________</p>
    <table>
        <thead>
            <tr>
                <th>Inspection Item</th>
                <th>Status (Pass / Fail)</th>
                <th>Notes / Faults Logged</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Engine Oil Level & Coolant</td><td>[ Pass ] [ Fail ]</td><td></td></tr>
            <tr><td>Brake Pedal Operation & Latch</td><td>[ Pass ] [ Fail ]</td><td></td></tr>
            <tr><td>PTO Master Guard & Shroud</td><td>[ Pass ] [ Fail ]</td><td></td></tr>
            <tr><td>Slasher Blade Attachment & Pin</td><td>[ Pass ] [ Fail ]</td><td></td></tr>
            <tr><td>Tyre Pressures & Condition</td><td>[ Pass ] [ Fail ]</td><td></td></tr>
        </tbody>
    </table>
</body>
</html>""",

"07_sub_checklist_firstaid_fire.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monthly First Aid & Fire Audit | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 25px; background-color: #ffffff; border: 1px solid #cbd5e0; }
        h1 { font-size: 14pt; color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 6px; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; font-size: 8.5pt; }
        th { background-color: #2d3748; color: white; padding: 6px 8px; text-align: left; }
        td { padding: 6px 8px; border-bottom: 1px solid #e2e8f0; }
        .nav-link { display: inline-block; margin-bottom: 15px; color: #3182ce; text-decoration: none; font-weight: bold; font-size: 9pt; }
    </style>
</head>
<body>
    <a href="07_module_checklists_inspections.html" class="nav-link">&larr; Back to Module 07</a>
    <h1>MONTHLY FIRST AID & FIRE EQUIPMENT INSPECTION</h1>
    <table>
        <thead>
            <tr>
                <th>Item / Location</th>
                <th>Standard Check</th>
                <th>Condition (OK / Fault)</th>
                <th>Action Taken</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Main Workshop First Aid Box</strong></td>
                <td>GSR 3 compliant stock levels, no expired items.</td>
                <td>[ OK ] [ Fault ]</td>
                <td></td>
            </tr>
            <tr>
                <td><strong>Tractor Cab First Aid Kit</strong></td>
                <td>Compact kit present, sealed, dust-free.</td>
                <td>[ OK ] [ Fault ]</td>
                <td></td>
            </tr>
            <tr>
                <td><strong>9kg DCP Extinguisher (Workshop)</strong></td>
                <td>Gauge in green zone, safety pin sealed, service tag valid.</td>
                <td>[ OK ] [ Fault ]</td>
                <td></td>
            </tr>
        </tbody>
    </table>
</body>
</html>""",

# ==========================================
# MODULE 08: AUDIT & ANNUAL REVIEW
# ==========================================
"08_module_audit_review.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module 08: Audit & Management Review | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 0 20px; background-color: #fcfcfd; }
        .header-banner { background-color: #1a365d; color: #ffffff; padding: 24px; border-radius: 6px; margin-bottom: 25px; border-bottom: 5px solid #3182ce; }
        .header-banner h1 { font-size: 18pt; margin: 0 0 6px 0; font-weight: 700; color: #ffffff; }
        .header-banner .subtitle { font-size: 11pt; color: #e2e8f0; margin: 0; font-weight: 300; }
        .header-banner .meta-bar { margin-top: 15px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.2); font-size: 8.5pt; color: #cbd5e0; display: flex; justify-content: space-between; flex-wrap: wrap; }
        h2 { font-size: 13pt; color: #1a365d; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; margin-top: 24px; margin-bottom: 12px; font-weight: 700; }
        p, li { font-size: 9.5pt; text-align: justify; }
        .action-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .action-card { background: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid #3182ce; padding: 15px; border-radius: 4px; }
        .action-card h4 { margin: 0 0 8px 0; color: #1a365d; font-size: 10pt; }
        .action-card p { font-size: 8.5pt; margin-bottom: 12px; color: #4a5568; }
        .btn-link { display: inline-block; background-color: #3182ce; color: #ffffff; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-size: 8.5pt; font-weight: bold; }
        .btn-link:hover { background-color: #2b6cb0; }
        .nav-footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; }
        .nav-footer a { background-color: #1a365d; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-size: 9pt; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header-banner">
        <h1>MODULE 08: ANNUAL AUDIT & MANAGEMENT REVIEW</h1>
        <div class="subtitle">Operational Health & Safety Governance Manual | Cathkin Estates HOA</div>
        <div class="meta-bar">
            <span><strong>Document Ref:</strong> OHS-MOD-008</span>
            <span><strong>Governance Target:</strong> Board Chairman (16.1) & Operations Committee</span>
            <span><strong>Frequency:</strong> Annual Statutory Review</span>
        </div>
    </div>

    <h2>1. Governance Review Cycle</h2>
    <p>To close the OHS compliance loop, Cathkin Estates conducts an annual management review. The Section 16(2) appointee and Operations Committee evaluate legal registers, incident statistics, baseline HIRA logs, and contractor performance.</p>

    <h2>2. Annual Compliance Scoring</h2>
    <p>The annual audit template measures estate readiness across six core compliance pillars:</p>
    <ol>
        <li>Statutory Appointments & Training Credentials.</li>
        <li>Baseline Hazard & Risk Assessment (HIRA) Updates.</li>
        <li>Incident Management & COIDA Compliance.</li>
        <li>Contractor Section 37(2) Mandates.</li>
        <li>Chemical & Environmental Controls.</li>
        <li>Inspection Logs & Equipment Maintenance.</li>
    </ol>

    <h2>3. Linked Documents</h2>
    <div class="action-card-grid">
        <div class="action-card">
            <h4>Annual OHS Compliance Audit Form</h4>
            <p>Scorecard and audit instrument for annual board and committee review.</p>
            <a href="08_sub_annual_audit_scorecard.html" class="btn-link" target="_blank">Open Audit Scorecard &rarr;</a>
        </div>
    </div>

    <div class="nav-footer">
        <a href="07_module_checklists_inspections.html">&larr; Back to Module 07</a>
        <a href="index.html">Back to Main Index &rarr;</a>
    </div>
</body>
</html>""",

"08_sub_annual_audit_scorecard.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Annual OHS Audit Scorecard | Cathkin Estates HOA</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; max-width: 900px; margin: 30px auto; padding: 25px; background-color: #ffffff; border: 1px solid #cbd5e0; }
        h1 { font-size: 14pt; color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 6px; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; font-size: 8.5pt; margin-bottom: 15px; }
        th { background-color: #1a365d; color: white; padding: 8px; text-align: left; }
        td { padding: 8px; border-bottom: 1px solid #e2e8f0; }
        .nav-link { display: inline-block; margin-bottom: 15px; color: #3182ce; text-decoration: none; font-weight: bold; font-size: 9pt; }
        .btn-print { background-color: #3182ce; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; float: right; }
        @media print { .btn-print, .nav-link { display: none; } body { border: none; margin: 0; padding: 0; } }
    </style>
</head>
<body>
    <button class="btn-print" onclick="window.print()">🖨️ Print Scorecard</button>
    <a href="08_module_audit_review.html" class="nav-link">&larr; Back to Module 08</a>
    <h1>ANNUAL OHS COMPLIANCE AUDIT SCORECARD</h1>
    <p><strong>Audit Date:</strong> ________________________ <strong>Auditor:</strong> ________________________</p>
    <table>
        <thead>
            <tr>
                <th>Compliance Pillar</th>
                <th>Target Standard</th>
                <th>Score (0-10)</th>
                <th>Observations / Corrective Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>1. Statutory Appointments</strong></td>
                <td>16(1), 16(2), First Aider, Fire Warden active.</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><strong>2. HIRA Risk Registers</strong></td>
                <td>Baseline HIRA reviewed within past 12 months.</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><strong>3. Incident & COIDA Records</strong></td>
                <td>GAR Annexure 1 updated; WCL forms submitted.</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><strong>4. Contractor Control</strong></td>
                <td>100% of contractors signed 37(2) mandates.</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><strong>5. HCS & Environmental</strong></td>
                <td>Bunded chemical store, SDS available, spill kits.</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><strong>6. Machine Inspections</strong></td>
                <td>Pre-start logs complete for tractor & equipment.</td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
</body>
</html>"""
}

# Write files to disk
print("Generating Cathkin Estates OHS Framework Documents...\n")
for filename, content in documents.items():
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content.strip())
    print(f"  [✓] Created: {filename}")

print("\nSuccess! All remaining OHS modules (03 to 08) and sub-documents have been generated.")