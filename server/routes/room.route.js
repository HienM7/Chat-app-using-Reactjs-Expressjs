const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room.controller'); 


router.post('/join', roomController.joinRoom);
router.post('/create', roomController.createRoom);

module.exports = router;
