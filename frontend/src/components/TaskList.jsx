// ---------------------------------------------------------------------------
// Componente: TaskList
// Função: receber uma lista de tarefas e distribuí-las em componentes
// TaskItem. É o nível intermediário entre a página e os itens.
//
// Favorece modularidade e clareza estrutural.
// ---------------------------------------------------------------------------

import TaskItem from "./TaskItem"

export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  )
}
