import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DEBUG = process.env.DEBUG === 'true';

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = {
    info: '🔵',
    success: '✅',
    warning: '⚠️',
    error: '❌',
    debug: '🐛'
  }[type] || '📝';
  
  console.log(`${prefix} [${timestamp}] ${message}`);
}

if (DEBUG) {
  log('Debug mode ativo', 'debug');
  log(`Variáveis ambiente carregadas: NODE_ENV=${process.env.NODE_ENV}`, 'debug');
}

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (DEBUG) {
  app.use((req, res, next) => {
    log(`${req.method} ${req.path} - IP: ${req.ip}`, 'debug');
    next();
  });
}

app.get("/", (req, res) => {
  log('Rota raiz acessada', 'info');
  res.json({ 
    message: "🏛️ Museu Literário Brasileiro API", 
    version: "1.0.0",
    status: "online",
    timestamp: new Date().toISOString()
  });
});

app.use("/", routes);

app.use((err, req, res, next) => {
  log(`Erro interno: ${err.message}`, 'error');
  if (DEBUG) {
    log(`Stack trace: ${err.stack}`, 'debug');
  }
  res.status(500).json({ 
    error: "Erro interno do servidor",
    message: DEBUG ? err.message : "Algo deu errado"
  });
});

app.use((req, res) => {
  log(`Rota não encontrada: ${req.method} ${req.path}`, 'warning');
  res.status(404).json({ 
    error: "Rota não encontrada",
    message: `${req.method} ${req.path} não existe`
  });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  log(`Servidor iniciado na porta ${PORT}`, 'success');
  log(`Acesse: http://localhost:${PORT}`, 'info');
  log(`Modo debug: ${DEBUG ? 'Ativo' : 'Inativo'}`, 'info');
});

process.on("SIGINT", () => {
  log("Servidor interrompido (Ctrl+C)", 'warning');
  server.close(() => {
    log("Servidor encerrado com sucesso", 'success');
    process.exit(0);
  });
});

process.on('uncaughtException', (err) => {
  log(`Exceção não capturada: ${err.message}`, 'error');
  if (DEBUG) {
    log(`Stack trace: ${err.stack}`, 'debug');
  }
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  log(`Promise rejeitada: ${reason}`, 'error');
  if (DEBUG) {
    log(`Promise: ${promise}`, 'debug');
  }
});