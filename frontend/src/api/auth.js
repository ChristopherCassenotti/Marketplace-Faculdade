import api from "./client";

export function login({ email, senha }) {
  return api.post("/auth/login", { email, senha }).then((res) => res.data);
}

export function cadastrar({ nome, email, cpf, telefone, senha }) {
  return api
    .post("/auth/cadastro", { nome, email, cpf, telefone, senha })
    .then((res) => res.data);
}

export function buscarUsuarioLogado() {
  return api.get("/auth/me").then((res) => res.data);
}
