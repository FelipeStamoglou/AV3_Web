// -------------------------------------------------------------------
// Componente: TaskForm
// Função: capturar os dados inseridos pelo usuário (título e descrição)
// e enviá-los ao backend por meio da função onAdd(), recebida via props.
//
// Este componente representa a porta de entrada das informações no sistema.
// -------------------------------------------------------------------

import { useState } from "react"

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // Envia os dados do formulário para o componente pai
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      alert("Por favor, preencha todos os campos antes de adicionar a tarefa.")
      return
    }

    onAdd({ title, description })

    // Limpa o formulário após adicionar
    setTitle("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Criar nova tarefa</h2>

      <input
        type="text"
        placeholder="Título da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Descrição da tarefa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Adicionar</button>
    </form>
  )
}
