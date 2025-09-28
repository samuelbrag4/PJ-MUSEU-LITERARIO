
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/usuarioModel.js";
import { usuarioSchema } from "../validations/usuarioValidation.js";

const DEBUG = process.env.DEBUG === 'true';
const JWT_SECRET = process.env.JWT_SECRET || "museu_literario_jwt_secret_2025_muito_seguro";

function log(message, type = 'info') {
  if (!DEBUG && type === 'debug') return;
  const timestamp = new Date().toISOString();
  const prefix = { info: '🔵', success: '✅', warning: '⚠️', error: '❌', debug: '🐛' }[type] || '📝';
  console.log(`${prefix} [AUTH] ${message}`);
}

class AuthController {
  async delete(req, res) {
    const { id } = req.params;
    try {
      log(`Tentando deletar usuário ID: ${id}`, 'debug');
      await UserModel.delete(id);
      log(`Usuário ID: ${id} deletado com sucesso`, 'success');
      res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      log(`Erro ao deletar usuário ID: ${id} - ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      log(`Tentativa de atualização sem dados - usuário ID: ${id}`, 'warning');
      return res.status(400).json({ error: "Envie pelo menos um campo para atualizar" });
    }

    const { error, value } = usuarioSchema.fork(Object.keys(data), (schema) => schema.optional()).validate(data);
    if (error) {
      log(`Erro de validação ao atualizar usuário ID: ${id} - ${error.details[0].message}`, 'warning');
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      log(`Atualizando usuário ID: ${id}`, 'debug');
      const user = await UserModel.update(id, value);
      if (!user) {
        log(`Usuário ID: ${id} não encontrado para atualização`, 'warning');
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      log(`Usuário ID: ${id} atualizado com sucesso`, 'success');
      res.json({ message: "Usuário atualizado com sucesso", user });
    } catch (error) {
      log(`Erro ao atualizar usuário ID: ${id} - ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      log(`Buscando usuário ID: ${id}`, 'debug');
      const user = await UserModel.findById(id);
      if (!user) {
        log(`Usuário ID: ${id} não encontrado`, 'warning');
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      log(`Usuário ID: ${id} encontrado`, 'debug');
      res.json(user);
    } catch (error) {
      log(`Erro ao buscar usuário ID: ${id} - ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const { tipo } = req.query;
      log(`Listando usuários${tipo ? ` - filtro tipo: ${tipo}` : ''}`, 'debug');
      const users = await UserModel.findAll(tipo);
      log(`${users.length} usuários encontrados`, 'debug');
      res.json(users);
    } catch (error) {
      log(`Erro ao listar usuários - ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  async register(req, res) {
    const { error, value } = usuarioSchema.validate(req.body);
    if (error) {
      log(`Erro de validação no registro - ${error.details[0].message}`, 'warning');
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nome, nomeUsuario, email, senha, nascimento, idade, tipo, foto } = value;

    try {
      log(`Tentando registrar usuário: ${email}`, 'debug');
      
      const userExists = await UserModel.findByEmail(email);
      if (userExists) {
        log(`Email já existe: ${email}`, 'warning');
        return res.status(400).json({ error: "E-mail já está em uso" });
      }

      const hashedPassword = await bcrypt.hash(senha, 10);

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

      const token = jwt.sign(
        { id: user.id, email: user.email, tipo: user.tipo }, 
        JWT_SECRET, 
        { expiresIn: "24h" }
      );

      const { senha: _, ...userWithoutPassword } = user;

      log(`Usuário registrado com sucesso: ${email} (ID: ${user.id})`, 'success');
      res.status(201).json({ 
        message: "Usuário registrado com sucesso", 
        user: userWithoutPassword,
        token 
      });
    } catch (error) {
      log(`Erro ao registrar usuário: ${email} - ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  }

  async login(req, res) {
    const { email, senha } = req.body;

    const missingFields = [];
    if (!email) missingFields.push("email");
    if (!senha) missingFields.push("senha");
    if (missingFields.length > 0) {
      log(`Campos obrigatórios faltando: ${missingFields.join(", ")}`, 'warning');
      return res.status(400).json({ 
        error: `Campos obrigatórios: ${missingFields.join(", ")}` 
      });
    }

    try {
      log(`Tentativa de login: ${email}`, 'debug');
      
      const user = await UserModel.findByEmail(email);
      if (!user) {
        log(`Usuário não encontrado: ${email}`, 'warning');
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        log(`Senha inválida para: ${email}`, 'warning');
        return res.status(401).json({ error: "Senha inválida" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, tipo: user.tipo }, 
        JWT_SECRET, 
        { expiresIn: "24h" }
      );

      const { senha: _, ...userWithoutPassword } = user;

      log(`Login realizado com sucesso: ${email} (ID: ${user.id})`, 'success');
      res.json({
        message: "Login realizado com sucesso",
        token,
        user: userWithoutPassword,
      });
    } catch (error) {
      log(`Erro no login: ${email} - ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao realizar login" });
    }
  }
}

export default new AuthController();