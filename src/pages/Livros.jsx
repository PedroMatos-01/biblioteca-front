import { useEffect, useState } from "react";
import { listarLivros } from "../services/livrosService";
import LivroCard from "../components/LivroCard";

function Livros() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    listarLivros()
      .then(setLivros)
      .catch((erro) => console.error(erro));
  }, []);

  return (
    <main>
      <h2>Catálogo</h2>
      <ul>
        {livros.map((livro) => (
          <LivroCard key={livro.id} livro={livro} />
        ))}
      </ul>
    </main>
  );
}

export default Livros;