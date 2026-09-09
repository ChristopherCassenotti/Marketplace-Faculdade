"use strict";

/**
 * Adiciona a coluna empresa_id em anuncios, categorias e favoritos.
 * As associacoes em src/models/index.js (Empresa.hasMany / belongsTo) esperam
 * essa coluna, mas nenhuma migration anterior a criou. Nullable para nao
 * quebrar registros/seeds existentes.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    const empresaFk = {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: "empresa", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    };

    await queryInterface.addColumn("anuncios", "empresa_id", empresaFk);
    await queryInterface.addColumn("categorias", "empresa_id", empresaFk);
    await queryInterface.addColumn("favoritos", "empresa_id", empresaFk);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("favoritos", "empresa_id");
    await queryInterface.removeColumn("categorias", "empresa_id");
    await queryInterface.removeColumn("anuncios", "empresa_id");
  },
};
