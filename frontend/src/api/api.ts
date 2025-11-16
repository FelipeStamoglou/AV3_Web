// ==============================
// Camada de serviço para se comunicar com o backend FastAPI
// ==============================

import axios from "axios";

// ======================================================
// Instância do Axios — todas as requests começam com /api
// ======================================================
export const api = axios.create({
    baseURL: "/api",
});


// Interceptor opcional —  caso habilite JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ------------------------
// USUÁRIO (desabilitado)
// ------------------------
//
// As rotas /register e /login estão comentadas no backend.
// Eu deixei aqui o modelo, caso o professor peça depois.
/*
export const authAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post("/register", data),

  login: (data: { email: string; password: string }) =>
    api.post("/login", data),
};
*/


// ------------------------
// NOTAS (CRUD COMPLETO)
// ------------------------
export const notesAPI = {
  // Criar nota
  create: (data: { title: string; content: string }) =>
    api.post("/notas", data),

  // Listar todas as notas + busca opcional ?q=...
  list: (query?: string) =>
    api.get("/notas", {
      params: query ? { q: query } : {},
    }),

  // Obter nota por ID
  get: (id: number) => api.get(`/notas/${id}`),

  // Atualizar nota
  update: (id: number, data: { title: string; content: string }) =>
    api.put(`/notas/${id}`, data),

  // Deletar nota
  delete: (id: number) => api.delete(`/notas/${id}`),
};

export default {
  api,
  notesAPI,
  // authAPI (caso as rotas sejam reativadas)
};
