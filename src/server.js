import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes/index.routes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Rota inicial para verificar se a API está funcionando
app.get("/", (req, res) => {
  res.json({ message: "API do museu literário funcionando!" });
});

// Middleware para rotas
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`🟢 Servidor rodando na porta ${PORT} 🟢`);
});

// Captura interrupções (Ctrl+C) ou encerramento do processo
process.on("SIGINT", () => {
  console.log("🔴 Servidor interrompido manualmente (Ctrl+C).");
  server.close(() => {
    console.log("🛑 Servidor encerrado com sucesso.");
    process.exit(0);
  });
});