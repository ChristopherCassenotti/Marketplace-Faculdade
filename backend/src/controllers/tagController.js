import Tag from "../models/Tag.js";

export async function listarTags(req, res) {
  try {
    const tags = await Tag.findAll({ order: [["nome", "ASC"]] });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function criarTag(req, res) {
  try {
    const { nome, ativo = true } = req.body;
    if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });

    const tag = await Tag.create({ nome, ativo });
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function atualizarTag(req, res) {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ erro: "Tag não encontrada" });

    await tag.update(req.body);
    res.json(tag);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function deletarTag(req, res) {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ erro: "Tag não encontrada" });

    await tag.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
