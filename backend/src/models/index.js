import { sequelize } from "../config/database.js";
import Usuario from "./Usuario.js";
import Categoria from "./Categoria.js";
import Anuncio from "./Anuncio.js";

// Um usuário pode ter vários anúncios
Usuario.hasMany(Anuncio, { foreignKey: "usuario_id" });
Anuncio.belongsTo(Usuario, { foreignKey: "usuario_id" });

// Uma categoria pode ter vários anúncios
Categoria.hasMany(Anuncio, { foreignKey: "categoria_id" });
Anuncio.belongsTo(Categoria, { foreignKey: "categoria_id" });

export { sequelize, Usuario, Categoria, Anuncio };
