import path from "path";
import upload from "../middleware/uploadMiddleware.js";

class UploadController {
  // POST /upload/foto
  uploadFoto(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }
    // Caminho relativo para salvar no banco
    const url = `/uploads/${req.file.filename}`;
    res.status(201).json({ url });
  }
}

export default new UploadController();