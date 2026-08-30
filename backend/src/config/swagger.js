import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Marketplace Faculdade API",
      version: "1.1.0",
      description:
        "API REST com usuários, autenticação JWT, categorias, tags, anúncios, favoritos e caronas.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Ambiente local (Docker)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
