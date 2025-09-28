
import FavoritoModel from "../models/favoritoModel.js";
import { favoritoSchema, statusLeituraSchema } from "../validations/favoritoValidation.js";

const DEBUG = process.env.DEBUG === 'true';

function log(message, type = 'info') {
  if (!DEBUG && type === 'debug') return;
  const timestamp = new Date().toISOString();
  const prefix = { info: '🔵', success: '✅', warning: '⚠️', error: '❌', debug: '🐛' }[type] || '📝';
  console.log(`${prefix} [FAVORITOS] ${message}`);
}

class FavoritoController {
  async getAll(req, res) {
    try {
      log('Listando todos os favoritos', 'debug');
      const favoritos = await FavoritoModel.findAll();
      log(`${favoritos.length} favoritos encontrados`, 'debug');
      res.json(favoritos);
    } catch (error) {
      log(`Erro ao buscar favoritos: ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao buscar favoritos" });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      log(`Buscando favorito ID: ${id}`, 'debug');
      const favorito = await FavoritoModel.findById(id);
      if (!favorito) {
        log(`Favorito ID: ${id} não encontrado`, 'warning');
        return res.status(404).json({ error: "Favorito não encontrado" });
      }
      log(`Favorito ID: ${id} encontrado`, 'debug');
      res.json(favorito);
    } catch (error) {
      log(`Erro ao buscar favorito ID: ${id} - ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao buscar favorito" });
    }
  }

  async create(req, res) {
    const usuarioId = req.userId;
    const { livroId } = req.body;
    
    try {
      log(`Usuário ${usuarioId} tentando favoritar livro ${livroId}`, 'debug');
      
      const { error, value } = favoritoSchema.validate({ 
        usuarioId, 
        livroId: parseInt(livroId) 
      });
      
      if (error) {
        log(`Erro de validação: ${error.details[0].message}`, 'warning');
        return res.status(400).json({ error: error.details[0].message });
      }

      const favoritoExistente = await FavoritoModel.findByUserAndBook(usuarioId, livroId);
      if (favoritoExistente) {
        log(`Livro ${livroId} já está nos favoritos do usuário ${usuarioId}`, 'warning');
        return res.status(400).json({ 
          error: "Este livro já está nos seus favoritos",
          jaFavoritado: true 
        });
      }

      const favorito = await FavoritoModel.create(value);
      log(`❤️ Livro ${livroId} adicionado aos favoritos do usuário ${usuarioId}`, 'success');
      
      res.status(201).json({
        message: "Livro adicionado aos favoritos com sucesso! ❤️",
        favorito,
        acao: "favoritado"
      });
    } catch (error) {
      log(`Erro ao criar favorito: ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao adicionar aos favoritos" });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      log(`Atualizando favorito ID: ${id}`, 'debug');
      const { error, value } = favoritoSchema.validate(req.body);
      if (error) {
        log(`Erro de validação: ${error.details[0].message}`, 'warning');
        return res.status(400).json({ error: error.details[0].message });
      }
      const favorito = await FavoritoModel.update(id, value);
      if (!favorito) {
        log(`Favorito ID: ${id} não encontrado para atualização`, 'warning');
        return res.status(404).json({ error: "Favorito não encontrado" });
      }
      log(`Favorito ID: ${id} atualizado com sucesso`, 'success');
      res.json(favorito);
    } catch (error) {
      log(`Erro ao atualizar favorito ID: ${id} - ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao atualizar favorito" });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const usuarioId = req.userId;
    
    try {
      log(`Usuário ${usuarioId} tentando remover favorito ID: ${id}`, 'debug');
      
      const favorito = await FavoritoModel.findById(id);
      if (!favorito) {
        log(`Favorito ID: ${id} não encontrado`, 'warning');
        return res.status(404).json({ error: "Favorito não encontrado" });
      }

      if (favorito.usuarioId !== usuarioId) {
        log(`Usuário ${usuarioId} tentou remover favorito de outro usuário`, 'warning');
        return res.status(403).json({ error: "Você só pode remover seus próprios favoritos" });
      }

      await FavoritoModel.delete(id);
      log(`💔 Favorito ID: ${id} removido pelo usuário ${usuarioId}`, 'success');
      
      res.json({ 
        message: "Livro removido dos favoritos 💔",
        acao: "desfavoritado"
      });
    } catch (error) {
      log(`Erro ao remover favorito ID: ${id} - ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao remover dos favoritos" });
    }
  }

  async getMeusFavoritos(req, res) {
    const usuarioId = req.userId;
    const { statusLeitura, genero } = req.query;
    
    try {
      log(`Listando favoritos do usuário ${usuarioId}`, 'debug');
      const favoritos = await FavoritoModel.findByUserId(usuarioId, { statusLeitura, genero });
      log(`Usuário ${usuarioId} possui ${favoritos.length} favoritos`, 'debug');
      
      const estatisticas = await this.getEstatisticasLeitura(usuarioId);
      
      res.json({
        total: favoritos.length,
        estatisticas,
        favoritos: favoritos.map(fav => ({
          id: fav.id,
          livro: fav.livro,
          dataFavorito: fav.adicionadoEm,
          statusLeitura: fav.statusLeitura,
          progresso: fav.progresso,
          dataInicio: fav.dataInicio,
          dataTermino: fav.dataTermino,
          isFavorito: true
        }))
      });
    } catch (error) {
      log(`Erro ao buscar favoritos do usuário ${usuarioId} - ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao buscar seus favoritos" });
    }
  }

  async getEstatisticasLeitura(usuarioId) {
    try {
      const estatisticas = await FavoritoModel.getEstatisticasByUser(usuarioId);
      return estatisticas;
    } catch (error) {
      log(`Erro ao buscar estatísticas: ${error.message}`, 'error');
      return { queroLer: 0, lendo: 0, jaLi: 0, total: 0 };
    }
  }

  async updateStatusLeitura(req, res) {
    const usuarioId = req.userId;
    const { livroId } = req.params;
    
    try {
      log(`Usuário ${usuarioId} atualizando status de leitura do livro ${livroId}`, 'debug');
      
      const { error, value } = statusLeituraSchema.validate(req.body);
      if (error) {
        log(`Erro de validação: ${error.details[0].message}`, 'warning');
        return res.status(400).json({ error: error.details[0].message });
      }
      
      const favorito = await FavoritoModel.findByUserAndBook(usuarioId, parseInt(livroId));
      if (!favorito) {
        log(`Livro ${livroId} não encontrado nos favoritos do usuário ${usuarioId}`, 'warning');
        return res.status(404).json({ error: "Livro não encontrado nos favoritos" });
      }

      const favoritoAtualizado = await FavoritoModel.updateStatus(favorito.id, value);
      
      log(`📖 Status de leitura atualizado para "${value.statusLeitura}" - Livro ${livroId}`, 'success');
      
      res.json({
        message: "Status de leitura atualizado com sucesso! 📖",
        favorito: favoritoAtualizado
      });
    } catch (error) {
      log(`Erro ao atualizar status de leitura: ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao atualizar status de leitura" });
    }
  }

  async toggleFavorito(req, res) {
    const usuarioId = req.userId;
    const { livroId } = req.params;
    
    try {
      log(`Usuário ${usuarioId} alternando favorito do livro ${livroId}`, 'debug');
      
      const favoritoExistente = await FavoritoModel.findByUserAndBook(usuarioId, parseInt(livroId));
      
      if (favoritoExistente) {
        await FavoritoModel.delete(favoritoExistente.id);
        log(`💔 Livro ${livroId} removido dos favoritos do usuário ${usuarioId}`, 'success');
        
        res.json({
          message: "Livro removido dos favoritos 💔",
          acao: "desfavoritado",
          isFavorito: false
        });
      } else {
        const novoFavorito = await FavoritoModel.create({
          usuarioId: parseInt(usuarioId),
          livroId: parseInt(livroId)
        });
        
        log(`❤️ Livro ${livroId} adicionado aos favoritos do usuário ${usuarioId}`, 'success');
        
        res.json({
          message: "Livro adicionado aos favoritos! ❤️",
          acao: "favoritado",
          isFavorito: true,
          favorito: novoFavorito
        });
      }
    } catch (error) {
      log(`Erro ao alternar favorito: ${error.message}`, 'error');
      res.status(500).json({ error: "Erro ao processar favorito" });
    }
  }
}

export default new FavoritoController();
