import api from "./client";

export function listarFavoritos() {
  return api.get("/favoritos").then((res) => res.data);
}

export function favoritar(anuncio_id) {
  return api.post("/favoritos", { anuncio_id }).then((res) => res.data);
}

export function desfavoritar(favoritoId) {
  return api.delete(`/favoritos/${favoritoId}`);
}
