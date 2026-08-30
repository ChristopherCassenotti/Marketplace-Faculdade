import { Router } from "express";
import {
  listarFavoritos,
  buscarFavorito,
  criarFavorito,
  atualizarFavorito,
  deletarFavorito,
} from "../controllers/favoritoController.js";
import { autenticarJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(autenticarJWT);

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorito:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         usuario_id:
 *           type: integer
 *         anuncio_id:
 *           type: integer
 *         data:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Favoritos
 *   description: Anúncios favoritados por usuários
 */

/**
 * @swagger
 * /favoritos:
 *   get:
 *     summary: Lista todos os favoritos (com usuário e anúncio)
 *     tags: [Favoritos]
 *     responses:
 *       200:
 *         description: Lista de favoritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorito'
 */
router.get("/", listarFavoritos);

/**
 * @swagger
 * /favoritos/{id}:
 *   get:
 *     summary: Busca um favorito pelo ID
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Favorito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorito'
 *       404:
 *         description: Favorito não encontrado
 */
router.get("/:id", buscarFavorito);

/**
 * @swagger
 * /favoritos:
 *   post:
 *     summary: Favorita um anúncio
 *     tags: [Favoritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               anuncio_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Favorito criado com sucesso
 *       400:
 *         description: Dados inválidos ou favorito duplicado
 */
router.post("/", criarFavorito);

/**
 * @swagger
 * /favoritos/{id}:
 *   put:
 *     summary: Atualiza um favorito existente
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Favorito'
 *     responses:
 *       200:
 *         description: Favorito atualizado
 *       404:
 *         description: Favorito não encontrado
 */
router.put("/:id", atualizarFavorito);

/**
 * @swagger
 * /favoritos/{id}:
 *   delete:
 *     summary: Remove um favorito
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Favorito removido com sucesso
 *       404:
 *         description: Favorito não encontrado
 */
router.delete("/:id", deletarFavorito);

export default router;
