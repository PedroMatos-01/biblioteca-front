function LivroCard({ livro }) {
  return (
    <li>
      <h3>{livro.titulo}</h3>
      <p>{livro.autor}</p>
    </li>
  );
}

export default LivroCard;