"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("anuncio_tags", {
      anuncio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "anuncios", key: "id" },
        onDelete: "CASCADE",
        primaryKey: true,
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "tags", key: "id" },
        onDelete: "CASCADE",
        primaryKey: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("anuncio_tags");
  },
};
