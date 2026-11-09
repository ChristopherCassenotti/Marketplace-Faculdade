import api from "./client";

export function listarEmpresas() {
  return api.get("/empresas").then((res) => res.data);
}

export function cadastrarEmpresa({ nome, email, cnpj, telefone }) {
  return api
    .post("/empresas", { nome, email, cnpj, telefone })
    .then((res) => res.data);
}
