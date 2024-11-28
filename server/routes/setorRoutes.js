const express = require('express');
const router = express.Router();
const setorController = require('../controllers/setorController');

// Rota para listar todos os setores
router.get('/', setorController.listarSetores);

module.exports = router; 