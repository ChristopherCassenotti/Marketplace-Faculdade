import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext(null);

const TOKEN_KEY = "ugv_token";
const USER_KEY = "ugv_usuario";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem(USER_KEY);
    return salvo ? JSON.parse(salvo) : null;
  });
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(USER_KEY, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [usuario]);

  async function login(credenciais) {
    setCarregando(true);
    try {
      const data = await authApi.login(credenciais);
      setToken(data.token);
      setUsuario(data.usuario);
      return data;
    } finally {
      setCarregando(false);
    }
  }

  async function registrar(dados) {
    setCarregando(true);
    try {
      const data = await authApi.cadastrar(dados);
      setToken(data.token);
      setUsuario(data.usuario);
      return data;
    } finally {
      setCarregando(false);
    }
  }

  function logout() {
    setToken(null);
    setUsuario(null);
  }

  const value = useMemo(
    () => ({
      token,
      usuario,
      autenticado: Boolean(token),
      carregando,
      login,
      registrar,
      logout,
    }),
    [token, usuario, carregando],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth precisa ser usado dentro de um AuthProvider");
  }
  return ctx;
}
