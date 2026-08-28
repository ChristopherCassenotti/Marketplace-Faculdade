import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Marketplace Faculdade API",
      version: "1.0.0",
      description:
        "API REST do projeto integrador — CRUD de Usuários, Categorias, Anúncios e Favoritos usando Sequelize.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Ambiente local (Docker)",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // onde ele vai procurar os comentários @swagger
};

export const swaggerSpec = swaggerJsdoc(options);
