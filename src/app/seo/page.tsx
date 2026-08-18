import type { Metadata } from "next";
import SeoPageClient from "@/components/servicios/SeoPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "SEO Técnico & AI SEO | Alié Digital",
  description: "Dominamos los motores de búsqueda mediante optimización de código fuente, estructuración de datos para modelos de IA y arquitectura de contenidos.",
  openGraph: {
    title: "SEO Técnico & AI SEO | Alié Digital",
    description: "Dominamos los motores de búsqueda mediante optimización de código fuente, estructuración de datos para modelos de IA y arquitectura de contenidos.",
    url: "https://aliedigital.com/seo/",
    images: [{ url: "https://aliedigital.com/og-home.webp", width: 1200, height: 630, alt: "SEO Técnico & AI SEO | Alié Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Técnico & AI SEO | Alié Digital",
    description: "Dominamos los motores de búsqueda mediante optimización de código fuente, estructuración de datos para modelos de IA y arquitectura de contenidos.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/seo/",
          "SEO Técnico & AI SEO | Alié Digital",
          "Dominamos los motores de búsqueda mediante optimización de código fuente, estructuración de datos para modelos de IA y arquitectura de contenidos."
        )}
      />
      <SeoPageClient />
    </>
  );
}
