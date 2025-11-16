import "../components/navbar.css";

export default function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Minhas Notas</h1>

        <button className="navbar-logout" onClick={onLogout}>
          Sair
        </button>
      </div>
    </nav>
  );
}
