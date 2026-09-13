import Logo from "./Logo";

export default function AuthLayout({ title, children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream px-4 py-10">
      {/* blobs decorativos, sangrando pelas bordas da tela */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sage/25" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-blue-gray/30" />

      <div className="relative grid w-full max-w-4xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="w-full rounded-2xl border border-line bg-white p-8 shadow-xl shadow-charcoal/5 sm:p-10">
          <h1 className="mb-6 text-center text-2xl font-bold text-charcoal">
            {title}
          </h1>
          {children}
        </div>
        <div className="hidden justify-self-center md:flex">
          <Logo size="lg" />
        </div>
      </div>
    </div>
  );
}
