const Funcionario = require('../models/funcionario');

const criarFuncionario = async (req, res) => {
  const { nome, sobrenome, cargo, salario, setor } = req.body;

  const funcionario = new Funcionario({
    nome,
    sobrenome,
    cargo,
    salario,
    setor
  });

  try {
    await funcionario.save();
    res.status(201).json(funcionario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LISTAGEM DE FUNC
const listarFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.find();
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FILTRA FUNC POR SETOR
const listarPorSetor = async (req, res) => {
  const { setor } = req.query;
  try {
    const funcionarios = await Funcionario.find({ setor });
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ATUALIZAR FUNC
const atualizarFuncionario = async (req, res) => {
  const { id } = req.params;
  const { nome, sobrenome, cargo, salario, setor } = req.body;

  try {
    const funcionario = await Funcionario.findByIdAndUpdate(id, {
      nome,
      sobrenome,
      cargo,
      salario,
      setor
    }, { new: true });

    if (!funcionario) {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }

    res.status(200).json(funcionario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//EXCLUIR
const excluirFuncionario = async (req, res) => {
  const { id } = req.params;

  try {
    const funcionario = await Funcionario.findByIdAndDelete(id);

    if (!funcionario) {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }

    res.status(200).json({ message: 'Funcionário excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  criarFuncionario,
  listarFuncionarios,
  listarPorSetor,
  atualizarFuncionario,
  excluirFuncionario
};
