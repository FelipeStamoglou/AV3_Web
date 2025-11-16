// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useNavigate } from 'react-router-dom';

// // ==============================
// //  Tipagem compatível com PostgreSQL
// // ==============================
// interface User {
//   id?: string;
//   _id?: string;
//   name?: string;  // MongoDB
//   nome?: string;  // PostgreSQL
//   email?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   login: (token: string, user: User) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // ==============================
// // Componente Provider
// // ==============================
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // ==============================
//   // Recupera token e usuário salvos
//   // ==============================
//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');

//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // ==============================
//   //  Realiza login
//   // ==============================
// const login = (token: string, user: User) => {
//   //  Verifica se o nome não veio do backend
//   if (!user?.name && !user?.nome) {
//     const storedName = localStorage.getItem("userName");
//     if (storedName) {
//       user = { ...user, name: storedName };
//     }
//   }

//   //  Atualiza estados e localStorage
//   setToken(token);
//   setUser(user);

//   localStorage.setItem("token", token);
//   localStorage.setItem("user", JSON.stringify(user));
// };


//   // ==============================
//   //  Faz logout
//   // ==============================
//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setToken(null);
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         login,
//         logout,
//         isAuthenticated: !!token,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ==============================
// // Hook de acesso
// // ==============================
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };