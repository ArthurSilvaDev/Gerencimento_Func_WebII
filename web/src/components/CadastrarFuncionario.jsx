import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CadastrarFuncionario = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        cargo: '',
        salario: '',
        setor: ''
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/api/funcionarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar funcionário');
            }

            const data = await response.json();
            console.log('Funcionário cadastrado:', data);
            
            navigate('/sistema/home');
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar funcionário');
        }
    };

    return (
        <div>
            <div className='flex justify-center items-center p-4'>
                <div className='bg-white p-4 rounded-lg shadow-lg w-2/3 '>
                    <h1 className='text-2xl font-bold p-4'>Cadastramento de Funcionário</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col p-4 w-full gap-4'>
                        <div>Nome:</div>
                        <input 
                            required 
                            placeholder="Digite primeiro nome do funcionário" 
                            type="text" 
                            name="nome" 
                            value={formData.nome}
                            onChange={handleChange}
                            className='w-full p-2 rounded-md border-2 border-gray-300'
                        />
                        <div>Sobrenome:</div>
                        <input 
                            required 
                            placeholder="Digite sobrenome do funcionário" 
                            type="text" 
                            name="sobrenome" 
                            value={formData.sobrenome}
                            onChange={handleChange}
                            className='w-full p-2 rounded-md border-2 border-gray-300'
                        />
                        <div>Cargo:</div>
                        <input 
                            required 
                            placeholder="Digite cargo do funcionário" 
                            type="text" 
                            name="cargo" 
                            value={formData.cargo}
                            onChange={handleChange}
                            className='w-full p-2 rounded-md border-2 border-gray-300'
                        />
                        <div>Salário:</div>
                        <input 
                            required 
                            placeholder="Digite salário do funcionário sem o 'R$'. Ex: 2000" 
                            type="number" 
                            name="salario" 
                            value={formData.salario}
                            onChange={handleChange}
                            className='w-full p-2 rounded-md border-2 border-gray-300'
                        />
                        <div>Setor:</div>
                        <select
                            required
                            name="setor"
                            value={formData.setor}
                            onChange={handleChange}
                            className='w-full p-2 rounded-md border-2 border-gray-300'
                        >
                            <option value="">Selecione um setor</option>
                            {setores.map(setor => (
                                <option key={setor._id} value={setor.nome}>
                                    {setor.nome}
                                </option>
                            ))}
                        </select>
                        <div className='flex justify-center items-center p-4 w-full gap-4'>
                            <button 
                                type="submit" 
                                className='items-center bg-purple-800 text-white p-2 rounded-md hover:bg-purple-900 transition-colors w-full md:w-1/2'
                            >
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CadastrarFuncionario;