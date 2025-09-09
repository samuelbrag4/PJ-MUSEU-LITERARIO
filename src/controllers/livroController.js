import LivroModel from "../models/livroModel.js";

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

  // POST /livros
  async createLivro(req, res) {
    try {
      const data = req.body;
      // Valide os campos obrigatórios aqui se quiser

      const novoLivro = await LivroModel.create(data);

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
      const data = req.body;

      const livroAtualizado = await LivroModel.update(id, data);

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