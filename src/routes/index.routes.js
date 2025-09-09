import express from "express";
import authRoutes from "./auth.routes.js";
import usuarioRoutes from "./usuarioRoutes.js";
import livroRoutes from "./livroRoutes.js";
import escritorRoutes from "./escritorRoutes.js";
import favoritoRoutes from "./favoritoRoutes.js";
import avaliacaoRoutes from "./avaliacaoRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "Rota principal funcionando!" });
});

router.use("/auth", authRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/livros", livroRoutes);
router.use("/escritores", escritorRoutes);
router.use("/favoritos", favoritoRoutes);
router.use("/avaliacoes", avaliacaoRoutes);

export default router;
