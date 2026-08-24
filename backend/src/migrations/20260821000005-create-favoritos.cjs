"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("favoritos", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      anuncio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "anuncios",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      data: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // impede favoritar o mesmo anúncio duas vezes
    await queryInterface.addConstraint("favoritos", {
      fields: ["usuario_id", "anuncio_id"],
      type: "unique",
      name: "usuario_anuncio_unico",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("favoritos");
  },
};
