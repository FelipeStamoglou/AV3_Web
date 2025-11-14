// -------------------------------------------------------------------------
// Componente: TaskItem
// Função: exibir uma única tarefa, composta por título, descrição e estado.
// Também disponibiliza ações para concluir/inconcluir e remover.
//
// Este componente é essencial para visualização individualizada dos dados.
// -------------------------------------------------------------------------

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.is_done ? "done" : ""}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>

      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>
          {task.is_done ? "Desmarcar" : "Concluir"}
        </button>

        <button className="delete" onClick={() => onDelete(task.id)}>
          Excluir
        </button>
      </div>
    </div>
  )
}
