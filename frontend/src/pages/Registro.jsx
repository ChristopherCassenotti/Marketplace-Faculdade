import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import FormField, {
  IdIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "../components/FormField";
import { GoogleIcon } from "./Login";
import { useAuth } from "../context/AuthContext";
import { extrairErro } from "../api/client";

export default function Registro() {
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const [formUsuario, setFormUsuario] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    confirmarSenha: "",
  });

  function atualizarUsuario(campo) {
    return (e) => setFormUsuario((f) => ({ ...f, [campo]: e.target.value }));
  }

  async function aoEnviarUsuario(e) {
    e.preventDefault();
    setErro("");

    if (formUsuario.senha.length < 8) {
      setErro("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    if (formUsuario.senha !== formUsuario.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setEnviando(true);
    try {
      await registrar({
        nome: formUsuario.nome,
        email: formUsuario.email,
        cpf: formUsuario.cpf,
        senha: formUsuario.senha,
      });
      navigate("/anuncios", { replace: true });
    } catch (err) {
      setErro(extrairErro(err));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AuthLayout title="Registro">
      <form onSubmit={aoEnviarUsuario} className="space-y-4">
        <FormField
          label="Insira seu Nome"
          icon={<UserIcon />}
          placeholder="nome"
          value={formUsuario.nome}
          onChange={atualizarUsuario("nome")}
          autoComplete="name"
          required
        />
        <FormField
          label="Insira seu Email"
          icon={<MailIcon />}
          type="email"
          placeholder="exemplo@noma.com.br"
          value={formUsuario.email}
          onChange={atualizarUsuario("email")}
          autoComplete="email"
          required
        />
        <FormField
          label="Insira seu CPF"
          icon={<IdIcon />}
          placeholder="000.000.000-00"
          value={formUsuario.cpf}
          onChange={atualizarUsuario("cpf")}
          autoComplete="off"
          required
        />
        <FormField
          label="Senha"
          icon={<LockIcon />}
          isPassword
          placeholder="Mínimo de 8 caracteres"
          value={formUsuario.senha}
          onChange={atualizarUsuario("senha")}
          autoComplete="new-password"
          minLength={8}
          required
        />
        <FormField
          label="Confirmar senha"
          icon={<LockIcon />}
          isPassword
          placeholder="Digite sua senha novamente"
          value={formUsuario.confirmarSenha}
          onChange={atualizarUsuario("confirmarSenha")}
          autoComplete="new-password"
          minLength={8}
          required
        />

        {erro && <ErroMsg texto={erro} />}

        <BotaoPrimario enviando={enviando} texto="Criar conta" />
        <Divisor />
        <BotaoGoogle />
      </form>

      <p className="pt-4 text-center text-sm text-muted">
        Já tem uma conta?{" "}
        <Link to="/login" className="font-semibold text-sage hover:underline">
          Entre aqui
        </Link>
      </p>
    </AuthLayout>
  );
}

function ErroMsg({ texto }) {
  return (
    <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      {texto}
    </p>
  );
}

function BotaoPrimario({ enviando, texto }) {
  return (
    <button
      type="submit"
      disabled={enviando}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-charcoal py-2.5 text-sm font-semibold text-white transition hover:bg-charcoal/90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {enviando ? "Enviando..." : texto}
      <ArrowRightIcon />
    </button>
  );
}

function Divisor() {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="h-px flex-1 bg-line" />
      <span className="text-xs text-muted">ou</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

function BotaoGoogle() {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-white py-2.5 text-sm font-medium text-charcoal transition hover:bg-cream"
    >
      <GoogleIcon />
      Continuar com o Google
    </button>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
