import "./login.css";
import { api } from "../services/api";

export default function Login() {
  return (
    <div className="login-container">
      <h2>Entrar</h2>

      <form className="login-form">
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
