import { useState } from "react";
import styles from "./LivroCard.module.css";

function LivroCard({ livro, onEditar, onApagar, isAdmin }) {
  const [capaFalhou, setCapaFalhou] = useState(false);
  const temCapa = livro.capa && !capaFalhou;

  return (
    <li className={styles.card}>
      {temCapa ? (
        <img
          className={styles.capa}
          src={livro.capa}
          alt={`Capa do livro ${livro.titulo}`}
          onError={() => setCapaFalhou(true)}
        />
      ) : (
        <div className={styles.semCapa}>Sem capa</div>
      )}

      <h3 className={styles.titulo}>{livro.titulo}</h3>
      <p className={styles.autor}>{livro.autor}</p>

      {isAdmin && (
        <div className={styles.acoes}>
          <button type="button" onClick={() => onEditar(livro)}>
            Editar
          </button>
          <button
            type="button"
            className={styles.apagar}
            onClick={() => onApagar(livro.id)}
          >
            Apagar
          </button>
        </div>
      )}
    </li>
  );
}

export default LivroCard;