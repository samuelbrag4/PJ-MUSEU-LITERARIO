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

    // Busca inicial sem filtro de autor
    let livros = await prisma.livro.findMany({
      skip,
      take: Number(limite),
      where,
      orderBy: { id: "desc" },
      include: {
        autor: true
      }
    });

    // Filtro de autor manual (case-insensitive)
    if (autor) {
      const autorLower = autor.toLowerCase();
      livros = livros.filter(livro => livro.autor && livro.autor.nome && livro.autor.nome.toLowerCase().includes(autorLower));
    }


    const totalExibidos = livros.length;
    // O totalGeral agora é o total após filtro manual de autor
    const totalGeral = totalExibidos;
    return { totalExibidos, totalGeral, livros };
  }

  // Buscar livro por ID
  async findById(id) {
    return await prisma.livro.findUnique({ 
      where: { id: Number(id) },
      include: {
        autor: true
      }
    });
  }

  // Buscar livros por autor
  async findByAutor(autorId) {
    return await prisma.livro.findMany({
      where: { 
        autorId: Number(autorId) 
      },
      include: {
        autor: true
      },
      orderBy: { id: "desc" }
    });
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

  // Buscar todos os gêneros disponíveis
  async getAllGeneros() {
    const result = await prisma.livro.findMany({
      select: {
        genero: true
      },
      distinct: ['genero'],
      orderBy: {
        genero: 'asc'
      }
    });
    
    return result.map(item => item.genero).filter(genero => genero && genero.trim() !== '');
  }

  // Buscar livros agrupados por gênero (estilo Netflix)
  async findGroupedByGenero(limite = 10) {
    // Primeiro, buscar todos os gêneros
    const generos = await this.getAllGeneros();
    
    const livrosPorGenero = {};
    
    // Para cada gênero, buscar alguns livros
    for (const genero of generos) {
      const livros = await prisma.livro.findMany({
        where: {
          genero: genero // Comparação direta (case-sensitive para SQLite)
        },
        take: Number(limite),
        orderBy: { id: 'desc' },
        include: {
          autor: true
        }
      });
      
      if (livros.length > 0) {
        livrosPorGenero[genero] = livros;
      }
    }
    
    return livrosPorGenero;
  }
}

export default new LivroModel();