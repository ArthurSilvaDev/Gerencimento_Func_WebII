const mongoose = require('mongoose');

const setorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    }
});

const Setor = mongoose.model('Setor', setorSchema);
module.exports = Setor; 