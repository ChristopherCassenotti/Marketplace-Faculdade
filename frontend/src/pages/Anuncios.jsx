import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AnuncioCard from "../components/AnuncioCard";
import EmpresaCard from "../components/EmpresaCard";
import { listarAnuncios, listarCategorias } from "../api/anuncios";
import { listarEmpresas } from "../api/empresas";
import { extrairErro } from "../api/client";

const TODOS = "todos";
const SOMENTE_EMPRESA = "empresa";
const SOMENTE_PESSOA = "pessoa";

export default function Anuncios() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [anuncios, setAnuncios] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [categoriaFiltro, setCategoriaFiltro] = useState(searchParams.get("categoria") || "");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState(TODOS);

  useEffect(() => {
    setCategoriaFiltro(searchParams.get("categoria") || "");
  }, [searchParams]);

  useEffect(() => {
    Promise.all([listarAnuncios(), listarCategorias(), listarEmpresas()])
      .then(([resAnuncios, resCategorias, resEmpresas]) => {
        setAnuncios(resAnuncios);
        setCategorias(resCategorias);
        setEmpresas(resEmpresas);
      })
      .catch((err) => setErro(extrairErro(err)))
      .finally(() => setCarregando(false));
  }, []);

  function limparFiltros() {
    setCategoriaFiltro("");
    setPrecoMin("");
    setPrecoMax("");
    setTipoFiltro(TODOS);
    setSearchParams({});
  }

  const anunciosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const min = precoMin ? Number(precoMin) : null;
    const max = precoMax ? Number(precoMax) : null;

    return anuncios
      .filter((a) => (termo ? a.titulo?.toLowerCase().includes(termo) : true))
      .filter((a) => (categoriaFiltro ? String(a.categoria_id) === String(categoriaFiltro) : true))
      .filter((a) => (min !== null ? Number(a.preco) >= min : true))
      .filter((a) => (max !== null ? Number(a.preco) <= max : true))
      .filter((a) => {
        if (tipoFiltro === SOMENTE_EMPRESA) return !!a.empresa_id;
        if (tipoFiltro === SOMENTE_PESSOA) return !a.empresa_id;
        return true;
      })
      .sort((a, b) => new Date(b.data_publicacao) - new Date(a.data_publicacao));
  }, [anuncios, busca, categoriaFiltro, precoMin, precoMax, tipoFiltro]);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar busca={busca} onBuscaChange={setBusca} />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-lg border border-line bg-white p-4 lg:sticky lg:top-20">
          <h2 className="mb-4 text-sm font-bold text-charcoal">Filtros</h2>

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted">Categoria</label>
              <select
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
                className="w-full rounded-lg border border-line bg-white px-2.5 py-2 text-sm text-charcoal outline-none focus:border-sage focus:ring-1 focus:ring-sage"
              >
                <option value="">Todas as categorias</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted">Preço</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  placeholder="Mínimo"
                  value={precoMin}
                  onChange={(e) => setPrecoMin(e.target.value)}
                  className="w-full rounded-lg border border-line bg-white px-2.5 py-2 text-sm text-charcoal placeholder-muted outline-none focus:border-sage focus:ring-1 focus:ring-sage"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Máximo"
                  value={precoMax}
                  onChange={(e) => setPrecoMax(e.target.value)}
                  className="w-full rounded-lg border border-line bg-white px-2.5 py-2 text-sm text-charcoal placeholder-muted outline-none focus:border-sage focus:ring-1 focus:ring-sage"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted">Tipo de anúncio</label>
              <div className="space-y-1.5">
                <FiltroRadio label="Todos" valor={TODOS} atual={tipoFiltro} onChange={setTipoFiltro} />
                <FiltroRadio label="Empresa" valor={SOMENTE_EMPRESA} atual={tipoFiltro} onChange={setTipoFiltro} />
                <FiltroRadio label="Pessoa física" valor={SOMENTE_PESSOA} atual={tipoFiltro} onChange={setTipoFiltro} />
              </div>
            </div>

            <button
              type="button"
              onClick={limparFiltros}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-line py-2 text-xs font-medium text-charcoal transition hover:bg-cream"
            >
              <RefreshIcon />
              Limpar filtros
            </button>
          </div>
        </aside>

        <div>
          {carregando && (
            <p className="py-16 text-center text-sm text-muted">Carregando anúncios...</p>
          )}

          {!carregando && erro && (
            <p className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
              {erro}
            </p>
          )}

          {!carregando && !erro && (
            <>
              {empresas.length > 0 && (
                <section className="mb-8">
                  <h2 className="mb-3 text-base font-bold text-charcoal">Empresas em destaque</h2>
                  <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
                    {empresas.slice(0, 8).map((emp, i) => (
                      <EmpresaCard key={emp.id} empresa={emp} index={i} />
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h2 className="mb-3 text-base font-bold text-charcoal">Anúncios recentes</h2>
                {anunciosFiltrados.length === 0 ? (
                  <p className="py-16 text-center text-sm text-muted">
                    Nenhum anúncio encontrado com esses filtros.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                    {anunciosFiltrados.map((anuncio) => (
                      <AnuncioCard key={anuncio.id} anuncio={anuncio} />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function FiltroRadio({ label, valor, atual, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-charcoal">
      <input
        type="radio"
        name="tipo-anuncio"
        checked={atual === valor}
        onChange={() => onChange(valor)}
        className="h-3.5 w-3.5 accent-sage"
      />
      {label}
    </label>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4v5h5M20 20v-5h-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.6 15a8 8 0 0 0 14-4.6M19.4 9A8 8 0 0 0 5.4 13.6" strokeLinecap="round" />
    </svg>
  );
}
