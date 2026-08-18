import Link from "next/link";
import Image from "next/image";
import { SERVICES, CITIES } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Image src="/isotipo_GRADIENT.svg" alt="Alié Digital" width={64} height={64} className="w-16 h-16 mb-4 drop-shadow-[0_0_16px_rgba(235,63,27,0.5)]" />
            <p className="text-base text-starlight/50 leading-relaxed">
              Agencia de marketing digital B2B. Páginas web, growth marketing, ecommerce y soluciones digitales para generar demanda y ventas.
            </p>
          </div>
          <div>
            <h4 className="text-base font-black uppercase tracking-widest text-white mb-4">Servicios</h4>
            <ul className="flex flex-col gap-2">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-base text-starlight/60 hover:text-white transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-black uppercase tracking-widest text-white mb-4">Ciudades</h4>
            <ul className="flex flex-col gap-3">
              {CITIES.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-base font-bold text-starlight/70 hover:text-white transition-colors">{c.label}</Link>
                  <ul className="flex flex-col gap-1 mt-1.5 pl-3">
                    {c.children?.map((cc) => (
                      <li key={cc.href}>
                        <Link href={cc.href} className="text-sm text-starlight/50 hover:text-white transition-colors">{cc.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-black uppercase tracking-widest text-white mb-4">Alié Digital</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/casos-de-exito" className="text-base text-starlight/60 hover:text-white transition-colors">Casos de éxito</Link></li>
              <li><Link href="/agencia" className="text-base text-starlight/60 hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="/blog" className="text-base text-starlight/60 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contacto" className="text-base text-starlight/60 hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-starlight/40">© {new Date().getFullYear()} Alié Digital. Todos los derechos reservados.</p>
          <Link href="/aviso-de-privacidad" className="text-sm text-starlight/60 hover:text-white underline-offset-4 hover:underline transition-colors">
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
