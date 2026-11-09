// Logo oficial (public/nomaLogo.png). A imagem é quadrada com bastante
// margem; o recorte em faixa horizontal (aspect 4:1 + object-cover) mostra
// só o símbolo + "NOMA". O mix-blend-multiply esconde o fundo claro da
// imagem sobre fundos coloridos (ex.: bg-cream).
export default function Logo({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-32",
    md: "w-56",
    lg: "w-80",
  };

  return (
    <img
      src="/nomaLogo.png"
      alt="NOMA"
      className={`aspect-[4/1] object-cover object-center mix-blend-multiply ${sizes[size]} ${className}`}
    />
  );
}
