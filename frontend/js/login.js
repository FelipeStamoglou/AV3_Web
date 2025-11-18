const API = "/api";


async function login() {
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const errorBox = document.getElementById("loginError");


try {
const res = await fetch(`${API}/login`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, password })
});


if (!res.ok) {
errorBox.classList.remove("hidden");
return;
}


const data = await res.json();
localStorage.setItem("token", data.access_token);
window.location.href = "dashboard.html";
}
catch {
errorBox.classList.remove("hidden");
}
}