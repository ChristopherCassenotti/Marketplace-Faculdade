
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import AnuncioCard from "../components/AnuncioCard";
import { listarAnuncios } from "../api/anuncios";
import { extrairErro } from "../api/client";
import { useFavoritos } from "../context/FavoritosContext";

export default function Favoritos() {
  const { estaFavoritado, contagem, carregado } = useFavoritos();

  const [anuncios, setAnuncios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    listarAnuncios()
      .then((dados) => {
        if (ativo) setAnuncios(dados);
      })
      .catch((error) => {
        if (ativo) setErro(extrairErro(error));
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  const favoritos = anuncios.filter((anuncio) =>
    estaFavoritado(anuncio.id)
  );

  const carregandoPagina = carregando || !carregado;

  return (
    <div className="min-h-screen bg-cream">
      <Navbar busca="" onBuscaChange={() => {}} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">

        <Link
          to="/anuncios"
          className="mb-6 inline-block text-sm font-medium text-sage hover:underline"
        >
          ← Voltar aos anúncios
        </Link>

        {/* Cabeçalho */}
        <section className="mb-8 rounded-2xl border border-line bg-white p-6 sm:p-8">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sage/10 text-sage">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
              </svg>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage">
                Sua lista pessoal
              </span>

              <h1 className="mt-1 text-2xl font-bold text-charcoal sm:text-3xl">
                Meus favoritos
              </h1>

              <p className="mt-2 text-sm text-muted">
                Acompanhe os anúncios que você salvou.
              </p>
            </div>

          </div>
        </section>

        {/* Carregamento */}
        {carregandoPagina && (
          <div className="rounded-2xl border border-line bg-white p-12 text-center">
            <p className="text-sm text-muted">
              Carregando seus favoritos...
            </p>
          </div>
        )}

        {/* Erro */}
        {!carregandoPagina && erro && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="font-bold text-red-700">
              Não foi possível carregar seus favoritos
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {erro}
            </p>
          </div>
        )}

        {/* Lista de favoritos */}
        {!carregandoPagina && !erro && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-charcoal">
                Anúncios salvos
              </h2>

              <span className="rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-muted">
                {contagem} favoritos
              </span>
            </div>

            {favoritos.length === 0 ? (
              <div className="rounded-2xl border border-line bg-white px-6 py-16 text-center">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sage/10 text-3xl">
                  ♡
                </div>

                <h3 className="text-xl font-bold text-charcoal">
                  Nenhum favorito por enquanto
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                  Explore os anúncios do NOMA e clique no coração
                  dos produtos que mais gostar para encontrá-los aqui.
                </p>

                <Link
                  to="/anuncios"
                  className="mt-6 inline-block rounded-xl bg-sage px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Explorar anúncios
                </Link>

              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {favoritos.map((anuncio) => (
                  <AnuncioCard
                    key={anuncio.id}
                    anuncio={anuncio}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
}
