import Categoria from "../models/Categoria.js";

export async function listarCategorias(req, res) {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function buscarCategoria(req, res) {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function criarCategoria(req, res) {
  try {
    const novaCategoria = await Categoria.create(req.body);
    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function atualizarCategoria(req, res) {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }
    await categoria.update(req.body);
    res.json(categoria);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function deletarCategoria(req, res) {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }
    await categoria.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
