const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/authController");

router.get('/register', AuthController.registerUser);
router.get('/login', AuthController.loginUser);

module.exports = router;


