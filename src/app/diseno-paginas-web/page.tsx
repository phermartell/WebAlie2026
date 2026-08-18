import type { Metadata } from "next";
import WebDevPageClient from "@/components/servicios/WebDevPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño de Páginas Web y Sitios Headless | Alié Digital",
  description: "Agencia de diseño de páginas web rápidas y seguras. Creamos sitios premium con tecnologías modernas como Next.js y WordPress enfocadas en la conversión.",
  alternates: {
    canonical: "https://aliedigital.com/diseno-paginas-web/",
    languages: {
      "es-MX": "https://aliedigital.com/diseno-paginas-web/",
      "x-default": "https://aliedigital.com/diseno-paginas-web/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Diseño de Páginas Web y Sitios Headless B2B | Alié Digital",
    description: "Agencia de diseño de páginas web rápidas y seguras. Creamos sitios premium con tecnologías modernas como Next.js y WordPress enfocados en la conversión comercial.",
    url: "https://aliedigital.com/diseno-paginas-web/",
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
    title: "Diseño de Páginas Web y Sitios Headless B2B | Alié Digital",
    description: "Agencia de diseño de páginas web rápidas y seguras. Creamos sitios premium con tecnologías modernas como Next.js y WordPress enfocados en la conversión comercial.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/diseno-paginas-web/",
          "Diseño de Páginas Web & Desarrollo Headless | Alié Digital",
          "Diseño y desarrollo de páginas web a la medida con Next.js, WordPress y Shopify. Sitios web ultrarrápidos y optimizados para SEO y conversión."
        )}
      />
      <WebDevPageClient />
    </>
  );
}

