// // ==============================
// // Contexto de Autenticação (versão simplificada, pois esse não era o objetivo do projeto)
// // sem login real no backend
// // Aqui usamos um login "fake" com usuário/senha fixos só para demonstrar como poderíamos implementar uma autenticação.
// // ==============================

// import {
//   createContext,   // cria o contexto de autenticação
//   useContext,      // hook para consumir o contexto
//   useState,        // estado para guardar usuário / token
//   useEffect,       // efeito para carregar dados do localStorage
//   ReactNode,       // tipo usado na tipagem das props do provider
// } from "react";
// import { useNavigate } from "react-router-dom"; // usado para redirecionar após logout

// // ==============================
// // Tipagem do usuário
// // Mantive campos genéricos pra ser compatível
// // tanto com MongoDB quanto com PostgreSQL.
// // ==============================
// interface User {
//   id?: string;
//   _id?: string;
//   name?: string;  // MongoDB / genérico
//   nome?: string;  // PostgreSQL / genérico
//   email?: string;
// }

// // ==============================
// // Tipagem do contexto de autenticação
// // ==============================
// interface AuthContextType {
//   user: User | null;                             // usuário logado (ou null)
//   token: string | null;                          // token fake (somente para manter padrão)
//   isAuthenticated: boolean;                      // indica se está logado
//   login: (username: string, password: string) => boolean; // função de login fake
//   logout: () => void;                            // função de logout
// }

// // Tipo do Provider (children = qualquer JSX interno)
// interface AuthProviderProps {
//   children: ReactNode;
// }

// // ==============================
// // Criação do contexto
// // ==============================
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // ==============================
// // Constantes do login fake
// // Aqui definimos usuário/senha fixos 
// // ==============================
// const FAKE_USERNAME = "admin";
// const FAKE_PASSWORD = "123";

// // Usuário "fake" que será salvo no contexto/localStorage
// const FAKE_USER: User = {
//   id: "1",
//   name: "Usuário Temporário",
//   email: "admin@notas.com",
// };

// // Token fake apenas para manter compatibilidade com a estrutura antiga
// const FAKE_TOKEN = "fake-token-minhas-notas";

// // ==============================
// // Componente Provider de Autenticação
// // Envolve toda a aplicação para fornecer o contexto
// // ==============================
// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   // Estado que guarda o usuário logado
//   const [user, setUser] = useState<User | null>(null);

//   // Estado que guarda o token fake
//   const [token, setToken] = useState<string | null>(null);

//   // Hook de navegação para redirecionar em logout, se necessário
//   const navigate = useNavigate();

//   // ==============================
//   // Carrega dados salvos no localStorage ao iniciar a aplicação
//   // Isso permite que o usuário continue "logado" ao recarregar a página.
//   // ==============================
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token"); // token salvo (fake)
//     const storedUser = localStorage.getItem("user");   // usuário salvo

//     if (storedToken && storedUser) {
//       // Se existirem dados salvos, atualiza o estado
//       setToken(storedToken);
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // ==============================
//   // Função de login FAKE
//   // - Recebe username e password da tela de login
//   // - Compara com FAKE_USERNAME e FAKE_PASSWORD
//   // - Se bater, considera usuário autenticado
//   // - Salva token e user no estado + localStorage
//   // - Retorna true se deu certo, false se deu errado
//   // ==============================
//   const login = (username: string, password: string): boolean => {
//     // Verifica se credenciais batem com as credenciais temporárias
//     const isValid =
//       username === FAKE_USERNAME && password === FAKE_PASSWORD;

//     if (!isValid) {
//       // Credenciais inválidas → não faz nada
//       return false;
//     }

//     // Se for válido, usa o usuário fake definido lá em cima
//     const loggedUser: User = { ...FAKE_USER };

//     // Atualiza estados
//     setUser(loggedUser);
//     setToken(FAKE_TOKEN);

//     // Salva também no localStorage
//     localStorage.setItem("user", JSON.stringify(loggedUser));
//     localStorage.setItem("token", FAKE_TOKEN);

//     // Se quiser, aqui você podemos fazer um navigate("/alguma-rota");
//     // mas é mais comum deixar o redirecionamento na página de Login.

//     return true; // indica para a tela de login que deu certo
//   };

//   // ==============================
//   // Função de logout
//   // - Remove dados do localStorage
//   // - Limpa estados
//   // - Redireciona para /login
//   // ==============================
//   const logout = () => {
//     // Remove dados persistidos
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     // Limpa estados
//     setToken(null);
//     setUser(null);

//     // Redireciona para a tela de login
//     navigate("/login");
//   };

//   // ==============================
//   // Retorno do Provider
//   // ==============================
//   return (
//     <AuthContext.Provider
//       value={{
//         user,                       // dados do usuário atual
//         token,                      // token fake
//         isAuthenticated: !!token,   // considera autenticado se houver token
//         login,                      // função de login fake
//         logout,                     // função de logout
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ==============================
// // Hook de acesso ao contexto
// // - Facilita o uso em qualquer componente
// // - Garante que só seja usado dentro do AuthProvider
// // ==============================
// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (context === undefined) {
//     throw new Error("useAuth deve ser usado dentro de um AuthProvider");
//   }

//   return context;
// };
