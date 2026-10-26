import { NavLink, useNavigate } from "react-router-dom";

function Header({ logado, onSair }) {
  const navigate = useNavigate();

  function handleSair() {
    onSair();
    navigate("/login");
  }

  return (
    <header>
      <nav>
        <NavLink to="/">Início</NavLink>
        {logado ? (
          <>
            <NavLink to="/livros">Livros</NavLink>
            <button type="button" onClick={handleSair}>Sair</button>
          </>
        ) : (
          <NavLink to="/login">Entrar</NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;