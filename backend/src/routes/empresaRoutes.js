import express from 'express';
import { criarEmpresa, listarEmpresas, buscarEmpresaPorId, atualizarEmpresa, excluirEmpresa } from '../controllers/empresaController.js';

const router = express.Router();

router.get('/', listarEmpresas);
router.get('/:id', buscarEmpresaPorId);

router.post('/', criarEmpresa);

router.put('/:id', atualizarEmpresa);

router.delete('/:id', excluirEmpresa);

export default router;