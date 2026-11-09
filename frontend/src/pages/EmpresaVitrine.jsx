
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AnuncioCard from "../components/AnuncioCard";
import { listarEmpresas } from "../api/empresas";
import { listarAnuncios } from "../api/anuncios";
import { extrairErro } from "../api/client";

export default function EmpresaVitrine() {
  const { id } = useParams();

  const [empresa, setEmpresa] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    setCarregando(true);
    setErro("");

    Promise.all([listarEmpresas(), listarAnuncios()])
      .then(([empresas, todosAnuncios]) => {
        if (!ativo) return;

        const encontrada = empresas.find(
          (item) => String(item.id) === String(id)
        );

        if (!encontrada) {
          setErro("Empresa não encontrada.");
          return;
        }

        const anunciosEmpresa = todosAnuncios.filter(
          (anuncio) => String(anuncio.empresa_id) === String(id)
        );

        setEmpresa(encontrada);
        setAnuncios(anunciosEmpresa);
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
  }, [id]);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar busca="" onBuscaChange={() => {}} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link
          to="/anuncios"
          className="mb-6 inline-flex text-sm font-medium text-sage hover:underline"
        >
          ← Voltar aos anúncios
        </Link>

        {carregando && (
          <p className="py-12 text-center text-muted">
            Carregando vitrine...
          </p>
        )}

        {!carregando && erro && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
            {erro}
          </div>
        )}

        {!carregando && !erro && empresa && (
          <>
            <section className="mb-8 rounded-xl border border-line bg-white p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-sage/15 text-3xl font-bold text-sage">
                  {empresa.nome?.[0]?.toUpperCase() || "E"}
                </div>

                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-sage">
                    Comércio local
                  </span>

                  <h1 className="mt-1 text-2xl font-bold text-charcoal">
                    {empresa.nome}
                  </h1>

                  <p className="mt-2 text-sm text-muted">
                    Explore os produtos anunciados por este estabelecimento.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm">

                {empresa.telefone && (
                  <a
                    href={`https://wa.me/${formatarWhatsApp(empresa.telefone)}?text=${encodeURIComponent(
                      `Olá! Encontrei a ${empresa.nome} no NOMA e gostaria de saber mais sobre seus produtos.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-sage px-4 py-2 font-semibold text-white transition hover:opacity-90"
                  >
                    Falar pelo WhatsApp ↗
                  </a>
                )}


                    {empresa.email && (
                      <a
                        href={`mailto:${empresa.email}`}
                        className="rounded-lg border border-line px-4 py-2 font-medium text-charcoal hover:bg-cream"
                      >
                        Enviar e-mail
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-charcoal">
                  Produtos da empresa
                </h2>

                <span className="rounded-full bg-sage/10 px-3 py-1 text-sm font-medium text-sage">
                  {anuncios.length} anúncios
                </span>
              </div>

              {anuncios.length === 0 ? (
                <div className="rounded-lg border border-line bg-white p-10 text-center">
                  <h3 className="font-semibold text-charcoal">
                    Nenhum anúncio cadastrado
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    Esta empresa ainda não possui produtos publicados.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {anuncios.map((anuncio) => (
                    <AnuncioCard key={anuncio.id} anuncio={anuncio} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}


function formatarWhatsApp(telefone) {
  const numero = String(telefone || "").replace(/\D/g, "");

  // Telefones brasileiros com DDD, sem código do país
  if (numero.length === 10 || numero.length === 11) {
    return `55${numero}`;
  }

  // Telefones que já possuem código internacional
  return numero;
}
