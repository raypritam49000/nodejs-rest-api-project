const jwt = require('jsonwebtoken');
const http = require('http');

const authFilter = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided", status: http.STATUS_CODES[401], statusCode: 401, success: false });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Invalid token format', status: http.STATUS_CODES[401], statusCode: 401, success: false });
    }

    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token verification failed', status: http.STATUS_CODES[403], statusCode: 403, success: false });
    }
};

module.exports = authFilter;
