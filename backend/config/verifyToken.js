const jwt = require('jsonwebtoken');
const BlacklistedToken = require("../models/blacklistedToken");

const verifyToken = async (req, res , next) => {

    console.log('inside verifyToken-------------------');

    const token = req.headers['authorization'].split(' ')[1];
    console.log('token', token);
    if(!token){
        res.status(401).send('Access Denied');
    }

    // Check if token is blacklisted
    const blacklisted = await BlacklistedToken.findOne({ token });
    if (blacklisted) {
      return res.status(403).json({ message: 'Token is blacklisted' });
    }

    try{
      console.log("process.env.secretKey--------------------", process.env.secretKey);
      const verified = jwt.verify(token, process.env.secretKey);
      console.log('verified', verified);
      req.user = verified;
      console.log('req.user', req.user)
      next();
    }
    catch(err){
       res.status(400).send('Invalid Token');
    }
}

module.exports = verifyToken;