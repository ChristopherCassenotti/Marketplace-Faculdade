import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { ChatIcon, HeartIcon } from "./FormField";
import { useAuth } from "../context/AuthContext";
import { useFavoritos } from "../context/FavoritosContext";
import { listarCategorias } from "../api/anuncios";

export default function Navbar({ busca, onBuscaChange }) {
  const { usuario, logout } = useAuth();
  const { contagem } = useFavoritos();
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [menuCategorias, setMenuCategorias] = useState(false);
  const [menuConta, setMenuConta] = useState(false);
  const categoriasRef = useRef(null);
  const contaRef = useRef(null);

  useEffect(() => {
    listarCategorias()
      .then(setCategorias)
      .catch(() => setCategorias([]));
  }, []);

  useEffect(() => {
    function aoClicarFora(e) {
      if (categoriasRef.current && !categoriasRef.current.contains(e.target)) {
        setMenuCategorias(false);
      }
      if (contaRef.current && !contaRef.current.contains(e.target)) {
        setMenuConta(false);
      }
    }
    document.addEventListener("mousedown", aoClicarFora);
    return () => document.removeEventListener("mousedown", aoClicarFora);
  }, []);

  const primeiroNome = usuario?.nome?.split(" ")[0];

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/anuncios" className="flex shrink-0 items-center gap-2">
          <Logo size="sm" showText={false} />
          <div className="hidden leading-tight sm:block">
            <p className="text-lg font-extrabold text-charcoal">NOMA</p>
          </div>
        </Link>

        <div ref={categoriasRef} className="relative hidden shrink-0 md:block">
          <button
            type="button"
            onClick={() => setMenuCategorias((v) => !v)}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-charcoal transition hover:bg-cream"
          >
            <MenuIcon />
            Categorias
          </button>
          {menuCategorias && (
            <div className="absolute left-0 mt-1 w-56 rounded-lg border border-line bg-white p-1.5 shadow-xl">
              {categorias.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/anuncios?categoria=${cat.id}`}
                  onClick={() => setMenuCategorias(false)}
                  className="block rounded-md px-2.5 py-1.5 text-sm text-charcoal hover:bg-cream"
                >
                  {cat.nome}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            <SearchIcon />
          </span>
          <input
            type="search"
            placeholder="Buscar produtos, marcas e muito mais..."
            value={busca}
            onChange={(e) => onBuscaChange?.(e.target.value)}
            className="w-full rounded-lg border border-line bg-cream/50 py-2 pl-9 pr-3 text-sm text-charcoal placeholder-muted outline-none transition focus:border-sage focus:ring-1 focus:ring-sage"
          />
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <IconButton title="Favoritos" contagem={contagem}>
            <HeartIcon />
          </IconButton>

          <IconButton title="Carrinho (em breve)" desabilitado>
            <CartIcon />
          </IconButton>

          <IconButton title="Mensagens (em breve)" desabilitado>
            <ChatIcon />
          </IconButton>

          <div ref={contaRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuConta((v) => !v)}
              className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 text-sm text-charcoal transition hover:bg-cream"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage/15 text-sage">
                <UserCircleIcon />
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-xs text-muted">Olá, {primeiroNome}</span>
                <span className="block text-xs font-semibold">Minha conta</span>
              </span>
              <ChevronDownIcon />
            </button>
            {menuConta && (
              <div className="absolute right-0 mt-1 w-44 rounded-lg border border-line bg-white p-1.5 shadow-xl">
                <Link
                  to="/anuncios/novo"
                  onClick={() => setMenuConta(false)}
                  className="block rounded-md px-2.5 py-1.5 text-sm text-charcoal hover:bg-cream"
                >
                  Cadastrar anúncio
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="w-full rounded-md px-2.5 py-1.5 text-left text-sm text-charcoal hover:bg-cream"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function IconButton({ children, title, contagem, desabilitado }) {
  return (
    <button
      type="button"
      title={title}
      disabled={desabilitado}
      className={`relative flex h-9 w-9 items-center justify-center rounded-lg transition ${
        desabilitado
          ? "cursor-not-allowed text-muted/50"
          : "text-charcoal hover:bg-cream"
      }`}
    >
      {children}
      {!!contagem && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sage px-1 text-[10px] font-bold text-white">
          {contagem}
        </span>
      )}
    </button>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="21" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="18" cy="21" r="1.4" fill="currentColor" stroke="none" />
      <path d="M2.5 3h2l2.4 12.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="9.5" r="3" />
      <path d="M5.5 19a7 7 0 0 1 13 0" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-muted" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
