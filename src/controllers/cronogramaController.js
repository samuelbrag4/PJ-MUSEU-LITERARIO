import { PrismaClient } from "@prisma/client";
import { cronogramaSchema, cronogramaUpdateSchema } from "../validations/cronogramaValidation.js";

const prisma = new PrismaClient();

const logWithEmoji = (type, module, message) => {
  const timestamp = new Date().toLocaleString('pt-BR');
  const emojis = {
    INFO: '🔵',
    SUCCESS: '✅',
    WARNING: '⚠️',
    ERROR: '❌',
    DEBUG: '🐛'
  };
  console.log(`${emojis[type]} [${timestamp}] [${module}] ${message}`);
};

class CronogramaController {
  
  async getAll(req, res) {
    try {
      logWithEmoji('INFO', 'CRONOGRAMA', 'Buscando todos os cronogramas');
      
      const cronogramas = await prisma.cronogramaLeitura.findMany({
        include: {
          usuario: {
            select: { id: true, nome: true, nomeUsuario: true }
          },
          livro: {
            select: { id: true, titulo: true, imagem: true, genero: true }
          }
        },
        orderBy: { data: 'asc' }
      });

      logWithEmoji('SUCCESS', 'CRONOGRAMA', `${cronogramas.length} cronogramas encontrados`);
      res.json(cronogramas);
    } catch (error) {
      logWithEmoji('ERROR', 'CRONOGRAMA', `Erro ao buscar cronogramas: ${error.message}`);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async getByUser(req, res) {
    try {
      const usuarioId = parseInt(req.user.id);
      const { mes, ano } = req.query;
      
      logWithEmoji('INFO', 'CRONOGRAMA', `Buscando cronograma do usuário ${usuarioId}`);

      let whereClause = { usuarioId };

      if (mes && ano) {
        const startDate = new Date(parseInt(ano), parseInt(mes) - 1, 1);
        const endDate = new Date(parseInt(ano), parseInt(mes), 0);
        
        whereClause.data = {
          gte: startDate,
          lte: endDate
        };
        
        logWithEmoji('DEBUG', 'CRONOGRAMA', `Filtrando por mês ${mes}/${ano}`);
      }

      const cronogramas = await prisma.cronogramaLeitura.findMany({
        where: whereClause,
        include: {
          livro: {
            select: { id: true, titulo: true, imagem: true, genero: true }
          }
        },
        orderBy: { data: 'asc' }
      });

      logWithEmoji('SUCCESS', 'CRONOGRAMA', `${cronogramas.length} eventos encontrados para o usuário`);
      res.json(cronogramas);
    } catch (error) {
      logWithEmoji('ERROR', 'CRONOGRAMA', `Erro ao buscar cronograma do usuário: ${error.message}`);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async create(req, res) {
    try {
      const usuarioId = parseInt(req.user.id);

      logWithEmoji('INFO', 'CRONOGRAMA', `Criando evento no cronograma para usuário ${usuarioId}`);

      const { error, value } = cronogramaSchema.validate(req.body);
      if (error) {
        logWithEmoji('WARNING', 'CRONOGRAMA', `Erro de validação: ${error.details[0].message}`);
        return res.status(400).json({ 
          error: error.details[0].message 
        });
      }

      const novoEvento = await prisma.cronogramaLeitura.create({
        data: {
          usuarioId,
          data: new Date(value.data),
          titulo: value.titulo,
          descricao: value.descricao || null,
          livroId: value.livroId ? parseInt(value.livroId) : null,
          tipo: value.tipo || 'EVENTO'
        },
        include: {
          livro: {
            select: { id: true, titulo: true, imagem: true, genero: true }
          }
        }
      });

      logWithEmoji('SUCCESS', 'CRONOGRAMA', `Evento "${value.titulo}" criado com sucesso`);
      res.status(201).json(novoEvento);
    } catch (error) {
      logWithEmoji('ERROR', 'CRONOGRAMA', `Erro ao criar evento: ${error.message}`);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const usuarioId = parseInt(req.user.id);
      const { data, titulo, descricao, livroId, tipo, concluido } = req.body;

      logWithEmoji('INFO', 'CRONOGRAMA', `Atualizando evento ${id}`);

      const eventoExistente = await prisma.cronogramaLeitura.findFirst({
        where: { 
          id: parseInt(id),
          usuarioId 
        }
      });

      if (!eventoExistente) {
        logWithEmoji('WARNING', 'CRONOGRAMA', `Evento ${id} não encontrado para o usuário`);
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      const eventoAtualizado = await prisma.cronogramaLeitura.update({
        where: { id: parseInt(id) },
        data: {
          ...(data && { data: new Date(data) }),
          ...(titulo && { titulo }),
          ...(descricao !== undefined && { descricao }),
          ...(livroId !== undefined && { livroId: livroId ? parseInt(livroId) : null }),
          ...(tipo && { tipo }),
          ...(concluido !== undefined && { concluido })
        },
        include: {
          livro: {
            select: { id: true, titulo: true, imagem: true, genero: true }
          }
        }
      });

      logWithEmoji('SUCCESS', 'CRONOGRAMA', `Evento "${eventoAtualizado.titulo}" atualizado`);
      res.json(eventoAtualizado);
    } catch (error) {
      logWithEmoji('ERROR', 'CRONOGRAMA', `Erro ao atualizar evento: ${error.message}`);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const usuarioId = parseInt(req.user.id);

      logWithEmoji('INFO', 'CRONOGRAMA', `Deletando evento ${id}`);

      const eventoExistente = await prisma.cronogramaLeitura.findFirst({
        where: { 
          id: parseInt(id),
          usuarioId 
        }
      });

      if (!eventoExistente) {
        logWithEmoji('WARNING', 'CRONOGRAMA', `Evento ${id} não encontrado para o usuário`);
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      await prisma.cronogramaLeitura.delete({
        where: { id: parseInt(id) }
      });

      logWithEmoji('SUCCESS', 'CRONOGRAMA', `Evento "${eventoExistente.titulo}" deletado`);
      res.json({ message: "Evento deletado com sucesso" });
    } catch (error) {
      logWithEmoji('ERROR', 'CRONOGRAMA', `Erro ao deletar evento: ${error.message}`);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async toggleConcluido(req, res) {
    try {
      const { id } = req.params;
      const usuarioId = parseInt(req.user.id);

      logWithEmoji('INFO', 'CRONOGRAMA', `Alternando status de conclusão do evento ${id}`);

      const evento = await prisma.cronogramaLeitura.findFirst({
        where: { 
          id: parseInt(id),
          usuarioId 
        }
      });

      if (!evento) {
        logWithEmoji('WARNING', 'CRONOGRAMA', `Evento ${id} não encontrado`);
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      const eventoAtualizado = await prisma.cronogramaLeitura.update({
        where: { id: parseInt(id) },
        data: { concluido: !evento.concluido },
        include: {
          livro: {
            select: { id: true, titulo: true, imagem: true, genero: true }
          }
        }
      });

      logWithEmoji('SUCCESS', 'CRONOGRAMA', 
        `Evento "${evento.titulo}" marcado como ${eventoAtualizado.concluido ? 'concluído' : 'pendente'}`
      );
      
      res.json(eventoAtualizado);
    } catch (error) {
      logWithEmoji('ERROR', 'CRONOGRAMA', `Erro ao alternar status: ${error.message}`);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export default new CronogramaController();