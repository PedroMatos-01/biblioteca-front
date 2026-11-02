const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` } : { "Content-Type": "application/json" };
};

export async function getLivros() {
  let response;
  try {
    response = await fetch(`${API_URL}/livros`, {
      headers: getAuthHeaders(),
    });
  } catch {
    throw new Error("Não foi possível conectar ao servidor.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.erro || data.message || "Erro ao carregar livros.");
  }
  return data;
}

export async function login(nome,email, senha) {
  let response;
  try {
    response = await fetch(`${API_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({nome,email, senha }),
    });
  } catch {
    throw new Error("Não foi possível conectar ao servidor.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.erro || data.message || "E-mail ou senha inválidos.");
  }

  return data;
}
export async function cadastrar(nome, email, senha) {
  let response;
  try {
    response = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });
  } catch {
    throw new Error("Não foi possível conectar ao servidor.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.erro || data.message || "Não foi possível realizar o cadastro."
    );
  }

  return data;
}



export async function criarLivro(livro) {
  const response = await fetch(`${API_URL}/livros`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(livro),
  });
  if (!response.ok) throw new Error("Erro ao criar livro.");
  return await response.json();
}

export async function editarLivro(id, livro) {
  const response = await fetch(`${API_URL}/livros/${id}`, {
    method: "PUT", 
    headers: getAuthHeaders(),
    body: JSON.stringify(livro),
  });
  if (!response.ok) throw new Error("Erro ao editar livro.");
  return await response.json();
}

export async function apagarLivro(id) {
  const response = await fetch(`${API_URL}/livros/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Erro ao apagar livro.");
  return true;
}