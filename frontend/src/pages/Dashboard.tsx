import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { notesAPI } from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { LogOut, Plus, Edit, Trash2, StickyNote, Search, X } from 'lucide-react';

interface Note {
  _id?: string;
  id?: string;
  title: string;
  content: string;
  createdAt?: string;
}

// ======================
// COMPONENTE PRINCIPAL
// ======================
const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);

  const { user, logout } = useAuth();

  // ======================
  //  LISTAR TODAS AS NOTAS
  // ======================
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await notesAPI.getAll();
      setNotes(data);
    } catch (error: any) {
      toast.error('Erro ao carregar notas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ======================
  // CRIAR OU ATUALIZAR NOTA
  // ======================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Preencha todos os campos');
      return;
    }

    setSubmitting(true);

    try {
      if (editingNote) {
        const noteId = editingNote._id || editingNote.id;
        await notesAPI.update(noteId!, title, content);
        toast.success('Nota atualizada com sucesso!');
      } else {
        await notesAPI.create(title, content);
        toast.success('Nota criada com sucesso!');
      }

      setDialogOpen(false);
      resetForm();
      fetchNotes();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao salvar nota';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  // ======================
  //  EDITAR NOTA
  // ======================
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setDialogOpen(true);
  };

  // ======================
  // EXCLUIR NOTA
  // ======================
  const handleDelete = async (note: Note) => {
    if (!confirm('Tem certeza que deseja excluir esta nota?')) return;

    try {
      const noteId = note._id || note.id;
      await notesAPI.delete(noteId!);
      toast.success('Nota excluída com sucesso!');
      fetchNotes();
    } catch {
      toast.error('Erro ao excluir nota');
    }
  };

  // ======================
  // BUSCAR NOTAS
  // ======================
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error('Digite algo para buscar');
      return;
    }

    setSearching(true);
    try {
      const data = await notesAPI.search(searchTerm);
      setNotes(data);
      if (data.length === 0) toast.warning('Nenhuma nota encontrada');
    } catch {
      toast.error('Erro ao buscar notas');
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = async () => {
    setSearchTerm('');
    fetchNotes();
  };

  // ======================
  // RESETA FORMULÁRIO
  // ======================
  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditingNote(null);
  };

  // ======================
  // CONTROLE DO DIÁLOGO
  // ======================
  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) resetForm();
  };

  // ======================
  //  RENDERIZAÇÃO
  // ======================
  return (
    <div className="min-h-screen bg-gradient-subtle animate-fade-in">
      {/* HEADER */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <StickyNote className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Minhas Notas</h1>
              <p className="text-sm text-muted-foreground">
                Olá, {user?.name || localStorage.getItem("userName") || "Usuário"}!
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={logout} className="bg-red-500 hover:bg-red-600 text-white gap-2 transition-colors">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="container mx-auto px-4 py-8">
        {/*  BARRA DE BUSCA */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <Input
            type="text"
            placeholder="Buscar notas por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={searching} className="gap-2">
            {searching ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Search className="h-4 w-4" />
                Buscar
              </>
            )}
          </Button>
          {searchTerm && (
            <Button
              type="button"
              variant="outline"
              onClick={clearSearch}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Limpar
            </Button>
          )}
        </form>

        {/* CABEÇALHO E BOTÃO NOVA NOTA */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {notes.length} {notes.length === 1 ? 'nota' : 'notas'}
          </h2>

           {/* Exibe o botão "Nova Nota" apenas quando não há busca */}
            {searchTerm.trim() === "" && (
          <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Nota
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingNote ? 'Editar Nota' : 'Nova Nota'}
                </DialogTitle>
                <DialogDescription>
                  {editingNote
                    ? 'Edite os campos abaixo para atualizar sua nota.'
                    : 'Preencha os campos abaixo para criar uma nova nota.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    placeholder="Título da nota"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea
                    id="content"
                    placeholder="Escreva o conteúdo da sua nota..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={submitting}
                    rows={6}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDialogChange(false)}
                    disabled={submitting}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <LoadingSpinner size="sm" />
                    ) : editingNote ? (
                      'Atualizar'
                    ) : (
                      'Criar'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
            </Dialog>
            )}
        </div>

        {/* LISTAGEM DE NOTAS */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : notes.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent className="space-y-4">
              <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center">
                <StickyNote className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Nenhuma nota encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  Comece criando sua primeira nota!
                </p>
                <Button onClick={() => setDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Criar primeira nota
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <Card
                key={note._id || note.id}
                className="hover:shadow-md transition-all animate-scale-in"
              >
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-1">
                    {note.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4 whitespace-pre-wrap">
                    {note.content}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(note)}
                      className="flex-1 gap-2"
                    >
                      <Edit className="h-3 w-3" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(note)}
                      className="bg-red-500 hover:bg-red-600 text-white gap-2 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;