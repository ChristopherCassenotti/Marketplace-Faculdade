import { Router } from "express";
import {
  listarCategorias,
  buscarCategoria,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria,
} from "../controllers/categoriaController.js";

const router = Router();

router.get("/", listarCategorias);
router.get("/:id", buscarCategoria);
router.post("/", criarCategoria);
router.put("/:id", atualizarCategoria);
router.delete("/:id", deletarCategoria);

export default router;
