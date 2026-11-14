import type { Metadata } from "next";
import AgenciaPage from "@/components/agencia/AgenciaPage";
import JsonLd from "@/components/JsonLd";
import { AGENCIA_SCHEMA } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Agencia de marketing digital y desarrollo web | Alié Digital",
  description:
    "Conoce cómo trabaja Alié Digital en proyectos de diseño web, posicionamiento en buscadores y campañas digitales. Explora nuestros servicios y proyectos realizados.",
  alternates: {
    canonical: "https://aliedigital.com/agencia/",
    languages: {
      "es-MX": "https://aliedigital.com/agencia/",
      "x-default": "https://aliedigital.com/agencia/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Agencia de marketing digital y desarrollo web | Alié Digital",
    description:
      "Conoce cómo trabaja Alié Digital en proyectos de diseño web, posicionamiento en buscadores y campañas digitales. Explora nuestros servicios y proyectos realizados.",
    url: "https://aliedigital.com/agencia/",
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
    title: "Agencia de marketing digital y desarrollo web | Alié Digital",
    description:
      "Conoce cómo trabaja Alié Digital en proyectos de diseño web, posicionamiento en buscadores y campañas digitales. Explora nuestros servicios y proyectos realizados.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={AGENCIA_SCHEMA} />
      <AgenciaPage />
    </>
  );
}
