import { useState } from "react";
import { login } from "../services/api";

function Login() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!nome || !email || !senha) {
      setErro("Preencha nome, e-mail e senha.");
      return;
    }

    setCarregando(true);
    try {
      const data = await login(nome, email, senha);
      localStorage.setItem("token", data.token);
      setSucesso("Login realizado com sucesso!");

      setNome("");
      setEmail("");
      setSenha("");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  function handleSair() {
    localStorage.removeItem("token");
    setSucesso("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Entrar</h1>
      <label>
        Nome
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </label>
      <label>
        E-mail
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Senha
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </label>

      {erro && <p role="alert">{erro}</p>}
      {sucesso && <p role="status">{sucesso}</p>}

      <button type="submit" disabled={carregando}>
        {carregando ? "Entrando..." : "Entrar"}
      </button>

      <button type="button" onClick={handleSair}>
        Sair
      </button>
    </form>
  );
}

export default Login;
