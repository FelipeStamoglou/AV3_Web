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

// ======================================================
// Interceptor: adiciona automaticamente o token no header
// ======================================================
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ==========================================================
//  Criar nova nota
// ==========================================================
export const createNote = async (noteData) => {
  const payload = {
    title: noteData.title,      // backend espera "title"
    content: noteData.content,  // backend espera "content"
  };

  const response = await api.post("/notas", payload);
  return response.data;
};

// ==========================================================
//  Listar todas as notas
// ==========================================================
export const getNotes = async () => {
  const response = await api.get("/notas");
  return response.data;
};

// ==========================================================
//  Atualizar nota existente
// ==========================================================
export const updateNote = async (id, updates) => {
  const payload = {
    title: updates.title,        // backend espera "title"
    content: updates.content,  // backend espera "content"
  };

  const response = await api.put(`/notas/${id}`, payload);
  return response.data;
};

// ==========================================================
//  Deletar nota
// ==========================================================
export const deleteNote = async (id) => {
  const response = await api.delete(`/notas/${id}`);
  return response.data;
};

// ======================================================
// Login (para obter token JWT)
// ======================================================
export const login = async (email, password) => {
    const response = await api.post("/auth/login", {
        email,
        password,
    });

    // Salva token localmente
    localStorage.setItem("token", response.data.access_token);

    return response.data;
};