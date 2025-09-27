
import LivroModel from "../models/livroModel.js";
import { livroSchema } from "../validations/livroValidation.js";

class LivroController {
  // GET /livros
  async getAllLivros(req, res) {
    const { id, titulo, genero, dificuldade, autor, pagina = 1, limite = 10 } = req.query;

    try {
      const livros = await LivroModel.findAll({ id, titulo, genero, dificuldade, autor, pagina, limite });
      res.json(livros);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      res.status(500).json({ error: "Erro ao buscar livros" });
    }
  }

  // GET /livros/:id
  async getLivroById(req, res) {
    try {
      const { id } = req.params;
      const livro = await LivroModel.findById(id);

      if (!livro) {
        return res.status(404).json({ error: "Livro não encontrado!" });
      }

      res.json(livro);
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
      res.status(500).json({ error: "Erro ao buscar livro!" });
    }
  }

  // GET /livros/autor/:autorId
  async getLivrosByAutor(req, res) {
    try {
      const { autorId } = req.params;
      const livros = await LivroModel.findByAutor(autorId);
      res.json(livros);
    } catch (error) {
      console.error("Erro ao buscar livros do autor:", error);
      res.status(500).json({ error: "Erro ao buscar livros do autor!" });
    }
  }

  // GET /livros/generos - Listar todos os gêneros disponíveis
  async getGeneros(req, res) {
    try {
      const generos = await LivroModel.getAllGeneros();
      res.json(generos);
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
      res.status(500).json({ error: "Erro ao buscar gêneros!" });
    }
  }

  // GET /livros/por-genero - Buscar livros agrupados por gênero (estilo Netflix)
  async getLivrosPorGenero(req, res) {
    try {
      const { limite = 10 } = req.query; // Quantos livros por gênero
      const livrosPorGenero = await LivroModel.findGroupedByGenero(limite);
      res.json(livrosPorGenero);
    } catch (error) {
      console.error("Erro ao buscar livros por gênero:", error);
      res.status(500).json({ error: "Erro ao buscar livros por gênero!" });
    }
  }

  // POST /livros
  async createLivro(req, res) {
    try {
      const { error, value } = livroSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const novoLivro = await LivroModel.create(value);
      if (!novoLivro) {
        return res.status(400).json({ error: "Erro ao criar livro" });
      }
      res.status(201).json({
        message: "Livro criado com sucesso",
        novoLivro,
      });
    } catch (error) {
      console.error("Erro ao criar livro:", error);
      res.status(500).json({ error: "Erro ao criar livro" });
    }
  }

  // PUT /livros/:id
  async updateLivro(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = livroSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const livroAtualizado = await LivroModel.update(id, value);
      if (!livroAtualizado) {
        return res.status(404).json({ error: "Livro não encontrado" });
      }
      res.json(livroAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      res.status(500).json({ error: "Erro ao atualizar livro!" });
    }
  }

  // DELETE /livros/:id
  async deleteLivro(req, res) {
    try {
      const { id } = req.params;

      const result = await LivroModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Livro não encontrado!" });
      }

      res.status(200).json({
        message: "Livro removido com sucesso",
      });
    } catch (error) {
      console.error("Erro ao remover livro:", error);
      res.status(500).json({ error: "Erro ao remover livro!" });
    }
  }
}

export default new LivroController();