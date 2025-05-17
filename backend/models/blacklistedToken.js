const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // TTL index: token will auto-delete after expiry
    }

})

module.exports = mongoose.model('blacklistedToken', blacklistedTokenSchema);