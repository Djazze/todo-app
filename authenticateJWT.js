const { verify } = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

function authenticateJWT(req, res, next) {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return res.sendStatus(401);
    }

    try {
        const decoded = verify(token.replace('Bearer ', ''), secretKey);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (error) {
        console.error('Error authenticating JWT:', error);
        res.sendStatus(403);
    }
}

module.exports = authenticateJWT;
