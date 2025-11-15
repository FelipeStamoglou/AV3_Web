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
// Importação dos serviços responsáveis por comunicar com o backend FastAPI
import { getNotes, createNote, updateNote, deleteNote } from "../services/api"

export default function Home() {
    // Estado central que armazena a lista de tarefas carregadas do backend
  const [tasks, setTasks] = useState([])

  // Carrega tarefas ao iniciar
  useEffect(() => {
    loadTasks()
  }, [])

    // Função responsável por buscar todas as tarefas no backend
  const loadTasks = async () => {
    const data = await getNotes()
    setTasks(data)
  }

    // Função acionada ao enviar o formulário de nova tarefa
  const handleAddTask = async (taskData) => {
    await createNote(taskData)
    loadTasks()
  }

    // Alternar o estado de uma tarefa (feito / não feito)
  const handleToggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id)

    await updateNote(id, {
      title: task.title,
      description: task.description,
      is_done: !task.is_done,
    })

    loadTasks()
  }

  // Remove uma tarefa específica
  const handledeleteNote = async (id) => {
    await deleteNote(id)
    loadTasks()
  }

  return (
    <div className="container">
      <h1>Gerenciador de Tarefas</h1>

      {/* Formulário de criação de novas tarefas */}
      <TaskForm onAdd={handleAddTask} />

      {/* Lista de tarefas */}
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handledeleteNote}
      />
    </div>
  )
}
