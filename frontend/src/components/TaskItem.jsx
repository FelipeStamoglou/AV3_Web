/**
 * Objetivo:
 *    Representa visualmente cada tarefa no sistema.
 *    Permite alternar seu estado (concluída / pendente) e removê-la.
 */

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <label className="task-left">
        
        {/** Checkbox usado para alternar estado da tarefa */}
        <input
          type="checkbox"
          checked={task.is_done}
          onChange={() => onToggle(task)}
        />

        {/** Exibe o texto da tarefa */}
        <span className={task.is_done ? "done" : ""}>
          {task.title}
        </span>
      </label>

      {/** Botão para excluir a tarefa */}
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        x
      </button>
    </li>
  );
}
