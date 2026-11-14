import type { Metadata } from "next";
import PueblaPage from "@/components/puebla/PueblaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Marketing digital B2B en Puebla | Alié Digital",
  description: "Diseño web, SEO y campañas de Google Ads y Meta Ads para empresas B2B en Puebla. Solicita información para revisar por dónde empezar.",
  alternates: {
    canonical: "https://aliedigital.com/puebla/",
    languages: {
      "es-MX": "https://aliedigital.com/puebla/",
      "x-default": "https://aliedigital.com/puebla/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Marketing digital B2B en Puebla | Alié Digital",
    description: "Diseño web, SEO y campañas de Google Ads y Meta Ads para empresas B2B en Puebla. Solicita información para revisar por dónde empezar.",
    url: "https://aliedigital.com/puebla/",
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
    title: "Marketing digital B2B en Puebla | Alié Digital",
    description: "Diseño web, SEO y campañas de Google Ads y Meta Ads para empresas B2B en Puebla. Solicita información para revisar por dónde empezar.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  const pageSchema = createServiceSchema(
    "/puebla/",
    "Marketing digital B2B en Puebla | Alié Digital",
    "Servicios de diseño web, SEO y publicidad digital para empresas B2B en Puebla, con medición y seguimiento de consultas según el alcance del proyecto."
  );

  return (
    <>
      <JsonLd data={pageSchema} />
      <PueblaPage />
    </>
  );
}
