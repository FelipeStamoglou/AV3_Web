/**
 * Objetivo:
 *    Atuar como componente raiz, carregando a página inicial do sistema.
 */

//import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


// Simulação de token no localStorage temporário
localStorage.setItem("token", "123");


function App() {
    const token = localStorage.getItem("token");

    if (!token) {
        // Aqui futuramente colocamos o Login
        return <Dashboard />;
        //return <Login />;
    }

    return (
        <Dashboard  />  
    );
}

export default App;

