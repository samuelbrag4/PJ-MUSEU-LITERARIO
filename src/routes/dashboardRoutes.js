import express from "express";
import DashboardController from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

// GET /dashboard/estatisticas - Estatísticas gerais do sistema
dashboardRouter.get("/estatisticas", DashboardController.getEstatisticas);

// GET /dashboard/livros-stats - Estatísticas específicas sobre livros
dashboardRouter.get("/livros-stats", DashboardController.getLivrosStats);

// GET /dashboard/escritores-stats - Estatísticas específicas sobre escritores  
dashboardRouter.get("/escritores-stats", DashboardController.getEscritoresStats);

// GET /dashboard/usuarios-stats - Estatísticas específicas sobre usuários
dashboardRouter.get("/usuarios-stats", DashboardController.getUsuariosStats);

// GET /dashboard/generos-stats - Estatísticas detalhadas por gênero
dashboardRouter.get("/generos-stats", DashboardController.getGenerosStats);

export default dashboardRouter;