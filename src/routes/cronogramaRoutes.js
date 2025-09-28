import express from "express";
import CronogramaController from "../controllers/cronogramaController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, CronogramaController.getAll);
router.get("/meus", authMiddleware, CronogramaController.getByUser);
router.post("/", authMiddleware, CronogramaController.create);
router.put("/:id", authMiddleware, CronogramaController.update);
router.delete("/:id", authMiddleware, CronogramaController.delete);
router.patch("/:id/toggle", authMiddleware, CronogramaController.toggleConcluido);

export default router;