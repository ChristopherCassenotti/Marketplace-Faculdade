import api from "./client";

export function resumoCategorias() {
  return api.get("/relatorios/categorias").then((res) => res.data);
}
