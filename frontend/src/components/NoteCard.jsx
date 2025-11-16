import "../components/notecard.css";

export default function NoteCard({ note, onDelete, refresh }) {

  async function handleDelete() {
    await onDelete(note.id);
    refresh();
  }

  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>

      <div className="note-actions">
        <button className="btn-edit">Editar</button>
        <button className="btn-delete" onClick={handleDelete}>
          Excluir
        </button>
      </div>
    </div>
  );
}
