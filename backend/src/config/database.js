import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  },
);

async function conectarComRetry(tentativas = 10, intervaloMs = 3000) {
  for (let i = 1; i <= tentativas; i++) {
    try {
      await sequelize.authenticate();
      console.log("Conectado ao banco com sucesso!");
      return;
    } catch (err) {
      console.log(
        `Tentativa ${i}/${tentativas} falhou, tentando de novo em ${intervaloMs}ms...`,
      );
      await new Promise((r) => setTimeout(r, intervaloMs));
    }
  }
  throw new Error("Não foi possível conectar ao banco de dados.");
}

export { sequelize, conectarComRetry };
