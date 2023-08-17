const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

function authenticateJWT(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        console.log(req.user)
        next();
    } catch (error) {
        console.error('Error authenticating JWT:', error);
        res.sendStatus(403);
    }
}

module.exports = authenticateJWT;
