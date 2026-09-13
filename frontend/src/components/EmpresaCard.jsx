const CORES_AVATAR = ["bg-sage/20 text-sage", "bg-blue-gray/25 text-charcoal"];

export default function EmpresaCard({ empresa, index = 0 }) {
  const inicial = empresa.nome?.[0]?.toUpperCase() || "?";
  const cor = CORES_AVATAR[index % CORES_AVATAR.length];

  return (
    <article className="flex min-w-[220px] items-center gap-3 rounded-lg border border-line bg-white p-3">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold ${cor}`}>
        {inicial}
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-1">
          <p className="truncate text-sm font-semibold text-charcoal">{empresa.nome}</p>
          {empresa.status === "ativo" && (
            <span title="Empresa verificada" className="shrink-0 text-sage">
              <BadgeIcon />
            </span>
          )}
        </div>
        <p className="truncate text-xs text-muted">{empresa.email}</p>
      </div>
    </article>
  );
}

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M12 2 14.5 4.3 17.8 4l.6 3.3L21 9l-1.6 3 1.6 3-2.6 1.7-.6 3.3-3.3-.3L12 22l-2.5-2.3-3.3.3-.6-3.3L3 17l1.6-3L3 11l2.6-1.7.6-3.3 3.3.3L12 2Z" />
      <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
