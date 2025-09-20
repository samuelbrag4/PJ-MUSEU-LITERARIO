
import EscritorModel from "../models/escritorModel.js";
import { escritorSchema } from "../validations/escritorValidation.js";

class EscritorController {
  // GET /escritores
  async getAll(req, res) {
    try {
      const escritores = await EscritorModel.findAll();
      res.json(escritores);
    } catch (error) {
      console.error("Erro ao buscar escritores:", error);
      res.status(500).json({ error: "Erro ao buscar escritores" });
    }
  }

  // GET /escritores/:id
  async getById(req, res) {
    try {
      const escritor = await EscritorModel.findById(req.params.id);
      if (!escritor) return res.status(404).json({ error: "Escritor não encontrado" });
      res.json(escritor);
    } catch (error) {
      console.error("Erro ao buscar escritor:", error);
      res.status(500).json({ error: "Erro ao buscar escritor" });
    }
  }

  // POST /escritores
  async create(req, res) {
    try {
      const { error, value } = escritorSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const escritor = await EscritorModel.create(value);
      res.status(201).json(escritor);
    } catch (error) {
      console.error("Erro ao criar escritor:", error);
      res.status(500).json({ error: "Erro ao criar escritor" });
    }
  }

  // PUT /escritores/:id
  async update(req, res) {
    try {
      const { error, value } = escritorSchema.fork(Object.keys(req.body), (schema) => schema.optional()).validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const escritor = await EscritorModel.update(req.params.id, value);
      if (!escritor) return res.status(404).json({ error: "Escritor não encontrado" });
      res.json(escritor);
    } catch (error) {
      console.error("Erro ao atualizar escritor:", error);
      res.status(500).json({ error: "Erro ao atualizar escritor" });
    }
  }

  // DELETE /escritores/:id
  async delete(req, res) {
    try {
      await EscritorModel.delete(req.params.id);
      res.json({ message: "Escritor removido com sucesso" });
    } catch (error) {
      console.error("Erro ao remover escritor:", error);
      res.status(500).json({ error: "Erro ao remover escritor" });
    }
  }
}

export default new EscritorController();
