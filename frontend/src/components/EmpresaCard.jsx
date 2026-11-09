
import { Link } from "react-router-dom";

const CORES_AVATAR = [
  "bg-sage/20 text-sage",
  "bg-blue-gray/25 text-charcoal",
];

export default function EmpresaCard({ empresa, index = 0 }) {
  const inicial = empresa.nome?.[0]?.toUpperCase() || "?";
  const cor = CORES_AVATAR[index % CORES_AVATAR.length];

  return (
    <Link
      to={`/empresas/${empresa.id}`}
      className="group flex w-60 shrink-0 items-center gap-3 rounded-lg border border-line bg-white p-3 transition hover:border-sage hover:shadow-md"
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold ${cor}`}
      >
        {inicial}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <p className="truncate text-sm font-semibold text-charcoal group-hover:text-sage">
            {empresa.nome}
          </p>

          {empresa.status === "ativo" && (
            <span
              title="Empresa ativa"
              className="h-2 w-2 shrink-0 rounded-full bg-sage"
            />
          )}
        </div>

        <p className="truncate text-xs text-muted">
          {empresa.email}
        </p>

        <p className="mt-1 text-xs font-semibold text-sage">
          Ver produtos →
        </p>
      </div>
    </Link>
  );
}
