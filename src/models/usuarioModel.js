
import prisma from "../../prisma/prisma.js";

class UsuarioModel {
  // Obter todos os usuários
  async findAll() {
    return await prisma.usuario.findMany({
      include: {
        livroDestaque: true,
        livrosFavoritos: true,
        avaliacoes: true,
      },
    });
  }

  // Obter um usuário pelo ID
  async findById(id) {
    return await prisma.usuario.findUnique({
      where: { id: Number(id) },
      include: {
        livroDestaque: true,
        livrosFavoritos: true,
        avaliacoes: true,
      },
    });
  }

  // Obter um usuário pelo email
  async findByEmail(email) {
    return await prisma.usuario.findUnique({
      where: { email },
      include: {
        livroDestaque: true,
        livrosFavoritos: true,
        avaliacoes: true,
      },
    });
  }

  // Criar um novo usuário
  async create(data) {
    return await prisma.usuario.create({
      data,
      include: {
        livroDestaque: true,
        livrosFavoritos: true,
        avaliacoes: true,
      },
    });
  }

  // Atualizar um usuário
  async update(id, data) {
    return await prisma.usuario.update({
      where: { id: Number(id) },
      data,
      include: {
        livroDestaque: true,
        livrosFavoritos: true,
        avaliacoes: true,
      },
    });
  }

  // Atualizar livro de destaque do usuário
  async updateFeaturedBook(id, livroDestaqueId) {
    return await prisma.usuario.update({
      where: { id: Number(id) },
      data: { livroDestaqueId },
      include: { livroDestaque: true },
    });
  }

  // Excluir um usuário
  async delete(id) {
    await prisma.usuario.delete({
      where: { id: Number(id) },
    });
    return true;
  }
}

export default new UsuarioModel();