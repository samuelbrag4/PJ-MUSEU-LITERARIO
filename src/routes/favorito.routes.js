import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "Rota de favoritos funcionando!" });
});

export default router;
