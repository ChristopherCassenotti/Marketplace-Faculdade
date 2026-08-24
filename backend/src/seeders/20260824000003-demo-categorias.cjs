"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("categorias", [
      {
        nome: "Eletrônicos",
        descricao: "Celulares, computadores e eletrônicos",
        icone_url: "/icons/eletronicos.png",
        ordem: 1,
        ativo: true,
      },
      {
        nome: "Veículos",
        descricao: "Carros, motos e outros veículos",
        icone_url: "/icons/veiculos.png",
        ordem: 2,
        ativo: true,
      },
      {
        nome: "Imóveis",
        descricao: "Casas, apartamentos e terrenos",
        icone_url: "/icons/imoveis.png",
        ordem: 3,
        ativo: true,
      },
      {
        nome: "Móveis",
        descricao: "Móveis e itens para casa",
        icone_url: "/icons/moveis.png",
        ordem: 4,
        ativo: true,
      },
      {
        nome: "Esportes",
        descricao: "Produtos esportivos",
        icone_url: "/icons/esportes.png",
        ordem: 5,
        ativo: true,
      },
      {
        nome: "Outros",
        descricao: "Produtos diversos",
        icone_url: "/icons/outros.png",
        ordem: 6,
        ativo: false,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("categorias", {
      nome: [
        "Eletrônicos",
        "Veículos",
        "Imóveis",
        "Móveis",
        "Esportes",
        "Outros",
      ],
    });
  },
};