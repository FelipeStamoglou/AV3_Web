// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { toast } from 'sonner';
// import { authAPI } from '@/api/api';
// import { useAuth } from '@/context/AuthContext';
// import LoadingSpinner from '@/components/LoadingSpinner';
// import { LogIn } from 'lucide-react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error('Preencha todos os campos');
//       return;
//     }

//     setLoading(true);

//     try {
//       const data = await authAPI.login(email, password);

//       const token = data?.token || data?.accessToken;
//       // O backend MongoDB não retorna "user", então cria um temporário
//       let user = data?.user || data?.usuario;

//       if (!user) {
//             const storedName = localStorage.getItem('userName') || 'Usuário';
//             user = { name: storedName, email };
// }

// if (!token) {
//   throw new Error('Token não recebido do servidor.');
// }

// login(token, user);


//      const userName = user?.name || user?.nome || user?.email || 'Usuário';
//       toast.success(`Bem-vindo(a), ${userName}!`);

//       navigate('/dashboard');
//     } catch (error: any) {
//       console.error('Erro ao fazer login:', error);

//       // Tratamento genérico compatível com MongoDB e PostgreSQL
//       const message =
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         error?.message ||
//         'Erro ao fazer login. Verifique suas credenciais.';

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
//             <LogIn className="h-6 w-6 text-primary" />
//           </div>
//           <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
//           <CardDescription>
//             Entre com suas credenciais para continuar
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
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
//                 placeholder="Sua senha"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={loading}
//                 className="transition-all"
//                 autoComplete="new-password"
//               />
//             </div>

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? <LoadingSpinner size="sm" /> : 'Entrar'}
//             </Button>

//             <p className="text-center text-sm text-muted-foreground">
//               Não tem uma conta?{' '}
//               <Link to="/register" className="text-primary hover:underline font-medium">
//                 Cadastre-se
//               </Link>
//             </p>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;