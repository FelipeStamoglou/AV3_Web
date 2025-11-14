// -------------------------------------------------------------------------
// Página: Home
// Função: orquestrar o funcionamento da aplicação frontend.
// Aqui ocorre:
//
// - Carregamento inicial das tarefas
// - Criação de novas tarefas
// - Atualização do estado (concluir / desmarcar)
// - Exclusão
//
// Esta página integra todos os componentes e serviços.
// -------------------------------------------------------------------------

import { useEffect, useState } from "react"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import { getTasks, createTask, updateTask, deleteTask } from "../services/api"

export default function Home() {
  const [tasks, setTasks] = useState([])

  // Carrega tarefas ao iniciar
  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    const data = await getTasks()
    setTasks(data)
  }

  // Adiciona nova tarefa
  const handleAddTask = async (taskData) => {
    await createTask(taskData)
    loadTasks()
  }

  // Alterna estado (concluir/inconcluir)
  const handleToggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id)

    await updateTask(id, {
      title: task.title,
      description: task.description,
      is_done: !task.is_done,
    })

    loadTasks()
  }

  // Remove tarefa
  const handleDeleteTask = async (id) => {
    await deleteTask(id)
    loadTasks()
  }

  return (
    <div className="container">
      <h1>Gerenciador de Tarefas - AV3</h1>

      <TaskForm onAdd={handleAddTask} />

      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </div>
  )
}
