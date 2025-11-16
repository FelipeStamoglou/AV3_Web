// // ==========================================================
// // Página de Login — versão com login FAKE (admin / 123)
// // Mantém o visual do projeto anterior, mas remove totalmente o backend real.
// // ==========================================================

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// // Componentes do shadcn/ui
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// // toast para mensagem de erro/sucesso
// import { toast } from "sonner";

// // contexto de autenticação (versão fake)
// import { useAuth } from "@/context/AuthContext";

// // spinner
// import LoadingSpinner from "@/components/LoadingSpinner";

// // ícone (opcional)
// import { LogIn } from "lucide-react";

// const Login = () => {
//   // estados do formulário
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // estado de carregamento do botão
//   const [loading, setLoading] = useState(false);

//   // hook de navegação
//   const navigate = useNavigate();

//   // pega a função 'login' do contexto de autenticação
//   const { login } = useAuth();

//   // ==========================================================
//   // Função executada ao enviar o formulário
//   // ==========================================================
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // validações simples
//     if (!email || !password) {
//       toast.error("Preencha todos os campos.");
//       return;
//     }

//     setLoading(true);

//     // ==========================================================
//     // LOGIN FAKE — verifica credenciais "admin" / "123"
//     // ==========================================================
//     const success = login(email, password); // usa o login fake do AuthContext

//     if (!success) {
//       toast.error("Credenciais inválidas. Tente novamente.");
//       setLoading(false);
//       return;
//     }

//     // login bem sucedido
//     toast.success("Login realizado com sucesso!");
//     navigate("/dashboard"); // redireciona para página interna

//     setLoading(false);
//   };

//   // ==========================================================
//   // RETORNO DO JSX
//   // Interface mantida idêntica à versão original
//   // ==========================================================
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4 animate-fade-in">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader className="space-y-2 text-center">
//           <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
//             <LogIn className="h-6 w-6 text-primary" />
//           </div>

//           <CardTitle className="text-2xl font-bold">Bem-vindo</CardTitle>

//           <CardDescription>
//             Entre com suas credenciais temporárias
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Campo de e-mail */}
//             <div className="space-y-2">
//               <Label htmlFor="email">Usuário</Label>
//               <Input
//                 id="email"
//                 type="text"
//                 placeholder="admin"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={loading}
//                 autoComplete="off"
//               />
//             </div>

//             {/* Campo de senha */}
//             <div className="space-y-2">
//               <Label htmlFor="password">Senha</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="123"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={loading}
//                 autoComplete="off"
//               />
//             </div>

//             {/* Botão de login */}
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? <LoadingSpinner size="sm" /> : "Entrar"}
//             </Button>

//             {/* Observação */}
//             <p className="text-center text-sm text-muted-foreground pt-2">
//               Acesso temporário: admin / 123
//             </p>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;
