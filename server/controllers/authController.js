const Usuario = require('../models/usuario');

const login = async (req, res) => {
    console.log('Requisição de login recebida:', req.body);

    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
    }

    try {
        const user = await Usuario.findOne({ usuario });
        
        if (!user) {
            return res.status(401).json({ message: 'Usuário ou senha incorretos' });
        }

        if (senha !== user.senha) {
            return res.status(401).json({ message: 'Usuário ou senha incorretos' });
        }

        res.status(200).json({
            message: 'Login realizado com sucesso',
            user: {
                id: user._id,
                nome: user.nome,
                cargo: user.cargo
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

module.exports = { login };