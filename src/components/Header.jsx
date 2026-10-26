import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";


function linkClasse({ isActive }) {
  return isActive ? `${styles.link} ${styles.ativo}` : styles.link;
}

function Header({ logado, onSair }) {
  const navigate = useNavigate();

  function handleSair() {
    onSair();
    navigate("/login");
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" end className={linkClasse}>Início</NavLink>
        {logado ? (
          <>
            <NavLink to="/livros" className={linkClasse}>Livros</NavLink>
            <button type="button" className={styles.sair} onClick={handleSair}>
              Sair
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={linkClasse}>Entrar</NavLink>
            <NavLink to="/cadastro" className={linkClasse}>Cadastrar</NavLink>
          </>
        )}
      </nav>
    </header>
    
  );
}

export default Header;