import axios from "axios";

// Em dev, o Vite faz proxy de /api para o backend (http://localhost:3000).
const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ugv_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function extrairErro(error) {
  return (
    error?.response?.data?.erro ||
    error?.message ||
    "Ocorreu um erro inesperado. Tente novamente."
  );
}

export default api;
