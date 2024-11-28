const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  sobrenome: {
    type: String,
    required: true
  },
  cargo: {
    type: String,
    required: true
  },
  salario: {
    type: Number,
    required: true
  },
  setor: {
    type: String,
    required: true
  }
});

const Funcionario = mongoose.model('Funcionario', funcionarioSchema);
module.exports = Funcionario;
