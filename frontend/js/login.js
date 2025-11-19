const API = "/api";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorBox = document.getElementById("loginError");

    errorBox.classList.add("hidden");

    try {
        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            errorBox.classList.remove("hidden");
            return;
        }

        const data = await res.json();
        localStorage.setItem("token", data.access_token);

        window.location.href = "dashboard.html";

    } catch (err) {
        console.error("Erro no login:", err);
        errorBox.classList.remove("hidden");
    }
});
