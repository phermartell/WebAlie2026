import type { Metadata } from "next";
import MonterreyPage from "@/components/monterrey/MonterreyPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Agencia de Marketing Digital en Monterrey | Alié Digital",
  description:
    "Alié Digital Monterrey: Expertos en diseño web, SEO, Paid Media, ecommerce y automatizaciones de Inteligencia Artificial para empresas B2B en Monterrey. Impulsa tu negocio con servicios de marketing digital en Monterrey.",
  robots: "index, follow",
  alternates: {
    canonical: "https://aliedigital.com/monterrey/",
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Agencia de Marketing Digital en Monterrey | Alié Digital",
    description:
      "Alié Digital Monterrey: Expertos en diseño web, SEO, Paid Media, ecommerce y automatizaciones de Inteligencia Artificial para empresas B2B en Monterrey. Impulsa tu negocio con servicios de marketing digital en Monterrey.",
    url: "https://aliedigital.com/monterrey/",
    images: [
      {
        url: "https://aliedigital.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Alié Digital — Agencia de marketing digital y diseño web en Monterrey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia de Marketing Digital en Monterrey | Alié Digital",
    description:
      "Alié Digital Monterrey: Expertos en diseño web, SEO, Paid Media, ecommerce y automatizaciones de Inteligencia Artificial para empresas B2B en Monterrey. Impulsa tu negocio con servicios de marketing digital en Monterrey.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

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

