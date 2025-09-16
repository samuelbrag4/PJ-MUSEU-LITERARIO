import express from "express";
import EscritorController from "../controllers/escritorController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Listar todos os escritores
router.get("/", EscritorController.getAll);

// Buscar escritor por ID
router.get("/:id", EscritorController.getById);

// Criar escritor (protegida)
router.post("/", authMiddleware, EscritorController.create);

// Atualizar escritor (protegida)
router.put("/:id", authMiddleware, EscritorController.update);

// Deletar escritor (protegida)
router.delete("/:id", authMiddleware, EscritorController.delete);

export default router;
