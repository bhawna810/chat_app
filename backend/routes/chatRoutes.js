const express = require("express");
const router = express.Router();
const verifyToken = require("../config/verifyToken");
const {storeChat} = require("../controllers/chatControllers");

router.route("/store").post(storeChat);

module.exports = router;