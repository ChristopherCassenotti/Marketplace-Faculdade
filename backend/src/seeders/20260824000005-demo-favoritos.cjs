"use strict";

const diasAtras = (dias) =>
  new Date(Date.now() - dias * 24 * 60 * 60 * 1000);

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("favoritos", [
      {
        usuario_id: 1,
        anuncio_id: 2,
        data: diasAtras(10),
      },
      {
        usuario_id: 1,
        anuncio_id: 3,
        data: diasAtras(8),
      },
      {
        usuario_id: 1,
        anuncio_id: 5,
        data: diasAtras(5),
      },

      {
        usuario_id: 2,
        anuncio_id: 1,
        data: diasAtras(15),
      },
      {
        usuario_id: 2,
        anuncio_id: 3,
        data: diasAtras(6),
      },
      {
        usuario_id: 2,
        anuncio_id: 8,
        data: diasAtras(2),
      },

      {
        usuario_id: 3,
        anuncio_id: 1,
        data: diasAtras(12),
      },
      {
        usuario_id: 3,
        anuncio_id: 5,
        data: diasAtras(9),
      },
      {
        usuario_id: 3,
        anuncio_id: 8,
        data: diasAtras(4),
      },

      {
        usuario_id: 4,
        anuncio_id: 1,
        data: diasAtras(7),
      },
      {
        usuario_id: 4,
        anuncio_id: 3,
        data: diasAtras(6),
      },
      {
        usuario_id: 4,
        anuncio_id: 7,
        data: diasAtras(3),
      },

      {
        usuario_id: 5,
        anuncio_id: 2,
        data: diasAtras(4),
      },
      {
        usuario_id: 5,
        anuncio_id: 5,
        data: diasAtras(2),
      },

      {
        usuario_id: 6,
        anuncio_id: 3,
        data: diasAtras(1),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("favoritos", null, {});
  },
};