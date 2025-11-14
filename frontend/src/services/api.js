/**
 * 
 * Objetivo:
 *    Centralizar todas as requisições HTTP realizadas pelo frontend,
 *    facilitando a comunicação com o backend desenvolvido em FastAPI.
 */

const API_URL = "http://localhost:8000"; // URL base da API em FastAPI

/**
 * Obtém a lista completa de tarefas cadastradas no backend.
 * Método correspondente à rota GET /tasks.
 */
export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`);
  return response.json();
}

/**
 * Cria uma nova tarefa no backend.
 * Método correspondente à rota POST /tasks.
 */
export async function createTask(task) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task), // enviado no formato JSON
  });
  return response.json();
}

/**
 * Atualiza uma tarefa existente no backend.
 * Método correspondente à rota PUT /tasks/{id}.
 */
export async function updateTask(id, task) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
}

/**
 * Remove uma tarefa do sistema.
 * Método correspondente à rota DELETE /tasks/{id}.
 */
export async function deleteTask(id) {
  return fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
}
