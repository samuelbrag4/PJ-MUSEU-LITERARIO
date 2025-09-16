import express from "express";
import authRouter from "./auth.routes.js";
import livroRoutes from "./livroRoutes.js";
import escritorRoutes from "./escritorRoutes.js";
import favoritoRoutes from "./favoritoRoutes.js";
import AuthController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "Rota principal funcionando!" });
});

// Rotas de autenticação
router.use("/auth", authRouter);

// Rotas de usuário (CRUD básico, sem usuarioRoutes.js)
router.get("/usuarios", authMiddleware, AuthController.getAllUsers);
router.get("/usuarios/:id", authMiddleware, (req, res) => AuthController.getById(req, res));
router.put("/usuarios/:id", authMiddleware, (req, res) => AuthController.update(req, res));
router.delete("/usuarios/:id", authMiddleware, (req, res) => AuthController.delete(req, res));
// Adicione aqui outras rotas de usuário se necessário

// Outras rotas
router.use("/livros", livroRoutes);
router.use("/escritores", escritorRoutes);
router.use("/favoritos", favoritoRoutes);

export default router;
