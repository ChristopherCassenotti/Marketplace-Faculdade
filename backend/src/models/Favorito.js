import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Favorito = sequelize.define(
  "Favorito",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    anuncio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "favoritos",
    timestamps: false,
  },
);

export default Favorito;
