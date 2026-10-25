const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


export async function getLivros() {
  const token = localStorage.getItem("token");
  let response;
  try {
    response = await fetch(`${API_URL}/livros`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
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