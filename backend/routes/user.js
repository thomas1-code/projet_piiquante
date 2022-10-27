const express = require("express");
const router = express.Router();

const checkEmail = require("../middleware/checkEmail");
const checkPassword = require("../middleware/checkPassword");
const userCtrl = require("../controllers/user");

router.post("/signup", checkEmail, checkPassword, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;