import NoteCard from "./NoteCard";
import "./noteslist.css";
import { api } from "../services/api";

export default function NotesList({ notes = [], onDelete, refresh }) {
  return (
    <div className="notes-list">

      {/* Proteção: evita crash se notes não for array */}
      {!Array.isArray(notes) ? (
        <p>Carregando...</p>
      ) : notes.length === 0 ? (
        <p>Nenhuma nota encontrada.</p>
      ) : (
        notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            refresh={refresh}
          />
        ))
      )}

    </div>
  );
}
