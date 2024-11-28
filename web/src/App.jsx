import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Paginas
import LoginIndex from './components/loginIndex'
import RootLayout from './components/RootLayout'
import ErrorPage from './components/ErrorPage'
import Home from './components/Home'
import CadastrarFuncionario from './components/CadastrarFuncionario'
import ListagemFuncionarios from './components/ListagemFuncionarios'
import ListagemSetores from './components/ListagemSetores'
import ListagemFuncionariosSetor from './components/ListagemFuncionariosSetor'
import PesquisaFuncionarios from './components/Pesquisa/PesquisaFuncionarios'

function App() {

  const routes = createBrowserRouter([

    {
      path: "/",
      errorElement: <ErrorPage />,
      children: [
        {index:true, element:<LoginIndex />},
        {path:"/sistema", 
        element:<RootLayout />,
        children:[
          {path:"home", element:<Home />},
          {path:"cadastrar-funcionario", element:<CadastrarFuncionario />},
          {path:"funcionarios", element:<ListagemFuncionarios />},
          {path:"setores", element:<ListagemSetores />},
          {path:"setor/:setor", element:<ListagemFuncionariosSetor />},
          {path:"pesquisa", element:<PesquisaFuncionarios />}
        ]}
      ],
    },
  ]);



  return (
    <> 
      <RouterProvider router={routes} />
      
    </>
  )
}

export default App
