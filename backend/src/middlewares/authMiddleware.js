import Usuario from "../models/Usuario.js";
import { verificarToken } from "../utils/jwt.js";

export async function autenticarJWT(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({ erro: "Token não informado" });
    }

    const token = authorization.slice(7);
    const payload = verificarToken(token);

    const usuario = await Usuario.findByPk(payload.id, {
      attributes: ["id", "nome", "email", "status"],
    });

    if (!usuario || usuario.status !== "ativo") {
      return res.status(401).json({ erro: "Usuário inválido ou inativo" });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}
