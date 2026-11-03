export function getPerfil() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json).perfil ?? null;
  } catch {
    return null;
  }
}

export function ehAdmin() {
  return getPerfil() === "administrador";
}