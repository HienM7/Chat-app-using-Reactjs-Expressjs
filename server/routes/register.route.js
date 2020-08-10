const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register.controller'); 

router.post('/', registerController.register);
router.get('/confirmation/:emailToken', registerController.confirmation);

module.exports = router;
