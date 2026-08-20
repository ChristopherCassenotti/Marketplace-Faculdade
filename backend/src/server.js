import express from "express";
import { sequelize, conectarComRetry } from "./config/database.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
app.use(express.json());
app.use("/usuarios", usuarioRoutes);

conectarComRetry()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(3000, () => {
      console.log("Server Running!");
    });
  })
  .catch((error) => {
    console.log("Erro fatal ao conectar no banco:", error);
    process.exit(1);
  });
