import React from 'react';

const ModalExclusao = ({ funcionario, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
                <div className="mb-4">
                    <p className="text-gray-700 mb-2">Você está prestes a excluir:</p>
                    <div className="bg-gray-50 p-4 rounded">
                        <p><span className="font-semibold">Nome:</span> {funcionario.nome} {funcionario.sobrenome}</p>
                        <p><span className="font-semibold">Cargo:</span> {funcionario.cargo}</p>
                        <p><span className="font-semibold">Setor:</span> {funcionario.setor}</p>
                        <p><span className="font-semibold">Salário:</span> {
                            new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(funcionario.salario)
                        }</p>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Confirmar Exclusão
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalExclusao; 