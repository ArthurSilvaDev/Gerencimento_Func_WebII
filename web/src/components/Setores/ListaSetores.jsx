import { useState, useEffect } from 'react';
import SetorCard from './SetorCard';

const ListaSetores = () => {
    const [setores, setSetores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const responseSetores = await fetch('http://localhost:5000/api/setores');
                if (!responseSetores.ok) throw new Error('Erro ao buscar setores');
                const dataSetores = await responseSetores.json();

                const responseFuncionarios = await fetch('http://localhost:5000/api/funcionarios');
                if (!responseFuncionarios.ok) throw new Error('Erro ao buscar funcionários');
                const dataFuncionarios = await responseFuncionarios.json();

                const setoresComQuantidade = dataSetores.map(setor => ({
                    nome: setor.nome,
                    quantidadeFuncionarios: dataFuncionarios.filter(f => f.setor === setor.nome).length
                }));

                setoresComQuantidade.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
                setSetores(setoresComQuantidade);
                setLoading(false);
            } catch (error) {
                console.error('Erro:', error);
                setErro('Erro ao carregar dados dos setores');
                setLoading(false);
            }
        };

        buscarDados();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <p className="text-lg text-gray-600">Carregando setores...</p>
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
        <div className="flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Setores da Empresa
                    </h1>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        Total: {setores.length} setores
                    </span>
                </div>
                
                <div className="flex flex-col space-y-2">
                    {setores.map((setor) => (
                        <SetorCard
                            key={setor.nome}
                            setor={setor.nome}
                            quantidadeFuncionarios={setor.quantidadeFuncionarios}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListaSetores; 