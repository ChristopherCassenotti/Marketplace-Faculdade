import express from "express";
import { sequelize, conectarComRetry } from "./config/database.js";

const app = express();
app.use(express.json());

conectarComRetry()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server Running!");
    });
  })
  .catch((error) => {
    console.log("Erro fatal ao conectar no banco:", error);
    process.exit(1);
  });
