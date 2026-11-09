import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FormField, {
  BuildingIcon,
  IdIcon,
  MailIcon,
  PhoneIcon,
} from "../components/FormField";
import { cadastrarEmpresa } from "../api/empresas";
import { extrairErro } from "../api/client";

export default function CadastrarEmpresa() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
  });
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  function atualizar(campo) {
    return (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));
  }

  async function aoEnviar(e) {
    e.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      const resposta = await cadastrarEmpresa({
        nome: form.nome,
        cnpj: form.cnpj,
        email: form.email,
        telefone: form.telefone || undefined,
      });
      navigate(`/empresas/${resposta.empresa.id}`);
    } catch (err) {
      // O controller de empresa responde com "mensagem"; os demais com "erro".
      setErro(err?.response?.data?.mensagem || extrairErro(err));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar busca="" onBuscaChange={() => {}} />

      <main className="mx-auto max-w-md px-4 py-10 sm:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-charcoal">Cadastrar empresa</h1>
          <p className="mt-1 text-sm text-muted">
            Você será o responsável por esta empresa na NOMA.
          </p>
        </div>

        <form
          onSubmit={aoEnviar}
          className="space-y-4 rounded-2xl border border-line bg-white p-5 shadow-xl sm:p-8 shadow-charcoal/5"
        >
          <FormField
            label="Nome da empresa"
            icon={<BuildingIcon />}
            placeholder="Ex.: NOMA Soluções Ltda."
            value={form.nome}
            onChange={atualizar("nome")}
            autoComplete="organization"
            required
          />
          <FormField
            label="CNPJ"
            icon={<IdIcon />}
            placeholder="00.000.000/0000-00"
            value={form.cnpj}
            onChange={atualizar("cnpj")}
            autoComplete="off"
            required
          />
          <FormField
            label="Email"
            icon={<MailIcon />}
            type="email"
            placeholder="exemplo@empresa.com.br"
            value={form.email}
            onChange={atualizar("email")}
            autoComplete="email"
            required
          />
          <FormField
            label="Telefone (opcional)"
            icon={<PhoneIcon />}
            type="tel"
            placeholder="(00) 00000-0000"
            value={form.telefone}
            onChange={atualizar("telefone")}
            autoComplete="tel"
          />

          {erro && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {erro}
            </p>
          )}

          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/anuncios")}
              className="flex flex-1 items-center justify-center rounded-lg border border-line bg-white py-2.5 text-sm font-medium text-charcoal transition hover:bg-cream sm:order-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={enviando}
              className="flex flex-1 items-center justify-center rounded-lg bg-sage py-2.5 text-sm font-semibold text-white transition hover:bg-sage/90 disabled:cursor-not-allowed disabled:opacity-60 sm:order-2"
            >
              {enviando ? "Cadastrando..." : "Cadastrar empresa"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
