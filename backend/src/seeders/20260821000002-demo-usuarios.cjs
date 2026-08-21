"use strict";

//Nota: Definir se vamos usar o bcrypt ou o md5 direto no banco de dados para a segurança do banco, por hora vai ficar sem nada.

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("usuarios", [
      {
        nome: "João Santos",
        email: "joao@teste.com",
        cpf: "11111111111",
        telefone: "42999990000",
        senha_hash: "senha_fake_para_teste",
        status: "ativo",
        data_cadastro: new Date(),
      },
      {
        nome: "Maria Silva",
        email: "maria@teste.com",
        cpf: "22222222222",
        telefone: "42999991111",
        senha_hash: "senha_fake_para_teste",
        status: "ativo",
        data_cadastro: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
