import { QueryTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export async function resumoCategorias(req, res) {
  try {
    const resumo = await sequelize.query(
      "SELECT * FROM vw_resumo_categorias ORDER BY total_anuncios DESC, categoria",
      { type: QueryTypes.SELECT },
    );
    res.json(resumo);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
