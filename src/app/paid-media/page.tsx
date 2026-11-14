import type { Metadata } from "next";
import PaidMediaPageClient from "@/components/servicios/PaidMediaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Gestión de Google Ads y Meta Ads | Alié Digital",
  description: "Gestionamos campañas en Google Ads y Meta Ads para atraer consultas sobre tu negocio. Planeación, anuncios, medición y seguimiento de presupuesto. Solicita información.",
  alternates: {
    canonical: "https://aliedigital.com/paid-media/",
    languages: {
      "es-MX": "https://aliedigital.com/paid-media/",
      "x-default": "https://aliedigital.com/paid-media/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Gestión de Google Ads y Meta Ads | Alié Digital",
    description: "Gestionamos campañas en Google Ads y Meta Ads para atraer consultas sobre tu negocio. Planeación, anuncios, medición y seguimiento de presupuesto. Solicita información.",
    url: "https://aliedigital.com/paid-media/",
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
    title: "Gestión de Google Ads y Meta Ads | Alié Digital",
    description: "Gestionamos campañas en Google Ads y Meta Ads para atraer consultas sobre tu negocio. Planeación, anuncios, medición y seguimiento de presupuesto. Solicita información.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return <>
      <JsonLd data={createServiceSchema("/paid-media/", "Gestión de Google Ads y Meta Ads | Alié Digital", "Gestión de campañas en Google Ads y Meta Ads con planeación, preparación de anuncios, medición de acciones y seguimiento del presupuesto según el alcance acordado.")} />
      <PaidMediaPageClient />
    </>;
}

