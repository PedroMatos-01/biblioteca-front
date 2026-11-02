import styles from "./LivroCard.module.css";

function LivroCard({ livro, onEditar, onApagar, isAdmin }) {
  return (
    <li className={styles.card}>
      <h3 className={styles.titulo}>{livro.titulo}</h3>
      <p className={styles.autor}>{livro.autor}</p>

      {isAdmin && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => onEditar(livro)}>Editar</button>
          <button
            onClick={() => onApagar(livro.id)}
            style={{ marginLeft: "5px", color: "red" }}
          >
            Apagar
          </button>
        </div>
      )}
    </li>
  );
}

export default LivroCard;
