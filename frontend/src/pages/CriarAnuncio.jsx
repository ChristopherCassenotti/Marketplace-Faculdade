import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { GridIcon, TagIcon, UserIcon, BuildingIcon } from "../components/FormField";
import { criarAnuncio, listarCategorias } from "../api/anuncios";
import { listarEmpresas } from "../api/empresas";
import { extrairErro } from "../api/client";

const VENDEDOR_USUARIO = "usuario";
const VENDEDOR_EMPRESA = "empresa";

export default function CriarAnuncio() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [tipoVendedor, setTipoVendedor] = useState(VENDEDOR_USUARIO);
  const [empresaId, setEmpresaId] = useState("");
  const [empresas, setEmpresas] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [imagemPreview, setImagemPreview] = useState(null);

  const [categorias, setCategorias] = useState([]);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    listarCategorias()
      .then(setCategorias)
      .catch(() => setCategorias([]));
    listarEmpresas()
      .then(setEmpresas)
      .catch(() => setEmpresas([]));
  }, []);

  function aoSelecionarImagem(e) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    setImagemPreview(URL.createObjectURL(arquivo));
  }

  async function aoEnviar(e) {
    e.preventDefault();
    setErro("");

    if (!titulo || !preco || !categoriaId) {
      setErro("Preencha nome, preço e categoria do anúncio.");
      return;
    }
    if (tipoVendedor === VENDEDOR_EMPRESA && !empresaId) {
      setErro("Selecione a empresa em nome de quem o anúncio será postado.");
      return;
    }

    setEnviando(true);
    try {
      await criarAnuncio({
        titulo,
        descricao,
        preco: Number(preco),
        categoria_id: Number(categoriaId),
        ...(tipoVendedor === VENDEDOR_EMPRESA ? { empresa_id: Number(empresaId) } : {}),
      });
      navigate("/anuncios");
    } catch (err) {
      setErro(extrairErro(err));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar busca="" onBuscaChange={() => {}} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-charcoal">Cadastrar novo Anúncio</h1>
          <p className="mt-1 text-sm text-muted">
            Preencha as informações para começar a vender na NOMA.
          </p>
        </div>

        <form onSubmit={aoEnviar} className="space-y-6">
          <div className="mx-auto flex w-full max-w-md rounded-lg border border-line bg-white p-1">
            <VendedorTab
              ativo={tipoVendedor === VENDEDOR_USUARIO}
              onClick={() => setTipoVendedor(VENDEDOR_USUARIO)}
              icon={<UserIcon />}
              titulo="Usuário"
              subtitulo="Pessoa Física"
            />
            <VendedorTab
              ativo={tipoVendedor === VENDEDOR_EMPRESA}
              onClick={() => setTipoVendedor(VENDEDOR_EMPRESA)}
              icon={<BuildingIcon />}
              titulo="Empresa"
              subtitulo="Pessoa Jurídica"
            />
          </div>

          {tipoVendedor === VENDEDOR_EMPRESA && (
            <select
              value={empresaId}
              onChange={(e) => setEmpresaId(e.target.value)}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-charcoal outline-none transition focus:border-sage focus:ring-1 focus:ring-sage"
              required
            >
              <option value="" disabled>
                Selecione a empresa
              </option>
              {empresas.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nome}
                </option>
              ))}
            </select>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_260px]">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nome do anúncio"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-charcoal placeholder-muted outline-none transition focus:border-sage focus:ring-1 focus:ring-sage"
                required
              />

              <textarea
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={6}
                className="w-full resize-none rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-charcoal placeholder-muted outline-none transition focus:border-sage focus:ring-1 focus:ring-sage"
              />
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-full min-h-56 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line bg-white p-4 text-center transition hover:border-sage"
            >
              {imagemPreview ? (
                <img
                  src={imagemPreview}
                  alt="Pré-visualização do produto"
                  className="h-full max-h-48 w-full rounded-md object-cover"
                />
              ) : (
                <>
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-muted">
                    <ImageIcon />
                  </span>
                  <span className="text-sm text-charcoal">
                    Selecione uma imagem
                    <br />
                    do produto
                  </span>
                  <span className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-charcoal">
                    <UploadIcon />
                    Selecionar imagem
                  </span>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={aoSelecionarImagem}
                className="hidden"
              />
            </button>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sage">
                <TagIcon />
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Preço do Produto"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="w-full rounded-lg border border-line bg-white py-2.5 pl-9 pr-3 text-sm text-charcoal placeholder-muted outline-none transition focus:border-sage focus:ring-1 focus:ring-sage"
                required
              />
            </div>

            <div className="relative sm:w-56">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sage">
                <GridIcon />
              </span>
              <select
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                className="w-full rounded-lg border border-line bg-white py-2.5 pl-9 pr-3 text-sm text-charcoal outline-none transition focus:border-sage focus:ring-1 focus:ring-sage"
                required
              >
                <option value="" disabled>
                  Categoria
                </option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {erro && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {erro}
            </p>
          )}

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/anuncios")}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-white py-2.5 text-sm font-medium text-charcoal transition hover:bg-cream sm:order-1"
            >
              Cancelar
              <XIcon />
            </button>
            <button
              type="submit"
              disabled={enviando}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-sage py-2.5 text-sm font-semibold text-white transition hover:bg-sage/90 disabled:cursor-not-allowed disabled:opacity-60 sm:order-2"
            >
              {enviando ? "Cadastrando..." : "Cadastrar anúncio"}
              <CheckIcon />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

function VendedorTab({ ativo, onClick, icon, titulo, subtitulo }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2.5 transition ${
        ativo ? "border border-sage bg-sage/10 text-sage" : "text-muted hover:text-charcoal"
      }`}
    >
      {icon}
      <span className="text-left leading-tight">
        <span className="block text-sm font-semibold">{titulo}</span>
        <span className="block text-[11px]">{subtitulo}</span>
      </span>
    </button>
  );
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="m5 18 5-5 3.5 3.5L18 12l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 16V4M7 9l5-5 5 5M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
