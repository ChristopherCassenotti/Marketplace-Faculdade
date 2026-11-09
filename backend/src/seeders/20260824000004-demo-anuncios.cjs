"use strict";

const diasAtras = (dias) =>
  new Date(Date.now() - dias * 24 * 60 * 60 * 1000);

// Anúncios de pessoa física. Usuário e categoria são buscados por email/nome,
// então não dependem dos ids gerados em cada máquina.
const ANUNCIOS = [
  { titulo: "iPhone 15 128GB", descricao: "iPhone em excelente estado de conservação", preco: 3500.0, usuario: "joao@teste.com", categoria: "Eletrônicos", dias: 20 },
  { titulo: "Notebook Dell Inspiron", descricao: "Notebook Dell com 16GB de RAM e SSD de 512GB", preco: 2800.0, usuario: "maria@teste.com", categoria: "Eletrônicos", dias: 18 },
  { titulo: "Honda Civic 2020", descricao: "Veículo completo e revisado", preco: 95000.0, usuario: "carlos@teste.com", categoria: "Veículos", dias: 15 },
  { titulo: "Moto Honda CG 160", descricao: "Moto econômica, documentação em dia", preco: 14500.0, usuario: "joao@teste.com", categoria: "Veículos", dias: 12 },
  { titulo: "Apartamento Centro", descricao: "Apartamento com 2 quartos e garagem", preco: 320000.0, usuario: "ana@teste.com", categoria: "Imóveis", dias: 10 },
  { titulo: "Sofá 3 Lugares", descricao: "Sofá seminovo em ótimo estado", preco: 1200.0, usuario: "maria@teste.com", categoria: "Móveis", dias: 8 },
  { titulo: "Bicicleta Mountain Bike", descricao: "Bicicleta aro 29 com 21 marchas", preco: 1800.0, usuario: "carlos@teste.com", categoria: "Esportes", dias: 5 },
  { titulo: "PlayStation 5", descricao: "Console PS5 com dois controles", preco: 3800.0, usuario: "ana@teste.com", categoria: "Eletrônicos", dias: 3 },
  { titulo: "Casa com 3 quartos", descricao: "Casa com garagem e terreno amplo", preco: 450000.0, usuario: "joao@teste.com", categoria: "Imóveis", dias: 2 },
  { titulo: "Mesa de Escritório", descricao: "Mesa de madeira com gavetas", preco: 650.0, status: "Inativo", usuario: "pedro@teste.com", categoria: "Móveis", dias: 1 },
];

// Idempotente: só insere anúncios cujo título ainda não existe.
module.exports = {
  async up(queryInterface) {
    const { QueryTypes } = queryInterface.sequelize;

    const usuarios = await queryInterface.sequelize.query(
      "SELECT id, email FROM usuarios", { type: QueryTypes.SELECT }
    );
    const categorias = await queryInterface.sequelize.query(
      "SELECT id, nome FROM categorias", { type: QueryTypes.SELECT }
    );
    const existentes = await queryInterface.sequelize.query(
      "SELECT titulo FROM anuncios", { type: QueryTypes.SELECT }
    );

    const idUsuario = Object.fromEntries(usuarios.map((u) => [u.email, u.id]));
    const idCategoria = Object.fromEntries(categorias.map((c) => [c.nome, c.id]));
    const titulos = new Set(existentes.map((a) => a.titulo));

    const novos = ANUNCIOS.filter(
      (a) => !titulos.has(a.titulo) && idUsuario[a.usuario] && idCategoria[a.categoria]
    ).map((a) => ({
      titulo: a.titulo,
      descricao: a.descricao,
      preco: a.preco,
      status: a.status || "Ativo",
      tipo: "Venda",
      usuario_id: idUsuario[a.usuario],
      categoria_id: idCategoria[a.categoria],
      data_publicacao: diasAtras(a.dias),
    }));

    if (novos.length) {
      await queryInterface.bulkInsert("anuncios", novos);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("anuncios", {
      titulo: ANUNCIOS.map((a) => a.titulo),
    });
  },
};
