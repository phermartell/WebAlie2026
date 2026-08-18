import type { Metadata } from "next";
import PueblaDisenoWebPage from "@/components/puebla/PueblaDisenoWebPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño de Páginas Web en Puebla B2B | Alié Digital",
  description: "Desarrollo y diseño de páginas web en Puebla. Sitios web premium, rápidos y adaptados a dispositivos móviles optimizados para la conversión y SEO local.",
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
    title: "Diseño de Páginas Web en Puebla B2B y Cholula | Alié Digital",
    description: "Agencia de desarrollo y diseño de páginas web en Puebla. Sitios web premium, rápidos y adaptados a dispositivos móviles optimizados para conversión y SEO local.",
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
    title: "Diseño de Páginas Web en Puebla B2B y Cholula | Alié Digital",
    description: "Agencia de desarrollo y diseño de páginas web en Puebla. Sitios web premium, rápidos y adaptados a dispositivos móviles optimizados para conversión y SEO local.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return <>
      <JsonLd data={createServiceSchema("/puebla/diseno-de-paginas-web/", "Diseño de páginas web en Puebla | Alié Digital", "Diseño y desarrollo web B2B en Puebla.")} />
      <PueblaDisenoWebPage />
    </>;
}

