"use strict";

const diasAtras = (dias) =>
  new Date(Date.now() - dias * 24 * 60 * 60 * 1000);

// [email do usuário, título do anúncio, dias atrás]
const FAVORITOS = [
  ["joao@teste.com", "Notebook Dell Inspiron", 10],
  ["joao@teste.com", "Honda Civic 2020", 8],
  ["joao@teste.com", "Apartamento Centro", 5],
  ["maria@teste.com", "iPhone 15 128GB", 15],
  ["maria@teste.com", "Honda Civic 2020", 6],
  ["maria@teste.com", "PlayStation 5", 2],
  ["carlos@teste.com", "iPhone 15 128GB", 12],
  ["carlos@teste.com", "Apartamento Centro", 9],
  ["carlos@teste.com", "PlayStation 5", 4],
  ["ana@teste.com", "iPhone 15 128GB", 7],
  ["ana@teste.com", "Honda Civic 2020", 6],
  ["ana@teste.com", "Bicicleta Mountain Bike", 3],
  ["pedro@teste.com", "Notebook Dell Inspiron", 4],
  ["pedro@teste.com", "Apartamento Centro", 2],
  ["juliana@teste.com", "Honda Civic 2020", 1],
];

// Idempotente: busca ids por email/título e ignora favoritos que já existem.
module.exports = {
  async up(queryInterface) {
    const { QueryTypes } = queryInterface.sequelize;

    const usuarios = await queryInterface.sequelize.query(
      "SELECT id, email FROM usuarios", { type: QueryTypes.SELECT }
    );
    const anuncios = await queryInterface.sequelize.query(
      "SELECT id, titulo FROM anuncios", { type: QueryTypes.SELECT }
    );
    const existentes = await queryInterface.sequelize.query(
      "SELECT usuario_id, anuncio_id FROM favoritos", { type: QueryTypes.SELECT }
    );

    const idUsuario = Object.fromEntries(usuarios.map((u) => [u.email, u.id]));
    const idAnuncio = Object.fromEntries(anuncios.map((a) => [a.titulo, a.id]));
    const ja = new Set(existentes.map((f) => `${f.usuario_id}-${f.anuncio_id}`));

    const novos = [];
    for (const [email, titulo, dias] of FAVORITOS) {
      const usuario_id = idUsuario[email];
      const anuncio_id = idAnuncio[titulo];
      if (!usuario_id || !anuncio_id) continue;

      const chave = `${usuario_id}-${anuncio_id}`;
      if (ja.has(chave)) continue;
      ja.add(chave);

      novos.push({ usuario_id, anuncio_id, data: diasAtras(dias) });
    }

    if (novos.length) {
      await queryInterface.bulkInsert("favoritos", novos);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("favoritos", null, {});
  },
};
