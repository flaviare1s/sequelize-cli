const express = require('express');
const router = express.Router();
const authConroller = require("../controllers/authController.js");

router.post("/login", authConroller.login);

module.exports = router;
