import prisma from "../../prisma/prisma.js";


class LivroModel {
  // Buscar todos os livros com filtros e paginação
  async findAll({ id, titulo, genero, dificuldade, autor, pagina = 1, limite = 10 }) {
    if (Number(pagina) < 1) pagina = 1;
    if (Number(limite) < 1 || Number(limite) > 100) limite = 10;

    const skip = (Number(pagina) - 1) * Number(limite);

    const where = {};
    if (id) where.id = Number(id);
    if (titulo) where.titulo = { contains: titulo };
    if (genero) where.genero = genero;
    if (dificuldade) where.dificuldade = dificuldade;
    if (autor) {
      where.autor = {
        nome: {
          contains: autor
        }
      };
    }

    const livros = await prisma.livro.findMany({
      skip,
      take: Number(limite),
      where,
      orderBy: { id: "desc" },
      include: {
        autor: true
      }
    });

    const totalExibidos = livros.length;
    const totalGeral = await prisma.livro.count({ where });

    return { totalExibidos, totalGeral, livros };
  }

  // Buscar livro por ID
  async findById(id) {
    return await prisma.livro.findUnique({ where: { id: Number(id) } });
  }

  // Criar livro
  async create(data) {
    return await prisma.livro.create({ data });
  }

  // Atualizar livro
  async update(id, data) {
    return await prisma.livro.update({ where: { id: Number(id) }, data });
  }

  // Deletar livro
  async delete(id) {
    await prisma.livro.delete({ where: { id: Number(id) } });
    return true;
  }
}

export default new LivroModel();