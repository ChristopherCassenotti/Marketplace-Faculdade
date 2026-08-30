"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("caronas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "usuarios", key: "id" },
        onDelete: "CASCADE",
      },
      origem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destino: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_hora: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      vagas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      valor: Sequelize.DECIMAL(10, 2),
      observacoes: Sequelize.TEXT,
      status: {
        type: Sequelize.STRING,
        defaultValue: "Ativa",
      },
      data_cadastro: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("caronas");
  },
};
