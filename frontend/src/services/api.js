// --------------------------------------------------------------
// Arquivo: api.js
// Camada de serviço responsável por realizar as requisições HTTP
// ao backend FastAPI. A separação desta lógica favorece a
// organização e a reutilização nas demais partes da aplicação.
// --------------------------------------------------------------

import axios from "axios"

// URL base do backend FastAPI 
const api = axios.create({
  baseURL: "http://localhost:8000",
})

// ========================
// Obter todas as tarefas
// ========================
export const getTasks = async () => {
  const response = await api.get("/tasks/")
  return response.data
}

// ========================
// Criar nova tarefa
// ========================
export const createTask = async (taskData) => {
  const response = await api.post("/tasks/", taskData)
  return response.data
}

// ========================
// Atualizar tarefa existente
// ========================
export const updateTask = async (id, updates) => {
  const response = await api.put(`/tasks/${id}`, updates)
  return response.data
}

// ========================
// Excluir tarefa
// ========================
export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`)
}
