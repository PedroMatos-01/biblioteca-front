import { useState } from "react";
import { cadastrar } from "../services/api";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setCarregando(true);
    try {
        await cadastrar(nome, email, senha);
        navigate("/login", {
            state: { mensagem: "Cadastro realizado com sucesso! Entre com seus dados." },
         });
    } catch (err) {
        setErro(err.message);
    } finally {
        setCarregando(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.titulo}>Cadastrar</h1>

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

      <label className={styles.campo}>
        Confirmar senha
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
      </label>

      {erro && <p className={styles.erro} role="alert">{erro}</p>}

      <button className={styles.botao} type="submit" disabled={carregando}>
        {carregando ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}

export default Cadastro;