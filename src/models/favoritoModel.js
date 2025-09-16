import prisma from "../../prisma/prisma.js";

class FavoritoModel {
  // Buscar todos os favoritos
  async findAll() {
    return await prisma.favorito.findMany({
      include: { usuario: true, livro: true },
    });
  }

  // Buscar favorito por ID
  async findById(id) {
    return await prisma.favorito.findUnique({
      where: { id: Number(id) },
      include: { usuario: true, livro: true },
    });
  }

  // Criar favorito
  async create(data) {
    return await prisma.favorito.create({ data });
  }

  // Atualizar favorito
  async update(id, data) {
    return await prisma.favorito.update({
      where: { id: Number(id) },
      data,
    });
  }

  // Deletar favorito
  async delete(id) {
    await prisma.favorito.delete({ where: { id: Number(id) } });
    return true;
  }
}

export default new FavoritoModel();
