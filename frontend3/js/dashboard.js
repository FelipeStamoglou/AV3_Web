const API_URL = "/api/notas";   // via Nginx

let editingNoteId = null;

// ============================
// CARREGAR NOTAS DO BACKEND
// ============================
async function loadNotes() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao listar");

        const notes = await response.json();
        renderNotes(notes);
    } catch (err) {
        showToast("Erro ao carregar notas", "error");
    }
}

function renderNotes(notes) {
    const listContainer = document.getElementById("notesGrid");
    listContainer.innerHTML = "";

    if (notes.length === 0) {
        listContainer.innerHTML = `<p style="opacity:0.6;">Nenhuma nota encontrada.</p>`;
        return;
    }

    notes.forEach(note => {
        const card = `
            <div class="note-card">
                <h3 class="note-title">${note.title}</h3>
                <p class="note-content">${note.content}</p>

                <div class="note-actions">
                    <button class="btn-edit"
                        onclick="openModal(${note.id}, '${note.title}', '${note.content}')">
                        ✏️ Editar
                    </button>

                    <button class="btn-delete" onclick="deleteNote(${note.id})">
                        🗑 Excluir
                    </button>
                </div>
            </div>
        `;
        listContainer.innerHTML += card;
    });
}

loadNotes();

// ============================
// BUSCAR
// ============================
async function searchNotes() {
    const term = document.getElementById("searchInput").value.trim();

    const clearBtn = document.getElementById("btnClear");
    const newNoteBtn = document.getElementById("btnNewNote");

    clearBtn.classList.toggle("hidden", term.length === 0);
    newNoteBtn.classList.toggle("hidden", term.length > 0);

    if (!term) {
        loadNotes();
        return;
    }

    const response = await fetch(`${API_URL}?q=${term}`);
    const notes = await response.json();
    renderNotes(notes);
}

document.getElementById("searchInput").addEventListener("input", searchNotes);

// ============================
// LIMPAR BUSCA
// ============================
function clearSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("btnClear").classList.add("hidden");
    document.getElementById("btnNewNote").classList.remove("hidden");
    loadNotes();
}

// ============================
// MODAL
// ============================
function openModal(id = null, title = "", content = "") {
    editingNoteId = id;

    document.getElementById("modalTitleInput").value = title;
    document.getElementById("modalContentInput").value = content;

    document.getElementById("noteModal").classList.remove("hidden");
    document.getElementById("modalTitle").innerText =
        id ? "Editar Nota" : "Nova Nota";
}

function closeModal() {
    document.getElementById("noteModal").classList.add("hidden");
}

// ============================
// SALVAR (CRIAR OU EDITAR)
// ============================
async function saveNote() {
    const title = document.getElementById("modalTitleInput").value.trim();
    const content = document.getElementById("modalContentInput").value.trim();

    if (!title || !content) {
        showToast("Preencha todos os campos", "error");
        return;
    }

    const payload = { title, content };
    let url = API_URL;
    let method = "POST";

    if (editingNoteId) {
        url = `${API_URL}/${editingNoteId}`;
        method = "PUT";
    }

    await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    closeModal();
    loadNotes();
    showToast(editingNoteId ? "Nota atualizada!" : "Nota criada!");
}

// ============================
// DELETE
// ============================
async function deleteNote(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadNotes();
    showToast("Nota deletada!");
}

// ============================
// MONITORAR DIGITAÇÃO DA BARRA DE BUSCA
// ============================
document.getElementById("searchInput").addEventListener("input", searchNotes);

// ============================
// LOGOUT
// ============================
function logoutUser() {
    window.location.href = "home.html";
}
