import type { Metadata } from "next";
import MonterreyPage from "@/components/monterrey/MonterreyPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Marketing digital B2B en Monterrey | Alié Digital",
  description: "Diseño web, SEO y campañas de Google Ads y Meta Ads para empresas B2B en Monterrey. Solicita información para revisar por dónde empezar.",
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
    title: "Marketing digital B2B en Monterrey | Alié Digital",
    description: "Diseño web, SEO y campañas de Google Ads y Meta Ads para empresas B2B en Monterrey. Solicita información para revisar por dónde empezar.",
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
    title: "Marketing digital B2B en Monterrey | Alié Digital",
    description: "Diseño web, SEO y campañas de Google Ads y Meta Ads para empresas B2B en Monterrey. Solicita información para revisar por dónde empezar.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  const pageSchema = createServiceSchema(
    "/monterrey/",
    "Marketing digital B2B en Monterrey | Alié Digital",
    "Servicios de diseño web, SEO y publicidad digital para empresas B2B en Monterrey, con medición y seguimiento de consultas según el alcance del proyecto."
  );

  return (
    <>
      <JsonLd data={pageSchema} />
      <MonterreyPage />
    </>
  );
}

