import type { Metadata } from "next";
import CasosPage from "@/components/casos/CasosPage";
import JsonLd from "@/components/JsonLd";
import { CASOS_SCHEMA } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Casos de éxito en marketing digital y desarrollo web | Alié Digital",
  description:
    "Explora proyectos de campañas, sitios web y tiendas en línea de Alié Digital. Conoce qué necesitaba cada cliente y qué trabajo realizamos.",
  alternates: {
    canonical: "https://aliedigital.com/casos-de-exito/",
    languages: {
      "es-MX": "https://aliedigital.com/casos-de-exito/",
      "x-default": "https://aliedigital.com/casos-de-exito/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Casos de éxito en marketing digital y desarrollo web | Alié Digital",
    description:
      "Explora proyectos de campañas, sitios web y tiendas en línea de Alié Digital. Conoce qué necesitaba cada cliente y qué trabajo realizamos.",
    url: "https://aliedigital.com/casos-de-exito/",
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
    title: "Casos de éxito en marketing digital y desarrollo web | Alié Digital",
    description:
      "Explora proyectos de campañas, sitios web y tiendas en línea de Alié Digital. Conoce qué necesitaba cada cliente y qué trabajo realizamos.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={CASOS_SCHEMA} />
      <CasosPage />
    </>
  );
}
