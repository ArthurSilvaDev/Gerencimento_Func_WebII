import { useNavigate } from 'react-router-dom';
import ListaFuncionariosSetor from './Listagem/ListaFuncionariosSetor';

const ListagemFuncionariosSetor = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='flex flex-col justify-center items-center p-4 border-2 border-purple-800 rounded-lg w-3/4 mx-auto my-4'>
                <div className="w-full flex justify-between items-center mb-4 px-4">
                    <button
                        onClick={() => navigate('/sistema/setores')}
                        className="px-4 py-2 text-purple-600 border border-purple-600 rounded hover:bg-purple-50 transition-colors"
                    >
                        ← Voltar para Setores
                    </button>
                </div>
                <ListaFuncionariosSetor />
            </div>
        </div>
    );
};

export default ListagemFuncionariosSetor; 