"use strict";

const bcrypt = require("bcrypt");

const diasAtras = (dias) =>
  new Date(Date.now() - dias * 24 * 60 * 60 * 1000);

// Senha de todos os usuários demo: 123456
const USUARIOS = [
  { nome: "João Silva", email: "joao@teste.com", cpf: "11111111111", telefone: "42999990001", status: "ativo", dias: 60 },
  { nome: "Maria Oliveira", email: "maria@teste.com", cpf: "22222222222", telefone: "42999990002", status: "ativo", dias: 45 },
  { nome: "Carlos Souza", email: "carlos@teste.com", cpf: "33333333333", telefone: "42999990003", status: "ativo", dias: 30 },
  { nome: "Ana Santos", email: "ana@teste.com", cpf: "44444444444", telefone: "42999990004", status: "ativo", dias: 20 },
  { nome: "Pedro Costa", email: "pedro@teste.com", cpf: "55555555555", telefone: "42999990005", status: "inativo", dias: 10 },
  { nome: "Juliana Lima", email: "juliana@teste.com", cpf: "66666666666", telefone: "42999990006", status: "ativo", dias: 5 },
];

// Idempotente: pode rodar quantas vezes quiser. Se o usuário já existe,
// apenas redefine a senha para 123456 (corrige bancos com senha inválida).
module.exports = {
  async up(queryInterface) {
    const senha_hash = await bcrypt.hash("123456", 10);

    for (const u of USUARIOS) {
      const [existente] = await queryInterface.sequelize.query(
        "SELECT id FROM usuarios WHERE email = :email OR cpf = :cpf LIMIT 1",
        { replacements: { email: u.email, cpf: u.cpf }, type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (existente) {
        await queryInterface.bulkUpdate("usuarios", { senha_hash }, { id: existente.id });
        continue;
      }

      await queryInterface.bulkInsert("usuarios", [
        {
          nome: u.nome,
          email: u.email,
          cpf: u.cpf,
          telefone: u.telefone,
          senha_hash,
          status: u.status,
          data_cadastro: diasAtras(u.dias),
        },
      ]);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("usuarios", {
      email: USUARIOS.map((u) => u.email),
    });
  },
};
