const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  cargo: {
    type: String,
    required: true
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;