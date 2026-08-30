import { sequelize } from "../config/database.js";
import Usuario from "./Usuario.js";
import Categoria from "./Categoria.js";
import Anuncio from "./Anuncio.js";
import Favorito from "./Favorito.js";
import Empresa from "./Empresa.js";
import Tag from "./Tag.js";
import AnuncioTag from "./AnuncioTag.js";
import Carona from "./Carona.js";

// Um usuário pode ter vários anúncios
Usuario.hasMany(Anuncio, { foreignKey: "usuario_id" });
Anuncio.belongsTo(Usuario, { foreignKey: "usuario_id" });

// Uma categoria pode ter vários anúncios
Categoria.hasMany(Anuncio, { foreignKey: "categoria_id" });
Anuncio.belongsTo(Categoria, { foreignKey: "categoria_id" });

// Relação N:N entre usuários e anúncios através de favoritos
Usuario.belongsToMany(Anuncio, { through: Favorito, foreignKey: "usuario_id" });
Anuncio.belongsToMany(Usuario, { through: Favorito, foreignKey: "anuncio_id" });

Usuario.hasMany(Favorito, { foreignKey: "usuario_id" });
Anuncio.hasMany(Favorito, { foreignKey: "anuncio_id" });
Favorito.belongsTo(Usuario, { foreignKey: "usuario_id" });
Favorito.belongsTo(Anuncio, { foreignKey: "anuncio_id" });

// Tags dos anúncios
Anuncio.belongsToMany(Tag, {
  through: AnuncioTag,
  foreignKey: "anuncio_id",
  otherKey: "tag_id",
});
Tag.belongsToMany(Anuncio, {
  through: AnuncioTag,
  foreignKey: "tag_id",
  otherKey: "anuncio_id",
});

// Caronas
Usuario.hasMany(Carona, { foreignKey: "usuario_id" });
Carona.belongsTo(Usuario, { foreignKey: "usuario_id" });

// Empresa - mantido conforme estrutura existente
Empresa.hasMany(Anuncio, { foreignKey: "empresa_id" });
Empresa.hasMany(Categoria, { foreignKey: "empresa_id" });
Empresa.hasMany(Favorito, { foreignKey: "empresa_id" });
Categoria.belongsTo(Empresa, { foreignKey: "empresa_id" });
Favorito.belongsTo(Empresa, { foreignKey: "empresa_id" });
Anuncio.belongsTo(Empresa, { foreignKey: "empresa_id" });

export {
  sequelize,
  Usuario,
  Categoria,
  Anuncio,
  Favorito,
  Empresa,
  Tag,
  AnuncioTag,
  Carona,
};
