import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Empresa = sequelize.define(
    'Empresa',
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        cnpj: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        telefone: DataTypes.STRING,
        senha_hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          defaultValue: "ativo",
        },
        data_cadastro: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "empresa",
        timestamps: false,
    },
);

export default Empresa;