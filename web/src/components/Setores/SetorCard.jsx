import { useNavigate } from 'react-router-dom';

const SetorCard = ({ setor, quantidadeFuncionarios }) => {
    const navigate = useNavigate();

    const handleVerSetor = () => {
        navigate(`/sistema/setor/${encodeURIComponent(setor)}`);
    };

    return (
        <div className="w-full bg-white p-4 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleVerSetor}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
                    >
                        Ver Setor
                    </button>
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        <h2 className="text-lg font-medium text-gray-800">
                            {setor}
                        </h2>
                    </div>
                </div>
                <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {quantidadeFuncionarios} {quantidadeFuncionarios === 1 ? 'funcionário' : 'funcionários'}
                </span>
            </div>
        </div>
    );
};

export default SetorCard; 