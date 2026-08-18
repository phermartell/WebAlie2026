import type { Metadata } from "next";
import ServiciosPage from "@/components/servicios/ServiciosPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Servicios de Marketing y Desarrollo B2B | Alié Digital",
  description: "Descubre nuestros servicios de marketing B2B y diseño web headless. Diseñamos toda la infraestructura digital que escala las ventas y leads de tu empresa.",
  alternates: {
    canonical: "https://aliedigital.com/servicios/",
    languages: {
      "es-MX": "https://aliedigital.com/servicios/",
      "x-default": "https://aliedigital.com/servicios/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Servicios de Marketing Digital y Desarrollo Web B2B | Alié",
    description: "Descubre nuestros servicios de marketing B2B y diseño web headless. Diseñamos toda la infraestructura digital para escalar las ventas y leads de tu empresa.",
    url: "https://aliedigital.com/servicios/",
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
    title: "Servicios de Marketing Digital y Desarrollo Web B2B | Alié",
    description: "Descubre nuestros servicios de marketing B2B y diseño web headless. Diseñamos toda la infraestructura digital para escalar las ventas y leads de tu empresa.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/servicios/",
          "Servicios B2B | Alié Digital",
          "Construimos la infraestructura digital que escala las ventas de tu empresa. Un ecosistema impulsado por Inteligencia Artificial y código Headless."
        )}
      />
      <ServiciosPage />
    </>
  );
}

