const jwt = require('jsonwebtoken');

function generateToken(apiKey){
    return jwt.sign({ apiKey }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })
};

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        return json({ error: "Token inválido"});
    }
};

module.exports = {
    generateToken,
    verifyToken
};