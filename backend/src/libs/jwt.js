const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./token.config.js');

const createAccessToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { 
        expiresIn: "1d"
        }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

module.exports = { createAccessToken };