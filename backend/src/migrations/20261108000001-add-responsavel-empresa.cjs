
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("empresa", "usuario_responsavel_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "usuarios",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      "empresa",
      "usuario_responsavel_id"
    );
  },
};
