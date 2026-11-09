"use strict";

const diasAtras = (dias) =>
  new Date(Date.now() - dias * 24 * 60 * 60 * 1000);

// Empresas demo (CNPJs válidos) com o usuário responsável e seus anúncios.
// Os anúncios são publicados pelo responsável em nome da empresa (empresa_id).
const EMPRESAS = [
  {
    nome: "Tech Store Ltda.",
    email: "contato@techstore.com",
    cnpj: "12345678000195",
    telefone: "42999991001",
    responsavel: "joao@teste.com",
    dias: 40,
    anuncios: [
      { titulo: "Samsung Galaxy S24 128GB", descricao: "Lacrado, com nota fiscal e garantia de 1 ano", preco: 4299.0, categoria: "Eletrônicos", dias: 9 },
      { titulo: "Notebook Lenovo IdeaPad 3", descricao: "Ryzen 5, 8GB de RAM, SSD 256GB. Novo, com garantia", preco: 2999.0, categoria: "Eletrônicos", dias: 7 },
      { titulo: "Fone JBL Tune 510BT", descricao: "Fone bluetooth sem fio, novo na caixa", preco: 249.9, categoria: "Eletrônicos", dias: 4 },
    ],
  },
  {
    nome: "Casa & Conforto Móveis",
    email: "vendas@casaeconforto.com",
    cnpj: "98765432000198",
    telefone: "42999992002",
    responsavel: "maria@teste.com",
    dias: 35,
    anuncios: [
      { titulo: "Guarda-roupa Casal 6 Portas", descricao: "MDF branco, entrega e montagem grátis na cidade", preco: 1499.0, categoria: "Móveis", dias: 8 },
      { titulo: "Mesa de Jantar 4 Lugares", descricao: "Tampo de vidro e cadeiras estofadas", preco: 1190.0, categoria: "Móveis", dias: 5 },
      { titulo: "Rack para TV até 65\"", descricao: "Rack com painel e nichos, cor freijó", preco: 789.0, categoria: "Móveis", dias: 2 },
    ],
  },
  {
    nome: "Pedal Forte Esportes",
    email: "loja@pedalforte.com",
    cnpj: "45612378000184",
    telefone: "42999993003",
    responsavel: "carlos@teste.com",
    dias: 25,
    anuncios: [
      { titulo: "Bicicleta Speed Aro 700", descricao: "Quadro de alumínio, 16 marchas Shimano", preco: 3290.0, categoria: "Esportes", dias: 6 },
      { titulo: "Esteira Elétrica Dobrável", descricao: "Velocidade até 12 km/h, suporta 120 kg", preco: 2190.0, categoria: "Esportes", dias: 3 },
    ],
  },
];

// Idempotente: empresas são buscadas pelo CNPJ e anúncios pelo título.
module.exports = {
  async up(queryInterface) {
    const { QueryTypes } = queryInterface.sequelize;
    const select = (sql, replacements) =>
      queryInterface.sequelize.query(sql, { replacements, type: QueryTypes.SELECT });

    const categorias = await select("SELECT id, nome FROM categorias");
    const idCategoria = Object.fromEntries(categorias.map((c) => [c.nome, c.id]));

    for (const e of EMPRESAS) {
      const [responsavel] = await select(
        "SELECT id FROM usuarios WHERE email = :email", { email: e.responsavel }
      );
      if (!responsavel) continue;

      let [empresa] = await select(
        "SELECT id FROM empresa WHERE cnpj = :cnpj OR email = :email LIMIT 1",
        { cnpj: e.cnpj, email: e.email }
      );

      if (!empresa) {
        await queryInterface.bulkInsert("empresa", [
          {
            nome: e.nome,
            email: e.email,
            cnpj: e.cnpj,
            telefone: e.telefone,
            senha_hash: null,
            usuario_responsavel_id: responsavel.id,
            status: "ativo",
            data_cadastro: diasAtras(e.dias),
          },
        ]);
        [empresa] = await select("SELECT id FROM empresa WHERE cnpj = :cnpj", { cnpj: e.cnpj });
      } else {
        await queryInterface.bulkUpdate(
          "empresa",
          { usuario_responsavel_id: responsavel.id },
          { id: empresa.id, usuario_responsavel_id: null }
        );
      }

      const existentes = await select(
        "SELECT titulo FROM anuncios WHERE titulo IN (:titulos)",
        { titulos: e.anuncios.map((a) => a.titulo) }
      );
      const titulos = new Set(existentes.map((a) => a.titulo));

      const novos = e.anuncios
        .filter((a) => !titulos.has(a.titulo) && idCategoria[a.categoria])
        .map((a) => ({
          titulo: a.titulo,
          descricao: a.descricao,
          preco: a.preco,
          status: "Ativo",
          tipo: "Venda",
          usuario_id: responsavel.id,
          categoria_id: idCategoria[a.categoria],
          empresa_id: empresa.id,
          data_publicacao: diasAtras(a.dias),
        }));

      if (novos.length) {
        await queryInterface.bulkInsert("anuncios", novos);
      }
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("anuncios", {
      titulo: EMPRESAS.flatMap((e) => e.anuncios.map((a) => a.titulo)),
    });
    await queryInterface.bulkDelete("empresa", {
      cnpj: EMPRESAS.map((e) => e.cnpj),
    });
  },
};
