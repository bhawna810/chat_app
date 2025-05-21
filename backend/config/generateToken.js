const jwt = require('jsonwebtoken');

const generateToken =  (email , password, id ) => {
    return jwt.sign({ email: email , password : password, id: id },  process.env.secretKey, { expiresIn: '1h' })
}

module.exports = generateToken;
