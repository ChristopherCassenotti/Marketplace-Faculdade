import { Router } from "express";
import { cadastrar, login, me } from "../controllers/authController.js";
import { autenticarJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/cadastro", cadastrar);
router.post("/login", login);
router.get("/me", autenticarJWT, me);

export default router;
