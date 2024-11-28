import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModalExclusao from '../Modais/ModalExclusao';
import ModalEdicao from '../Modais/ModalEdicao';

const ListaFuncionariosSetor = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [modalExclusao, setModalExclusao] = useState(null);
    const [modalEdicao, setModalEdicao] = useState(null);
    const { setor } = useParams();

    useEffect(() => {
        const buscarFuncionarios = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/funcionarios/setor?setor=${setor}`);
                if (!response.ok) throw new Error('Erro ao buscar funcionários');
                const data = await response.json();
                const funcionariosOrdenados = data.sort((a, b) => 
                    a.nome.localeCompare(b.nome, 'pt-BR')
                );
                setFuncionarios(funcionariosOrdenados);
                setLoading(false);
            } catch (error) {
                console.error('Erro:', error);
                setErro('Erro ao carregar funcionários');
                setLoading(false);
            }
        };

        buscarFuncionarios();
    }, [setor]);

    const handleExcluir = async (funcionario) => {
        try {
            const response = await fetch(`http://localhost:5000/api/funcionarios/${funcionario._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Erro ao excluir funcionário');
            
            setFuncionarios(funcionarios.filter(f => f._id !== funcionario._id));
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
            
            const funcionariosAtualizados = funcionarios.map(f => 
                f._id === id ? { ...f, ...dadosAtualizados } : f
            );
            setFuncionarios(funcionariosAtualizados);
            setModalEdicao(null);
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao atualizar funcionário');
        }
    };

    if (loading) {
        return <div className="text-center p-4">Carregando...</div>;
    }

    if (erro) {
        return <div className="text-center text-red-600 p-4">{erro}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Funcionários do Setor: {setor}
                </h1>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    Total: {funcionarios.length}
                </span>
            </div>

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
                        {funcionarios.map((funcionario) => (
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

export default ListaFuncionariosSetor; 