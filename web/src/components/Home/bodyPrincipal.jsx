import { Link } from 'react-router-dom';

const BodyPrincipal = () =>{

    return(
        <>
            <div className='flex justify-center items-center p-4'>
                <div className='bg-white p-4 rounded-lg shadow-lg w-2/3 text-center'>
                    <h1 className='text-2xl font-bold p-4'>Bem-vindo ao sistema de gerenciamento de funcionários</h1>
                    <img src="../logo.png" alt="Logo" className='w-1/2 mx-auto' />
                    <div className=' flex flex-col justify-center items-center p-4 w-full '>
                        <div className='flex flex-col justify-center items-center p-4 w-full gap-4'  >
                            <button className='bg-purple-800 text-white p-2 rounded-md hover:bg-purple-900 transition-colors w-full md:w-1/2'>
                            <Link to="/sistema/cadastrar-funcionario">Cadastrar funcionário</Link>
                            </button>
                            <button className='bg-purple-800 text-white p-2 rounded-md hover:bg-purple-900 transition-colors w-full md:w-1/2'>
                            <Link to="/sistema/funcionarios">Listagem de todos os Funcionarios</Link>
                            </button>
                            <button className='bg-purple-800 text-white p-2 rounded-md hover:bg-purple-900 transition-colors w-full md:w-1/2'>
                            <Link to="/sistema/setores">Listar setores</Link>
                            </button>
                            <button className='bg-purple-800 text-white p-2 rounded-md hover:bg-purple-900 transition-colors w-full md:w-1/2'>
                            <Link to="/sistema/pesquisa">Pesquisar Funcionário</Link>
                            </button>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </>
    )
}

export default BodyPrincipal;
