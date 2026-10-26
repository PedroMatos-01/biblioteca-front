import { Outlet } from "react-router-dom";
import Header from "./Header";
import styles from "./Layout.module.css";

function Layout({ logado, onSair }) {
  return (
    <div className={styles.layout}>
      <Header logado={logado} onSair={onSair} />
      <main className={styles.conteudo}>
        <Outlet />
      </main>
      <footer className={styles.footer}>Biblioteca © 2026</footer>
    </div>
  );
}

export default Layout;