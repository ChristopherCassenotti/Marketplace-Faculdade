import { Router } from "express";
import {
  listarAnuncios,
  buscarAnuncio,
  criarAnuncio,
  atualizarAnuncio,
  deletarAnuncio,
} from "../controllers/anuncioController.js";
import { deepEqual } from "node:assert";

const router = Router();

router.get("/", listarAnuncios);
router.get("/", buscarAnuncio);
router.post("/", criarAnuncio);
router.put("/", atualizarAnuncio);
router.delete("/", deletarAnuncio);

export default router;
