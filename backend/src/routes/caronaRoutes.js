import { Router } from "express";
import {listarCaronas, buscarCarona, criarCarona, atualizarCarona, deletarCarona, } from "../controllers/caronaController.js";
import { autenticarJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", listarCaronas);
router.get("/:id", buscarCarona);
router.post("/", autenticarJWT, criarCarona);
router.put("/:id", autenticarJWT, atualizarCarona);
router.delete("/:id", autenticarJWT, deletarCarona);

export default router;
