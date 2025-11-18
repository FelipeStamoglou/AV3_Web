// ============================
// MODO MOCK — SEM BACKEND
// ============================

// Lista fictícia de notas (inicial)
let mockNotes = [
    { id: 1, title: "Primeira nota", description: "Conteúdo da primeira nota" },
    { id: 2, title: "Tarefas do dia", description: "Estudar, beber água, praticar código." },
    { id: 3, title: "Ideias", description: "Criar um app moderno e bonito de notas." }
];

let editingNoteId = null;


// ============================
// CARREGAR NOTAS MOCK
// ============================

function loadNotes() {
    const listContainer = document.getElementById("notesGrid");
    listContainer.innerHTML = "";

    if (mockNotes.length === 0) {
        listContainer.innerHTML = `<p style="opacity:0.6;">Nenhuma nota encontrada.</p>`;
        return;
    }

    mockNotes.forEach(note => {
        const card = `
            <div class="note-card">

                <h3 class="note-title">${note.title}</h3>
                <p class="note-content">${note.description}</p>

                <div class="note-actions">
                    <button class="btn-edit"
                        onclick="openModal({ 
                            id: ${note.id},
                            title: \`${note.title}\`,
                            description: \`${note.description}\`
                        })">
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
// BUSCAR NOTAS E LIMPAR BUSCA
// ============================

function searchNotes() {
    const term = document.getElementById("searchInput").value.trim().toLowerCase();

    const clearBtn = document.getElementById("btnClear");
    const newNoteBtn = document.getElementById("btnNewNote");

    // Mostrar botão limpar
    clearBtn.classList.toggle("hidden", term.length === 0);

    // Esconder "Nova Nota" quando houver busca
    newNoteBtn.classList.toggle("hidden", term.length > 0);

    const cards = document.querySelectorAll(".note-card");

    cards.forEach(card => {
        const title = card.querySelector(".note-title").innerText.toLowerCase();
        card.style.display = title.includes(term) ? "block" : "none";
    });
}

// Limpar busca
function clearSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("btnClear").classList.add("hidden");
    document.getElementById("btnNewNote").classList.remove("hidden");

    loadNotes(); // volta a exibir todas
}


// ============================
// MODAL — ABRIR E FECHAR
// ============================

function openModal(note = null) {
    const modal = document.getElementById("noteModal");
    const modalTitle = document.getElementById("modalTitle");
    const titleInput = document.getElementById("modalTitleInput");
    const contentInput = document.getElementById("modalContentInput");

    modal.classList.remove("hidden");

    if (note) {
        // Editar nota
        editingNoteId = note.id;
        modalTitle.textContent = "Editar Nota";
        titleInput.value = note.title;
        contentInput.value = note.description;
    } else {
        // Nova nota
        editingNoteId = null;
        modalTitle.textContent = "Nova Nota";
        titleInput.value = "";
        contentInput.value = "";
    }
}

function closeModal() {
    document.getElementById("noteModal").classList.add("hidden");
}


// ============================
// SALVAR NOTA (CRIAR OU EDITAR)
// ============================

function saveNote() {
    const title = document.getElementById("modalTitleInput").value.trim();
    const description = document.getElementById("modalContentInput").value.trim();

    if (!title || !description) {
        showToast("Preencha todos os campos.", "error");
        return;
    }

    if (editingNoteId) {
        // Atualizar nota existente
        const index = mockNotes.findIndex(n => n.id === editingNoteId);
        if (index !== -1) {
            mockNotes[index].title = title;
            mockNotes[index].description = description;
        }
        showToast("Nota atualizada!");

    } else {
        // Criar nova nota
        const newNote = {
            id: Date.now(),
            title,
            description
        };

        mockNotes.push(newNote);
        showToast("Nota criada!");
    }

    closeModal();
    loadNotes();
}


// ============================
// EXCLUIR NOTA (MOCK)
// ============================

function deleteNote(id) {
    mockNotes = mockNotes.filter(note => note.id !== id);
    showToast("Nota excluída!");
    loadNotes();
}

// ============================
// MONITORAR DIGITAÇÃO DA BARRA DE BUSCA
// ============================
document.getElementById("searchInput").addEventListener("input", searchNotes);


// ============================
// TOAST — ALERTAS NA TELA
// ============================

function showToast(message, type = "success") {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.style.borderLeftColor = type === "error" ? "#ef4444" : "#3b82f6";

    toast.classList.add("show");
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.classList.add("hidden"), 300);
    }, 2500);
}


// ============================
// BOTÃO SAIR (VOLTAR PARA HOME)
// ============================

function logoutUser() {
    window.location.href = "index.html";
}
