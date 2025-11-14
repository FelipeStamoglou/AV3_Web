/**
 * Objetivo:
 *    Receber a lista de tarefas e renderizar cada uma delas
 *    utilizando o componente TaskItem.
 */

import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}          // chave única para otimizar renderização
          task={task}            // dados da tarefa
          onToggle={onToggle}    // callback para marcar como concluída
          onDelete={onDelete}    // callback para remover a tarefa
        />
      ))}
    </ul>
  );
}
