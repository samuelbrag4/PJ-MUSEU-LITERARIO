import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/usuario.model.js";

class AuthController {
  // Registrar novo usuário
  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      // Verificar se o e-mail já está em uso
      const userExists = await UserModel.findByEmail(email);
      if (userExists) {
        return res.status(400).json({ error: "E-mail já está em uso." });
      }

      // Gerar hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar o usuário
      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "Usuário registrado com sucesso!", user });
    } catch (error) {
      res.status(500).json({ error: "Erro ao registrar usuário." });
    }
  }

  // Login de usuário
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Verificar se o usuário existe
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Verificar a senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha inválida." });
      }

      // Gerar token JWT
      const token = jwt.sign({ id: user.id }, "seu-segredo", { expiresIn: "1h" });

      // Remover o campo password do retorno
      const { password: _, ...userWithoutPassword } = user;

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