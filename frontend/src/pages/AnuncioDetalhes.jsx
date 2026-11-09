
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { listarAnuncios, listarCategorias } from "../api/anuncios";
import { listarEmpresas } from "../api/empresas";
import { extrairErro } from "../api/client";

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function AnuncioDetalhes() {
  const { id } = useParams();

  const [anuncio, setAnuncio] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    setCarregando(true);
    setErro("");
    setAnuncio(null);

    Promise.all([
      listarAnuncios(),
      listarEmpresas(),
      listarCategorias(),
    ])
      .then(([anuncios, empresas, categorias]) => {
        if (!ativo) return;

        const encontrado = anuncios.find(
          (item) => String(item.id) === String(id)
        );

        if (!encontrado) {
          setErro("Este anúncio não foi encontrado.");
          return;
        }

        setAnuncio(encontrado);

        setEmpresa(
          empresas.find(
            (item) =>
              String(item.id) === String(encontrado.empresa_id)
          ) || null
        );

        setCategoria(
          categorias.find(
            (item) =>
              String(item.id) === String(encontrado.categoria_id)
          ) || null
        );
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

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Link
          to="/anuncios"
          className="mb-6 inline-block text-sm font-semibold text-sage hover:underline"
        >
          ← Voltar aos anúncios
        </Link>

        {carregando && (
          <div className="rounded-xl bg-white p-12 text-center text-muted">
            Carregando anúncio...
          </div>
        )}

        {!carregando && erro && (
          <div className="rounded-xl border border-red-200 bg-white p-10 text-center">
            <h2 className="text-xl font-bold text-charcoal">
              Não foi possível abrir o anúncio
            </h2>
            <p className="mt-3 text-sm text-muted">{erro}</p>
            <Link
              to="/anuncios"
              className="mt-5 inline-block rounded-lg bg-sage px-5 py-3 font-semibold text-white"
            >
              Ver outros produtos
            </Link>
          </div>
        )}

        {!carregando && !erro && anuncio && (
          <>
            <section className="grid gap-6 lg:grid-cols-2">
              {/* Área de imagem */}
              <div className="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-20 w-20 text-muted/40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="9" cy="10" r="2" />
                  <path d="m5 18 5-5 3.5 3.5L18 12l3 3" />
                </svg>

                <p className="text-sm text-muted">
                  Imagem não disponível
                </p>
              </div>

              {/* Informações principais */}
              <div className="flex flex-col rounded-2xl border border-line bg-white p-6 sm:p-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-sage/10 px-3 py-1 text-xs font-semibold text-sage">
                    {categoria?.nome || "Produto"}
                  </span>

                  <span className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-charcoal">
                    {anuncio.tipo || "Venda"}
                  </span>
                </div>

                <h1 className="text-2xl font-bold text-charcoal sm:text-3xl">
                  {anuncio.titulo}
                </h1>

                <p className="mt-5 text-3xl font-bold text-sage">
                  {moeda.format(Number(anuncio.preco) || 0)}
                </p>

                <div className="my-6 border-t border-line" />

                <h2 className="text-sm font-bold text-charcoal">
                  Informações do anúncio
                </h2>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-muted">Tipo</span>
                    <span className="font-medium text-charcoal">
                      {anuncio.tipo || "Venda"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-muted">Categoria</span>
                    <span className="font-medium text-charcoal">
                      {categoria?.nome || "Não informada"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-muted">Status</span>
                    <span className="font-medium text-charcoal">
                      {anuncio.status || "Não informado"}
                    </span>
                  </div>

                  {anuncio.data_publicacao && (
                    <div className="flex justify-between gap-3">
                      <span className="text-muted">Publicado em</span>
                      <span className="font-medium text-charcoal">
                        {new Date(
                          anuncio.data_publicacao
                        ).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-8 rounded-xl bg-cream p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Anunciante
                  </p>

                  <h3 className="mt-2 text-lg font-bold text-charcoal">
                    {empresa?.nome ||
                      anuncio.Usuario?.nome ||
                      "Vendedor"}
                  </h3>

                  {empresa && (
                    <Link
                      to={`/empresas/${empresa.id}`}
                      className="mt-3 inline-block rounded-lg bg-sage px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
                    >
                      Ver vitrine da empresa →
                    </Link>
                  )}

                  {!empresa && (
                    <p className="mt-2 text-sm text-muted">
                      Anúncio de pessoa física.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Descrição */}
            <section className="mt-6 rounded-2xl border border-line bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-charcoal">
                Descrição do produto
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
                {anuncio.descricao?.trim() ||
                  "O anunciante não informou uma descrição."}
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
