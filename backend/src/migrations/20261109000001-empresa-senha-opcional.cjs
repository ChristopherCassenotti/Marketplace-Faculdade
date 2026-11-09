"use strict";

// Empresa deixa de ser um tipo de conta (não faz login), então a senha
// passa a ser opcional. A coluna é mantida para não perder dados antigos.
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("empresa", "senha_hash", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Atenção: o down falha se já existirem empresas com senha_hash nula.
    await queryInterface.changeColumn("empresa", "senha_hash", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
