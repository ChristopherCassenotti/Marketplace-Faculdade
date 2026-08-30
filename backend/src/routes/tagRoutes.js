import { Router } from "express";
import { listarTags, criarTag, atualizarTag, deletarTag,} from "../controllers/tagController.js";
import { autenticarJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", listarTags);
router.post("/", autenticarJWT, criarTag);
router.put("/:id", autenticarJWT, atualizarTag);
router.delete("/:id", autenticarJWT, deletarTag);

export default router;
