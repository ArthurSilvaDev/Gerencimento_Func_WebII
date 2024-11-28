const Setor = require('../models/setor');

const listarSetores = async (req, res) => {
    try {
        const setores = await Setor.find().sort({ nome: 1 });
        res.status(200).json(setores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { listarSetores}; 