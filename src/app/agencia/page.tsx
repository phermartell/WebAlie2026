import type { Metadata } from "next";
import AgenciaPage from "@/components/agencia/AgenciaPage";
import JsonLd from "@/components/JsonLd";
import { AGENCIA_SCHEMA } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Agencia de marketing digital y diseño web | Alié Digital",
  description:
    "Conoce a Alié Digital, agencia de marketing digital y diseño web para empresas que quieren crecer con SEO, estrategia, contenido y soluciones orientadas a conversión.",
  robots: "index, follow",
  alternates: {
    canonical: "https://aliedigital.com/agencia/",
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Agencia de marketing digital y diseño web | Alié Digital",
    description:
      "Conoce a Alié Digital, agencia de marketing digital y diseño web para empresas que quieren crecer con SEO, estrategia, contenido y soluciones orientadas a conversión.",
    url: "https://aliedigital.com/agencia/",
    images: [
      {
        url: "https://aliedigital.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Alié Digital — Agencia de marketing digital y diseño web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia de marketing digital y diseño web | Alié Digital",
    description:
      "Conoce a Alié Digital, agencia de marketing digital y diseño web para empresas que quieren crecer con SEO, estrategia, contenido y soluciones orientadas a conversión.",
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
