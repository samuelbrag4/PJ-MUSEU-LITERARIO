import express from "express";
import LivroController from "../controllers/livroController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const livroRouter = express.Router();

// GET /livros - Listar todos os livros (com filtros via query params)
// Exemplos de busca:
// - Buscar todos: GET /livros
// - Buscar por título: GET /livros?titulo=Dom
// - Buscar por gênero: GET /livros?genero=Romance
// - Buscar por dificuldade: GET /livros?dificuldade=Dificil
// - Buscar por autor: GET /livros?autor=Machado
// - Combinar filtros: GET /livros?titulo=Dom&genero=Romance&autor=Machado&dificuldade=Dificil
// - Paginação: GET /livros?pagina=2&limite=5
livroRouter.get("/", LivroController.getAllLivros);

// GET /livros/autor/:autorId - Buscar livros por autor específico (ANTES do /:id)
livroRouter.get("/autor/:autorId", authMiddleware, LivroController.getLivrosByAutor);

// GET /livros/:id - Obter livro pelo ID (protegida)
livroRouter.get("/:id", authMiddleware, LivroController.getLivroById);

// POST /livros - Criar novo livro (protegida)
livroRouter.post("/", authMiddleware, LivroController.createLivro);

// PUT /livros/:id - Atualizar livro (protegida)
livroRouter.put("/:id", authMiddleware, LivroController.updateLivro);

// DELETE /livros/:id - Remover livro (protegida)
livroRouter.delete("/:id", authMiddleware, LivroController.deleteLivro);

export default livroRouter;