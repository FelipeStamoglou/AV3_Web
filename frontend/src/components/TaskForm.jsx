/**
 * Objetivo:
 *    Responsável pela entrada de dados do usuário, permitindo
 *    que novas tarefas sejam cadastradas no sistema.
 */

import { useState } from "react";

export default function TaskForm({ onSubmit }) {
  // Variável de estado responsável por armazenar o texto digitado pelo usuário.
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // evita comportamento padrão do formulário

    // Evita criação de tarefas vazias
    if (!text.trim()) return;

    // Envia o texto da tarefa para o componente pai (Home.jsx)
    onSubmit(text);

    // Limpa o campo após envio
    setText("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite uma nova tarefa..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Adicionar</button>
    </form>
  );
}
