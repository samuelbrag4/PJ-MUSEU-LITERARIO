import express from "express";
import authRoutes from "./auth.routes.js"; // Rotas de autenticação
import userRoutes from "./user.routes.js"; // Rotas de usuários
import bookRoutes from "./book.routes.js"; // Rotas de livros

const router = express.Router();

// Rotas de autenticação
router.use("/auth", authRoutes);

// Rotas de usuários
router.use("/users", userRoutes);

// Rotas de livros
router.use("/books", bookRoutes);

export default router;