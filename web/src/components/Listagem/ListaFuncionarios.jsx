import { useState, useEffect } from 'react';
import ModalExclusao from '../Modais/ModalExclusao';
import ModalEdicao from '../Modais/ModalEdicao';
import FuncionarioCard from './FuncionarioCard';

const ListaFuncionarios = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [modalExclusao, setModalExclusao] = useState(null);
    const [modalEdicao, setModalEdicao] = useState(null);

    // Buscar funcionários
    useEffect(() => {
        buscarFuncionarios();
    }, []);

    const buscarFuncionarios = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/funcionarios');
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

    // Função para excluir funcionário
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

    // Função para atualizar funcionário
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

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <p className="text-lg text-gray-600">Carregando funcionários...</p>
            </div>
        );
    }

    if (erro) {
        return (
            <div className="flex justify-center items-center p-8">
                <p className="text-lg text-red-600">{erro}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Lista de Funcionários
                </h1>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    Total: {funcionarios.length}
                </span>
            </div>
            
            <div className="flex flex-col space-y-4">
                {funcionarios.map((funcionario) => (
                    <FuncionarioCard
                        key={funcionario._id}
                        funcionario={funcionario}
                        onEdit={() => setModalEdicao(funcionario)}
                        onDelete={() => setModalExclusao(funcionario)}
                    />
                ))}
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

export default ListaFuncionarios; 