const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./token.config.js')
function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
        payload,
        JWT_SECRET,
        {
            expiresIn: "1d"
        },
        (err, token) => {
            if(err) reject(err);
            resolve(token);
            res.cookie('token', token);
            res.json({
                msg: 'Usuario creado exitosamente.'
            });
        });
    })
}

module.exports = { createAccessToken };