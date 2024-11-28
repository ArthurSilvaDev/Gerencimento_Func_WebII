const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//ROTAS DE LOGIN

router.post('/login', authController.login);

module.exports = router;