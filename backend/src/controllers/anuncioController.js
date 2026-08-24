import { Anuncio, Usuario, Categoria } from "../models/index.js";

export async function listarAnuncios(req, res) {
  try {
    const anuncios = await Anuncio.findAll({
      include: [
        { model: Usuario, attributes: ["id", "nome", "email"] },
        { model: Categoria, attributes: ["id", "nome"] },
      ],
    });
    res.json(anuncios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function buscarAnuncio(req, res) {
  try {
    const anuncio = await Anuncio.findByPk(req.params.id, {
      include: [
        { model: Usuario, attributes: ["id", "nome", "email"] },
        { model: Categoria, attributes: ["id", "nome"] },
      ],
    });
    if (!anuncio) {
      return res.status(404).json({ erro: "Anúncio não encontrado" });
    }
    res.json(anuncio);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function criarAnuncio(req, res) {
  try {
    const novoAnuncio = await Anuncio.create(req.body);
    res.status(201).json(novoAnuncio);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function atualizarAnuncio(req, res) {
  try {
    const anuncio = await Anuncio.findByPk(req.params.id);
    if (!anuncio) {
      return res.status(404).json({ erro: "Anúncio não encontrado" });
    }
    await anuncio.update(req.body);
    res.json(anuncio);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function deletarAnuncio(req, res) {
  try {
    const anuncio = await Anuncio.findByPk(req.params.id);
    if (!anuncio) {
      return res.status(404).json({ erro: "Anúncio não encontrado" });
    }
    await anuncio.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
