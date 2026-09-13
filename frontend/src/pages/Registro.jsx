import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import FormField, {
  BuildingIcon,
  IdIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "../components/FormField";
import { GoogleIcon } from "./Login";
import { useAuth } from "../context/AuthContext";
import { cadastrarEmpresa } from "../api/empresas";
import { extrairErro } from "../api/client";

const ABA_USUARIO = "usuario";
const ABA_EMPRESA = "empresa";

export default function Registro() {
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const [aba, setAba] = useState(ABA_USUARIO);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [empresaCadastrada, setEmpresaCadastrada] = useState(false);

  const [formUsuario, setFormUsuario] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    confirmarSenha: "",
  });

  const [formEmpresa, setFormEmpresa] = useState({
    nome: "",
    cnpj: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  function trocarAba(novaAba) {
    setAba(novaAba);
    setErro("");
    setEmpresaCadastrada(false);
  }

  function atualizarUsuario(campo) {
    return (e) => setFormUsuario((f) => ({ ...f, [campo]: e.target.value }));
  }

  function atualizarEmpresa(campo) {
    return (e) => setFormEmpresa((f) => ({ ...f, [campo]: e.target.value }));
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

  async function aoEnviarEmpresa(e) {
    e.preventDefault();
    setErro("");

    if (formEmpresa.senha.length < 8) {
      setErro("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    if (formEmpresa.senha !== formEmpresa.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setEnviando(true);
    try {
      await cadastrarEmpresa({
        nome: formEmpresa.nome,
        cnpj: formEmpresa.cnpj,
        email: formEmpresa.email,
        senha: formEmpresa.senha,
      });
      setEmpresaCadastrada(true);
    } catch (err) {
      setErro(extrairErro(err));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AuthLayout title="Registro">
      <div className="mb-6 flex rounded-lg border border-line bg-cream/60 p-1">
        <TabButton ativo={aba === ABA_USUARIO} onClick={() => trocarAba(ABA_USUARIO)}>
          Cadastro de usuário
        </TabButton>
        <TabButton ativo={aba === ABA_EMPRESA} onClick={() => trocarAba(ABA_EMPRESA)}>
          Cadastro de empresa
        </TabButton>
      </div>

      {aba === ABA_USUARIO && (
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
      )}

      {aba === ABA_EMPRESA && !empresaCadastrada && (
        <form onSubmit={aoEnviarEmpresa} className="space-y-4">
          <FormField
            label="Nome da empresa"
            icon={<BuildingIcon />}
            placeholder="Ex.: NOMA Soluções Ltda."
            value={formEmpresa.nome}
            onChange={atualizarEmpresa("nome")}
            autoComplete="organization"
            required
          />
          <FormField
            label="CNPJ"
            icon={<IdIcon />}
            placeholder="00.000.000/0000-00"
            value={formEmpresa.cnpj}
            onChange={atualizarEmpresa("cnpj")}
            autoComplete="off"
            required
          />
          <FormField
            label="Email"
            icon={<MailIcon />}
            type="email"
            placeholder="exemplo@empresa.com.br"
            value={formEmpresa.email}
            onChange={atualizarEmpresa("email")}
            autoComplete="email"
            required
          />
          <FormField
            label="Senha"
            icon={<LockIcon />}
            isPassword
            placeholder="Mínimo de 8 caracteres"
            value={formEmpresa.senha}
            onChange={atualizarEmpresa("senha")}
            autoComplete="new-password"
            minLength={8}
            required
          />
          <FormField
            label="Confirmar senha"
            icon={<LockIcon />}
            isPassword
            placeholder="Digite sua senha novamente"
            value={formEmpresa.confirmarSenha}
            onChange={atualizarEmpresa("confirmarSenha")}
            autoComplete="new-password"
            minLength={8}
            required
          />

          {erro && <ErroMsg texto={erro} />}

          <BotaoPrimario enviando={enviando} texto="Criar conta" />
          <Divisor />
          <BotaoGoogle />
        </form>
      )}

      {aba === ABA_EMPRESA && empresaCadastrada && (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage/15 text-sage">
            <CheckCircleIcon />
          </div>
          <p className="text-sm text-charcoal">
            Empresa cadastrada com sucesso! Sua empresa já aparece na
            vitrine do marketplace.
          </p>
          <p className="text-xs text-muted">
            Para anunciar produtos, crie ou acesse uma conta de usuário — é
            ela que faz login no NOMA.
          </p>
          <button
            type="button"
            onClick={() => trocarAba(ABA_USUARIO)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-charcoal py-2.5 text-sm font-semibold text-white transition hover:bg-charcoal/90"
          >
            Criar conta de usuário
          </button>
          <Link
            to="/login"
            className="block w-full rounded-lg border border-line py-2.5 text-sm font-medium text-charcoal transition hover:bg-cream"
          >
            Já tenho uma conta, ir para login
          </Link>
        </div>
      )}

      {!empresaCadastrada && (
        <p className="pt-4 text-center text-sm text-muted">
          Já tem uma conta?{" "}
          <Link to="/login" className="font-semibold text-sage hover:underline">
            Entre aqui
          </Link>
        </p>
      )}
    </AuthLayout>
  );
}

function TabButton({ ativo, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition sm:text-sm ${
        ativo
          ? "border border-sage bg-white text-sage shadow-sm"
          : "text-muted hover:text-charcoal"
      }`}
    >
      {children}
    </button>
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

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9.5" />
      <path d="m8 12.5 2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
