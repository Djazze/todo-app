const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log(authHeader);

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Split the header on space and take the second part
        console.log(token)
        
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }
            req.user = user;
            console.log('We reached next()')
            next();
        });
    } else {
        console.log('Forbidden')
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;
