import type { Metadata } from "next";
import SeoPageClient from "@/components/servicios/SeoPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Servicios de SEO Técnico y Optimización | Alié Digital",
  description: "Agencia de SEO técnico y optimización web. Posicionamos tu negocio en los motores de búsqueda mediante datos estructurados y mejoras de velocidad web.",
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
    title: "Servicios de SEO Técnico y Optimización Web | Alié Digital",
    description: "Agencia experta en SEO técnico y optimización web. Posicionamos tu marca en motores de búsqueda mediante datos estructurados y optimización de velocidad de carga.",
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
    title: "Servicios de SEO Técnico y Optimización Web | Alié Digital",
    description: "Agencia experta en SEO técnico y optimización web. Posicionamos tu marca en motores de búsqueda mediante datos estructurados y optimización de velocidad de carga.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

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
