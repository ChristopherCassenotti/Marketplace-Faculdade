import { Router } from "express";
import {listarCaronas, buscarCarona, criarCarona, atualizarCarona, deletarCarona, } from "../controllers/caronaController.js";
import { autenticarJWT } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Carona:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         usuario_id:
 *           type: integer
 *         origem:
 *           type: string
 *         destino:
 *           type: string
 *         data_hora:
 *           type: string
 *           format: date-time
 *         vagas:
 *           type: integer
 *         valor:
 *           type: number
 *         observacoes:
 *           type: string
 *         status:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Caronas
 *   description: Gerenciamento de caronas
 */

/**
 * @swagger
 * /caronas:
 *   get:
 *     summary: Lista todas as caronas
 *     tags: [Caronas]
 *     responses:
 *       200:
 *         description: Lista de caronas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carona'
 */
router.get("/", listarCaronas);

/**
 * @swagger
 * /caronas/{id}:
 *   get:
 *     summary: Busca uma carona pelo ID
 *     tags: [Caronas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carona encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carona'
 *       404:
 *         description: Carona não encontrada
 */
router.get("/:id", buscarCarona);

/**
 * @swagger
 * /caronas:
 *   post:
 *     summary: Cria uma nova carona
 *     tags: [Caronas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - origem
 *               - destino
 *               - data_hora
 *               - vagas
 *             properties:
 *               origem:
 *                 type: string
 *               destino:
 *                 type: string
 *               data_hora:
 *                 type: string
 *                 format: date-time
 *               vagas:
 *                 type: integer
 *               valor:
 *                 type: number
 *               observacoes:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Carona criada com sucesso
 *       400:
 *         description: Origem, destino, data/hora e vagas são obrigatórios
 */
router.post("/", autenticarJWT, criarCarona);

/**
 * @swagger
 * /caronas/{id}:
 *   put:
 *     summary: Atualiza uma carona existente
 *     tags: [Caronas]
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
 *             $ref: '#/components/schemas/Carona'
 *     responses:
 *       200:
 *         description: Carona atualizada
 *       404:
 *         description: Carona não encontrada
 */
router.put("/:id", autenticarJWT, atualizarCarona);

/**
 * @swagger
 * /caronas/{id}:
 *   delete:
 *     summary: Remove uma carona
 *     tags: [Caronas]
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
 *         description: Carona removida com sucesso
 *       404:
 *         description: Carona não encontrada
 */
router.delete("/:id", autenticarJWT, deletarCarona);

export default router;
