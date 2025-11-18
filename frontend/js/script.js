// URL do backend API
const API_URL = "http://localhost:8000";

// Elementos
const notesContainer = document.getElementById("notesContainer");
const modal = document.getElementById("modal");
const btnNew = document.getElementById("btnNewNote");
const btnSave = document.getElementById("btnSave");
const btnCancel = document.getElementById("btnCancel");

let editingId = null;


// === Abrir modal ===
btnNew.onclick = () => openModal();

btnCancel.onclick = () => closeModal();

function openModal(note = null) {
    modal.classList.remove("hidden");

    if (note) {
        editingId = note.id;
        document.getElementById("modalTitle").textContent = "Editar Nota";
        document.getElementById("noteTitle").value = note.title;
        document.getElementById("noteContent").value = note.content;
    } else {
        editingId = null;
        document.getElementById("modalTitle").textContent = "Nova Nota";
        document.getElementById("noteTitle").value = "";
        document.getElementById("noteContent").value = "";
    }
}

function closeModal() {
    modal.classList.add("hidden");
}


// === Carregar Notas ===
async function loadNotes() {
    const res = await fetch(`${API_URL}/notes`);
    const notes = await res.json();

    notesContainer.innerHTML = "";

    notes.forEach(note => {
        const card = document.createElement("div");
        card.className = "note-card";

        card.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>

            <div class="note-actions">
                <button class="btn btn-secondary" onclick='editNote(${note.id})'>Editar</button>
                <button class="btn btn-primary" onclick='deleteNote(${note.id})'>Excluir</button>
            </div>
        `;

        notesContainer.appendChild(card);
    });
}

loadNotes();


// === Salvar Nota ===
btnSave.onclick = async () => {
    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;

    if (editingId === null) {
        await fetch(`${API_URL}/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content })
        });
    } else {
        await fetch(`${API_URL}/notes/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content })
        });
    }

    closeModal();
    loadNotes();
};


// === Editar ===
window.editNote = async (id) => {
    const res = await fetch(`${API_URL}/notes/${id}`);
    const note = await res.json();

    openModal(note);
};


// === Excluir ===
window.deleteNote = async (id) => {
    if (!confirm("Deseja realmente excluir esta nota?")) return;

    await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" });

    loadNotes();
};
