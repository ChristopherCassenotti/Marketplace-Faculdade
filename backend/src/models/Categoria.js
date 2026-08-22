import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Categoria = sequelize.define(
  "Categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: DataTypes.TEXT,
    icone_url: DataTypes.STRING,
    ordem: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "categorias",
    timestamps: false,
  },
);

export default Categoria;
