import { Anuncio, Usuario, Categoria, Tag } from "../models/index.js";

const includes = [
  { model: Usuario, attributes: ["id", "nome", "email"] },
  { model: Categoria, attributes: ["id", "nome"] },
  { model: Tag, attributes: ["id", "nome"], through: { attributes: [] } },
];

export async function listarAnuncios(req, res) {
  try {
    const anuncios = await Anuncio.findAll({ include: includes });
    res.json(anuncios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function buscarAnuncio(req, res) {
  try {
    const anuncio = await Anuncio.findByPk(req.params.id, { include: includes });
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
    const { tag_ids = [], ...dados } = req.body;

    const novoAnuncio = await Anuncio.create({
      ...dados,
      usuario_id: req.usuario.id,
    });

    if (Array.isArray(tag_ids) && tag_ids.length > 0) {
      await novoAnuncio.setTags(tag_ids);
    }

    const anuncioCompleto = await Anuncio.findByPk(novoAnuncio.id, {
      include: includes,
    });

    res.status(201).json(anuncioCompleto);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function atualizarAnuncio(req, res) {
  try {
    const anuncio = await Anuncio.findOne({
      where: { id: req.params.id, usuario_id: req.usuario.id },
    });

    if (!anuncio) {
      return res.status(404).json({ erro: "Anúncio não encontrado" });
    }

    const { tag_ids, ...dados } = req.body;
    delete dados.id;
    delete dados.usuario_id;
    delete dados.data_publicacao;

    await anuncio.update(dados);

    if (Array.isArray(tag_ids)) {
      await anuncio.setTags(tag_ids);
    }

    const anuncioCompleto = await Anuncio.findByPk(anuncio.id, {
      include: includes,
    });

    res.json(anuncioCompleto);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function deletarAnuncio(req, res) {
  try {
    const anuncio = await Anuncio.findOne({
      where: { id: req.params.id, usuario_id: req.usuario.id },
    });

    if (!anuncio) {
      return res.status(404).json({ erro: "Anúncio não encontrado" });
    }

    await anuncio.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
