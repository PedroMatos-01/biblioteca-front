import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RotaProtegida from "./components/RotaProtegida";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function handleLogin(novoToken) {
    localStorage.setItem("token", novoToken);
    setToken(novoToken);
  }

  function handleSair() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <Routes>
      <Route element={<Layout logado={!!token} onSair={handleSair} />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route element={<RotaProtegida logado={!!token} />}>
          <Route path="/livros" element={<Catalogo />} />
        </Route>

        <Route path="*" element={<p>Página não encontrada.</p>} />
      </Route>
    </Routes>
  );
}

export default App;