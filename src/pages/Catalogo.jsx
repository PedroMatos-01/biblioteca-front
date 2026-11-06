import { useEffect, useState } from "react";
import {
  getLivros,
  criarLivro,
  criarLivroPorIsbn,
  editarLivro,
  apagarLivro,
} from "../services/api";
import { ehAdmin } from "../services/auth";
import LivroCard from "../components/LivroCard";
import LivroForm from "../components/LivroForm";
import styles from "./Catalogo.module.css";

function Catalogo() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState("");
  const [erroAcao, setErroAcao] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [exibirForm, setExibirForm] = useState(false);
  const [livroEmEdicao, setLivroEmEdicao] = useState(null);
  const [versao, setVersao] = useState(0);

  const isAdmin = ehAdmin();


useEffect(() => {
  async function carregar() {
    try {
      const data = await getLivros();
      setLivros(data);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }
  carregar();
}, [versao]);

  function recarregar() {
    setVersao((v) => v + 1);
  }

    function fecharForm() {
      setExibirForm(false);
      setLivroEmEdicao(null);
    }


  async function executar(acao, fecharAoFinal = false) {
    setErroAcao("");
    try {
      await acao();
      if (fecharAoFinal) fecharForm();
      recarregar();
    } catch (err) {
      setErroAcao(err.message);
    }
  }

  function handleSalvar(dados) {
    return executar(
      () =>
        livroEmEdicao ? editarLivro(livroEmEdicao.id, dados) : criarLivro(dados),
      true
    );
  }

  function handleSalvarPorIsbn(isbn) {
    return executar(() => criarLivroPorIsbn(isbn), true);
  }

  function handleApagar(id) {
    if (!window.confirm("Tem certeza que deseja apagar este livro?")) return;
    return executar(() => apagarLivro(id));
  }

  function abrirEdicao(livro) {
    setLivroEmEdicao(livro);
    setExibirForm(true);
  }

  if (carregando) return <p>Carregando livros...</p>;
  if (erro) return <p role="alert">{erro}</p>;

  return (
    <section>
      <h1>Catálogo</h1>

      {erroAcao && <p role="alert">{erroAcao}</p>}

      {isAdmin && !exibirForm && (
        <button type="button" onClick={() => setExibirForm(true)}>
          + Adicionar livro
        </button>
      )}

      {exibirForm && (
        <LivroForm
          key={livroEmEdicao?.id ?? "novo"}
          livroAtual={livroEmEdicao}
          onSalvar={handleSalvar}
          onSalvarPorIsbn={handleSalvarPorIsbn}
          onCancelar={fecharForm}
        />
      )}

      <ul className={styles.lista}>
        {livros.map((livro) => (
          <LivroCard
            key={livro.id}
            livro={livro}
            isAdmin={isAdmin}
            onEditar={abrirEdicao}
            onApagar={handleApagar}
          />
        ))}
      </ul>
    </section>
  );
}

export default Catalogo;