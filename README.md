# Biblioteca Front

Interface web do sistema de biblioteca,feito para o Desafio Front-end 2026/2 da Comp Júnior . Este front consome a API do projeto **[biblioteca-back](https://github.com/PedroMatos-01/biblioteca-back)** (Node.js, Sequelize, MySQL), desenvolvida na trilha de back-end que eu mesmo criei, formando um projeto full stack integrado.
A ideia é a mesma do back: uma versão simplificada do sistema que a biblioteca da UFLA usa. O leitor (aluno) consulta o catálogo, pega livros emprestados e renova. O administrador (bibliotecário) cadastra os livros e controla empréstimos e devoluções.

## Funcionalidades

- Cadastro de usuário e login com e-mail e senha (sessão mantida e logout)
- Catálogo de livros com capa, título e autor
- Página restrita: o catálogo só abre para usuários autenticados
- Perfil **administrador**: adicionar, editar e apagar livros (CRUD completo)
- Cadastro de livro por **ISBN**
- Indicador de carregamento e mensagens de erro e sucesso

## Pré-requisitos

- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e **aberto** (Docker Compose v2.20 ou superior)

Não é necessário instalar Node.js nem banco de dados: tudo roda dentro do Docker.

## Como rodar

O sistema usa **dois repositórios**. Clone os dois **na mesma pasta, lado a lado**:

```bash
mkdir biblioteca
cd biblioteca

git clone https://github.com/PedroMatos-01/biblioteca-back.git
git clone https://github.com/PedroMatos-01/biblioteca-front.git
```

Entre na pasta do front e suba tudo:

```bash
cd biblioteca-front
docker compose up --build
```

Esse único comando sobe o **banco de dados**, a **API** e o **front**. Na primeira vez demora mais, pois o Docker baixa as imagens e instala as dependências.

Quando terminar, acesse:

| Serviço | Endereço |
|---|---|
| Front | http://localhost:5173 |
| API | http://localhost:3000 |

Para parar tudo: `Ctrl + C` no terminal e depois `docker compose down`.

> Para rodar apenas a API e o banco, use `docker compose up --build` dentro da pasta `biblioteca-back`.

## Como testar

1. Abra http://localhost:5173 e crie uma conta em **Cadastro**.
2. Faça **login**. Você será levado ao catálogo.
3. Tente acessar http://localhost:5173/livros sem estar logado: o sistema redireciona para o login.
4. Para testar adicionar, editar e apagar livros, entre com o usuário **administrador**:
   - E-mail: `adm@exemplo.com`
   - Senha: `123456`

5. **Responsividade:** no navegador, abra as ferramentas do desenvolvedor (`F12`), ative o modo dispositivo (`Ctrl + Shift + M`) e teste as larguras de celular, tablet e desktop.

## Tecnologias e dependências

### Dependências do projeto

| Dependência | Por que foi usada |
|---|---|
| **react** | Biblioteca para construir a interface com componentes reutilizáveis (`Header`, `LivroCard`, `LivroForm`) e estado (`useState`, `useEffect`). |
| **react-dom** | Faz o React desenhar os componentes na página do navegador. |
| **react-router-dom** | Cria as rotas e a navegação entre telas sem recarregar a página, e permite proteger rotas (`RotaProtegida`) e redirecionar o usuário. |

### Ferramentas de desenvolvimento

| Dependência | Por que foi usada |
|---|---|
| **vite** | Servidor de desenvolvimento e ferramenta de build. É rápido e já lê variáveis de ambiente (`VITE_API_URL`). |
| **@vitejs/plugin-react** | Permite ao Vite entender JSX e o React. |
| **eslint** | Analisa o código e aponta erros e más práticas. |
| **@eslint/js**, **globals** | Regras base e variáveis globais do JavaScript usadas pelo ESLint. |
| **eslint-plugin-react-hooks** | Avisa de erros comuns no uso de hooks (`useEffect`, `useState`). |
| **eslint-plugin-react-refresh** | Garante que a atualização automática do Vite funcione corretamente com os componentes. |
| **@types/react**, **@types/react-dom** | Tipos usados pelo editor para dar sugestões e autocompletar. Não afetam o funcionamento. |

### Outras escolhas

- **fetch nativo** (em `services/api.js`): suficiente para as requisições do projeto, sem precisar de biblioteca extra.
- **CSS Modules**: cada componente tem seu CSS isolado, evitando conflito de nomes entre telas.
- **Docker Compose**: permite subir front, API e banco com um único comando, sem instalar nada além do Docker.
- **API própria (biblioteca-back)**: o front consome o back desenvolvido na trilha de back-end, resultando em um CRUD real e integrado.

## Estrutura do projeto

```
src/
├── components/     # Peças reutilizáveis
│   ├── Header.jsx          # Menu do topo
│   ├── Layout.jsx          # Moldura das páginas (Header + conteúdo)
│   ├── LivroCard.jsx       # Card de um livro
│   ├── LivroForm.jsx       # Formulário de criar/editar livro
│   └── RotaProtegida.jsx   # Redireciona para o login se não estiver logado
├── pages/          # Telas do app (Home, Login, Cadastro, Catalogo)
├── services/       # Comunicação com a API (api.js, auth.js)
├── styles/         # CSS global
├── App.jsx         # Rotas e estado de login
└── main.jsx        # Ponto de entrada
```

## Rotas do front

|    Rota    |         Tela          | Acesso  |
|------------|-----------------------|---------|
|     `/`    | Home                  | Público |
|  `/login`  | Login                 | Público |
| `/cadastro`| Cadastro              | Público |
| `/livros`  | Catálogo              | Somente logado |
|    `*`     | Página não encontrada | Público |

## Lógicas implementadas

- **Comunicação com a API:** todas as chamadas passam por uma função central (`requisicao`, em `services/api.js`), que monta a URL, o método e o corpo da requisição, envia o token quando a rota é protegida e converte falhas em mensagens amigáveis (erro de conexão, e-mail ou senha inválidos etc.).
- **Login e sessão:** após o login, o token é guardado no `localStorage` e no estado do `App`, o que mantém o usuário logado ao recarregar a página. O logout apaga o token.
- **Rota protegida:** `RotaProtegida` verifica se há token. Se não houver, redireciona para `/login`.
- **Catálogo:** a página busca os livros ao abrir (`useEffect`). Depois de criar, editar ou apagar, a lista é recarregada para refletir a mudança.
- **Perfil administrador:** os botões de adicionar, editar e apagar só aparecem para administradores. A permissão real é verificada pela API.

## Rotas da API usadas

| Método | Rota | Uso |
|---|---|---|
| POST | `/auth` | Login |
| POST | `/usuarios` | Cadastro de usuário |
| GET | `/livros` | Listar livros |
| POST | `/livros` | Criar livro (administrador) |
| POST | `/livros/isbn` | Criar livro por ISBN (administrador) |
| PUT | `/livros/:id` | Editar livro (administrador) |
| DELETE | `/livros/:id` | Apagar livro (administrador) |

## Autor


## Autor

**Pedro Henrique de Matos**

Estudante de Sistemas de Informação na UFLA | Desenvolvedor em formação.

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PedroMatos-01)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/pedromatos-dev)

