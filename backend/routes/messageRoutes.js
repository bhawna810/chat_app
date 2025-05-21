const express = require("express");
const router = express.Router();
const verifyToken = require("../config/verifyToken");
const {storeMessage} = require("../controllers/messageControllers");

router.route("/store").post(verifyToken, storeMessage);

module.exports = router;