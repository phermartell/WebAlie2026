import type { Metadata } from "next";
import SocialMediaPageClient from "@/components/servicios/SocialMediaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Gestión de redes sociales para negocios | Alié Digital",
  description: "Planeamos, diseñamos y publicamos contenido para las redes sociales de tu negocio. Consulta opciones de contenido, publicación y gestión según tus necesidades.",
  alternates: {
    canonical: "https://aliedigital.com/redes-sociales/",
    languages: {
      "es-MX": "https://aliedigital.com/redes-sociales/",
      "x-default": "https://aliedigital.com/redes-sociales/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Gestión de redes sociales para negocios | Alié Digital",
    description: "Planeamos, diseñamos y publicamos contenido para las redes sociales de tu negocio. Consulta opciones de contenido, publicación y gestión según tus necesidades.",
    url: "https://aliedigital.com/redes-sociales/",
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
    title: "Gestión de redes sociales para negocios | Alié Digital",
    description: "Planeamos, diseñamos y publicamos contenido para las redes sociales de tu negocio. Consulta opciones de contenido, publicación y gestión según tus necesidades.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/redes-sociales/",
          "Gestión de redes sociales para negocios | Alié Digital",
          "Gestión de redes sociales con planeación de contenido, diseño, redacción, publicación y revisión de métricas según los canales y las actividades acordados."
        )}
      />
      <SocialMediaPageClient />
    </>
  );
}
