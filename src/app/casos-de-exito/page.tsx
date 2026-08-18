import type { Metadata } from "next";
import CasosPage from "@/components/casos/CasosPage";
import JsonLd from "@/components/JsonLd";
import { CASOS_SCHEMA } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Casos de Éxito en Marketing Digital B2B | Alié Digital",
  description: "Casos de estudio reales de Alié Digital. Analiza resultados medibles de nuestras campañas de SEO, Google Ads, Meta Ads y growth marketing para empresas.",
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
    title: "Casos de Éxito en Marketing Digital y SEO B2B | Alié Digital",
    description: "Explora los casos de estudio reales de Alié Digital. Analiza resultados medibles de nuestras campañas de SEO técnico, Google Ads, Meta Ads y growth marketing B2B.",
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
    title: "Casos de Éxito en Marketing Digital y SEO B2B | Alié Digital",
    description: "Explora los casos de estudio reales de Alié Digital. Analiza resultados medibles de nuestras campañas de SEO técnico, Google Ads, Meta Ads y growth marketing B2B.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd data={CASOS_SCHEMA} />
      <CasosPage />
    </>
  );
}
