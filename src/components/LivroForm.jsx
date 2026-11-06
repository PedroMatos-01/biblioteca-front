import { useState } from "react";
import styles from "./LivroForm.module.css";

function LivroForm({ livroAtual, onSalvar, onSalvarPorIsbn, onCancelar }) {
  const editando = !!livroAtual;

  const [modo, setModo] = useState("isbn"); 
  const [isbn, setIsbn] = useState("");
  const [titulo, setTitulo] = useState(livroAtual?.titulo ?? "");
  const [autor, setAutor] = useState(livroAtual?.autor ?? "");
  const [capa, setCapa] = useState(livroAtual?.capa ?? "");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const porIsbn = !editando && modo === "isbn";

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (porIsbn) {
      const isbnLimpo = isbn.replace(/[\s-]/g, "");
      if (!isbnLimpo) {
        setErro("Informe o ISBN.");
        return;
      }
      setEnviando(true);
      await onSalvarPorIsbn(isbnLimpo);
      setEnviando(false);
      return;
    }

    if (!titulo.trim() || !autor.trim()) {
      setErro("Preencha título e autor.");
      return;
    }

    const dados = { titulo: titulo.trim(), autor: autor.trim() };
    if (capa.trim()) dados.capa = capa.trim();

    setEnviando(true);
    await onSalvar(dados);
    setEnviando(false);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{editando ? "Editar livro" : "Novo livro"}</h2>

      {!editando && (
        <div className={styles.modos}>
          <button
            type="button"
            className={modo === "isbn" ? styles.modoAtivo : styles.modo}
            onClick={() => setModo("isbn")}
          >
            Por ISBN
          </button>
          <button
            type="button"
            className={modo === "manual" ? styles.modoAtivo : styles.modo}
            onClick={() => setModo("manual")}
          >
            Manual
          </button>
        </div>
      )}

      {porIsbn ? (
        <label className={styles.campo}>
          ISBN
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Digite o ISBN do livro"
          />
          <small>Título, autor e capa são buscados automaticamente.</small>
        </label>
      ) : (
        <>
          <label className={styles.campo}>
            Título
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </label>

          <label className={styles.campo}>
            Autor
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
          </label>

          <label className={styles.campo}>
            URL da capa (opcional)
            <input
              type="url"
              value={capa}
              onChange={(e) => setCapa(e.target.value)}
              placeholder="https://..."
            />
          </label>

          {capa.trim() && (
            <img
              key={capa}
              className={styles.previa}
              src={capa}
              alt="Prévia da capa"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
        </>
      )}

      {erro && <p className={styles.erro} role="alert">{erro}</p>}

      <div className={styles.acoes}>
        <button type="submit" disabled={enviando}>
          {enviando ? "Salvando..." : "Salvar"}
        </button>
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default LivroForm;