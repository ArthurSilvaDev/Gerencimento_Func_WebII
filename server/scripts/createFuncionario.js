const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Funcionario = require('../models/funcionario');
const Setor = require('../models/setor');

const nomes = [
    'João', 'Maria', 'Pedro', 'Ana', 'Lucas', 'Julia', 'Carlos', 'Beatriz',
    'Miguel', 'Sofia', 'Arthur', 'Laura', 'Davi', 'Isabella', 'Gabriel', 'Manuela',
    'Bernardo', 'Helena', 'Matheus', 'Valentina', 'Rafael', 'Luiza', 'Heitor',
    'Giovanna', 'Enzo', 'Alice', 'Bruno', 'Clara', 'Daniel', 'Sophia'
];

const sobrenomes = [
    'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves',
    'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho',
    'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa'
];

const cargos = [
    'Analista', 'Coordenador', 'Assistente', 'Especialista', 'Gerente',
    'Supervisor', 'Técnico', 'Consultor', 'Diretor', 'Auxiliar'
];

const gerarFuncionarioAleatorio = (setores) => {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    const cargo = cargos[Math.floor(Math.random() * cargos.length)];
    const setor = setores[Math.floor(Math.random() * setores.length)].nome;
    const salario = Math.floor(Math.random() * (15000 - 2000 + 1)) + 2000;

    return {
        nome,
        sobrenome,
        cargo: `${cargo} de ${setor}`,
        salario,
        setor
    };
};

const seedFuncionarios = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado ao MongoDB');

        // Busca todos os setores
        const setores = await Setor.find();
        if (!setores.length) {
            console.error('Nenhum setor encontrado. Execute primeiro o script de setores.');
            process.exit(1);
        }

        // Limpa a coleção de funcionários existente
        await Funcionario.deleteMany({});
        console.log('Coleção de funcionários limpa');

        // Gera e insere 30 funcionários
        const funcionarios = [];
        for (let i = 0; i < 30; i++) {
            funcionarios.push(gerarFuncionarioAleatorio(setores));
        }

        await Funcionario.insertMany(funcionarios);
        console.log('30 funcionários inseridos com sucesso');

        // Exibe resumo por setor
        const resumo = {};
        funcionarios.forEach(f => {
            resumo[f.setor] = (resumo[f.setor] || 0) + 1;
        });
        console.log('\nResumo por setor:');
        Object.entries(resumo).forEach(([setor, quantidade]) => {
            console.log(`${setor}: ${quantidade} funcionários`);
        });

        await mongoose.connection.close();
        console.log('\nConexão com MongoDB fechada');
        process.exit(0);
    } catch (error) {
        console.error('Erro:', error);
        process.exit(1);
    }
};

seedFuncionarios(); 