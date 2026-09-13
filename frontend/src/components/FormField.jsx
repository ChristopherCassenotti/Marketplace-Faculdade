import { useState } from "react";

/**
 * Campo de formulário: label pequeno acima, ícone à esquerda dentro do
 * input e, opcionalmente, um botão de mostrar/ocultar senha à direita.
 */
export default function FormField({
  label,
  icon,
  type = "text",
  isPassword = false,
  rightSlot,
  className = "",
  ...inputProps
}) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const tipoFinal = isPassword ? (mostrarSenha ? "text" : "password") : type;

  return (
    <label className={`block text-left ${className}`}>
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-charcoal">{label}</span>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="pointer-events-none absolute left-3 text-sage">
            {icon}
          </span>
        )}
        <input
          type={tipoFinal}
          className={`w-full rounded-lg border border-line bg-white py-2.5 text-sm text-charcoal placeholder-muted/70 outline-none transition focus:border-sage focus:ring-1 focus:ring-sage ${
            icon ? "pl-9" : "pl-3"
          } ${isPassword || rightSlot ? "pr-9" : "pr-3"}`}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setMostrarSenha((v) => !v)}
            className="absolute right-3 text-muted transition hover:text-charcoal"
            tabIndex={-1}
            aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
          >
            {mostrarSenha ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
        {!isPassword && rightSlot && (
          <span className="absolute right-3">{rightSlot}</span>
        )}
      </div>
    </label>
  );
}

export function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 5.1A10.9 10.9 0 0 1 12 5c7 0 10.5 7 10.5 7a13.3 13.3 0 0 1-3.2 4M6.5 6.7A13.6 13.6 0 0 0 1.5 12s3.5 7 10.5 7c1.3 0 2.5-.2 3.6-.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 7 9-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="10.5" width="16" height="10" rx="2" />
      <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" strokeLinecap="round" />
    </svg>
  );
}

export function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" strokeLinecap="round" />
    </svg>
  );
}

export function IdIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <circle cx="8" cy="12" r="2" />
      <path d="M13 10h6M13 14h4" strokeLinecap="round" />
    </svg>
  );
}

export function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="3" width="12" height="18" rx="1" />
      <path d="M16 8h4v13h-4M7.5 7h1M11.5 7h1M7.5 11h1M11.5 11h1M7.5 15h1M11.5 15h1" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 4h3.2l1.4 4.2-2 1.6a12 12 0 0 0 6.6 6.6l1.6-2 4.2 1.4V19a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 4Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M11.5 3.5H5A1.5 1.5 0 0 0 3.5 5v6.5a1.5 1.5 0 0 0 .44 1.06l9 9a1.5 1.5 0 0 0 2.12 0l6.44-6.44a1.5 1.5 0 0 0 0-2.12l-9-9a1.5 1.5 0 0 0-1.06-.44Z" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
    </svg>
  );
}

export function HeartIcon({ filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 20.5s-7.5-4.6-10-9.3C.6 7.9 2.2 4.5 5.6 4a5 5 0 0 1 6.4 2.3A5 5 0 0 1 18.4 4c3.4.5 5 3.9 3.6 7.2-2.5 4.7-10 9.3-10 9.3Z" strokeLinejoin="round" />
    </svg>
  );
}

export function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 5.5h16v11H9l-4 3.5v-3.5H4z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
