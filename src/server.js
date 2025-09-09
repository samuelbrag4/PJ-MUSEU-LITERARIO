import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import livroRoutes from "./routes/livro.routes.js";
import avaliacaoRoutes from "./routes/avaliacao.routes.js";
import favoritoRoutes from "./routes/favorito.routes.js";
import escritorRoutes from "./routes/escritor.routes.js";
import routes from "./routes/index.routes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Usar rotas
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Rota inicial para verificar se a API está funcionando
app.get("/", (req, res) => {
  res.json({ message: "API do museu literário funcionando!" });
});

// Middleware para rotas
app.use("/", routes);

// Inicia o servidor
const server = app.listen(PORT, () => {
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