const jwt = require('jsonwebtoken');

const generateToken =  (email , password ) => {
    return jwt.sign({ email: email , password : password },  process.env.secretKey, { expiresIn: '1h' })
}

module.exports = generateToken;
