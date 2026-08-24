"use strict";

const diasAtras = (dias) =>
  new Date(Date.now() - dias * 24 * 60 * 60 * 1000);

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("anuncios", [
      {
        titulo: "iPhone 15 128GB",
        descricao: "iPhone em excelente estado de conservação",
        preco: 3500.0,
        status: "Ativo",
        tipo: "Venda",
        usuario_id: 1,
        categoria_id: 1,
        data_publicacao: diasAtras(20),
      },
      {
        titulo: "Notebook Dell Inspiron",
        descricao: "Notebook Dell com 16GB de RAM e SSD de 512GB",
        preco: 2800.0,
        status: "Ativo",
        tipo: "Venda",
        usuario_id: 2,
        categoria_id: 1,
        data_publicacao: diasAtras(18),
      },
      {
        titulo: "Honda Civic 2020",
        descricao: "Veículo completo e revisado",
        preco: 95000.0,
        status: "Ativo",
        tipo: "Venda",
        usuario_id: 3,
        categoria_id: 2,
        data_publicacao: diasAtras(15),
      },
      {
        titulo: "Moto Honda CG 160",
        descricao: "Moto econômica, documentação em dia",
        preco: 14500.0,
        status: "Ativo",
        tipo: "Venda",
        usuario_id: 1,
        categoria_id: 2,
        data_publicacao: diasAtras(12),
      },
      {
        titulo: "Apartamento Centro",
        descricao: "Apartamento com 2 quartos e garagem",
        preco: 320000.0,
        status: "Ativo",
        tipo: "Venda",
        usuario_id: 4,
        categoria_id: 3,
        data_publicacao: diasAtras(10),
      },
      {
        titulo: "Sofá 3 Lugares",
        descricao: "Sofá seminovo em ótimo estado",
        preco: 1200.0,
        status: "Ativo",
        tipo: "Venda",
        usuario_id: 2,
        categoria_id: 4,
        data_publicacao: diasAtras(8),
      },
      {
        titulo: "Bicicleta Mountain Bike",
        descricao: "Bicicleta aro 29 com 21 marchas",
        preco: 1800.0,
        status: "Ativo",
        tipo: "Venda",
        usuario_id: 3,
        categoria_id: 5,
        data_publicacao: diasAtras(5),
      },
      {
        titulo: "PlayStation 5",
        descricao: "Console PS5 com dois controles",
        preco: 3800.0,
        status: "Ativo",
        tipo: "Venda",
        usuario_id: 4,
        categoria_id: 1,
        data_publicacao: diasAtras(3),
      },
      {
        titulo: "Casa com 3 quartos",
        descricao: "Casa com garagem e terreno amplo",
        preco: 450000.0,
        status: "Ativo",
        tipo: "Venda",
        usuario_id: 1,
        categoria_id: 3,
        data_publicacao: diasAtras(2),
      },
      {
        titulo: "Mesa de Escritório",
        descricao: "Mesa de madeira com gavetas",
        preco: 650.0,
        status: "Inativo",
        tipo: "Venda",
        usuario_id: 5,
        categoria_id: 4,
        data_publicacao: diasAtras(1),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("anuncios", {
      titulo: [
        "iPhone 15 128GB",
        "Notebook Dell Inspiron",
        "Honda Civic 2020",
        "Moto Honda CG 160",
        "Apartamento Centro",
        "Sofá 3 Lugares",
        "Bicicleta Mountain Bike",
        "PlayStation 5",
        "Casa com 3 quartos",
        "Mesa de Escritório",
      ],
    });
  },
};