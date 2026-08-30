import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";

const atributosSeguros = {
  exclude: ["senha_hash"],
};

export async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll({ attributes: atributosSeguros });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function buscarUsuario(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: atributosSeguros,
    });
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function criarUsuario(req, res) {
  try {
    const { senha, ...dados } = req.body;
    if (!senha) return res.status(400).json({ erro: "Senha é obrigatória" });

    dados.senha_hash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create(dados);

    const usuarioSeguro = await Usuario.findByPk(novoUsuario.id, {
      attributes: atributosSeguros,
    });
    res.status(201).json(usuarioSeguro);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function atualizarUsuario(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const { senha, ...dados } = req.body;
    delete dados.senha_hash;

    if (senha) {
      dados.senha_hash = await bcrypt.hash(senha, 10);
    }

    await usuario.update(dados);

    const usuarioSeguro = await Usuario.findByPk(usuario.id, {
      attributes: atributosSeguros,
    });
    res.json(usuarioSeguro);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

export async function deletarUsuario(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    await usuario.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
