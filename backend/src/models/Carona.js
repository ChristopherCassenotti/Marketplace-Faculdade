import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Carona = sequelize.define(
  "Carona",
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
    origem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_hora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    vagas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    observacoes: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Ativa",
    },
    data_cadastro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "caronas",
    timestamps: false,
  },
);

export default Carona;
