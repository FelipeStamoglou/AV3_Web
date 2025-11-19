const API = "/api";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    const errorBox = document.getElementById("registerError");
    errorBox.classList.add("hidden");

    try {
        const res = await fetch(`${API}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        if (!res.ok) {
            const msg = await res.json();
            errorBox.textContent = msg.detail || "Erro ao registrar.";
            errorBox.classList.remove("hidden");
            return;
        }

        // Registro OK → redireciona para login
        window.location.href = "login.html";

    } catch (err) {
        console.error("Erro no registro:", err);
        errorBox.textContent = "Erro inesperado.";
        errorBox.classList.remove("hidden");
    }
});
