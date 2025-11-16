import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle p-4 animate-fade-in">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="text-center py-12 space-y-4">
          <div className="mx-auto bg-muted w-20 h-20 rounded-full flex items-center justify-center">
            <FileQuestion className="h-10 w-10 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Página não encontrada</h2>
            <p className="text-muted-foreground mb-6">
              A página que você está procurando não existe ou foi movida.
            </p>
            <Button asChild>
              <Link to="/login">Voltar para o Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;