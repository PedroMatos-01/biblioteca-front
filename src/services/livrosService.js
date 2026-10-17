import api from "./api";

export async function listarLivros() {
  const response = await api.get("/livros");
  return response.data;
}