import api from "./client";

export function listarEmpresas() {
  return api.get("/empresas").then((res) => res.data);
}

export function cadastrarEmpresa({ nome, email, cnpj, telefone, senha }) {
  return api
    .post("/empresas", { nome, email, cnpj, telefone, senha })
    .then((res) => res.data);
}
