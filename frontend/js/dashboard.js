const API_DASH = "/api";
let editingId = null;

// ------------------ AUTH ------------------
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

function authHeaders(extra = {}) {
    return {
        "Authorization": `Bearer ${token}`,
        ...extra
    };
}

// ------------------ LOAD NOTES ------------------
async function loadNotes() {
    try {
        const res = await fetch(`${API_DASH}/notas`, {
            headers: authHeaders()
        });

        if (!res.ok) throw new Error("load failed");

        const notes = await res.json();
        renderNotes(notes);

    } catch (err) {
        console.error(err);
        showToast("Erro ao carregar notas", "error");
    }
}

function renderNotes(notes) {
    const grid = document.getElementById("notesGrid");

    if (!notes || notes.length === 0) {
        grid.innerHTML = `<p class="opacity-60 text-center col-span-full">Nenhuma nota encontrada.</p>`;
        return;
    }

    grid.innerHTML = notes
        .map(
            n => `
<div class="bg-white shadow p-4 rounded relative">
    <h3 class="font-bold text-lg">${escapeHtml(n.title)}</h3>
    <p class="mt-2 text-gray-700 whitespace-pre-line">${escapeHtml(n.content)}</p>

    <div class="mt-4 flex gap-2">
        <button onclick="editNote(${n.id}, '${escapeJs(n.title)}', '${escapeJs(n.content)}')"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Editar
        </button>

        <button onclick="deleteNote(${n.id})"
            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            Excluir
        </button>
    </div>
</div>`
        )
        .join("");
}

// ------------------ HTML ESCAPE ------------------
function escapeHtml(s) {
    if (!s) return "";
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function escapeJs(s) {
    if (!s) return "";
    return s.replace(/'/g, "\\'");
}

// ------------------ MODAL ------------------
function openModal() {
    editingId = null;
    document.getElementById("modalTitle").textContent = "Nova Nota";
    document.getElementById("modalTitleInput").value = "";
    document.getElementById("modalContentInput").value = "";
    document.getElementById("noteModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("noteModal").classList.add("hidden");
}

// ------------------ SAVE NOTE ------------------
async function saveNote() {
    const title = document.getElementById("modalTitleInput").value.trim();
    const content = document.getElementById("modalContentInput").value.trim();

    if (!title || !content) {
        showToast("Preencha todos os campos", "error");
        return;
    }

    const payload = { title, content };

    const url = editingId
        ? `${API_DASH}/notas/${editingId}`
        : `${API_DASH}/notas`;

    const method = editingId ? "PUT" : "POST";

    try {
        const res = await fetch(url, {
            method,
            headers: authHeaders({ "Content-Type": "application/json" }),
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("save failed");

        closeModal();
        loadNotes();
        showToast(editingId ? "Nota atualizada" : "Nota criada");

    } catch (err) {
        console.error(err);
        showToast("Erro ao salvar nota", "error");
    }
}

// ------------------ EDIT NOTE ------------------
function editNote(id, title, content) {
    editingId = id;
    document.getElementById("modalTitle").textContent = "Editar Nota";
    document.getElementById("modalTitleInput").value = title;
    document.getElementById("modalContentInput").value = content;
    document.getElementById("noteModal").classList.remove("hidden");
}

// ------------------ DELETE NOTE ------------------
async function deleteNote(id) {
    if (!confirm("Deseja excluir esta nota?")) return;

    try {
        const res = await fetch(`${API_DASH}/notas/${id}`, {
            method: "DELETE",
            headers: authHeaders()
        });

        if (!res.ok) throw new Error("delete failed");

        loadNotes();
        showToast("Nota deletada");

    } catch (err) {
        console.error(err);
        showToast("Erro ao deletar nota", "error");
    }
}

// ------------------ SEARCH ------------------
function searchNotes() {
    const q = document.getElementById("searchInput").value.trim();

    if (!q) {
        loadNotes();
        return;
    }

    fetch(`${API_DASH}/notas?q=${encodeURIComponent(q)}`, {
        headers: authHeaders()
    })
        .then(r => r.json())
        .then(renderNotes)
        .catch(() => showToast("Erro na busca", "error"));

    document.getElementById("btnClear").classList.remove("hidden");
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("btnClear").classList.add("hidden");
    loadNotes();
}

// ------------------ LOGOUT ------------------
function logoutUser() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// ------------------ TOAST ------------------
function showToast(msg, type = "ok") {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.style.background = type === "error" ? "#ef4444" : "#6b46ff";
    t.classList.remove("hidden");
    setTimeout(() => t.classList.add("hidden"), 2200);
}

// ------------------ INITIAL LOAD ------------------
window.addEventListener("load", loadNotes);
