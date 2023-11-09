const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController");
const authFilter = require('../middleware/authFilter');

router.get('/profile',authFilter, UserController.getProfile);
router.get('/:userId',authFilter, UserController.getUserById);

module.exports = router;