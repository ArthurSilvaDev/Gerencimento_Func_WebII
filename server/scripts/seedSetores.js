const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Setor = require('../models/setor');

// Verifica se a URI do MongoDB está definida
if (!process.env.MONGO_URI) {
    console.error('Erro: MONGO_URI não está definida no arquivo .env');
    process.exit(1);
}

const setoresFixos = [
    { nome: 'TI' },
    { nome: 'Financeiro' },
    { nome: 'RH' },
    { nome: 'Comercial' },
    { nome: 'Marketing' },
    { nome: 'Administrativo' },
    { nome: 'Operacional' }
];

const seedSetores = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado ao MongoDB');

        // Limpa a coleção de setores existente
        await Setor.deleteMany({});
        console.log('Coleção de setores limpa');

        // Insere os setores fixos
        await Setor.insertMany(setoresFixos);
        console.log('Setores inseridos com sucesso');

        await mongoose.connection.close();
        console.log('Conexão com MongoDB fechada');
        process.exit(0);
    } catch (error) {
        console.error('Erro:', error);
        process.exit(1);
    }
};

seedSetores(); 