import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes/index.routes.js";

dotenv.config();

const app = express();

// Configuração do CORS para permitir requisições do frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Rota inicial para verificar se a API está funcionando
app.get("/", (req, res) => {
  res.json({ message: "API do museu literário funcionando!" });
});

// Middleware para rotas
app.use("/", routes);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🟢 Servidor rodando na porta ${PORT} 🟢`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
});

// Captura interrupções (Ctrl+C) ou encerramento do processo
process.on("SIGINT", () => {
  console.log("🔴 Servidor interrompido manualmente (Ctrl+C).");
  server.close(() => {
    console.log("🛑 Servidor encerrado com sucesso.");
    process.exit(0);
  });
});