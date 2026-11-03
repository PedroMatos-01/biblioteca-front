const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function requisicao(
  caminho,
  { method = "GET", body, autenticado = true, erroPadrao } = {}
) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";

  const token = localStorage.getItem("token");
  if (autenticado && token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${API_URL}${caminho}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Não foi possível conectar ao servidor.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.erro || data.message || erroPadrao || "Algo deu errado. Tente novamente."
    );
  }

  return data;
}

export const login = (nome, email, senha) =>
  requisicao("/auth", {
    method: "POST",
    body: { nome, email, senha },
    autenticado: false,
    erroPadrao: "E-mail ou senha inválidos.",
  });

export const cadastrar = (nome, email, senha) =>
  requisicao("/usuarios", {
    method: "POST",
    body: { nome, email, senha },
    autenticado: false,
    erroPadrao: "Não foi possível realizar o cadastro.",
  });

export const getLivros = () =>
  requisicao("/livros", { erroPadrao: "Erro ao carregar livros." });

export const criarLivro = (livro) =>
  requisicao("/livros", {
    method: "POST",
    body: livro,
    erroPadrao: "Erro ao criar livro.",
  });

export const criarLivroPorIsbn = (isbn) =>
  requisicao("/livros/isbn", {
    method: "POST",
    body: { isbn },
    erroPadrao: "Não foi possível cadastrar pelo ISBN.",
  });

export const editarLivro = (id, livro) =>
  requisicao(`/livros/${id}`, {
    method: "PUT",
    body: livro,
    erroPadrao: "Erro ao editar livro.",
  });

export const apagarLivro = (id) =>
  requisicao(`/livros/${id}`, {
    method: "DELETE",
    erroPadrao: "Erro ao apagar livro.",
  });