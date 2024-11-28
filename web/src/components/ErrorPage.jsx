import Navbar from './Navbar';
import Footer from './Footer';

const ErrorPage = () => {
    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-5xl md:text-8xl lg:text-9xl font-bold text-purple-600 pb-10'>404 ERROR</h1>
                <div className='flex flex-col items-center justify-center border-2 border-purple-700 rounded-md p-4 shadow-lg gap-4'>
                    <h1 className='text-4xl font-bold'>Página no encontrada</h1>
                    <p className='text-lg'>A página a qual você tentou acessar não existe.</p>
                    <a href='/sistema/home'><button className='bg-purple-700 text-white px-4 py-2 rounded-md'>Voltar para a página inicial</button></a>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default ErrorPage