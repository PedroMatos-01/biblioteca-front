import styles from "./LivroCard.module.css";

function LivroCard({ livro }) {
  return (
    <li className={styles.card}>
      <h3 className={styles.titulo}>{livro.titulo}</h3>
      <p className={styles.autor}>{livro.autor}</p>
    </li>
  );
}

export default LivroCard;