import { sequelize } from "../config/database.js";
import Usuario from "./Usuario.js";
import Categoria from "./Categoria.js";
import Anuncio from "./Anuncio.js";
import Favorito from "./Favorito.js";

// Um usuário pode ter vários anúncios
Usuario.hasMany(Anuncio, { foreignKey: "usuario_id" });
Anuncio.belongsTo(Usuario, { foreignKey: "usuario_id" });

// Uma categoria pode ter vários anúncios
Categoria.hasMany(Anuncio, { foreignKey: "categoria_id" });
Anuncio.belongsTo(Categoria, { foreignKey: "categoria_id" });

//RElação N:N entre usuarios e anuncio atraves do favorito
Usuario.belongsToMany(Anuncio, { through: Favorito, foreignKey: "usuario_id" });
Anuncio.belongsToMany(Usuario, { through: Favorito, foreignKey: "anuncio_id" });

Usuario.hasMany(Favorito, { foreignKey: "usuario_id" });
Anuncio.hasMany(Favorito, { foreignKey: "anuncio_id" });
Favorito.belongsTo(Usuario, { foreignKey: "usuario_id" });
Favorito.belongsTo(Anuncio, { foreignKey: "anuncio_id" });

export { sequelize, Usuario, Categoria, Anuncio, Favorito };
