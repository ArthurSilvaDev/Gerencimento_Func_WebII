import { useState, useEffect } from 'react';
import ModalExclusao from '../Modais/ModalExclusao';
import ModalEdicao from '../Modais/ModalEdicao';

const PesquisaFuncionarios = () => {
    const [termoPesquisa, setTermoPesquisa] = useState('');
    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionariosFiltrados, setFuncionariosFiltrados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalExclusao, setModalExclusao] = useState(null);
    const [modalEdicao, setModalEdicao] = useState(null);

    // Busca inicial de todos os funcionários
    useEffect(() => {
        buscarFuncionarios();
    }, []);

    // Filtragem em tempo real
    useEffect(() => {
        filtrarFuncionarios();
    }, [termoPesquisa, funcionarios]);

    const buscarFuncionarios = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/funcionarios');
            if (!response.ok) throw new Error('Erro ao buscar funcionários');
            const data = await response.json();
            const funcionariosOrdenados = data.sort((a, b) => 
                a.nome.localeCompare(b.nome, 'pt-BR')
            );
            setFuncionarios(funcionariosOrdenados);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const filtrarFuncionarios = () => {
        const termoLowerCase = termoPesquisa.toLowerCase();
        const filtrados = funcionarios.filter(funcionario => 
            funcionario.nome.toLowerCase().includes(termoLowerCase) ||
            funcionario.sobrenome.toLowerCase().includes(termoLowerCase) ||
            funcionario.cargo.toLowerCase().includes(termoLowerCase) ||
            funcionario.setor.toLowerCase().includes(termoLowerCase)
        );
        setFuncionariosFiltrados(filtrados);
    };

    const handleExcluir = async (funcionario) => {
        try {
            const response = await fetch(`http://localhost:5000/api/funcionarios/${funcionario._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Erro ao excluir funcionário');
            await buscarFuncionarios();
            setModalExclusao(null);
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao excluir funcionário');
        }
    };

    const handleAtualizar = async (id, dadosAtualizados) => {
        try {
            const response = await fetch(`http://localhost:5000/api/funcionarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosAtualizados),
            });

            if (!response.ok) throw new Error('Erro ao atualizar funcionário');
            await buscarFuncionarios();
            setModalEdicao(null);
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao atualizar funcionário');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Pesquisar Funcionários
                </h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={termoPesquisa}
                        onChange={(e) => setTermoPesquisa(e.target.value)}
                        placeholder="Digite para pesquisar..."
                        className="flex-1 p-2 border rounded-md"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center p-4">Carregando...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-gray-600 font-semibold">Nome</th>
                                <th className="px-6 py-3 text-left text-gray-600 font-semibold">Cargo</th>
                                <th className="px-6 py-3 text-left text-gray-600 font-semibold">Setor</th>
                                <th className="px-6 py-3 text-left text-gray-600 font-semibold">Salário</th>
                                <th className="px-6 py-3 text-center text-gray-600 font-semibold">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {funcionariosFiltrados.map((funcionario) => (
                                <tr key={funcionario._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {funcionario.nome} {funcionario.sobrenome}
                                    </td>
                                    <td className="px-6 py-4">{funcionario.cargo}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                                            {funcionario.setor}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(funcionario.salario)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() => setModalEdicao(funcionario)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => setModalExclusao(funcionario)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {modalExclusao && (
                <ModalExclusao
                    funcionario={modalExclusao}
                    onClose={() => setModalExclusao(null)}
                    onConfirm={() => handleExcluir(modalExclusao)}
                />
            )}

            {modalEdicao && (
                <ModalEdicao
                    funcionario={modalEdicao}
                    onClose={() => setModalEdicao(null)}
                    onConfirm={(dadosAtualizados) => handleAtualizar(modalEdicao._id, dadosAtualizados)}
                />
            )}
        </div>
    );
};

export default PesquisaFuncionarios; 