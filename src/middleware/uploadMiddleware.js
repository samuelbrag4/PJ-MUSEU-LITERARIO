import multer from "multer";
import path from "path";
import fs from "fs";

// Cria a pasta de uploads se não existir
defaultUploadDir();
function defaultUploadDir() {
  const dir = path.resolve("uploads");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Apenas imagens são permitidas."));
    }
  },
});

export default upload;
