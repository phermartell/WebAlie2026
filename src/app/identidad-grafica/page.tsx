import type { Metadata } from "next";
import IdentidadGraficaPageClient from "@/components/servicios/IdentidadGraficaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño de Identidad Gráfica y Branding | Alié Digital",
  description: "Servicios de diseño de identidad gráfica y branding corporativo. Creamos logotipos, manuales de identidad y recursos visuales coherentes con tu marca.",
  alternates: {
    canonical: "https://aliedigital.com/identidad-grafica/",
    languages: {
      "es-MX": "https://aliedigital.com/identidad-grafica/",
      "x-default": "https://aliedigital.com/identidad-grafica/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Diseño de Identidad Gráfica y Branding B2B | Alié Digital",
    description: "Servicios profesionales de diseño de identidad gráfica y branding corporativo. Diseñamos logotipos, manuales de identidad y recursos visuales coherentes de marca.",
    url: "https://aliedigital.com/identidad-grafica/",
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
    title: "Diseño de Identidad Gráfica y Branding B2B | Alié Digital",
    description: "Servicios profesionales de diseño de identidad gráfica y branding corporativo. Diseñamos logotipos, manuales de identidad y recursos visuales coherentes de marca.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/identidad-grafica/",
          "Identidad Gráfica & Branding Corporativo | Alié Digital",
          "Manuales de identidad corporativa y guías de marca profesionales con temática espacial."
        )}
      />
      <IdentidadGraficaPageClient />
    </>
  );
}
