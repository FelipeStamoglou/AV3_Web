import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StickyNote, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="text-center py-16 space-y-8">
          
          {/* Ícone principal */}
          <div className="mx-auto bg-gradient-primary w-20 h-20 rounded-2xl flex items-center justify-center shadow-glow">
            <StickyNote className="h-10 w-10 text-primary-foreground" />
          </div>

          {/* Título e descrição */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Bem-vindo ao NotesApp
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Organize e gerencie suas anotações com rapidez e simplicidade.
            </p>
          </div>

          {/* Botão principal — segue direto ao Dashboard */}
          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="gap-2 min-w-[200px]"
            >
              Acessar Notas
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              NotesApp • React • FastAPI • REST API
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
