
import prisma from "../../prisma/prisma.js";

class UsuarioModel {
  // Obter todos os usuários (com filtro opcional por tipo)
  async findAll(tipo = null) {
    const where = {};
    if (tipo) {
      where.tipo = tipo.toUpperCase(); // Garante que seja maiúsculo
    }
    
    return await prisma.usuario.findMany({
      where,
      include: {
        livroDestaque: true,
        livrosFavoritos: true
      },
    });
  }

  // Obter um usuário pelo ID
  async findById(id) {
    return await prisma.usuario.findUnique({
      where: { id: Number(id) },
      include: {
        livroDestaque: true,
        livrosFavoritos: true
      },
    });
  }

  // Obter um usuário pelo email
  async findByEmail(email) {
    return await prisma.usuario.findUnique({
      where: { email },
      include: {
        livroDestaque: true,
        livrosFavoritos: true
      },
    });
  }

  // Criar um novo usuário
  async create(data) {
    // Garante que o campo 'tipo' está presente
    if (!data.tipo) {
      throw new Error("O campo 'tipo' é obrigatório (NORMAL ou ESCRITOR)");
    }
    return await prisma.usuario.create({
      data,
      include: {
        livroDestaque: true,
        livrosFavoritos: true
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
        livrosFavoritos: true
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
    // Deleta todos os favoritos do usuário antes de deletar o usuário
    await prisma.favorito.deleteMany({
      where: { usuarioId: Number(id) },
    });
    await prisma.usuario.delete({
      where: { id: Number(id) },
    });
    return true;
  }
}

export default new UsuarioModel();