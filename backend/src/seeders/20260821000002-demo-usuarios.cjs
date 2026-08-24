"use strict";

const diasAtras = (dias) =>
  new Date(Date.now() - dias * 24 * 60 * 60 * 1000);

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("usuarios", [
      {
        nome: "João Silva",
        email: "joao@teste.com",
        cpf: "11111111111",
        telefone: "42999990001",
        senha_hash: "senha_hash_joao",
        status: "ativo",
        data_cadastro: diasAtras(60),
      },
      {
        nome: "Maria Oliveira",
        email: "maria@teste.com",
        cpf: "22222222222",
        telefone: "42999990002",
        senha_hash: "senha_hash_maria",
        status: "ativo",
        data_cadastro: diasAtras(45),
      },
      {
        nome: "Carlos Souza",
        email: "carlos@teste.com",
        cpf: "33333333333",
        telefone: "42999990003",
        senha_hash: "senha_hash_carlos",
        status: "ativo",
        data_cadastro: diasAtras(30),
      },
      {
        nome: "Ana Santos",
        email: "ana@teste.com",
        cpf: "44444444444",
        telefone: "42999990004",
        senha_hash: "senha_hash_ana",
        status: "ativo",
        data_cadastro: diasAtras(20),
      },
      {
        nome: "Pedro Costa",
        email: "pedro@teste.com",
        cpf: "55555555555",
        telefone: "42999990005",
        senha_hash: "senha_hash_pedro",
        status: "inativo",
        data_cadastro: diasAtras(10),
      },
      {
        nome: "Juliana Lima",
        email: "juliana@teste.com",
        cpf: "66666666666",
        telefone: "42999990006",
        senha_hash: "senha_hash_juliana",
        status: "ativo",
        data_cadastro: diasAtras(5),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("usuarios", {
      email: [
        "joao@teste.com",
        "maria@teste.com",
        "carlos@teste.com",
        "ana@teste.com",
        "pedro@teste.com",
        "juliana@teste.com",
      ],
    });
  },
};