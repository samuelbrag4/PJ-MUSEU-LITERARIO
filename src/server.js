import express from "express";
import { config } from "dotenv";
import cors from "cors"; // Importa o middleware CORS

import routes from "./routes/index.routes.js"; // Importa as rotas principais

config(); // Carrega variáveis de ambiente do arquivo .env
const port = process.env.PORT || 3000; // Define a porta do servidor

// Inicializa o Express
const app = express();

// Middleware para habilitar CORS
app.use(cors()); // Habilita CORS para todas as rotas

// Middleware para parse de JSON
app.use(express.json());

// Rota inicial para verificar se a API está funcionando
app.get("/", (req, res) => {
  res.json({ message: "API do museu literário funcionando!" });
});

// Middleware para rotas
app.use("/", routes);

// Inicia o servidor
const server = app.listen(port, () => {
  console.log(`🟢 Servidor rodando na porta ${port} 🟢`);
});

// Captura interrupções (Ctrl+C) ou encerramento do processo
process.on("SIGINT", () => {
  console.log("🔴 Servidor interrompido manualmente (Ctrl+C).");
  server.close(() => {
    console.log("🛑 Servidor encerrado com sucesso.");
    process.exit(0);
  });
});