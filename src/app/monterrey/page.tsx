import type { Metadata } from "next";
import MonterreyPage from "@/components/monterrey/MonterreyPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "SEO y Marketing Digital en Monterrey | Alié Digital",
  description: "Agencia de marketing digital en Monterrey especializada en empresas B2B. Impulsa tu negocio con diseño web, SEO técnico, paid media y automatizaciones.",
  alternates: {
    canonical: "https://aliedigital.com/monterrey/",
    languages: {
      "es-MX": "https://aliedigital.com/monterrey/",
      "x-default": "https://aliedigital.com/monterrey/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Agencia de Marketing Digital B2B en Monterrey | Alié Digital",
    description: "Agencia de marketing digital en Monterrey especializada en empresas B2B. Impulsa tu negocio regio con diseño web, SEO técnico, paid media y automatizaciones con IA.",
    url: "https://aliedigital.com/monterrey/",
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
    title: "Agencia de Marketing Digital B2B en Monterrey | Alié Digital",
    description: "Agencia de marketing digital en Monterrey especializada en empresas B2B. Impulsa tu negocio regio con diseño web, SEO técnico, paid media y automatizaciones con IA.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  const pageSchema = createServiceSchema(
    "/monterrey/",
    "Agencia de marketing digital en Monterrey | Alié Digital",
    "Alié Digital Monterrey: Expertos en diseño web, SEO, Paid Media, ecommerce y automatizaciones de Inteligencia Artificial para empresas B2B en Monterrey. Impulsa tu negocio con servicios de marketing digital en Monterrey."
  );

  return (
    <>
      <JsonLd data={pageSchema} />
      <MonterreyPage />
    </>
  );
}

