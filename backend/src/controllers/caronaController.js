import { Carona, Usuario } from "../models/index.js";

const includeUsuario = {
  model: Usuario,
  attributes: ["id", "nome", "telefone"],
};

export async function listarCaronas(req, res) {
  try {
    const caronas = await Carona.findAll({
      include: [includeUsuario],
      order: [["data_hora", "ASC"]],
    });
    res.json(caronas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function buscarCarona(req, res) {
  try {
    const carona = await Carona.findByPk(req.params.id, {
      include: [includeUsuario],
    });
    if (!carona) return res.status(404).json({ erro: "Carona não encontrada" });

    res.json(carona);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function criarCarona(req, res) {
  try {
    const { origem, destino, data_hora, vagas, valor, observacoes, status } = req.body;

    if (!origem || !destino || !data_hora || !vagas) {
      return res.status(400).json({
        erro: "Origem, destino, data/hora e vagas são obrigatórios",
      });
    }

    const carona = await Carona.create({
      usuario_id: req.usuario.id,
      origem,
      destino,
      data_hora,
      vagas,
      valor,
      observacoes,
      status,
    });

    res.status(201).json(carona);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function atualizarCarona(req, res) {
  try {
    const carona = await Carona.findOne({
      where: { id: req.params.id, usuario_id: req.usuario.id },
    });

    if (!carona) {
      return res.status(404).json({ erro: "Carona não encontrada" });
    }

    const dados = { ...req.body };
    delete dados.id;
    delete dados.usuario_id;
    delete dados.data_cadastro;

    await carona.update(dados);
    res.json(carona);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function deletarCarona(req, res) {
  try {
    const carona = await Carona.findOne({
      where: { id: req.params.id, usuario_id: req.usuario.id },
    });

    if (!carona) {
      return res.status(404).json({ erro: "Carona não encontrada" });
    }

    await carona.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
