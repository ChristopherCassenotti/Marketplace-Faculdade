import { Favorito, Usuario, Anuncio } from "../models/index.js";

export async function listarFavoritos(req, res) {
  try {
    const favoritos = await Favorito.findAll({
      where: { usuario_id: req.usuario.id },
      include: [
        { model: Usuario, attributes: ["id", "nome"] },
        { model: Anuncio, attributes: ["id", "titulo", "preco"] },
      ],
    });
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function buscarFavorito(req, res) {
  try {
    const favorito = await Favorito.findOne({
      where: { id: req.params.id, usuario_id: req.usuario.id },
      include: [
        { model: Usuario, attributes: ["id", "nome"] },
        { model: Anuncio, attributes: ["id", "titulo", "preco"] },
      ],
    });
    if (!favorito) {
      return res.status(404).json({ erro: "Favorito não encontrado" });
    }
    res.json(favorito);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function criarFavorito(req, res) {
  try {
    const novoFavorito = await Favorito.create({
      usuario_id: req.usuario.id,
      anuncio_id: req.body.anuncio_id,
    });
    res.status(201).json(novoFavorito);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function atualizarFavorito(req, res) {
  try {
    const favorito = await Favorito.findOne({
      where: { id: req.params.id, usuario_id: req.usuario.id },
    });
    if (!favorito) {
      return res.status(404).json({ erro: "Favorito não encontrado" });
    }

    await favorito.update({ anuncio_id: req.body.anuncio_id });
    res.json(favorito);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function deletarFavorito(req, res) {
  try {
    const favorito = await Favorito.findOne({
      where: { id: req.params.id, usuario_id: req.usuario.id },
    });
    if (!favorito) {
      return res.status(404).json({ erro: "Favorito não encontrado" });
    }
    await favorito.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
