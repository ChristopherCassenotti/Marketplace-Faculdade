import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Anuncio = sequelize.define(
  "Anuncio",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: DataTypes.TEXT,
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Ativo",
    },
    tipo: {
      type: DataTypes.STRING,
      defaultValue: "Venda",
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_publicacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "anuncios",
    timestamps: false,
  },
);

export default Anuncio;
