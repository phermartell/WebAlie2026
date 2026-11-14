import type { Metadata } from "next";
import PueblaDisenoWebPage from "@/components/puebla/PueblaDisenoWebPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño de páginas web en Puebla | Alié Digital",
  description: "Diseño web para empresas en Puebla. Solicita una cotización para un sitio nuevo, un rediseño o mejoras en formularios, WhatsApp e integraciones.",
  alternates: {
    canonical: "https://aliedigital.com/puebla/diseno-de-paginas-web/",
    languages: {
      "es-MX": "https://aliedigital.com/puebla/diseno-de-paginas-web/",
      "x-default": "https://aliedigital.com/puebla/diseno-de-paginas-web/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Diseño de páginas web en Puebla | Alié Digital",
    description: "Diseño web para empresas en Puebla. Solicita una cotización para un sitio nuevo, un rediseño o mejoras en formularios, WhatsApp e integraciones.",
    url: "https://aliedigital.com/puebla/diseno-de-paginas-web/",
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
    title: "Diseño de páginas web en Puebla | Alié Digital",
    description: "Diseño web para empresas en Puebla. Solicita una cotización para un sitio nuevo, un rediseño o mejoras en formularios, WhatsApp e integraciones.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return <>
      <JsonLd data={createServiceSchema("/puebla/diseno-de-paginas-web/", "Diseño de páginas web para empresas en Puebla | Alié Digital", "Diseño y desarrollo de sitios para empresas en Puebla, con opciones de rediseño y mejoras en formularios, canales de contacto e integraciones según el alcance acordado.")} />
      <PueblaDisenoWebPage />
    </>;
}

