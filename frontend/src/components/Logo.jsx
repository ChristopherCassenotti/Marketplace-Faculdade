function Mark({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {/* pétala superior esquerda */}
      <path
        d="M28,28 Q28,6 16,6 Q6,6 6,16 Q6,28 28,28 Z"
        fill="#8ebfa8"
      />
      {/* pétala superior direita */}
      <path
        d="M36,28 Q36,6 48,6 Q58,6 58,16 Q58,28 36,28 Z"
        fill="#a9bed1"
      />
      {/* pétala inferior direita */}
      <path
        d="M36,36 Q58,36 58,48 Q58,58 48,58 Q36,58 36,36 Z"
        fill="#a9bed1"
      />
      {/* pétala inferior esquerda */}
      <path
        d="M28,36 Q28,58 16,58 Q6,58 6,48 Q6,36 28,36 Z"
        fill="#343a3d"
      />
    </svg>
  );
}

function Wordmark({ textClass }) {
  return (
    <span className={`inline-flex items-baseline font-extrabold tracking-tight text-charcoal ${textClass}`}>
      NOM
      <span className="relative inline-block">
        A
        <svg
          viewBox="0 0 10 10"
          className="absolute -right-0.5 -top-[0.55em] h-[0.4em] w-[0.4em]"
          aria-hidden="true"
        >
          <polygon points="5,0 10,10 0,10" fill="#8ebfa8" />
        </svg>
      </span>
    </span>
  );
}

export default function Logo({ size = "md", showText = true, className = "" }) {
  const sizes = {
    sm: { icon: "h-8 w-8", title: "text-lg", sub: "text-[8px]", gap: "gap-1.5" },
    md: { icon: "h-14 w-14", title: "text-3xl", sub: "text-xs", gap: "gap-2" },
    lg: { icon: "h-20 w-20", title: "text-5xl", sub: "text-sm", gap: "gap-3" },
  };
  const s = sizes[size];

  return (
    <div className={`flex flex-col items-center ${s.gap} ${className}`}>
      <Mark className={s.icon} />
      {showText && (
        <div className="text-center leading-tight">
          <Wordmark textClass={s.title} />
          <div className="mx-auto mt-1 mb-0.5 h-px w-2/3 bg-sage/70" />
          <p className={`${s.sub} text-sage font-medium`}>Marketplace</p>
        </div>
      )}
    </div>
  );
}
