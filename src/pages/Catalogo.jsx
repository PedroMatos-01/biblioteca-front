import { useEffect, useState } from "react";
import { getLivros } from "../services/api";
import LivroCard from "../components/LivroCard";


function Catalogo() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

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
  }, []);

  if (carregando) return <p>Carregando livros...</p>;
  if (erro) return <p role="alert">{erro}</p>;

  return (
    <section>
      <h1>Catálogo</h1>
        <ul>
        {livros.map((livro) => (
            <LivroCard key={livro.id} livro={livro} />
        ))}
        </ul>
    </section>
  );
}

export default Catalogo;