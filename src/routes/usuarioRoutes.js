import express from "express";
import UsuarioModel from "../models/usuarioModel.js";

const router = express.Router();

// Listar todos os usuários
router.get("/", async (req, res) => {
	try {
		const usuarios = await UsuarioModel.findAll();
		res.json(usuarios);
	} catch (error) {
		res.status(500).json({ error: "Erro ao buscar usuários." });
	}
});

// Buscar usuário por ID
router.get("/:id", async (req, res) => {
	try {
		const usuario = await UsuarioModel.findById(req.params.id);
		if (!usuario) return res.status(404).json({ error: "Usuário não encontrado." });
		res.json(usuario);
	} catch (error) {
		res.status(500).json({ error: "Erro ao buscar usuário." });
	}
});

// Criar usuário
router.post("/", async (req, res) => {
	try {
		const usuario = await UsuarioModel.create(req.body);
		res.status(201).json(usuario);
	} catch (error) {
		res.status(500).json({ error: "Erro ao criar usuário." });
	}
});

// Atualizar usuário
router.put("/:id", async (req, res) => {
	try {
		const usuario = await UsuarioModel.update(req.params.id, req.body);
		res.json(usuario);
	} catch (error) {
		res.status(500).json({ error: "Erro ao atualizar usuário." });
	}
});

// Deletar usuário
router.delete("/:id", async (req, res) => {
	try {
		await UsuarioModel.delete(req.params.id);
		res.json({ message: "Usuário deletado com sucesso." });
	} catch (error) {
		res.status(500).json({ error: "Erro ao deletar usuário." });
	}
});

export default router;
