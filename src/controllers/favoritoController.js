import FavoritoModel from "../models/favoritoModel.js";

class FavoritoController {
  // GET /favoritos
  async getAll(req, res) {
    try {
      const favoritos = await FavoritoModel.findAll();
      res.json(favoritos);
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
      res.status(500).json({ error: "Erro ao buscar favoritos" });
    }
  }

  // GET /favoritos/:id
  async getById(req, res) {
    try {
      const favorito = await FavoritoModel.findById(req.params.id);
      if (!favorito) return res.status(404).json({ error: "Favorito não encontrado" });
      res.json(favorito);
    } catch (error) {
      console.error("Erro ao buscar favorito:", error);
      res.status(500).json({ error: "Erro ao buscar favorito" });
    }
  }

  // POST /favoritos
  async create(req, res) {
    try {
      const favorito = await FavoritoModel.create(req.body);
      res.status(201).json(favorito);
    } catch (error) {
      console.error("Erro ao criar favorito:", error);
      res.status(500).json({ error: "Erro ao criar favorito" });
    }
  }

  // PUT /favoritos/:id
  async update(req, res) {
    try {
      const favorito = await FavoritoModel.update(req.params.id, req.body);
      if (!favorito) return res.status(404).json({ error: "Favorito não encontrado" });
      res.json(favorito);
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
      res.status(500).json({ error: "Erro ao atualizar favorito" });
    }
  }

  // DELETE /favoritos/:id
  async delete(req, res) {
    try {
      await FavoritoModel.delete(req.params.id);
      res.json({ message: "Favorito removido com sucesso" });
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      res.status(500).json({ error: "Erro ao remover favorito" });
    }
  }
}

export default new FavoritoController();
