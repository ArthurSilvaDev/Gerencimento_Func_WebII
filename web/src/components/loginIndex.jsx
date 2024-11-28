import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginIndex = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, senha }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/sistema/home');
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                setErro('Erro de conexão com o servidor. Tente novamente mais tarde.');
            } else {
                setErro('Usuário ou senha incorretos');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative bg-white shadow-md sm:rounded-lg">
                    <img src="logo.png" alt="Logo" className="w-50 mx-auto" />
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-center text-purple-800">
                            Sistema de Funcionários
                        </h1>
                        <p className="text-center text-gray-500 mb-6">
                            Faça login para continuar
                        </p>

                        {erro && (
                            <p className="text-red-500 text-center mb-4">{erro}</p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <p className="font-bold">Usuário</p>
                                <input 
                                    type="text" 
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md" 
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-bold">Senha</p>
                                <input 
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md" 
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full p-2 bg-purple-800 text-white rounded-md hover:bg-purple-900 transition-colors"
                            >
                                Entrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginIndex;