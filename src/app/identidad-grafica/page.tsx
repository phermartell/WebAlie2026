import type { Metadata } from "next";
import IdentidadGraficaPageClient from "@/components/servicios/IdentidadGraficaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Identidad Gráfica & Branding Corporativo | Alié Digital",
  description: "Construimos manuales de marca y directrices visuales que aseguran consistencia en toda la galaxia.",
  openGraph: {
    title: "Identidad Gráfica & Branding Corporativo | Alié Digital",
    description: "Construimos manuales de marca y directrices visuales que aseguran consistencia en toda la galaxia.",
    url: "https://aliedigital.com/identidad-grafica/",
    images: [{ url: "https://aliedigital.com/og-home.webp", width: 1200, height: 630, alt: "Identidad Gráfica & Branding Corporativo | Alié Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Identidad Gráfica & Branding Corporativo | Alié Digital",
    description: "Construimos manuales de marca y directrices visuales que aseguran consistencia en toda la galaxia.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

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
