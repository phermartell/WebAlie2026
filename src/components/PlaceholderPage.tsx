import Link from "next/link";

export default function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
      <div className="glass-liquid rounded-[40px] max-w-2xl w-full px-8 py-16 md:px-16">
        <span className="font-mono text-sm tracking-[0.3em] text-orangeleader uppercase">Próximamente</span>
        <h1 className="mt-4 text-4xl md:text-5xl font-black uppercase text-white leading-tight">{title}</h1>
        <p className="mt-6 text-starlight/60 leading-relaxed">
          {description ?? "Estamos construyendo esta página. Muy pronto estará lista."}
        </p>
        <Link href="/" className="inline-block mt-8 rounded-full bg-orangeleader hover:bg-tangerine text-white px-8 py-3.5 font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(235,63,27,0.4)] transition-all cursor-pointer">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
