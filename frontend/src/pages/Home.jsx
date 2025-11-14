/**
 * Objetivo:
 *    Representa a página principal da aplicação. 
 *    Aqui ocorre a integração entre os componentes visuais e os serviços de API.
 */

import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

// Importação das funções responsáveis pela comunicação com o backend
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

export default function Home() {
  /**
   * Estado "tasks":
   *    Armazena todas as tarefas retornadas pelo backend.
   *    Esse estado é automaticamente atualizado quando o usuário
   *    cria, edita ou exclui uma tarefa.
   */
  const [tasks, setTasks] = useState([]);

  /**
   * Carrega todas as tarefas do backend ao inicializar a página.
   * Essa função chama a API e atualiza o estado local.
   */
  async function load() {
    const data = await getTasks();
    setTasks(data);
  }

  // useEffect: executa a função "load" apenas uma vez quando a página carrega.
  useEffect(() => {
    load();
  }, []);

  /**
   * Função responsável por adicionar uma nova tarefa no backend.
   */
  async function handleAdd(title) {
    await createTask({ title, is_done: false });
    load(); // recarrega a lista após adicionar
  }

  /**
   * Alterna o estado de "concluída" de uma tarefa.
   */
  async function handleToggle(task) {
    await updateTask(task.id, { ...task, is_done: !task.is_done });
    load();
  }

  /**
   * Remove uma tarefa permanentemente do sistema.
   */
  async function handleDelete(id) {
    await deleteTask(id);
    load();
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>

      {/** Componente responsável pelo formulário de nova tarefa */}
      <TaskForm onSubmit={handleAdd} />

      {/** Lista de tarefas consumindo estado atualizado */}
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
