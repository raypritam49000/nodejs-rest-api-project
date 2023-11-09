const express = require('express');
const router = express.Router();
const HowdyController = require("../controllers/howdyController");

router.get('/', HowdyController.getHowdy);

module.exports = router;