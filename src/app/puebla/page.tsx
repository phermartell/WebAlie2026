import type { Metadata } from "next";
import PueblaPage from "@/components/puebla/PueblaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Agencia de Marketing Digital en Puebla | Alié Digital",
  description:
    "Alié Digital Puebla: Expertos en diseño web, SEO, Paid Media y automatizaciones de Inteligencia Artificial para empresas B2B en Puebla.",
  robots: "index, follow",
  alternates: {
    canonical: "https://aliedigital.com/puebla/",
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Agencia de Marketing Digital en Puebla | Alié Digital",
    description:
      "Alié Digital Puebla: Expertos en diseño web, SEO, Paid Media y automatizaciones de Inteligencia Artificial para empresas B2B en Puebla.",
    url: "https://aliedigital.com/puebla/",
    images: [
      {
        url: "https://aliedigital.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Alié Digital — Agencia de marketing digital y diseño web en Puebla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia de Marketing Digital en Puebla | Alié Digital",
    description:
      "Alié Digital Puebla: Expertos en diseño web, SEO, Paid Media y automatizaciones de Inteligencia Artificial para empresas B2B en Puebla.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  const pageSchema = createServiceSchema(
    "/puebla/",
    "Agencia de marketing digital en Puebla | Alié Digital",
    "Alié Digital Puebla: Expertos en diseño web, SEO, Paid Media y automatizaciones de Inteligencia Artificial para empresas B2B en Puebla."
  );

  return (
    <>
      <JsonLd data={pageSchema} />
      <PueblaPage />
    </>
  );
}
