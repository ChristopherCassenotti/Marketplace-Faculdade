export function normalizarCnpj(cnpj) {
  return String(cnpj)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

export function validarCnpj(cnpj) {
  const valor = normalizarCnpj(cnpj);

  if (!/^[A-Z0-9]{12}[0-9]{2}$/.test(valor)) {
    return false;
  }

  const base = valor.slice(0, 12);
  const dvInformado = valor.slice(12);

  const converter = (caractere) => {
    return caractere.charCodeAt(0) - 48;
  };

  const calcularDv = (caracteres, pesos) => {
    const soma = caracteres.reduce((total, caractere, index) => {
      return total + converter(caractere) * pesos[index];
    }, 0);

    const resto = soma % 11;

    return resto === 0 || resto === 1
      ? 0
      : 11 - resto;
  };

  const pesosPrimeiroDv = [
    5, 4, 3, 2,
    9, 8, 7, 6,
    5, 4, 3, 2
  ];

  const primeiroDv = calcularDv(
    [...base],
    pesosPrimeiroDv
  );

  const pesosSegundoDv = [
    6, 5, 4, 3, 2,
    9, 8, 7, 6,
    5, 4, 3, 2
  ];

  const segundoDv = calcularDv(
    [...base, String(primeiroDv)],
    pesosSegundoDv
  );

  return dvInformado === `${primeiroDv}${segundoDv}`;
}

