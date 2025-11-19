document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email    = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const payload = {
        username: username,
        email: email,
        password: password
    };

    try {
        const response = await fetch("http://localhost/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("message").innerText = "Usuário cadastrado com sucesso!";
            document.getElementById("message").style.color = "green";
        } else {
            document.getElementById("message").innerText = data.detail || "Erro ao registrar.";
            document.getElementById("message").style.color = "red";
        }

    } catch (err) {
        document.getElementById("message").innerText = "Erro de conexão com o servidor.";
        document.getElementById("message").style.color = "red";
    }
});
