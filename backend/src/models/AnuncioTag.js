import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const AnuncioTag = sequelize.define(
  "AnuncioTag",
  {
    anuncio_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: "anuncio_tags",
    timestamps: false,
  },
);

export default AnuncioTag;
