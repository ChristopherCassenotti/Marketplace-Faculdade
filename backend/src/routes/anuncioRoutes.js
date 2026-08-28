import { Router } from "express";
import {
  listarAnuncios,
  buscarAnuncio,
  criarAnuncio,
  atualizarAnuncio,
  deletarAnuncio,
} from "../controllers/anuncioController.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Anuncio:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         titulo:
 *           type: string
 *         descricao:
 *           type: string
 *         preco:
 *           type: number
 *           format: float
 *         status:
 *           type: string
 *         tipo:
 *           type: string
 *         usuario_id:
 *           type: integer
 *         categoria_id:
 *           type: integer
 *         data_publicacao:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Anuncios
 *   description: Gerenciamento de anúncios de venda/troca
 */

/**
 * @swagger
 * /anuncios:
 *   get:
 *     summary: Lista todos os anúncios (com usuário e categoria)
 *     tags: [Anuncios]
 *     responses:
 *       200:
 *         description: Lista de anúncios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Anuncio'
 */
router.get("/", listarAnuncios);

/**
 * @swagger
 * /anuncios/{id}:
 *   get:
 *     summary: Busca um anúncio pelo ID (com usuário e categoria)
 *     tags: [Anuncios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Anúncio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anuncio'
 *       404:
 *         description: Anúncio não encontrado
 */
router.get("/:id", buscarAnuncio);

/**
 * @swagger
 * /anuncios:
 *   post:
 *     summary: Cria um novo anúncio
 *     tags: [Anuncios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               usuario_id:
 *                 type: integer
 *               categoria_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Anúncio criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", criarAnuncio);

/**
 * @swagger
 * /anuncios/{id}:
 *   put:
 *     summary: Atualiza um anúncio existente
 *     tags: [Anuncios]
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
 *             $ref: '#/components/schemas/Anuncio'
 *     responses:
 *       200:
 *         description: Anúncio atualizado
 *       404:
 *         description: Anúncio não encontrado
 */
router.put("/:id", atualizarAnuncio);

/**
 * @swagger
 * /anuncios/{id}:
 *   delete:
 *     summary: Remove um anúncio
 *     tags: [Anuncios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Anúncio removido com sucesso
 *       404:
 *         description: Anúncio não encontrado
 */
router.delete("/:id", deletarAnuncio);

export default router;
