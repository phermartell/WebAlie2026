import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import BlogGrid from "@/components/BlogGrid";
import { getWpPosts, getWpCategories } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Bitácoras Estelares — Blog de Marketing Digital B2B & IA | Alié Digital",
  description:
    "Playbooks, guías de vuelo y notas de campo sobre SEO técnico, Paid Media, Ecommerce y automatizaciones de Inteligencia Artificial por la tripulación de Alié Digital.",
  openGraph: {
    title: "Bitácoras Estelares — Blog de Marketing Digital B2B & IA | Alié Digital",
    description:
      "Playbooks, guías de vuelo y notas de campo sobre SEO técnico, Paid Media, Ecommerce y automatizaciones de Inteligencia Artificial.",
    url: "https://aliedigital.com/blog/",
    images: [
      {
        url: "https://aliedigital.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Bitácoras Estelares — Alié Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitácoras Estelares — Blog de Marketing Digital B2B & IA | Alié Digital",
    description:
      "Playbooks y guías sobre SEO técnico, Paid Media, Ecommerce y automatizaciones con IA.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default async function Page() {
  // Cargar posts y categorías en el servidor
  const posts = await getWpPosts();
  const categories = await getWpCategories();

  // Definición del esquema estático de la página de Blog
  const blogPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": "https://aliedigital.com/#organization",
        name: "Alié Digital",
        url: "https://aliedigital.com/",
        logo: "https://aliedigital.com/logo.svg",
        image: "https://aliedigital.com/og-home.webp",
      },
      {
        "@type": "Blog",
        "@id": "https://aliedigital.com/blog/#blog",
        url: "https://aliedigital.com/blog/",
        name: "Bitácoras Estelares | Blog de Alié Digital",
        description:
          "Recursos, guías y notas de campo sobre SEO técnico, Paid Media, Ecommerce y Automatizaciones con IA por la tripulación de Alié Digital.",
        publisher: { "@id": "https://aliedigital.com/#organization" },
      },
      {
        "@type": "CollectionPage",
        "@id": "https://aliedigital.com/blog/#webpage",
        url: "https://aliedigital.com/blog/",
        name: "Bitácoras Estelares — Blog de Marketing Digital B2B & IA | Alié Digital",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://aliedigital.com/#website",
          url: "https://aliedigital.com/",
          name: "Alié Digital",
        },
        about: { "@id": "https://aliedigital.com/#organization" },
      },
    ],
  };

  return (
    <>
      <JsonLd data={blogPageSchema} />

      <main className="w-full relative z-10 pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero del Blog con temática de aventura espacial */}
          <header className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deepspace/40 border border-white/10 font-mono text-[10px] uppercase tracking-widest text-tangerine mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-tangerine animate-pulse" />
              Transmisión de Datos Activa
            </div>
            
            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Bitácoras <span className="text-orangeleader italic">Estelares</span>.
            </h1>
            
            <p className="max-w-2xl mx-auto text-starlight/80 text-sm sm:text-base leading-relaxed font-sans">
              Playbooks y notas de campo sobre SEO técnico, Paid Media, Ecommerce y automatizaciones de IA. 
              El conocimiento de la tripulación de Alié Digital para navegar en el ecosistema B2B.
            </p>
            
            {/* Elemento HUD de decoración estelar */}
            <div className="absolute top-1/2 left-0 w-24 h-[1px] bg-gradient-to-r from-orangeleader/30 to-transparent hidden lg:block" />
            <div className="absolute top-1/2 right-0 w-24 h-[1px] bg-gradient-to-l from-orangeleader/30 to-transparent hidden lg:block" />
          </header>

          {/* Cuadrícula de artículos interactiva */}
          <BlogGrid initialPosts={posts} categories={categories} />
        </div>
      </main>
    </>
  );
}
