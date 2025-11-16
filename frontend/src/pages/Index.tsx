import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StickyNote, LogIn, UserPlus } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  //const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/dashboard');
//     }
//   }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="text-center py-16 space-y-8">
          <div className="mx-auto bg-gradient-primary w-20 h-20 rounded-2xl flex items-center justify-center shadow-glow">
            <StickyNote className="h-10 w-10 text-primary-foreground" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Bem-vindo ao NotesApp
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Organize suas ideias, tarefas e pensamentos em um só lugar. 
              Simples, rápido e seguro.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="gap-2 min-w-[160px]"
            >
              <LogIn className="h-5 w-5" />
              Fazer Login
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/register')}
              className="gap-2 min-w-[160px]"
            >
              <UserPlus className="h-5 w-5" />
              Criar Conta
            </Button>
          </div>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              NotesApp • React  •  JWT  •  REST API
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;