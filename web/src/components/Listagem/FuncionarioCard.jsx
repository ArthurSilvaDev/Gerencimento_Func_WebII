const FuncionarioCard = ({ funcionario, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow w-full">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {funcionario.nome} {funcionario.sobrenome}
                        </h2>
                        <p className="text-gray-600">{funcionario.cargo}</p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Salário:</span>{' '}
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(funcionario.salario)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {funcionario.setor}
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onEdit(funcionario)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => onDelete(funcionario)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FuncionarioCard;