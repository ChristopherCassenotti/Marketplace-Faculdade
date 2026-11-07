"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE VIEW vw_resumo_categorias AS
      SELECT
        c.id AS categoria_id,
        c.nome AS categoria,
        COUNT(DISTINCT a.id) AS total_anuncios,
        COUNT(DISTINCT a.id) FILTER (WHERE a.status = 'Ativo') AS anuncios_ativos,
        COALESCE(ROUND(AVG(a.preco), 2), 0) AS preco_medio,
        COALESCE(MIN(a.preco), 0) AS preco_minimo,
        COALESCE(MAX(a.preco), 0) AS preco_maximo,
        COALESCE(SUM(f.qtd), 0) AS total_favoritos
      FROM categorias c
      LEFT JOIN anuncios a ON a.categoria_id = c.id
      LEFT JOIN (
        SELECT anuncio_id, COUNT(*) AS qtd
        FROM favoritos
        GROUP BY anuncio_id
      ) f ON f.anuncio_id = a.id
      GROUP BY c.id, c.nome;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      "DROP VIEW IF EXISTS vw_resumo_categorias;",
    );
  },
};
