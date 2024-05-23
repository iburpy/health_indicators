const { JWT_SECRET } = require('../libs/token.config.js');
const jwt = require('jsonwebtoken');

const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No hay token, autorización denegada." });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: "Token inválido, autorización denegada." });
        req.user = user;
        next();
    });
};

module.exports = { authRequired };