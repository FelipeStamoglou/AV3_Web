// ============================================================
// API centralizada para comunicação com FastAPI
// Rotas 100% compatíveis com o backend do main.py
// ============================================================

import axios from "axios";

// Instância principal do axios
// O backend está rodando no Docker com Nginx servindo "/api" ?
const api = axios.create({
  baseURL: "/api", // SE o nginx redireciona para o backend
});

// ============================================================
// API de Notas (Métodos do backend main.py)
// ============================================================

export const notesAPI = {
  // Listar todas as notas
  getAll: async () => {
    const res = await api.get("/notas");
    return res.data;
  },

  // Buscar notas pelo título
  search: async (query: string) => {
    const res = await api.get(`/notas?q=${query}`);
    return res.data;
  },

  // Obter nota específica
  get: async (id: number) => {
    const res = await api.get(`/notas/${id}`);
    return res.data;
  },

  // Criar nota nova
  create: async (title: string, content: string) => {
    const res = await api.post("/notas", { title, content });
    return res.data;
  },

  // Atualizar nota existente
  update: async (id: number, title: string, content: string) => {
    const res = await api.put(`/notas/${id}`, { title, content });
    return res.data;
  },

  // Deletar nota
  delete: async (id: number) => {
    const res = await api.delete(`/notas/${id}`);
    return res.data;
  },
};
