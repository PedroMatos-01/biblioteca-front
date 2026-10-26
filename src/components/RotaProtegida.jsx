import { Navigate, Outlet } from "react-router-dom";

function RotaProtegida({ logado }) {
  return logado ? <Outlet /> : <Navigate to="/login" replace />;
}

export default RotaProtegida;