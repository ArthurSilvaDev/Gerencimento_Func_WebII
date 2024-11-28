import React, { useState, useEffect } from 'react';

const ModalEdicao = ({ funcionario, onClose, onConfirm }) => {
    const [formData, setFormData] = useState({
        nome: funcionario.nome,
        sobrenome: funcionario.sobrenome,
        cargo: funcionario.cargo,
        salario: funcionario.salario,
        setor: funcionario.setor
    });
    const [setores, setSetores] = useState([]);

    useEffect(() => {
        const buscarSetores = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/setores');
                if (response.ok) {
                    const data = await response.json();
                    setSetores(data);
                }
            } catch (error) {
                console.error('Erro ao buscar setores:', error);
            }
        };
        buscarSetores();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Editar Funcionário</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
                        <input
                            type="text"
                            name="sobrenome"
                            value={formData.sobrenome}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cargo</label>
                        <input
                            type="text"
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Salário</label>
                        <input
                            type="number"
                            name="salario"
                            value={formData.salario}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Setor</label>
                        <select
                            name="setor"
                            value={formData.setor}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 border rounded-md"
                            required
                        >
                            <option value="">Selecione um setor</option>
                            {setores.map(setor => (
                                <option key={setor._id} value={setor.nome}>
                                    {setor.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEdicao; 