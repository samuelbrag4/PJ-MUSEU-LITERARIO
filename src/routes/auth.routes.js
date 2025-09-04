import express from "express";
import AuthController from "../controllers/authController.js";

const authRouter = express.Router();

// Rota para registrar um novo usuário
authRouter.post("/register", AuthController.register);

// Rota para login de usuário
authRouter.post("/login", AuthController.login);

export default authRouter;