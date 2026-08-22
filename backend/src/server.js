import express from "express";
import { sequelize, conectarComRetry } from "./config/database.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";

const app = express();
app.use(express.json());
app.use("/usuarios", usuarioRoutes);
app.use("/categorias", categoriaRoutes);

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
