

# 📚 Museu Literário Brasileiro

Bem-vindo ao repositório do **Museu Literário Brasileiro**! Este projeto foi desenvolvido por **Samuel dos Santos Braga** como parte do curso de **Desenvolvimento de Sistemas - 2TDS2** no **SENAI Valinhos-SP** (2025).  
Orientadores: **Felipe Santos** e **Felipe Mamprim**.

---

## 👨‍💻 Sobre o Projeto

O Museu Literário Brasileiro é uma plataforma web que funciona como um museu virtual de obras literárias nacionais. O objetivo é proporcionar uma experiência moderna, interativa e educativa para amantes da literatura, estudantes e curiosos, permitindo explorar livros, autores, avaliações e criar perfis personalizados.

---

## 🏛️ Estrutura do Site

O site segue uma arquitetura de múltiplas páginas, cada uma com uma URL e recurso distinto:

### 🌐 Páginas Principais
- **Página Inicial (/):** Fachada do museu, com título, subtítulo e descrição.
- **Página de Livros (/livros):** Catálogo principal com busca, filtros e paginação.
- **Página de Livro (/livro/{id}):** Detalhes completos de uma obra.
- **Página de Perfil (/perfil):** Área do usuário, favoritos e informações pessoais.

### 🔐 Páginas de Autenticação
- **Login (/login):** Formulário de entrada.
- **Cadastro (/cadastro):** Criação de conta.

### 🧩 Componentes Reutilizáveis
- **Navbar & Footer:** Presentes em todas as páginas (exceto autenticação).
- **Barra de Pesquisa:** Modular, usada em várias áreas.
- **Card do Livro:** Exibe capa, título, autor e ano.

---

## ⚙️ Funcionalidades por Página

### 🏠 Página Inicial
- Título "Museu Literário Brasileiro", subtítulo e texto convidativo.
- Navegação para áreas principais.

### 📖 Página de Livros
- Barra de pesquisa por título/autor.
- Listagem dinâmica de livros (lazy loading/paginação).
- Filtros por categoria (Romance, Realismo, etc).

### 📚 Página de Livro
- Layout de duas colunas, conteúdo dinâmico.
- Detalhes: capa, título, autor, ano, gênero, dificuldade, páginas, descrição, preço médio, adaptações.
- Avaliação média em estrelas, nota do usuário, favoritos.

### 👤 Página de Perfil
- Livro de destaque selecionável.
- Informações pessoais editáveis.
- Lista de favoritos categorizados: "Lendo", "Vou Ler", "Já Li".
- Botão de logout seguro.

---

## 🔄 Lógica de Navegação & Autenticação

- **Navbar Logada:** Botão perfil e sair.
- **Navbar Deslogada:** Botão "Conta" leva ao login.
- **Login:** Link para cadastro.

---

## 🗄️ Estrutura de Dados (Prisma)

### 👥 Tabela User
- `id`, `name`, `email`, `username`, `password`, `birthYear`, `joinDate`, `featuredBookId`

### 📚 Tabela Book
- `id`, `title`, `author`, `releaseYear`, `description`, `price`, `cover`, `genre`, `difficulty`, `pages`, `adaptation`, `averageRating`

### ⭐ Tabela UserFavoriteBook
- `userId`, `bookId`, `status` (Lendo, Vou Ler, Já Li)

### 🌟 Tabela BookRating
- `userId`, `bookId`, `rating`

---

## 🚀 Rotas de API

### 🔑 Autenticação
- `POST /api/auth/register` — Cria usuário
- `POST /api/auth/login` — Autentica e retorna token

### 👤 Usuário & Perfil
- `GET /api/user/profile` — Dados do perfil
- `PUT /api/user/profile` — Atualiza perfil
- `PUT /api/user/profile/featured-book` — Define livro destaque

### 📚 Livros
- `GET /api/books` — Lista de livros (busca, filtro, paginação)
- `GET /api/books/popular` — Livros populares
- `GET /api/books/{id}` — Detalhes do livro
- `POST /api/books/{id}/rate` — Avaliação do usuário

### ⭐ Favoritos
- `GET /api/user/favorites` — Lista de favoritos
- `POST /api/user/favorites` — Adiciona favorito
- `PUT /api/user/favorites/{id}/status` — Altera status
- `DELETE /api/user/favorites/{id}` — Remove favorito

---

## 🎨 Detalhes de Estilização

### 🌈 Paleta de Cores
- **Fundo:** `#F7F5EF` (branco suave)
- **Cards/Contêineres:** `#EDE4D4` (bege suave)
- **Destaque:** `#B98F5F` (marrom quente)
- **Texto Principal:** `#623E31` (marrom escuro)
- **Navbar/Footer:** `#55362E` (marrom profundo)

### 🖋️ Tipografia
- Fonte: **Inter**
- Títulos: Negrito (`font-weight: 700`)
- Corpo: Peso normal

### 📐 Layout & Espaçamento
- Cantos arredondados
- Sombras suaves
- Espaçamento generoso

---

## 🖼️ Estilos por Página

### 🏠 Home
- Navbar/Footer: fundo `#55362E`, texto `#F7F5EF`
- Título centralizado, negrito, cor `#623E31`
- Carrossel de livros em destaque, fundo `#EDE4D4`
- Barra de pesquisa em contêiner arredondado, borda destaca ao focar
- Sobre o desenvolvedor: foto circular, texto `#623E31`, links estilizados

### 📚 Livro (Detalhes)
- Layout fluido e responsivo
- Capa central, sombra proeminente
- Autor em box distinto, fundo `#EDE4D4`, foto circular
- Outras edições/adaptações com títulos em negrito

### 📖 Livros (Catálogo)
- Dividido por categorias, títulos em negrito `#623E31`
- Grade responsiva de cards

### 👤 Perfil
- Informações em lista vertical, foto circular
- Campo de senha com ícone "olho" `#B98F5F`
- Botão editar/salvar com cor de destaque
- Livro destaque com borda especial
- Favoritos em grade, etiquetas de status coloridas
- Botão sair proeminente, fundo `#B98F5F`

### 🔐 Autenticação
- Formulário centralizado, contêiner arredondado, sombra suave
- Inputs com borda arredondada, transição para `#B98F5F` ao focar
- Botões padrão, fundo `#B98F5F`, texto branco
- Link para cadastro estilizado

---

## 👨‍🎓 Desenvolvedor

**Samuel dos Santos Braga**  
Curso: Desenvolvimento de Sistemas 2TDS2  
SENAI | Valinhos-SP  
Valinhos-SP, 2025

[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://www.linkedin.com/)  
[![GitHub](https://img.shields.io/badge/GitHub-black?logo=github)](https://github.com/)

---

## 👨‍🏫 Professores & Orientadores

- Felipe Santos
- Felipe Mamprim

---

## 📝 Observações

Projeto livre, desenvolvido para fins educacionais e de demonstração.

---

## ✨ Contribua!
Sinta-se à vontade para abrir issues, sugerir melhorias ou enviar pull requests!
