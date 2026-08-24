import { Router } from "express";
import {
  listarFavoritos,
  buscarFavorito,
  criarFavorito,
  atualizarFavorito,
  deletarFavorito,
} from "../controllers/favoritoController.js";

const router = Router();

router.get("/", listarFavoritos);
router.get("/:id", buscarFavorito);
router.post("/", criarFavorito);
router.put("/:id", atualizarFavorito);
router.delete("/:id", deletarFavorito);

export default router;
