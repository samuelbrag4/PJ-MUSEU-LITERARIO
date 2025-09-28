import express from "express";
import authRouter from "./auth.routes.js";
import livroRoutes from "./livroRoutes.js";
import escritorRoutes from "./escritorRoutes.js";
import favoritoRoutes from "./favoritoRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import seguidorRoutes from "./seguidorRoutes.js";
import AuthController from "../controllers/authController.js";
import upload from "../middleware/uploadMiddleware.js";
import UploadController from "../controllers/uploadController.js";
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

// Rotas alternativas para compatibilidade com frontend (/users)
router.get("/users", AuthController.getAllUsers); // Lista usuários com filtro opcional ?tipo=escritor (público para frontend)
router.get("/users/:id", authMiddleware, (req, res) => AuthController.getById(req, res));
router.put("/users/:id", authMiddleware, (req, res) => AuthController.update(req, res));
router.delete("/users/:id", authMiddleware, (req, res) => AuthController.delete(req, res));
router.post("/users/upload-photo", authMiddleware, upload.single("foto"), (req, res) => UploadController.uploadFoto(req, res));
// Adicione aqui outras rotas de usuário se necessário

// Outras rotas
router.use("/livros", livroRoutes);
router.use("/escritores", escritorRoutes);
router.use("/favoritos", favoritoRoutes);
router.use("/dashboard", dashboardRoutes); // Rotas de estatísticas e dashboard
router.use("/seguidores", seguidorRoutes); // Sistema de seguir escritores tipo Instagram
// Rota de upload de foto de usuário
router.post("/upload/foto", upload.single("foto"), (req, res) => UploadController.uploadFoto(req, res));

export default router;
