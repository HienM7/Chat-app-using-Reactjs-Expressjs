const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller'); 


router.post('/doLogin', authController.doLogin);
router.post('/checkLogin', authController.checkLogin);

module.exports = router;
