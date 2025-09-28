import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DashboardController {
  // GET /dashboard/estatisticas - Obter estatísticas gerais do sistema
  async getEstatisticas(req, res) {
    try {
      // Contar total de livros
      const totalLivros = await prisma.livro.count();
      
      // Contar total de escritores
      const totalEscritores = await prisma.escritor.count();
      
      // Contar total de usuários
      const totalUsuarios = await prisma.usuario.count();
      
      // Contar livros por gênero
      const livrosPorGenero = await prisma.livro.groupBy({
        by: ['genero'],
        _count: {
          genero: true
        },
        orderBy: {
          _count: {
            genero: 'desc'
          }
        }
      });

      // Contar usuários por tipo
      const usuariosPorTipo = await prisma.usuario.groupBy({
        by: ['tipo'],
        _count: {
          tipo: true
        }
      });

      // Contadores específicos para facilitar o acesso
      const totalUsuariosNormais = usuariosPorTipo.find(u => u.tipo === 'NORMAL')?._count.tipo || 0;
      const totalUsuariosEscritores = usuariosPorTipo.find(u => u.tipo === 'ESCRITOR')?._count.tipo || 0;

      // Contar livros por dificuldade
      const livrosPorDificuldade = await prisma.livro.groupBy({
        by: ['dificuldade'],
        _count: {
          dificuldade: true
        }
      });

      // Buscar os gêneros mais populares (top 5)
      const generosMaisPopulares = livrosPorGenero.slice(0, 5).map(item => ({
        genero: item.genero,
        quantidade: item._count.genero
      }));

      // Buscar escritores com mais livros
      const escritoresComMaisLivros = await prisma.escritor.findMany({
        include: {
          _count: {
            select: { livros: true }
          }
        },
        orderBy: {
          livros: {
            _count: 'desc'
          }
        },
        take: 5
      });

      const estatisticas = {
        resumo: {
          totalLivros,
          totalEscritores,
          totalUsuarios,
          totalUsuariosNormais,
          totalUsuariosEscritores,
          totalGeneros: livrosPorGenero.length
        },
        livrosPorGenero: livrosPorGenero.map(item => ({
          genero: item.genero,
          quantidade: item._count.genero
        })),
        usuariosPorTipo: usuariosPorTipo.map(item => ({
          tipo: item.tipo,
          quantidade: item._count.tipo
        })), 
        livrosPorDificuldade: livrosPorDificuldade.map(item => ({
          dificuldade: item.dificuldade,
          quantidade: item._count.dificuldade
        })),
        generosMaisPopulares,
        escritoresComMaisLivros: escritoresComMaisLivros.map(escritor => ({
          id: escritor.id,
          nome: escritor.nome,
          quantidadeLivros: escritor._count.livros
        }))
      };

      res.json(estatisticas);
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      res.status(500).json({ error: "Erro ao buscar estatísticas do dashboard!" });
    }
  }

  // GET /dashboard/livros-stats - Estatísticas específicas sobre livros
  async getLivrosStats(req, res) {
    try {
      const totalLivros = await prisma.livro.count();
      
      const livrosPorGenero = await prisma.livro.groupBy({
        by: ['genero'],
        _count: {
          genero: true
        },
        orderBy: {
          _count: {
            genero: 'desc'
          }
        }
      });

      const livrosPorDificuldade = await prisma.livro.groupBy({
        by: ['dificuldade'],
        _count: {
          dificuldade: true
        }
      });

      const livrosComAdaptacao = await prisma.livro.count({
        where: { temAdaptacao: true }
      });

      const livrosSemAdaptacao = await prisma.livro.count({
        where: { temAdaptacao: false }
      });

      // Média de páginas dos livros
      const mediaPaginas = await prisma.livro.aggregate({
        _avg: {
          numeroPaginas: true
        }
      });

      // Média de preços dos livros
      const mediaPrecos = await prisma.livro.aggregate({
        _avg: {
          mediaPreco: true
        }
      });

      res.json({
        totalLivros,
        livrosPorGenero: livrosPorGenero.map(item => ({
          genero: item.genero,
          quantidade: item._count.genero,
          porcentagem: ((item._count.genero / totalLivros) * 100).toFixed(1)
        })),
        livrosPorDificuldade: livrosPorDificuldade.map(item => ({
          dificuldade: item.dificuldade,
          quantidade: item._count.dificuldade,
          porcentagem: ((item._count.dificuldade / totalLivros) * 100).toFixed(1)
        })),
        adaptacoes: {
          comAdaptacao: livrosComAdaptacao,
          semAdaptacao: livrosSemAdaptacao,
          porcentagemComAdaptacao: ((livrosComAdaptacao / totalLivros) * 100).toFixed(1)
        },
        medias: {
          mediaPaginas: Math.round(mediaPaginas._avg.numeroPaginas || 0),
          mediaPrecos: parseFloat((mediaPrecos._avg.mediaPreco || 0).toFixed(2))
        }
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas de livros:", error);
      res.status(500).json({ error: "Erro ao buscar estatísticas de livros!" });
    }
  }

  // GET /dashboard/escritores-stats - Estatísticas específicas sobre escritores
  async getEscritoresStats(req, res) {
    try {
      const totalEscritores = await prisma.escritor.count();
      
      // Escritores vivos vs falecidos
      const escritoresVivos = await prisma.escritor.count({
        where: { dataFalecimento: null }
      });

      const escritoresFalecidos = await prisma.escritor.count({
        where: { dataFalecimento: { not: null } }
      });

      // Escritores com mais livros
      const escritoresComMaisLivros = await prisma.escritor.findMany({
        include: {
          _count: {
            select: { livros: true }
          }
        },
        orderBy: {
          livros: {
            _count: 'desc'
          }
        },
        take: 10
      });

      // Distribuição por século de nascimento
      const escritoresPorSeculo = await prisma.escritor.findMany({
        select: {
          nome: true,
          dataNascimento: true
        }
      });

      const seculoContador = {};
      escritoresPorSeculo.forEach(escritor => {
        if (escritor.dataNascimento) {
          const ano = new Date(escritor.dataNascimento).getFullYear();
          const seculo = Math.ceil(ano / 100);
          seculoContador[seculo] = (seculoContador[seculo] || 0) + 1;
        }
      });

      res.json({
        totalEscritores,
        statusVida: {
          vivos: escritoresVivos,
          falecidos: escritoresFalecidos,
          porcentagemVivos: ((escritoresVivos / totalEscritores) * 100).toFixed(1)
        },
        escritoresComMaisLivros: escritoresComMaisLivros.map(escritor => ({
          id: escritor.id,
          nome: escritor.nome,
          quantidadeLivros: escritor._count.livros
        })),
        distribuicaoPorSeculo: Object.entries(seculoContador).map(([seculo, quantidade]) => ({
          seculo: `Século ${seculo}`,
          quantidade
        })).sort((a, b) => parseInt(a.seculo.split(' ')[1]) - parseInt(b.seculo.split(' ')[1]))
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas de escritores:", error);
      res.status(500).json({ error: "Erro ao buscar estatísticas de escritores!" });
    }
  }

  // GET /dashboard/usuarios-stats - Estatísticas específicas sobre usuários
  async getUsuariosStats(req, res) {
    try {
      const totalUsuarios = await prisma.usuario.count();
      
      // Contar usuários por tipo
      const usuariosPorTipo = await prisma.usuario.groupBy({
        by: ['tipo'],
        _count: {
          tipo: true
        }
      });

      // Buscar distribuição por faixa etária
      const usuarios = await prisma.usuario.findMany({
        select: {
          idade: true,
          tipo: true,
          nascimento: true
        }
      });

      // Agrupar por faixas etárias
      const faixasEtarias = {
        '18-25': 0,
        '26-35': 0,
        '36-45': 0,
        '46-55': 0,
        '56+': 0
      };

      usuarios.forEach(usuario => {
        const idade = usuario.idade;
        if (idade >= 18 && idade <= 25) faixasEtarias['18-25']++;
        else if (idade >= 26 && idade <= 35) faixasEtarias['26-35']++;
        else if (idade >= 36 && idade <= 45) faixasEtarias['36-45']++;
        else if (idade >= 46 && idade <= 55) faixasEtarias['46-55']++;
        else if (idade > 55) faixasEtarias['56+']++;
      });

      // Calcular idade média
      const idadeMedia = usuarios.length > 0 ? 
        Math.round(usuarios.reduce((sum, user) => sum + user.idade, 0) / usuarios.length) : 0;

      // Usuários mais recentes (últimos 10)
      const usuariosRecentes = await prisma.usuario.findMany({
        select: {
          id: true,
          nome: true,
          nomeUsuario: true,
          tipo: true,
          idade: true
        },
        orderBy: {
          id: 'desc'
        },
        take: 10
      });

      res.json({
        totalUsuarios,
        usuariosPorTipo: usuariosPorTipo.map(item => ({
          tipo: item.tipo,
          quantidade: item._count.tipo,
          porcentagem: ((item._count.tipo / totalUsuarios) * 100).toFixed(1)
        })),
        faixasEtarias: Object.entries(faixasEtarias).map(([faixa, quantidade]) => ({
          faixaEtaria: faixa,
          quantidade,
          porcentagem: totalUsuarios > 0 ? ((quantidade / totalUsuarios) * 100).toFixed(1) : '0.0'
        })),
        idadeMedia,
        usuariosRecentes: usuariosRecentes.map(usuario => ({
          id: usuario.id,
          nome: usuario.nome,
          nomeUsuario: usuario.nomeUsuario,
          tipo: usuario.tipo,
          idade: usuario.idade
        }))
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas de usuários:", error);
      res.status(500).json({ error: "Erro ao buscar estatísticas de usuários!" });
    }
  }

  // GET /dashboard/generos-stats - Estatísticas detalhadas por gênero
  async getGenerosStats(req, res) {
    try {
      const livrosPorGenero = await prisma.livro.groupBy({
        by: ['genero'],
        _count: {
          genero: true
        },
        _avg: {
          mediaPreco: true,
          numeroPaginas: true
        },
        orderBy: {
          _count: {
            genero: 'desc'
          }
        }
      });

      const totalLivros = await prisma.livro.count();

      const estatisticasDetalhadas = await Promise.all(
        livrosPorGenero.map(async (genero) => {
          // Buscar livros mais caros e mais baratos do gênero
          const livroMaisCaro = await prisma.livro.findFirst({
            where: { genero: genero.genero },
            orderBy: { mediaPreco: 'desc' },
            select: { titulo: true, mediaPreco: true, autor: { select: { nome: true } } }
          });

          const livroMaisBarato = await prisma.livro.findFirst({
            where: { genero: genero.genero },
            orderBy: { mediaPreco: 'asc' },
            select: { titulo: true, mediaPreco: true, autor: { select: { nome: true } } }
          });

          return {
            genero: genero.genero,
            quantidade: genero._count.genero,
            porcentagem: ((genero._count.genero / totalLivros) * 100).toFixed(1),
            mediaPreco: parseFloat((genero._avg.mediaPreco || 0).toFixed(2)),
            mediaPaginas: Math.round(genero._avg.numeroPaginas || 0),
            livroMaisCaro: livroMaisCaro ? {
              titulo: livroMaisCaro.titulo,
              preco: livroMaisCaro.mediaPreco,
              autor: livroMaisCaro.autor.nome
            } : null,
            livroMaisBarato: livroMaisBarato ? {
              titulo: livroMaisBarato.titulo,
              preco: livroMaisBarato.mediaPreco,
              autor: livroMaisBarato.autor.nome
            } : null
          };
        })
      );

      res.json({
        totalGeneros: livrosPorGenero.length,
        estatisticasPorGenero: estatisticasDetalhadas
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas de gêneros:", error);
      res.status(500).json({ error: "Erro ao buscar estatísticas de gêneros!" });
    }
  }
}

export default new DashboardController();