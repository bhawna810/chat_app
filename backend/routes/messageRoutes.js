const express = require("express");
const router = express.Router();
const verifyToken = require("../config/verifyToken");
const {storeMessage} = require("../controllers/messageControllers");

router.route("/store").post(storeMessage);

module.exports = router;