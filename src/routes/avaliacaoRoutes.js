import express from "express";
const router = express.Router();

// Exemplo de rota de teste
router.get("/", (req, res) => {
  res.json({ message: "Rota de avaliações funcionando!" });
});

export default router;