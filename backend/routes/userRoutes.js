const {userRegister, userValidate} = require("../controllers/userControllers");
const express = require("express");
const router = express.Router();

console.log(" inside userRoutes");

router.route("/").post(userRegister);
router.route("/login").get(userValidate);


module.exports = router;