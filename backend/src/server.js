import express from "express";
import { conectarComRetry } from "./config/database.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import anuncioRoutes from "./routes/anuncioRoutes.js";
import favoritoRoutes from "./routes/favoritoRoutes.js";
import empresaRoutes from "./routes/empresaRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import caronaRoutes from "./routes/caronaRoutes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/tags", tagRoutes);
app.use("/anuncios", anuncioRoutes);
app.use("/caronas", caronaRoutes);
app.use("/favoritos", favoritoRoutes);
app.use("/empresa", empresaRoutes);

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
