import { useState } from "react";
import { login } from "../services/api";
import styles from "./Login.module.css";
import { useNavigate, useLocation } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const location = useLocation();
  const mensagem = location.state?.mensagem;

async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!nome || !email || !senha) {
      setErro("Preencha nome, e-mail e senha.");
      return;
    }

    setCarregando(true);
    try {
      const data = await login(nome, email, senha);
      

      localStorage.setItem("token", data.token);
      localStorage.setItem("perfil", data.perfil || data.usuario?.perfil);
      onLogin(data.token);
      navigate("/livros");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.titulo}>Entrar</h1>

      <label className={styles.campo}>
        Nome
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </label>

      <label className={styles.campo}>
        E-mail
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className={styles.campo}>
        Senha
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </label>
      {mensagem && !erro && (
        <p className={styles.sucesso} role="status">{mensagem}</p>
      )}
      {erro && <p className={styles.erro} role="alert">{erro}</p>}

      <button className={styles.botao} type="submit" disabled={carregando}>
        {carregando ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

export default Login;