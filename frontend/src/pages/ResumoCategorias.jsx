import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { resumoCategorias } from "../api/relatorios";
import { extrairErro } from "../api/client";

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

// O Postgres devolve COUNT/SUM/NUMERIC como string, por isso o Number().
const COLUNAS = [
  { chave: "categoria", titulo: "Categoria" },
  { chave: "total_anuncios", titulo: "Anúncios", numero: true },
  { chave: "anuncios_ativos", titulo: "Ativos", numero: true },
  { chave: "preco_medio", titulo: "Preço médio", moeda: true },
  { chave: "preco_minimo", titulo: "Preço mínimo", moeda: true },
  { chave: "preco_maximo", titulo: "Preço máximo", moeda: true },
  { chave: "total_favoritos", titulo: "Favoritos", numero: true },
];

function formatar(coluna, valor) {
  if (coluna.moeda) return moeda.format(Number(valor));
  if (coluna.numero) return Number(valor);
  return valor;
}

export default function ResumoCategorias() {
  const [linhas, setLinhas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    resumoCategorias()
      .then(setLinhas)
      .catch((err) => setErro(extrairErro(err)))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <h1 className="mb-5 text-xl font-bold text-charcoal">Resumo por categoria</h1>

        {carregando && (
          <p className="py-16 text-center text-sm text-muted">Carregando relatório...</p>
        )}

        {!carregando && erro && (
          <p className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {erro}
          </p>
        )}

        {!carregando && !erro && (
          <div className="overflow-x-auto rounded-lg border border-line bg-white">
            <table className="w-full text-sm">
              <thead className="bg-cream/60 text-left text-xs font-semibold uppercase text-muted">
                <tr>
                  {COLUNAS.map((col) => (
                    <th
                      key={col.chave}
                      className={`whitespace-nowrap px-4 py-3 ${col.numero || col.moeda ? "text-right" : ""}`}
                    >
                      {col.titulo}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {linhas.length === 0 ? (
                  <tr>
                    <td colSpan={COLUNAS.length} className="px-4 py-10 text-center text-muted">
                      Nenhuma categoria encontrada.
                    </td>
                  </tr>
                ) : (
                  linhas.map((linha) => (
                    <tr key={linha.categoria_id} className="hover:bg-cream/40">
                      {COLUNAS.map((col) => (
                        <td
                          key={col.chave}
                          className={`whitespace-nowrap px-4 py-3 text-charcoal ${
                            col.numero || col.moeda ? "text-right tabular-nums" : "font-medium"
                          }`}
                        >
                          {formatar(col, linha[col.chave])}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
