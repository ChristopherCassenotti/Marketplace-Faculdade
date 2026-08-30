import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import { gerarToken } from "../utils/jwt.js";

function usuarioSeguro(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    cpf: usuario.cpf,
    telefone: usuario.telefone,
    status: usuario.status,
    data_cadastro: usuario.data_cadastro,
  };
}

export async function cadastrar(req, res) {
  try {
    const { nome, email, cpf, telefone, senha } = req.body;

    if (!nome || !email || !cpf || !senha) {
      return res.status(400).json({
        erro: "Nome, email, CPF e senha são obrigatórios",
      });
    }

    const existente = await Usuario.findOne({ where: { email } });
    if (existente) {
      return res.status(409).json({ erro: "Email já cadastrado" });
    }

    const cpfExistente = await Usuario.findOne({ where: { cpf } });
    if (cpfExistente) {
      return res.status(409).json({ erro: "CPF já cadastrado" });
    }

    const senha_hash = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({
      nome,
      email,
      cpf,
      telefone,
      senha_hash,
    });

    const token = gerarToken({ id: usuario.id, email: usuario.email });

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      token,
      usuario: usuarioSeguro(usuario),
    });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    if (usuario.status !== "ativo") {
      return res.status(403).json({ erro: "Usuário inativo" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const token = gerarToken({ id: usuario.id, email: usuario.email });

    return res.json({
      token,
      usuario: usuarioSeguro(usuario),
    });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}

export async function me(req, res) {
  return res.json({ usuario: req.usuario });
}
