import type { Metadata } from "next";
import SocialMediaPageClient from "@/components/servicios/SocialMediaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Manejo de Redes Sociales B2B y Contenido | Alié Digital",
  description: "Servicios de gestión de redes sociales B2B y marketing de contenidos. Diseños de alto impacto y embudos de conversión para captar más clientes orgánicos.",
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
    title: "Gestión de Redes Sociales B2B y Contenido | Alié Digital",
    description: "Servicios profesionales de gestión de redes sociales B2B y marketing de contenidos. Diseños de alto impacto y embudos de conversión para clientes orgánicos.",
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
    title: "Gestión de Redes Sociales B2B y Contenido | Alié Digital",
    description: "Servicios profesionales de gestión de redes sociales B2B y marketing de contenidos. Diseños de alto impacto y embudos de conversión para clientes orgánicos.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/redes-sociales/",
          "Redes Sociales B2B & SMM | Alié Digital",
          "Estrategias de contenido orgánico y gestión de redes sociales (SMM) B2B. Diseños de alta gama y embudos de conversión orgánicos."
        )}
      />
      <SocialMediaPageClient />
    </>
  );
}
