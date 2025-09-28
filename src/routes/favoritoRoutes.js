import express from "express";
import FavoritoController from "../controllers/favoritoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", FavoritoController.getAll);
router.get("/:id", FavoritoController.getById);

router.post("/", authMiddleware, FavoritoController.create);
router.put("/:id", authMiddleware, FavoritoController.update);
router.delete("/:id", authMiddleware, FavoritoController.delete);

router.get("/meus/favoritos", authMiddleware, FavoritoController.getMeusFavoritos);
router.post("/toggle/:livroId", authMiddleware, FavoritoController.toggleFavorito);
router.patch("/status/:livroId", authMiddleware, FavoritoController.updateStatusLeitura);

export default router;
