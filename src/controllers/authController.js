
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/usuarioModel.js";
import { usuarioSchema } from "../validations/usuarioValidation.js";

class AuthController {
  // Deletar usuário por ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      await UserModel.delete(id);
      res.json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar usuário." });
    }
  }
  // Atualizar usuário por ID
  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Envie pelo menos um campo para atualizar." });
    }

    // Validação Joi (parcial)
    const { error, value } = usuarioSchema.fork(Object.keys(data), (schema) => schema.optional()).validate(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const user = await UserModel.update(id, value);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
      res.json({ message: "Usuário atualizado com sucesso!", user });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  }
  // Buscar usuário por ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário por ID." });
    }
  }
  // Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  // Registrar novo usuário
  async register(req, res) {
    // Validação Joi
    const { error, value } = usuarioSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nome, nomeUsuario, email, senha, nascimento, idade, tipo, foto } = value;

    try {
      // Verificar se o e-mail já está em uso
      const userExists = await UserModel.findByEmail(email);
      if (userExists) {
        return res.status(400).json({ error: "E-mail já está em uso." });
      }

      // Gerar hash da senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      // Criar o usuário
      const user = await UserModel.create({
        nome,
        nomeUsuario,
        email,
        senha: hashedPassword,
        nascimento,
        idade,
        tipo,
        foto
      });

      res.status(201).json({ message: "Usuário registrado com sucesso!", user });
    } catch (error) {
      res.status(500).json({ error: error.message || "Erro ao registrar usuário." });
    }
  }

  // Login de usuário
  async login(req, res) {
    const { email, senha } = req.body;

    // Validação de campos obrigatórios
    const missingFields = [];
    if (!email) missingFields.push("email");
    if (!senha) missingFields.push("senha");
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Os campos obrigatórios estão faltando: ${missingFields.join(", ")}` });
    }

    try {
      // Verificar se o usuário existe
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Verificar a senha
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha inválida." });
      }

      // Gerar token JWT
      const token = jwt.sign({ id: user.id }, "seu-segredo", { expiresIn: "1h" });

      // Remover o campo senha do retorno
      const { senha: _, ...userWithoutPassword } = user;

      res.json({
        message: "Login realizado com sucesso!",
        token,
        user: userWithoutPassword,
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao realizar login." });
    }
  }
}

export default new AuthController();