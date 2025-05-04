const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dietstx4z',
  api_key: '598738981913826',
  api_secret: 'WXUg7kabLBX59AgQQrOe4aMNviQ',
});

module.exports = cloudinary;