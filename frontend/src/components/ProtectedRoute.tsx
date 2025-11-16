// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { token, user } = useAuth();

//   // Caso o contexto ainda esteja inicializando
//   if (token === undefined || user === undefined) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Se não houver token, redireciona para login
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // Se estiver autenticado, renderiza o conteúdo
//   return <>{children}</>;
// };

// export default ProtectedRoute;