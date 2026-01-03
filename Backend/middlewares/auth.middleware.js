const admin = require('../config/firbaseAdmin')

const authApp = admin.auth();

async function authMiddleware(req, res, next) {

    if (req.method === "OPTIONS") {
        return next();
    }  
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Missing or invalid Authorization header" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const deocde = await authApp.verifyIdToken(token);
        req.user = {
            uid: deocde.uid,
            email: deocde.email,
            name: deocde.name || 'User',
        }
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = authMiddleware;