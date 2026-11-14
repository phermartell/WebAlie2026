import type { Metadata } from "next";
import SeoPageClient from "@/components/servicios/SeoPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Posicionamiento SEO para empresas | Alié Digital",
  description: "Mejoramos la estructura y los contenidos de tu sitio para aumentar su visibilidad en buscadores. Consulta el servicio de posicionamiento SEO de Alié Digital.",
  alternates: {
    canonical: "https://aliedigital.com/seo/",
    languages: {
      "es-MX": "https://aliedigital.com/seo/",
      "x-default": "https://aliedigital.com/seo/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Posicionamiento SEO para empresas | Alié Digital",
    description: "Mejoramos la estructura y los contenidos de tu sitio para aumentar su visibilidad en buscadores. Consulta el servicio de posicionamiento SEO de Alié Digital.",
    url: "https://aliedigital.com/seo/",
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
    title: "Posicionamiento SEO para empresas | Alié Digital",
    description: "Mejoramos la estructura y los contenidos de tu sitio para aumentar su visibilidad en buscadores. Consulta el servicio de posicionamiento SEO de Alié Digital.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/seo/",
          "Posicionamiento SEO para empresas | Alié Digital",
          "Servicio de posicionamiento SEO que incluye revisión técnica, optimización de páginas y estrategia de contenidos según las necesidades y el alcance acordado para cada proyecto."
        )}
      />
      <SeoPageClient />
    </>
  );
}
