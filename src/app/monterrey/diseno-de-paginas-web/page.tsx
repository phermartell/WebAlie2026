import type { Metadata } from "next";
import MonterreyDisenoWebPage from "@/components/monterrey/MonterreyDisenoWebPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño de Páginas Web en Monterrey B2B | Alié Digital",
  description: "Desarrollo y diseño de páginas web en Monterrey. Sitios web a la medida ultra rápidos y optimizados para SEO y conversión de clientes potenciales B2B.",
  alternates: {
    canonical: "https://aliedigital.com/monterrey/diseno-de-paginas-web/",
    languages: {
      "es-MX": "https://aliedigital.com/monterrey/diseno-de-paginas-web/",
      "x-default": "https://aliedigital.com/monterrey/diseno-de-paginas-web/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Agencia de Diseño de Páginas Web en Monterrey | Alié Digital",
    description: "Agencia de desarrollo y diseño de páginas web en Monterrey. Sitios web a la medida ultra rápidos, optimizados para SEO y conversión de clientes potenciales B2B.",
    url: "https://aliedigital.com/monterrey/diseno-de-paginas-web/",
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
    title: "Agencia de Diseño de Páginas Web en Monterrey | Alié Digital",
    description: "Agencia de desarrollo y diseño de páginas web en Monterrey. Sitios web a la medida ultra rápidos, optimizados para SEO y conversión de clientes potenciales B2B.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return <>
      <JsonLd data={createServiceSchema("/monterrey/diseno-de-paginas-web/", "Diseño de páginas web en Monterrey | Alié Digital", "Diseño y desarrollo web B2B en Monterrey.")} />
      <MonterreyDisenoWebPage />
    </>;
}
