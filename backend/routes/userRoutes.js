const {userRegister, userValidate, uploadandSaveImage, removeImage, logout, searchUser} = require("../controllers/userControllers");
const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = require('../middleware/multer');
const verifyToken = require("../config/verifyToken");

console.log(" inside userRoutes");

router.route("/").post(userRegister);
router.route("/login").get(userValidate);
router.route('/upload').post(verifyToken ,upload.single('image'), uploadandSaveImage);
router.route('/removeupload').post(verifyToken , removeImage);
router.route('/logout').get(verifyToken , logout);
router.route('/searchUser').get(verifyToken , searchUser);


module.exports = router;