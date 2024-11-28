import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove os dados do usuário do localStorage
        localStorage.removeItem('user');
        // Redireciona para a página de login
        navigate('/');
    };

    return (
        <nav className="h-16 bg-white shadow-lg">
            <div className="h-full max-w-6xl mx-auto px-4">
                <div className="h-full flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                        <Link to="/sistema/home" className="text-sm md:text-2xl font-semibold text-gray-700">
                            Sistema de gerenciamento de funcionários
                        </Link>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <Link to="/sistema/home" className="text-gray-500 hover:text-purple-500">
                            Home
                        </Link>
                        <Link to="/sistema/funcionarios" className="text-gray-500 hover:text-purple-500">
                            Funcionários
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm text-white bg-purple-800 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;  