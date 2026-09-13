import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import FormField, { LockIcon, MailIcon } from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { extrairErro } from "../api/client";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.de?.pathname || "/anuncios";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function aoEnviar(e) {
    e.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      await login({ email, senha });
      navigate(destino, { replace: true });
    } catch (err) {
      setErro(extrairErro(err));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={aoEnviar} className="space-y-4">
        <FormField
          label="Insira seu Email"
          icon={<MailIcon />}
          type="email"
          placeholder="exemplo@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-sm font-medium text-charcoal">Insira sua Senha</span>
            <button
              type="button"
              className="text-xs text-muted transition hover:text-sage"
            >
              Esqueceu sua senha?
            </button>
          </div>
          <FormField
            icon={<LockIcon />}
            isPassword
            placeholder="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {erro && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-charcoal py-2.5 text-sm font-semibold text-white transition hover:bg-charcoal/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? "Entrando..." : "Entrar"}
          <ArrowRightIcon />
        </button>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-line" />
          <span className="text-xs text-muted">ou</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-white py-2.5 text-sm font-medium text-charcoal transition hover:bg-cream"
        >
          <GoogleIcon />
          Continuar com o Google
        </button>

        <p className="pt-2 text-center text-sm text-muted">
          Não tem conta?{" "}
          <Link to="/registro" className="font-semibold text-sage hover:underline">
            Registre-se
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path fill="#4285F4" d="M23.5 12.3c0-.85-.08-1.66-.22-2.44H12v4.62h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.56-5.17 3.56-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.87-3c-1.08.72-2.46 1.15-4.08 1.15-3.13 0-5.79-2.11-6.74-4.96H1.26v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.26 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.26a12 12 0 0 0 0 10.78l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.61l4 3.1C6.21 6.86 8.87 4.75 12 4.75Z" />
    </svg>
  );
}
