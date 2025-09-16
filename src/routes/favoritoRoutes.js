import express from "express";
import FavoritoController from "../controllers/favoritoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Listar todos os favoritos
router.get("/", FavoritoController.getAll);

// Buscar favorito por ID
router.get("/:id", FavoritoController.getById);

// Criar favorito (protegida)
router.post("/", authMiddleware, FavoritoController.create);

// Atualizar favorito (protegida)
router.put("/:id", authMiddleware, FavoritoController.update);

// Deletar favorito (protegida)
router.delete("/:id", authMiddleware, FavoritoController.delete);

export default router;
