
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AnuncioCard from "../components/AnuncioCard";
import { listarEmpresas } from "../api/empresas";
import { listarAnuncios } from "../api/anuncios";
import { extrairErro } from "../api/client";

function formatarWhatsApp(telefone) {
  const numero = String(telefone || "").replace(/\D/g, "");

  if (numero.length === 10 || numero.length === 11) {
    return `55${numero}`;
  }

  return numero;
}

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
    setEmpresa(null);
    setAnuncios([]);

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
          (anuncio) =>
            String(anuncio.empresa_id) === String(id)
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

  const numeroWhatsApp = empresa?.telefone
    ? formatarWhatsApp(empresa.telefone)
    : "";

  const whatsappValido = /^\d{12,13}$/.test(numeroWhatsApp);

  const mensagemWhatsApp = empresa
    ? encodeURIComponent(
        `Olá! Encontrei a ${empresa.nome} no NOMA e gostaria de saber mais sobre seus produtos.`
      )
    : "";

  return (
    <div className="min-h-screen bg-cream">
      <Navbar busca="" onBuscaChange={() => {}} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">

        {/* Navegação */}
        <nav className="mb-6 text-sm">
          <Link
            to="/anuncios"
            className="font-medium text-sage hover:underline"
          >
            ← Voltar aos anúncios
          </Link>
        </nav>

        {/* Carregamento */}
        {carregando && (
          <div className="rounded-2xl border border-line bg-white p-12 text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-pulse rounded-full bg-sage/20" />
            <p className="text-muted">
              Carregando informações da empresa...
            </p>
          </div>
        )}

        {/* Erro */}
        {!carregando && erro && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="text-lg font-bold text-red-700">
              Não foi possível carregar a vitrine
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {erro}
            </p>

            <Link
              to="/anuncios"
              className="mt-5 inline-block rounded-lg bg-sage px-5 py-2.5 font-semibold text-white"
            >
              Voltar aos anúncios
            </Link>
          </div>
        )}

        {!carregando && !erro && empresa && (
          <>
            {/* Cabeçalho da empresa */}
            <section className="mb-10 overflow-hidden rounded-2xl border border-line bg-white shadow-sm">

              {/* Faixa de destaque */}
              <div className="h-28 bg-gradient-to-r from-sage/30 via-sage/15 to-cream sm:h-36" />

              <div className="px-5 pb-7 sm:px-8">

                {/* Identidade da empresa */}
                <div className="-mt-10 flex flex-col gap-5 sm:flex-row sm:items-end">

                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-sage text-4xl font-bold text-white shadow-md">
                    {empresa.nome?.[0]?.toUpperCase() || "E"}
                  </div>

                  <div className="flex-1 sm:pb-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-sage">
                      Estabelecimento no NOMA
                    </span>

                    <h1 className="mt-1 text-2xl font-bold text-charcoal sm:text-3xl">
                      {empresa.nome}
                    </h1>

                    <p className="mt-1 text-sm text-muted">
                      Conheça os produtos deste estabelecimento.
                    </p>
                  </div>

                  <div className="self-start rounded-xl bg-sage/10 px-5 py-3 text-center sm:self-end">
                    <p className="text-2xl font-bold text-sage">
                      {anuncios.length}
                    </p>

                    <p className="text-xs font-medium text-muted">
                      {anuncios.length === 1
                        ? "Produto anunciado"
                        : "Produtos anunciados"}
                    </p>
                  </div>
                </div>

                {/* Divisão */}
                <div className="my-6 border-t border-line" />

                {/* Apresentação */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  <div>
                    <h2 className="text-sm font-bold text-charcoal">
                      Sobre este estabelecimento
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                      Explore os anúncios publicados por esta empresa
                      e encontre produtos disponíveis em um só lugar.
                      Entre em contato diretamente com o estabelecimento
                      para obter mais informações.
                    </p>
                  </div>

                  {/* Contatos */}
                  <div className="flex flex-wrap gap-3">

                    {empresa.telefone && whatsappValido && (
                      <a
                        href={`https://wa.me/${numeroWhatsApp}?text=${mensagemWhatsApp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl bg-sage px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
                      >
                        Falar pelo WhatsApp ↗
                      </a>
                    )}

                    {empresa.email && (
                      <a
                        href={`mailto:${empresa.email}`}
                        className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-cream"
                      >
                        Enviar e-mail
                      </a>
                    )}

                  </div>
                </div>
              </div>
            </section>

            {/* Produtos */}
            <section className="pb-12">

              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-sage">
                    Catálogo da empresa
                  </span>

                  <h2 className="mt-1 text-2xl font-bold text-charcoal">
                    Produtos disponíveis
                  </h2>

                  <p className="mt-2 text-sm text-muted">
                    Confira os anúncios publicados por {empresa.nome}.
                  </p>
                </div>

                <span className="self-start rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-muted">
                  {anuncios.length}{" "}
                  {anuncios.length === 1 ? "anúncio" : "anúncios"}
                </span>
              </div>

              {/* Lista de anúncios */}
              {anuncios.length === 0 ? (
                <div className="rounded-2xl border border-line bg-white px-6 py-16 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sage/10 text-3xl">
                    📦
                  </div>

                  <h3 className="text-lg font-bold text-charcoal">
                    Nenhum produto por enquanto
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
                    Este estabelecimento ainda não possui anúncios disponíveis.
                    Volte em outro momento para conferir as novidades.
                  </p>

                  <Link
                    to="/anuncios"
                    className="mt-6 inline-block rounded-xl bg-sage px-5 py-3 text-sm font-bold text-white"
                  >
                    Explorar outros anúncios
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {anuncios.map((anuncio) => (
                    <AnuncioCard
                      key={anuncio.id}
                      anuncio={anuncio}
                    />
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
