import prisma from "../../prisma/prisma.js";

class FavoritoModel {
  async findAll() {
    return await prisma.favorito.findMany({
      include: { 
        usuario: {
          select: { id: true, nome: true, email: true }
        }, 
        livro: {
          select: { 
            id: true, titulo: true, autor: true, genero: true, 
            imagem: true, anoLancamento: true 
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id) {
    return await prisma.favorito.findUnique({
      where: { id: Number(id) },
      include: { 
        usuario: {
          select: { id: true, nome: true, email: true }
        }, 
        livro: {
          select: { 
            id: true, titulo: true, autor: true, genero: true, 
            imagem: true, anoLancamento: true, sinopse: true 
          }
        }
      },
    });
  }

  async findByUserId(usuarioId, filtros = {}) {
    const where = { usuarioId: Number(usuarioId) };
    
    if (filtros.statusLeitura) {
      where.statusLeitura = filtros.statusLeitura;
    }
    
    const include = {
      livro: {
        select: { 
          id: true, titulo: true, genero: true, 
          imagem: true, anoLancamento: true, descricao: true,
          autor: {
            select: { id: true, nome: true }
          }
        }
      }
    };
    
    if (filtros.genero) {
      include.livro.where = { genero: filtros.genero };
    }

    return await prisma.favorito.findMany({
      where,
      include,
      orderBy: { adicionadoEm: 'desc' }
    });
  }

  async findByUserAndBook(usuarioId, livroId) {
    return await prisma.favorito.findFirst({
      where: { 
        usuarioId: Number(usuarioId),
        livroId: Number(livroId)
      }
    });
  }

  async create(data) {
    return await prisma.favorito.create({ 
      data: {
        usuarioId: Number(data.usuarioId),
        livroId: Number(data.livroId),
        statusLeitura: data.statusLeitura || 'QUERO_LER'
      },
      include: {
        livro: {
          select: { 
            id: true, titulo: true, genero: true, 
            imagem: true, anoLancamento: true,
            autor: {
              select: { id: true, nome: true }
            }
          }
        }
      }
    });
  }

  async update(id, data) {
    return await prisma.favorito.update({
      where: { id: Number(id) },
      data,
      include: {
        livro: {
          select: { 
            id: true, titulo: true, autor: true, genero: true, 
            imagem: true, anoLancamento: true 
          }
        }
      }
    });
  }

  async delete(id) {
    await prisma.favorito.delete({ where: { id: Number(id) } });
    return true;
  }

  async countByUserId(usuarioId) {
    return await prisma.favorito.count({
      where: { usuarioId: Number(usuarioId) }
    });
  }

  async updateStatus(id, data) {
    return await prisma.favorito.update({
      where: { id: Number(id) },
      data: {
        ...data,
        ...(data.statusLeitura === 'LENDO' && data.dataInicio === undefined && { dataInicio: new Date() }),
        ...(data.statusLeitura === 'JA_LI' && data.dataTermino === undefined && { dataTermino: new Date() })
      },
      include: {
        livro: {
          select: { 
            id: true, titulo: true, genero: true, 
            imagem: true, anoLancamento: true,
            autor: {
              select: { id: true, nome: true }
            }
          }
        }
      }
    });
  }

  async getEstatisticasByUser(usuarioId) {
    const [queroLer, lendo, jaLi] = await Promise.all([
      prisma.favorito.count({ where: { usuarioId: Number(usuarioId), statusLeitura: 'QUERO_LER' } }),
      prisma.favorito.count({ where: { usuarioId: Number(usuarioId), statusLeitura: 'LENDO' } }),
      prisma.favorito.count({ where: { usuarioId: Number(usuarioId), statusLeitura: 'JA_LI' } })
    ]);

    return {
      queroLer,
      lendo,
      jaLi,
      total: queroLer + lendo + jaLi
    };
  }

  async getFavoritosPorGenero(usuarioId) {
    const favoritos = await prisma.favorito.findMany({
      where: { usuarioId: Number(usuarioId) },
      include: {
        livro: {
          select: { genero: true }
        }
      }
    });

    const generos = {};
    favoritos.forEach(fav => {
      const genero = fav.livro.genero;
      generos[genero] = (generos[genero] || 0) + 1;
    });

    return generos;
  }
}

export default new FavoritoModel();
