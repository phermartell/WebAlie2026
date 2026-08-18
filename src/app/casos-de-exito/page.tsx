import type { Metadata } from "next";
import CasosPage from "@/components/casos/CasosPage";
import JsonLd from "@/components/JsonLd";
import { CASOS_SCHEMA } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Casos de éxito | Alié Digital",
  description:
    "Campañas reales, resultados medibles y ROI sin excusas. Casos de estudio de Alié Digital en Google Ads, Meta Ads, TikTok, LinkedIn y SEO en sectores de alta competencia, nichos restringidos y mercados B2B complejos.",
  robots: "index, follow",
  alternates: {
    canonical: "https://aliedigital.com/casos-de-exito/",
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Casos de éxito | Alié Digital",
    description:
      "Campañas reales, resultados medibles y ROI sin excusas. Casos de estudio de Alié Digital en sectores de alta competencia, nichos restringidos y mercados B2B complejos.",
    url: "https://aliedigital.com/casos-de-exito/",
    images: [
      {
        url: "https://aliedigital.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Alié Digital — Casos de éxito",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casos de éxito | Alié Digital",
    description:
      "Campañas reales, resultados medibles y ROI sin excusas. Casos de estudio de Alié Digital.",
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
