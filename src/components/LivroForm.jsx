import { useState } from "react";

function LivroForm({ livroAtual, onSalvar, onCancelar }) {
  const [titulo, setTitulo] = useState(() => livroAtual?.titulo ?? "");
  const [autor, setAutor] = useState(() => livroAtual?.autor ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar({ titulo, autor });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <h3>{livroAtual ? "Editar Livro" : "Novo Livro"}</h3>
      <div>
        <label>Título: </label>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      </div>
      <div>
        <label>Autor: </label>
        <input value={autor} onChange={(e) => setAutor(e.target.value)} required />
      </div>
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  );
}

export default LivroForm;