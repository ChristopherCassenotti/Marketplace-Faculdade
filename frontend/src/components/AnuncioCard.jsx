import { HeartIcon } from "./FormField";
import { useFavoritos } from "../context/FavoritosContext";

const formatarPreco = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function AnuncioCard({ anuncio }) {
  const { estaFavoritado, alternar } = useFavoritos();
  const favoritado = estaFavoritado(anuncio.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white transition hover:shadow-md hover:shadow-charcoal/5">
      <div className="relative flex aspect-square items-center justify-center bg-cream text-muted/70">
        <PlaceholderIcon />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            alternar(anuncio.id);
          }}
          title={favoritado ? "Remover dos favoritos" : "Favoritar"}
          className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow transition ${
            favoritado ? "text-sage" : "text-charcoal/60 hover:text-sage"
          }`}
        >
          <HeartIcon filled={favoritado} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-medium text-charcoal">
          {anuncio.titulo}
        </h3>
        {anuncio.Usuario?.nome && (
          <p className="text-xs text-muted">- {anuncio.Usuario.nome}</p>
        )}
        <p className="mt-1 text-sm font-semibold text-charcoal">
          {formatarPreco.format(Number(anuncio.preco) || 0)}
        </p>
      </div>
    </article>
  );
}

function PlaceholderIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="m5 18 5-5 3.5 3.5L18 12l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
