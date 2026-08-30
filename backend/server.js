import express from "express";
import { sequelize, conectarComRetry } from "./src/config/database.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import categoriaRoutes from "./src/routes/categoriaRoutes.js";
import anuncioRoutes from "./src/routes/anuncioRoutes.js";
import favoritoRoutes from "./src/routes/favoritoRoutes.js";

const app = express();
app.use(express.json());
app.use("/usuarios", usuarioRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/anuncios", anuncioRoutes);
app.use("/favoritos", favoritoRoutes);

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
