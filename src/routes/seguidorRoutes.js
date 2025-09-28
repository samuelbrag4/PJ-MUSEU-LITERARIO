import express from "express";
import { seguidorController } from "../controllers/seguidorController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ROTAS PROTEGIDAS (requerem autenticação)

// Seguir um escritor
router.post("/seguir/:escritorId", authMiddleware, seguidorController.seguirEscritor);

// Deixar de seguir um escritor
router.delete("/deixar-de-seguir/:escritorId", authMiddleware, seguidorController.deixarDeSeguir);

// Listar escritores que o usuário logado segue
router.get("/meus-escritores", authMiddleware, seguidorController.listarEscritoresSeguindo);

// Verificar se o usuário logado segue um escritor específico
router.get("/verificar/:escritorId", authMiddleware, seguidorController.verificarSeSegue);

// Estatísticas do usuário logado
router.get("/minhas-estatisticas", authMiddleware, seguidorController.estatisticasUsuario);

// ROTAS PÚBLICAS (não requerem autenticação)

// Listar seguidores de um escritor específico
router.get("/escritor/:escritorId/seguidores", seguidorController.listarSeguidoresEscritor);

// Listar escritores que um usuário específico segue (público)
router.get("/usuario/:usuarioId/seguindo", seguidorController.listarEscritoresSeguindo);

// Ranking dos escritores mais seguidos
router.get("/ranking", seguidorController.escritoresMaisSeguidos);

// Estatísticas de um usuário específico (público)
router.get("/usuario/:usuarioId/estatisticas", seguidorController.estatisticasUsuario);

export default router;