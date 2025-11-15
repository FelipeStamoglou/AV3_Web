const API = "/api"; // proxied by nginx

async function list() {
  const res = await fetch(API + "/todos/");
  const todos = await res.json();
  const list = document.getElementById("list");
  list.innerHTML = "";
  todos.forEach(t => {
    const div = document.createElement("div");
    div.className = "todo" + (t.done ? " done" : "");
    div.innerHTML = `<strong>${t.title}</strong>
      <p>${t.description || ""}</p>
      <p>Done: ${t.done}</p>
      <button onclick='toggle(${t.id}, ${t.done})'>Toggle</button>
      <button onclick='remove(${t.id})'>Remover</button>`;
    list.appendChild(div);
  });
}

async function create() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  if (!title) return alert("Título obrigatório");
  await fetch(API + "/todos/", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({title, description, done:false})
  });
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  list();
}

async function toggle(id, done) {
  const res = await fetch(API + "/todos/" + id);
  const t = await res.json();
  await fetch(API + "/todos/" + id, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({...t, done: !done})
  });
  list();
}

async function remove(id) {
  await fetch(API + "/todos/" + id, {method:"DELETE"});
  list();
}

// init
list();
