import api from "./client";

export function listarAnuncios() {
  return api.get("/anuncios").then((res) => res.data);
}

export function criarAnuncio(dados) {
  return api.post("/anuncios", dados).then((res) => res.data);
}

export function listarCategorias() {
  return api.get("/categorias").then((res) => res.data);
}
