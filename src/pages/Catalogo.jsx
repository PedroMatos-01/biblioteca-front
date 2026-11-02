import { useEffect, useState } from "react";
import {
  getLivros,
  criarLivro,
  editarLivro,
  apagarLivro,
} from "../services/api";
import LivroCard from "../components/LivroCard";
import LivroForm from "../components/LivroForm";
import styles from "./Catalogo.module.css";

function Catalogo() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [exibirForm, setExibirForm] = useState(false);
  const [livroEmEdicao, setLivroEmEdicao] = useState(null);


const isAdmin = localStorage.getItem("perfil") === "administrador";

  useEffect(() => {
    carregar();
  }, []);

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

  const handleSalvar = async (dadosLivro) => {
    try {
      if (livroEmEdicao) {
        await editarLivro(livroEmEdicao.id, dadosLivro);
      } else {
        await criarLivro(dadosLivro);
      }
      setExibirForm(false);
      setLivroEmEdicao(null);
      carregar();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleApagar = async (id) => {
    if (!window.confirm("Tem certeza que deseja apagar?")) return;
    try {
      await apagarLivro(id);
      carregar();
    } catch (err) {
      alert(err.message);
    }
  };

  const abrirEdicao = (livro) => {
    setLivroEmEdicao(livro);
    setExibirForm(true);
  };

  if (carregando) return <p>Carregando livros...</p>;
  if (erro) return <p role="alert">{erro}</p>;

  return (
    <section>
      <h1>Catálogo</h1>

      {isAdmin && !exibirForm && (
        <button onClick={() => setExibirForm(true)}>+ Adicionar Livro</button>
      )}

      {exibirForm && (
        <LivroForm
          livroAtual={livroEmEdicao}
          onSalvar={handleSalvar}
          onCancelar={() => {
            setExibirForm(false);
            setLivroEmEdicao(null);
          }}
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
