import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";
import { api } from "../services/api";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

async function loadNotes() {
  try {
    const res = await api.get("/notes");
    console.log("RESPOSTA DO BACKEND:", res.data);


    // ajuste conforme o formato real do backend:
    setNotes(res.data.notes);  
    // ou res.data se for uma lista direta

  } catch (err) {
    console.error("Erro ao carregar notas:", err);
  }
}


  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <AppLayout>
      <SearchBar />
      <NotesList notes={notes} refresh={loadNotes} />
    </AppLayout>
  );
}
