// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { toast } from 'sonner';
// import { authAPI } from '@/api/api';
// import LoadingSpinner from '@/components/LoadingSpinner';
// import { UserPlus } from 'lucide-react';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       toast.error('Todos os campos são obrigatórios');
//       return;
//     }

//     if (password.length < 6) {
//       toast.error('A senha deve ter pelo menos 6 caracteres');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Realiza o cadastro usando a API atual (MongoDB ou PostgreSQL)
//       const data = await authAPI.register(name, email, password);

//       // Salva o nome localmente para o login e dashboard
//       localStorage.setItem('userName', name);

//       // Alguns backends retornam mensagem diferente, tratamos de forma genérica
//       const successMsg =
//         data?.message ||
//         'Cadastro realizado com sucesso! Faça login para continuar.';

//       toast.success(successMsg);
//       navigate('/login');
//     } catch (error: any) {
//       console.error('Erro ao realizar cadastro. Tente novamente.', error);

//       // Tratamento inteligente de erros, compatível com ambos os backends
//       const message =
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         'Erro ao realizar cadastro. Tente novamente.';

//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4 animate-fade-in">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader className="space-y-2 text-center">
//           <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
//             <UserPlus className="h-6 w-6 text-primary" />
//           </div>
//           <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
//           <CardDescription>
//             Preencha os dados abaixo para criar sua conta
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Nome</Label>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="Seu nome completo"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 disabled={loading}
//                 className="transition-all"
//                 autoComplete="off"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email">E-mail</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Seu melhor e-mail"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={loading}
//                 className="transition-all"
//                 autoComplete="new-email"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Senha</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Senha com no mínimo 6 caracteres"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={loading}
//                 className="transition-all"
//                 autoComplete="new-password"
//               />
//             </div>

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? <LoadingSpinner size="sm" /> : 'Cadastrar'}
//             </Button>

//             <p className="text-center text-sm text-muted-foreground">
//               Já tem uma conta?{' '}
//               <Link
//                 to="/login"
//                 className="text-primary hover:underline font-medium"
//               >
//                 Fazer login
//               </Link>
//             </p>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Register;