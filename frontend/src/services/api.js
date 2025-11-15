// api.js
// Camada de serviço para se comunicar com o backend FastAPI

import axios from "axios";

// URL base do backend FastAPI (rodando no Docker)
export const API_URL = "http://localhost:8000";

// Instância do axios
const api = axios.create({
  baseURL: API_URL,
});

// ==============================
// Listar todas as notas
// ==============================
export const getNotes = async () => {
  const response = await api.get("/notas");
  return response.data;
};

// ==============================
// Criar nova nota
// ==============================
export const createNote = async (noteData) => {
  const response = await api.post("/notas", noteData);
  return response.data;
};

// ==============================
// Atualizar nota
// ==============================
export const updateNote = async (id, updates) => {
  const response = await api.put(`/notas/${id}`, updates);
  return response.data;
};

// ==============================
// Deletar nota
// ==============================
export const deleteNote = async (id) => {
  await api.delete(`/notas/${id}`);
};
