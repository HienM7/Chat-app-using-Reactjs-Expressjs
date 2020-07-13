const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller'); 


router.get('/getMessage', messageController.getAllMessage);

module.exports = router;
