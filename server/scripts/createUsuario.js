require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('../models/usuario');

const usuarios = [
    {
        usuario: "admin",
        senha: "admin123",
        nome: "Administrador",
        cargo: "Administrador"
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Conectado ao MongoDB");
        
        try {
            // Verifica e insere apenas usuários que não existem
            for (const user of usuarios) {
                const usuarioExistente = await Usuario.findOne({ usuario: user.usuario });
                
                if (!usuarioExistente) {
                    const novoUsuario = await Usuario.create(user);
                    console.log(`Usuário criado: ${novoUsuario.nome} (${novoUsuario.usuario})`);
                } else {
                    console.log(`Usuário já existe: ${user.usuario}`);
                }
            }
            console.log("Processo finalizado!");
        } catch (error) {
            console.error("Erro ao criar usuários:", error);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch((error) => {
        console.error("Erro ao conectar ao MongoDB:", error);
    }); 