# API - Museu Literário Brasileiro 📚# 🏛️ Museu Literário Brasileiro - API



Uma plataforma completa para exploração e gestão de obras literárias brasileiras, desenvolvida com Node.js, Express e Prisma ORM. Inclui sistema de seguidores estilo Instagram para escritores.## Descrição

API RESTful para um museu virtual de obras literárias nacionais, permitindo cadastro, autenticação, upload de imagens, gerenciamento de livros, escritores, favoritos e perfis de usuário.

## 🎯 Objetivo

---

O Projeto Museu Literário Brasileiro é uma API RESTful que visa preservar e promover a literatura brasileira através de uma plataforma digital moderna. A API permite o gerenciamento completo de obras, escritores, usuários, favoritos e um sistema de seguidores, oferecendo funcionalidades de busca, categorização e descoberta de conteúdo literário nacional.

## Funcionalidades Principais

## 🌟 Funcionalidades Principais- Cadastro e login de usuários com autenticação JWT

- Upload de imagem para perfil de usuário e capa de livro

### ✅ Gerenciamento de Livros- CRUD de livros, escritores e favoritos

- ✅ Listagem completa de livros- Filtros e paginação para busca de livros

- ✅ Busca por gênero literário- Validação de dados robusta com Joi

- ✅ Filtros avançados (escritor, ano, dificuldade)- Proteção de rotas sensíveis

- ✅ CRUD completo para administradores- Relacionamentos entre usuários, livros e escritores

- ✅ Sistema de destaque para obras importantes

---

### ✅ Gerenciamento de Escritores

- ✅ Catálogo completo de autores brasileiros## Tecnologias Utilizadas

- ✅ Biografias detalhadas com datas de nascimento/falecimento- Node.js + Express

- ✅ Obras associadas por escritor- Prisma ORM (SQLite)

- ✅ Sistema de fotos/avatares- Joi (validação)

- ✅ Contadores de seguidores dinâmicos- Multer (upload de arquivos)

- JWT (autenticação)

### ✅ Sistema de Usuários- Estrutura modular (controllers, models, routes, middleware)

- ✅ Registro e autenticação com JWT

- ✅ Tipos de usuário (Normal, Escritor)---

- ✅ Perfis personalizáveis

- ✅ Upload de fotos de perfil## Como Rodar o Projeto



### ✅ Sistema de Favoritos1. Instale as dependências:

- ✅ Adicionar/remover livros favoritos	 ```bash

- ✅ Listagem pessoal de favoritos	 npm install

- ✅ Recomendações baseadas em preferências	 ```

2. Configure o banco de dados (SQLite):

### ✅ Sistema de Seguidores (Estilo Instagram)	 ```bash

- ✅ Seguir e deixar de seguir escritores	 npx prisma migrate dev

- ✅ Listar escritores seguidos	 npx prisma generate

- ✅ Visualizar seguidores de escritores	 ```

- ✅ Ranking de escritores mais seguidos3. Inicie o servidor:

- ✅ Estatísticas pessoais de seguimentos	 ```bash

- ✅ Verificação de status de seguimento	 npm run dev

	 ```

### ✅ Dashboard e Estatísticas4. (Opcional) Crie um arquivo `.env` para variáveis de ambiente.

- ✅ Estatísticas gerais do sistema

- ✅ Análises de popularidade por gênero---

- ✅ Ranking de escritores mais populares

- ✅ Métricas de usuários ativos## Estrutura de Pastas

- ✅ Estatísticas de seguidores

```

## 🛠️ Tecnologias Utilizadassrc/

	controllers/

- **Node.js** - Runtime JavaScript	models/

- **Express.js** - Framework web	routes/

- **Prisma ORM** - Object-Relational Mapping	middleware/

- **SQLite** - Banco de dados local	validations/

- **JWT** - Autenticação e autorizaçãoprisma/

- **Bcrypt** - Criptografia de senhasuploads/

- **Multer** - Upload de arquivos```

- **Joi** - Validação de dados

- **CORS** - Cross-Origin Resource Sharing---



## 📊 Base de Dados## Como Usar a API



O projeto conta com uma rica base de dados pré-populada contendo:### Upload de Imagem (Usuário ou Livro)

- Endpoint: `POST /upload/foto`

### 📖 Livros (43 obras)- Formato: `multipart/form-data` com campo `foto`

**Obras de Clarice Lispector (23 obras):**- Resposta: `{ "url": "/uploads/nomedoarquivo.jpg" }`

- **Romances**: Perto do Coração Selvagem (1943), O Lustre (1946), A Cidade Sitiada (1949), A Maçã no Escuro (1961), A Paixão Segundo G.H. (1964), Uma Aprendizagem ou O Livro dos Prazeres (1969), Água Viva (1973), A Hora da Estrela (1977), Um Sopro de Vida (1978)

- **Contos**: Laços de Família (1960), A Legião Estrangeira (1964), Felicidade Clandestina (1971), A Imitação da Rosa (1973), Onde Estivestes de Noite (1974), A Via Crucis do Corpo (1974), A Bela e a Fera (1979)### Exemplos de Requisições HTTP

- **Crônicas**: Para Não Esquecer (1978), A Descoberta do Mundo (1984)

- **Literatura Infantil**: O Mistério do Coelho Pensante (1967), A Mulher que Matou os Peixes (1968), A Vida Íntima de Laura (1974), Quase de Verdade (1978), Como Nasceram as Estrelas (1987)#### Registrar usuário

POST /auth/register

**Outras obras clássicas:**Body (JSON):

- **Machado de Assis**: Dom Casmurro, Memórias Póstumas de Brás Cubas```

- **José de Alencar**: Iracema, O Guarani, Senhora{

- **Lima Barreto**: Triste Fim de Policarpo Quaresma, Recordações do Escrivão Isaías Caminha	"nome": "João",

- **Rachel de Queiroz**: O Quinze, Dôra, Doralina	"nomeUsuario": "joao123",

- **Escritores contemporâneos**: Carla Madeira, Conceição Evaristo	"email": "joao@email.com",

	"senha": "senha123",

### 👥 Escritores (7 autores)	"nascimento": 2000,

- **Machado de Assis** (1839-1908) - Realismo	"idade": 25,

- **Clarice Lispector** (1920-1977) - Literatura Moderna/Introspectiva	"tipo": "NORMAL",

- **José de Alencar** (1829-1877) - Romantismo	"foto": "/uploads/foto-perfil.jpg" // opcional, use a URL do upload

- **Lima Barreto** (1881-1922) - Pré-Modernismo}

- **Rachel de Queiroz** (1910-2003) - Romance Social```

- **Carla Madeira** (1966-) - Literatura Contemporânea

- **Conceição Evaristo** (1946-) - Literatura Afro-brasileira#### Login

POST /auth/login

### 🎭 Gêneros LiteráriosBody (JSON):

- Romance (15 obras)```

- Contos (11 obras){

- Crônicas (3 obras)	"email": "joao@email.com",

- Literatura Infantil (5 obras)	"senha": "senha123"

- Teatro}

- Poesia```



## 🚀 Instalação e Configuração#### Criar livro

POST /livros

### Pré-requisitosHeaders: Authorization: Bearer <token>

- Node.js 18+ instaladoBody (JSON):

- Git instalado```

{

### Passo a passo	"titulo": "Dom Casmurro",

	"anoLancamento": 1899,

1. **Clone o repositório**	"autorId": 1,

```bash	"descricao": "Romance clássico brasileiro.",

git clone https://github.com/samuelbrag4/pj-museu-literario-api	"mediaPreco": 39.9,

cd pj-museu-literario-api	"imagem": "/uploads/capa-livro.jpg", // use a URL do upload

```	"genero": "Romance",

	"dificuldade": "ALTA",

2. **Instale as dependências**	"temAdaptacao": true,

```bash	"numeroPaginas": 240

npm install}

``````



3. **Configure o banco de dados**#### Upload de imagem (exemplo com cURL)

```bash```bash

# Gerar o cliente Prismacurl -X POST http://localhost:3000/upload/foto -F "foto=@/caminho/para/imagem.jpg"

npx prisma generate```



# Executar migrações#### Outras rotas

npx prisma migrate dev- Listar, buscar, atualizar e deletar usuários, livros, escritores e favoritos seguem o padrão REST e estão detalhadas nos controllers e nas rotas.



# Popular o banco com dados de exemplo---

npm run seed

```## Validações e Regras de Negócio



4. **Inicie o servidor**- Todos os dados são validados com Joi antes de serem salvos.

```bash- Campos obrigatórios e formatos aceitos estão descritos nos exemplos.

# Desenvolvimento (com auto-reload)- Upload aceita apenas imagens (png, jpg, jpeg, gif, webp) até 5MB.

npm run dev- O campo `imagem` (livro) e `foto` (usuário) deve receber a URL retornada pelo upload.



# Produção---

npm start

```## Observações



O servidor estará rodando em `http://localhost:5000`- O projeto segue boas práticas de organização e segurança.

- O endpoint de upload pode ser usado tanto para foto de usuário quanto para capa de livro.

## 📚 Documentação da API- Para testar, use ferramentas como Postman, Insomnia ou cURL.



### 🔐 Autenticação---



#### POST `/auth/register`## Créditos

Registra um novo usuário no sistema.

Desenvolvido por Samuel dos Santos Braga  

**Body:**Curso: Desenvolvimento de Sistemas - 2TDS2 - SENAI Valinhos-SP (2025)  

```jsonOrientadores: Felipe Santos e Felipe Mamprim

{

  "nome": "João Silva",## Livros

  "email": "joao@email.com",

  "senha": "senha123",### Listar todos os livros (com filtros)

  "tipo": "NORMAL"GET /livros?titulo=Dom&genero=Romance&autor=Machado&dificuldade=ALTA&pagina=1&limite=10

}

```### Buscar livro por ID

GET /livros/1

**Resposta (201):**Headers: Authorization: Bearer <token>

```json

{### Criar livro

  "message": "Usuário criado com sucesso",POST /livros

  "user": {Headers: Authorization: Bearer <token>

    "id": 1,Body (JSON):

    "nome": "João Silva",```

    "email": "joao@email.com",{

    "tipo": "NORMAL"	"titulo": "Dom Casmurro",

  },	"anoLancamento": 1899,

  "token": "jwt_token_aqui"	"autorId": 4,

}	"descricao": "Romance clássico de Machado de Assis.",

```	"mediaPreco": 34.9,

	"imagem": "https://...",

#### POST `/auth/login`	"genero": "Romance",

Autentica um usuário existente.	"dificuldade": "ALTA",

	"temAdaptacao": true,

**Body:**	"numeroPaginas": 240

```json}

{```

  "email": "joao@email.com",

  "senha": "senha123"### Atualizar livro

}PUT /livros/1

```Headers: Authorization: Bearer <token>

Body (JSON):

**Resposta (200):**```

```json{

{	"titulo": "Dom Casmurro (Edição Especial)"

  "message": "Login realizado com sucesso",}

  "user": {```

    "id": 1,

    "nome": "João Silva",### Deletar livro

    "email": "joao@email.com",DELETE /livros/1

    "tipo": "NORMAL"Headers: Authorization: Bearer <token>

  },

  "token": "jwt_token_aqui"---

}

```## Escritores



### 📖 Livros### Listar escritores

GET /escritores

#### GET `/livros`

Lista todos os livros disponíveis.---



**Query Parameters:**## Favoritos

- `genero` (opcional): Filtrar por gênero

- `autor` (opcional): Filtrar por autor### Listar favoritos

- `dificuldade` (opcional): Filtrar por nível de dificuldadeGET /favoritos



**Resposta (200):**---

```json

[**Obs:** Para rotas protegidas, sempre inclua o header `Authorization: Bearer <token>`.

  {

    "id": 1,

    "titulo": "Dom Casmurro",# 📚 Museu Literário Brasileiro

    "autor": "Machado de Assis",

    "genero": "Romance",Bem-vindo ao repositório do **Museu Literário Brasileiro**! Este projeto foi desenvolvido por **Samuel dos Santos Braga** como parte do curso de **Desenvolvimento de Sistemas - 2TDS2** no **SENAI Valinhos-SP** (2025).  

    "anoPublicacao": 1899,Orientadores: **Felipe Santos** e **Felipe Mamprim**.

    "sinopse": "Uma das obras mais importantes...",

    "capa": "url_da_capa",---

    "dificuldade": "MEDIO",

    "destaque": true,## 👨‍💻 Sobre o Projeto

    "escritor": {

      "id": 1,O Museu Literário Brasileiro é uma plataforma web que funciona como um museu virtual de obras literárias nacionais. O objetivo é proporcionar uma experiência moderna, interativa e educativa para amantes da literatura, estudantes e curiosos, permitindo explorar livros, autores, avaliações e criar perfis personalizados.

      "nome": "Machado de Assis"

    }---

  }

]## 🏛️ Estrutura do Site

```

O site segue uma arquitetura de múltiplas páginas, cada uma com uma URL e recurso distinto:

#### GET `/livros/generos`

Lista todos os gêneros disponíveis.### 🌐 Páginas Principais

- **Página Inicial (/):** Fachada do museu, com título, subtítulo e descrição.

**Resposta (200):**- **Página de Livros (/livros):** Catálogo principal com busca, filtros e paginação.

```json- **Página de Livro (/livro/{id}):** Detalhes completos de uma obra.

[- **Página de Perfil (/perfil):** Área do usuário, favoritos e informações pessoais.

  "Romance",

  "Contos",### 🔐 Páginas de Autenticação

  "Crônicas",- **Login (/login):** Formulário de entrada.

  "Literatura Infantil",- **Cadastro (/cadastro):** Criação de conta.

  "Teatro",

  "Poesia"### 🧩 Componentes Reutilizáveis

]- **Navbar & Footer:** Presentes em todas as páginas (exceto autenticação).

```- **Barra de Pesquisa:** Modular, usada em várias áreas.

- **Card do Livro:** Exibe capa, título, autor e ano.

#### GET `/livros/por-genero`

Lista livros agrupados por gênero.---



**Resposta (200):**## ⚙️ Funcionalidades por Página

```json

{### 🏠 Página Inicial

  "Romance": [- Título "Museu Literário Brasileiro", subtítulo e texto convidativo.

    {- Navegação para áreas principais.

      "id": 1,

      "titulo": "Dom Casmurro",### 📖 Página de Livros

      "autor": "Machado de Assis"- Barra de pesquisa por título/autor.

    }- Listagem dinâmica de livros (lazy loading/paginação).

  ],- Filtros por categoria (Romance, Realismo, etc).

  "Contos": [

    {### 📚 Página de Livro

      "id": 2,- Layout de duas colunas, conteúdo dinâmico.

      "titulo": "Laços de Família",- Detalhes: capa, título, autor, ano, gênero, dificuldade, páginas, descrição, preço médio, adaptações.

      "autor": "Clarice Lispector"- Avaliação média em estrelas, nota do usuário, favoritos.

    }

  ]### 👤 Página de Perfil

}- Livro de destaque selecionável.

```- Informações pessoais editáveis.

- Lista de favoritos categorizados: "Lendo", "Vou Ler", "Já Li".

#### GET `/livros/autor/:autorId` 🔒- Botão de logout seguro.

Lista livros de um autor específico. **Requer autenticação.**

---

#### GET `/livros/:id` 🔒

Obtém detalhes de um livro específico. **Requer autenticação.**## 🔄 Lógica de Navegação & Autenticação



#### POST `/livros` 🔒- **Navbar Logada:** Botão perfil e sair.

Cria um novo livro. **Requer autenticação.**- **Navbar Deslogada:** Botão "Conta" leva ao login.

- **Login:** Link para cadastro.

#### PUT `/livros/:id` 🔒

Atualiza um livro existente. **Requer autenticação.**---



#### DELETE `/livros/:id` 🔒## 🗄️ Estrutura de Dados (Prisma)

Remove um livro. **Requer autenticação.**

### 👥 Tabela User

### 👨‍💼 Escritores- `id`, `name`, `email`, `username`, `password`, `birthYear`, `joinDate`, `featuredBookId`



#### GET `/escritores`### 📚 Tabela Book

Lista todos os escritores cadastrados com contador de seguidores.- `id`, `title`, `author`, `releaseYear`, `description`, `price`, `cover`, `genre`, `difficulty`, `pages`, `adaptation`, `averageRating`



**Resposta (200):**### ⭐ Tabela UserFavoriteBook

```json- `userId`, `bookId`, `status` (Lendo, Vou Ler, Já Li)

[

  {### 🌟 Tabela BookRating

    "id": 1,- `userId`, `bookId`, `rating`

    "nome": "Machado de Assis",

    "biografia": "Machado de Assis foi um escritor brasileiro...",---

    "dataNascimento": "1839-06-21T00:00:00.000Z",

    "dataFalecimento": "1908-09-29T00:00:00.000Z",## 🚀 Rotas de API

    "foto": "url_da_foto",

    "_count": {### 🔑 Autenticação

      "livros": 3,- `POST /api/auth/register` — Cria usuário

      "seguidores": 15- `POST /api/auth/login` — Autentica e retorna token

    }

  }### 👤 Usuário & Perfil

]- `GET /api/user/profile` — Dados do perfil

```- `PUT /api/user/profile` — Atualiza perfil

- `PUT /api/user/profile/featured-book` — Define livro destaque

#### GET `/escritores/:id`

Obtém detalhes de um escritor específico, incluindo suas obras e seguidores.### 📚 Livros

- `GET /api/books` — Lista de livros (busca, filtro, paginação)

**Resposta (200):**- `GET /api/books/popular` — Livros populares

```json- `GET /api/books/{id}` — Detalhes do livro

{- `POST /api/books/{id}/rate` — Avaliação do usuário

  "id": 1,

  "nome": "Machado de Assis",### ⭐ Favoritos

  "biografia": "Biografia completa...",- `GET /api/user/favorites` — Lista de favoritos

  "dataNascimento": "1839-06-21T00:00:00.000Z",- `POST /api/user/favorites` — Adiciona favorito

  "dataFalecimento": "1908-09-29T00:00:00.000Z",- `PUT /api/user/favorites/{id}/status` — Altera status

  "foto": "url_da_foto",- `DELETE /api/user/favorites/{id}` — Remove favorito

  "_count": {

    "seguidores": 15---

  },

  "livros": [## 🎨 Detalhes de Estilização

    {

      "id": 1,### 🌈 Paleta de Cores

      "titulo": "Dom Casmurro",- **Fundo:** `#F7F5EF` (branco suave)

      "genero": "Romance",- **Cards/Contêineres:** `#EDE4D4` (bege suave)

      "anoPublicacao": 1899- **Destaque:** `#B98F5F` (marrom quente)

    }- **Texto Principal:** `#623E31` (marrom escuro)

  ]- **Navbar/Footer:** `#55362E` (marrom profundo)

}

```### 🖋️ Tipografia

- Fonte: **Inter**

#### POST `/escritores` 🔒- Títulos: Negrito (`font-weight: 700`)

Cria um novo escritor. **Requer autenticação.**- Corpo: Peso normal



#### PUT `/escritores/:id` 🔒### 📐 Layout & Espaçamento

Atualiza dados de um escritor. **Requer autenticação.**- Cantos arredondados

- Sombras suaves

#### DELETE `/escritores/:id` 🔒- Espaçamento generoso

Remove um escritor. **Requer autenticação.**

---

### 👥 Sistema de Seguidores

## 🖼️ Estilos por Página

#### POST `/seguidores/seguir/:escritorId` 🔒

Segue um escritor. **Requer autenticação.**### 🏠 Home

- Navbar/Footer: fundo `#55362E`, texto `#F7F5EF`

**Resposta (201):**- Título centralizado, negrito, cor `#623E31`

```json- Carrossel de livros em destaque, fundo `#EDE4D4`

{- Barra de pesquisa em contêiner arredondado, borda destaca ao focar

  "message": "Agora você está seguindo Clarice Lispector",- Sobre o desenvolvedor: foto circular, texto `#623E31`, links estilizados

  "seguindo": {

    "id": 1,### 📚 Livro (Detalhes)

    "usuarioId": 1,- Layout fluido e responsivo

    "escritorId": 2,- Capa central, sombra proeminente

    "dataInicio": "2025-01-09T10:30:00.000Z"- Autor em box distinto, fundo `#EDE4D4`, foto circular

  }- Outras edições/adaptações com títulos em negrito

}

```### 📖 Livros (Catálogo)

- Dividido por categorias, títulos em negrito `#623E31`

#### DELETE `/seguidores/deixar-de-seguir/:escritorId` 🔒- Grade responsiva de cards

Para de seguir um escritor. **Requer autenticação.**

### 👤 Perfil

**Resposta (200):**- Informações em lista vertical, foto circular

```json- Campo de senha com ícone "olho" `#B98F5F`

{- Botão editar/salvar com cor de destaque

  "message": "Você parou de seguir Clarice Lispector"- Livro destaque com borda especial

}- Favoritos em grade, etiquetas de status coloridas

```- Botão sair proeminente, fundo `#B98F5F`



#### GET `/seguidores/meus-escritores` 🔒### 🔐 Autenticação

Lista os escritores que o usuário segue. **Requer autenticação.**- Formulário centralizado, contêiner arredondado, sombra suave

- Inputs com borda arredondada, transição para `#B98F5F` ao focar

**Resposta (200):**- Botões padrão, fundo `#B98F5F`, texto branco

```json- Link para cadastro estilizado

[

  {---

    "id": 1,

    "dataInicio": "2025-01-09T10:30:00.000Z",## 👨‍🎓 Desenvolvedor

    "escritor": {

      "id": 2,**Samuel dos Santos Braga**  

      "nome": "Clarice Lispector",Curso: Desenvolvimento de Sistemas 2TDS2  

      "foto": "url_da_foto",SENAI | Valinhos-SP  

      "_count": {Valinhos-SP, 2025

        "livros": 23,

        "seguidores": 42[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://www.linkedin.com/)  

      }[![GitHub](https://img.shields.io/badge/GitHub-black?logo=github)](https://github.com/)

    }

  }---

]

```## 👨‍🏫 Professores & Orientadores



#### GET `/seguidores/verificar/:escritorId` 🔒- Felipe Santos

Verifica se o usuário segue um escritor específico. **Requer autenticação.**- Felipe Mamprim



**Resposta (200):**---

```json

{## 📝 Observações

  "seguindo": true,

  "dataInicio": "2025-01-09T10:30:00.000Z"Projeto livre, desenvolvido para fins educacionais e de demonstração.

}

```---



#### GET `/seguidores/minhas-estatisticas` 🔒## ✨ Contribua!

Estatísticas pessoais de seguimento do usuário. **Requer autenticação.**Sinta-se à vontade para abrir issues, sugerir melhorias ou enviar pull requests!



**Resposta (200):**---

```json

{## 🧪 Testando Requisições com Postman

  "totalEscritoresSeguindo": 3,

  "escritoresPorGenero": [Aqui estão exemplos práticos de como testar as principais rotas da API usando o Postman:

    {

      "genero": "Romance",### 1. Registro de Usuário

      "quantidade": 2**Método:** POST  

    }**URL:** `http://localhost:5000/auth/register`

  ],**Body (JSON):**

  "dataUltimoSeguimento": "2025-01-09T10:30:00.000Z"```json

}{

```	"nome": "Samuel Braga",

	"nomeUsuario": "samuelbraga",

#### GET `/seguidores/escritor/:escritorId/seguidores`	"email": "samuel.d.braga6@aluno.senai.br",

Lista os seguidores de um escritor específico (público).	"senha": "contaTeste123",

	"nascimento": 2000,

**Resposta (200):**	"idade": 25

```json}

{```

  "escritor": {

    "id": 2,### 2. Login de Usuário

    "nome": "Clarice Lispector"**Método:** POST  

  },**URL:** `http://localhost:5000/auth/login`

  "totalSeguidores": 42,**Body (JSON):**

  "seguidores": [```json

    {{

      "id": 1,	"email": "samuel.d.braga6@aluno.senai.br",

      "dataInicio": "2025-01-09T10:30:00.000Z",	"senha": "contaTeste123"

      "usuario": {}

        "id": 1,```

        "nome": "João Silva",**Resposta:**

        "foto": "url_da_foto"```json

      }{

    }	"message": "Login realizado com sucesso!",

  ]	"token": "SEU_TOKEN_JWT_AQUI",

}	"user": { ...dados do usuário... }

```}

```

#### GET `/seguidores/usuario/:usuarioId/seguindo`

Lista os escritores que um usuário específico segue (público).### 3. Usando o Token JWT

Para acessar rotas protegidas, adicione o token JWT no header:

#### GET `/seguidores/ranking````

Ranking dos escritores mais seguidos (público).Authorization: Bearer SEU_TOKEN_JWT_AQUI

```

**Resposta (200):**

```json### 4. Buscar Todos os Usuários (Protegida)

[**Método:** GET  

  {**URL:** `http://localhost:5000/usuarios`

    "id": 2,**Headers:**

    "nome": "Clarice Lispector",```

    "foto": "url_da_foto",Authorization: Bearer SEU_TOKEN_JWT_AQUI

    "_count": {```

      "seguidores": 42,

      "livros": 23### 5. Buscar Usuário por ID (Protegida)

    }**Método:** GET  

  },**URL:** `http://localhost:5000/usuarios/1`

  {**Headers:**

    "id": 1,```

    "nome": "Machado de Assis",Authorization: Bearer SEU_TOKEN_JWT_AQUI

    "_count": {```

      "seguidores": 38,

      "livros": 3### 6. Deletar Usuário (Protegida)

    }**Método:** DELETE  

  }**URL:** `http://localhost:5000/usuarios/1`

]**Headers:**

``````

Authorization: Bearer SEU_TOKEN_JWT_AQUI

#### GET `/seguidores/usuario/:usuarioId/estatisticas````

Estatísticas de seguimento de um usuário específico (público).

---

### ❤️ Favoritos

> Para testar outras rotas, siga o mesmo padrão: envie o token no header e o corpo conforme o endpoint. Qualquer dúvida, consulte os exemplos acima ou peça ajuda!

#### GET `/favoritos`
Lista todos os favoritos do sistema (público).

#### GET `/favoritos/:id`
Obtém detalhes de um favorito específico (público).

#### POST `/favoritos` 🔒
Adiciona um livro aos favoritos. **Requer autenticação.**

**Body:**
```json
{
  "livroId": 1
}
```

#### PUT `/favoritos/:id` 🔒
Atualiza um favorito. **Requer autenticação.**

#### DELETE `/favoritos/:id` 🔒
Remove um livro dos favoritos. **Requer autenticação.**

### 👥 Usuários

#### GET `/users`
Lista usuários públicos (pode filtrar por tipo).

**Query Parameters:**
- `tipo=escritor`: Filtra apenas usuários do tipo escritor

#### GET `/usuarios` 🔒
Lista todos os usuários (admin). **Requer autenticação.**

#### GET `/usuarios/:id` 🔒
Obtém detalhes de um usuário específico. **Requer autenticação.**

#### PUT `/usuarios/:id` 🔒
Atualiza dados do usuário (admin). **Requer autenticação.**

#### DELETE `/usuarios/:id` 🔒
Remove um usuário (admin). **Requer autenticação.**

#### GET `/users/:id` 🔒
Obtém detalhes de um usuário específico. **Requer autenticação.**

#### PUT `/users/:id` 🔒
Atualiza dados do usuário. **Requer autenticação.**

#### DELETE `/users/:id` 🔒
Remove um usuário. **Requer autenticação.**

#### POST `/users/upload-photo` 🔒
Upload de foto de perfil. **Requer autenticação.**

**Body (multipart/form-data):**
- `foto`: Arquivo de imagem

#### POST `/upload/foto`
Upload de foto (público).

**Body (multipart/form-data):**
- `foto`: Arquivo de imagem

### 📊 Dashboard

#### GET `/dashboard/estatisticas`
Estatísticas gerais do sistema.

**Resposta (200):**
```json
{
  "totalLivros": 43,
  "totalEscritores": 7,
  "totalUsuarios": 5,
  "totalSeguidores": 28,
  "livrosPorGenero": [
    {
      "genero": "Romance",
      "quantidade": 15
    }
  ],
  "generosMaisPopulares": [
    {
      "genero": "Romance",
      "quantidade": 15
    }
  ],
  "escritoresMaisSeguidos": [
    {
      "nome": "Clarice Lispector",
      "seguidores": 42
    }
  ]
}
```

#### GET `/dashboard/livros-stats`
Estatísticas específicas de livros.

#### GET `/dashboard/escritores-stats`
Estatísticas específicas de escritores.

#### GET `/dashboard/usuarios-stats`
Estatísticas específicas de usuários.

#### GET `/dashboard/generos-stats`
Estatísticas por gênero literário.

## 🧪 Testando a API

### Usando curl

1. **Registrar um usuário:**
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste Usuario",
    "email": "teste@email.com",
    "senha": "senha123",
    "tipo": "NORMAL"
  }'
```

2. **Fazer login:**
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@email.com",
    "senha": "senha123"
  }'
```

3. **Listar livros (público):**
```bash
curl http://localhost:5000/livros
```

4. **Seguir um escritor (substitua YOUR_TOKEN):**
```bash
curl -X POST http://localhost:5000/seguidores/seguir/2 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

5. **Ver ranking de escritores mais seguidos:**
```bash
curl http://localhost:5000/seguidores/ranking
```

6. **Acessar rota protegida (substitua YOUR_TOKEN):**
```bash
curl -X GET http://localhost:5000/livros/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Usando ferramentas gráficas

Recomendamos o uso de ferramentas como **Insomnia**, **Postman** ou **Thunder Client** (extensão do VS Code) para uma experiência mais amigável ao testar as rotas da API.

### Dados de Teste

O sistema já vem com dados pré-cadastrados após executar o comando `npm run seed`:

**Usuários de exemplo:**
- Email: `usuario@teste.com` | Senha: `senha123` | Tipo: NORMAL
- Email: `escritor@teste.com` | Senha: `senha123` | Tipo: ESCRITOR

## 📊 Resumo de Endpoints

### Total de Endpoints: 43

**🔓 Públicos (19 endpoints):**
- 2 Autenticação (`/auth/*`)
- 3 Livros (`/livros`, `/livros/generos`, `/livros/por-genero`)
- 2 Escritores (`/escritores`, `/escritores/:id`)
- 2 Favoritos (`/favoritos`, `/favoritos/:id`)
- 1 Usuários (`/users`)
- 5 Dashboard (`/dashboard/*`)
- 4 Seguidores públicos

**🔒 Protegidos (24 endpoints):**
- 3 Livros CRUD
- 3 Escritores CRUD
- 3 Favoritos CRUD
- 7 Usuários CRUD e upload
- 5 Seguidores pessoais
- 3 Usuários admin

### Por Categoria:
- **Autenticação**: 2 endpoints
- **Livros**: 8 endpoints (3 públicos, 5 protegidos)
- **Escritores**: 5 endpoints (2 públicos, 3 protegidos)
- **Favoritos**: 5 endpoints (2 públicos, 3 protegidos)
- **Usuários**: 10 endpoints (1 público, 9 protegidos)
- **Seguidores**: 9 endpoints (4 públicos, 5 protegidos)
- **Dashboard**: 5 endpoints (todos públicos)

## 📁 Estrutura do Projeto

```
pj-museu-literario-api/
├── prisma/
│   ├── dev.db                    # Banco SQLite
│   ├── schema.prisma             # Schema do banco (com modelo Seguidor)
│   ├── seed.js                   # Dados iniciais (43 livros, 7 escritores)
│   └── migrations/               # Histórico de migrações
├── src/
│   ├── controllers/              # Lógica de negócio
│   │   ├── authController.js
│   │   ├── livroController.js
│   │   ├── escritorController.js
│   │   ├── favoritoController.js
│   │   ├── seguidorController.js    # NOVO: Sistema de seguidores
│   │   └── dashboardController.js
│   ├── middleware/               # Middlewares
│   │   ├── authMiddleware.js     # Atualizado com req.user
│   │   └── uploadMiddleware.js
│   ├── models/                   # Modelos de dados
│   │   ├── escritorModel.js      # Atualizado com contadores
│   │   ├── favoritoModel.js
│   │   ├── livroModel.js
│   │   └── usuarioModel.js
│   ├── routes/                   # Definição de rotas
│   │   ├── auth.routes.js
│   │   ├── livroRoutes.js
│   │   ├── escritorRoutes.js
│   │   ├── favoritoRoutes.js
│   │   ├── seguidorRoutes.js     # NOVO: 9 endpoints de seguidores
│   │   ├── dashboardRoutes.js
│   │   └── index.routes.js
│   ├── validations/              # Validações Joi
│   │   ├── escritorValidation.js
│   │   ├── favoritoValidation.js
│   │   ├── livroValidation.js
│   │   └── usuarioValidation.js
│   └── server.js                 # Ponto de entrada
├── uploads/                      # Arquivos enviados (10 imagens de exemplo)
├── package.json
└── README.md
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (opcional, valores padrão já estão configurados):

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="seu_jwt_secret"
PORT=5000
```

## 🚀 Deploy

### Preparação para produção

1. **Configure as variáveis de ambiente de produção**
2. **Execute as migrações no banco de produção:**
```bash
npx prisma migrate deploy
```
3. **Gere o cliente Prisma:**
```bash
npx prisma generate
```
4. **Popular o banco (apenas primeira vez):**
```bash
npm run seed
```
5. **Inicie o servidor:**
```bash
npm start
```

### Opções de deploy recomendadas:
- **Railway**
- **Render**
- **Heroku**
- **Vercel** (com adaptações)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Changelog

### v1.0.0 (Atual)
- ✅ Sistema completo de autenticação JWT
- ✅ CRUD completo para livros, escritores e favoritos
- ✅ **NOVO**: Sistema de seguidores estilo Instagram (9 endpoints)
- ✅ Sistema de upload de imagens
- ✅ Dashboard com estatísticas avançadas
- ✅ Base de dados rica com 43 livros e 7 escritores
- ✅ **23 obras completas de Clarice Lispector**
- ✅ Validações robustas com Joi
- ✅ Middleware de autenticação com req.user
- ✅ Contadores dinâmicos de seguidores
- ✅ Ranking de escritores mais seguidos
- ✅ Documentação completa atualizada

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Samuel Bragança** (samuelbrag4)
- GitHub: [@samuelbrag4](https://github.com/samuelbrag4)

## 🙏 Agradecimentos

- SENAI pela oportunidade de desenvolvimento
- Comunidade brasileira de literatura
- Desenvolvedores das tecnologias utilizadas
- Obra completa de Clarice Lispector como inspiração

---

📚 **Museu Literário Brasileiro** - Preservando e promovendo a literatura nacional através da tecnologia e conexões sociais.