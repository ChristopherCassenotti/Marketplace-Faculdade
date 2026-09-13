import { Router } from "express";
import { listarTags, criarTag, atualizarTag, deletarTag,} from "../controllers/tagController.js";
import { autenticarJWT } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         ativo:
 *           type: boolean
 */

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Gerenciamento de tags dos anúncios
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Lista todas as tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Lista de tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */
router.get("/", listarTags);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Cria uma nova tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *               ativo:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tag criada com sucesso
 *       400:
 *         description: Nome é obrigatório
 */
router.post("/", autenticarJWT, criarTag);

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Atualiza uma tag existente
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       200:
 *         description: Tag atualizada
 *       404:
 *         description: Tag não encontrada
 */
router.put("/:id", autenticarJWT, atualizarTag);

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Remove uma tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tag removida com sucesso
 *       404:
 *         description: Tag não encontrada
 */
router.delete("/:id", autenticarJWT, deletarTag);

export default router;
