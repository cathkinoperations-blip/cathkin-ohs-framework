// api/verify-user.js
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default async function handler(req, res) {
    // Enable CORS if needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password, requiredRole } = req.body;

    try {
        const result = await pool.query(
            'SELECT username, pin_hash, first_name, surname, role FROM estate_users WHERE username = $1',
            [username]
        );
        
        if (result.rows.length > 0) {
            const user = result.rows[0];
            
            if (user.pin_hash !== password) {
                return res.status(401).json({ authorized: false, message: 'Incorrect password.' });
            }
            
            if (requiredRole && user.role !== requiredRole && user.role !== 'Admin') {
                return res.status(403).json({ authorized: false, message: 'Insufficient role permissions. Requires Manager or Admin.' });
            }

            return res.json({ 
                authorized: true, 
                firstName: user.first_name, 
                surname: user.surname,
                fullName: `${user.first_name} ${user.surname}`,
                role: user.role 
            });
        } else {
            return res.status(401).json({ authorized: false, message: 'Username not found.' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}