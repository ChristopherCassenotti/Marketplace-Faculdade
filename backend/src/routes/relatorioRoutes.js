import { Router } from "express";
import { resumoCategorias } from "../controllers/relatorioController.js";
import { autenticarJWT } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ResumoCategoria:
 *       type: object
 *       properties:
 *         categoria_id:
 *           type: integer
 *         categoria:
 *           type: string
 *         total_anuncios:
 *           type: integer
 *         anuncios_ativos:
 *           type: integer
 *         preco_medio:
 *           type: number
 *         preco_minimo:
 *           type: number
 *         preco_maximo:
 *           type: number
 *         total_favoritos:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Relatorios
 *   description: Relatórios baseados em views do banco
 */

/**
 * @swagger
 * /relatorios/categorias:
 *   get:
 *     summary: Resumo de anúncios por categoria (view vw_resumo_categorias)
 *     tags: [Relatorios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumo por categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ResumoCategoria'
 */
router.get("/categorias", autenticarJWT, resumoCategorias);

export default router;
