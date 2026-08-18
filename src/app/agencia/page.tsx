import type { Metadata } from "next";
import AgenciaPage from "@/components/agencia/AgenciaPage";
import JsonLd from "@/components/JsonLd";
import { AGENCIA_SCHEMA } from "@/lib/schema";

export const metadata: Metadata = {
  title: "La Agencia de Marketing Digital B2B | Alié Digital",
  description: "Conoce Alié Digital, la agencia de marketing digital B2B experta en diseño web, SEO y growth marketing enfocada en la conversión y retorno de inversión.",
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
    title: "Conoce la Agencia de Marketing Digital B2B | Alié Digital",
    description: "Conoce Alié Digital, agencia de marketing digital B2B líder en diseño web headless, SEO técnico y growth marketing enfocados en la conversión y retorno de inversión.",
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
    title: "Conoce la Agencia de Marketing Digital B2B | Alié Digital",
    description: "Conoce Alié Digital, agencia de marketing digital B2B líder en diseño web headless, SEO técnico y growth marketing enfocados en la conversión y retorno de inversión.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd data={AGENCIA_SCHEMA} />
      <AgenciaPage />
    </>
  );
}
