import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as favoritosApi from "../api/favoritos";
import { useAuth } from "./AuthContext";

const FavoritosContext = createContext(null);

export function FavoritosProvider({ children }) {
  const { autenticado } = useAuth();
  // Map anuncio_id -> id do registro de favorito (pra poder deletar depois)
  const [mapa, setMapa] = useState(new Map());
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (!autenticado) {
      setMapa(new Map());
      setCarregado(false);
      return;
    }
    favoritosApi
      .listarFavoritos()
      .then((lista) => {
        setMapa(new Map(lista.map((f) => [f.anuncio_id, f.id])));
      })
      .catch(() => setMapa(new Map()))
      .finally(() => setCarregado(true));
  }, [autenticado]);

  async function alternar(anuncioId) {
    const favoritoId = mapa.get(anuncioId);
    if (favoritoId) {
      setMapa((m) => {
        const novo = new Map(m);
        novo.delete(anuncioId);
        return novo;
      });
      try {
        await favoritosApi.desfavoritar(favoritoId);
      } catch {
        // reverte em caso de falha
        setMapa((m) => new Map(m).set(anuncioId, favoritoId));
      }
    } else {
      try {
        const criado = await favoritosApi.favoritar(anuncioId);
        setMapa((m) => new Map(m).set(anuncioId, criado.id));
      } catch {
        // sem-op: mantém como não favoritado
      }
    }
  }

  const value = useMemo(
    () => ({
      contagem: mapa.size,
      carregado,
      estaFavoritado: (anuncioId) => mapa.has(anuncioId),
      alternar,
    }),
    [mapa, carregado],
  );

  return <FavoritosContext.Provider value={value}>{children}</FavoritosContext.Provider>;
}

export function useFavoritos() {
  const ctx = useContext(FavoritosContext);
  if (!ctx) {
    throw new Error("useFavoritos precisa ser usado dentro de um FavoritosProvider");
  }
  return ctx;
}
