import ListaFuncionarios from './Listagem/ListaFuncionarios';

const ListagemFuncionarios = () => {
    return (
        <div>
            <div className='flex flex-col justify-center items-center p-4 border-2 border-purple-800 rounded-lg w-3/4 mx-auto my-4'>
                <h1 className='text-2xl font-bold p-4'>Listagem de todos os Funcionarios</h1>
                <ListaFuncionarios />
            </div>
        </div>
    );
};

export default ListagemFuncionarios;