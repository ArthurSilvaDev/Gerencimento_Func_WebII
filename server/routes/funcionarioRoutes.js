const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

// Rota para criar um funcionário -  Post de rota raiz da API
router.post('/', funcionarioController.criarFuncionario);

// Rota para listar todos os funcionários - Get de rota raiz da API
router.get('/', funcionarioController.listarFuncionarios);

// Rota para listar funcionários por setor - get da rota /setor da API
router.get('/setor', funcionarioController.listarPorSetor);

// Rota para atualizar um funcionário - Put da rota raiz com id do funcionário
router.put('/:id', funcionarioController.atualizarFuncionario);

// Rota para excluir um funcionário - Delete da rota raiz com id do funcionário
router.delete('/:id', funcionarioController.excluirFuncionario);

module.exports = router;
