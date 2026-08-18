import type { Metadata } from "next";
import WebDevPageClient from "@/components/servicios/WebDevPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño de Páginas Web Headless y Next.js | Alié Digital",
  description: "Desarrollo y diseño de páginas web corporativas con Next.js y headless CMS. Sitios web ultrarrápidos, optimizados para SEO y listos para capturar leads.",
  alternates: {
    canonical: "https://aliedigital.com/diseno-de-paginas-web/",
    languages: {
      "es-MX": "https://aliedigital.com/diseno-de-paginas-web/",
      "x-default": "https://aliedigital.com/diseno-de-paginas-web/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Diseño de Páginas Web Headless con Next.js | Alié Digital",
    description: "Agencia de diseño de páginas web corporativas con Next.js y headless CMS. Creamos sitios web ultrarrápidos, optimizados para SEO y listos para capturar prospectos B2B.",
    url: "https://aliedigital.com/diseno-de-paginas-web/",
    images: [
      {
        url: "https://aliedigital.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Alié Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AlieDigital",
    title: "Diseño de Páginas Web Headless con Next.js | Alié Digital",
    description: "Agencia de diseño de páginas web corporativas con Next.js y headless CMS. Creamos sitios web ultrarrápidos, optimizados para SEO y listos para capturar prospectos B2B.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/diseno-de-paginas-web/",
          "Diseño de Páginas Web & Desarrollo Headless | Alié Digital",
          "Diseño y desarrollo de páginas web a la medida con Next.js, WordPress y Shopify. Sitios web ultrarrápidos y optimizados para SEO y conversión."
        )}
      />
      <WebDevPageClient />
    </>
  );
}

