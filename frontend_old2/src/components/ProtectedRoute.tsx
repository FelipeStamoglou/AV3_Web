// // =====================================================
// // ProtectedRoute - Controle de acesso às rotas internas
// // (autenticação fake)
// // =====================================================
// //
// // Esta versão é simplificada, compatível com o login fake,
// // e mantém apenas a verificação de "isAuthenticated".
// // Caso o usuário não esteja logado, redirecionamos para /login.
// //
// // =====================================================

// import { Navigate } from "react-router-dom"; // usado para redirecionamento
// import { useAuth } from "../context/AuthContext"; // acesso ao contexto de autenticação

// // Tipagem das props: qualquer conteúdo interno será protegido
// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   // Pegamos apenas o estado de autenticação do contexto
//   const { isAuthenticated } = useAuth();

//   // ==============================================
//   // Se o usuário NÃO estiver autenticado, redirecionamos
//   // para a página de login.
//   //
//   // Aqui não carregamos spinner porque o login fake é instantâneo.
//   // ==============================================
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // ==============================================
//   // Se estiver autenticado, renderizamos a página normalmente
//   // ==============================================
//   return <>{children}</>;
// };

// export default ProtectedRoute;
