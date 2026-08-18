import type { Metadata } from "next";
import PueblaDisenoWebPage from "@/components/puebla/PueblaDisenoWebPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño de Páginas Web Puebla Premium | Alié Digital",
  description: "Diseño de páginas web premium y personalizadas en Puebla. Sitios headless a la medida ultra rápidos, optimizados para el SEO y la captación de clientes.",
  alternates: {
    canonical: "https://aliedigital.com/puebla/diseno-paginas-web/",
    languages: {
      "es-MX": "https://aliedigital.com/puebla/diseno-paginas-web/",
      "x-default": "https://aliedigital.com/puebla/diseno-paginas-web/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Diseño de Páginas Web Premium y Headless en Puebla | Alié",
    description: "Diseño de páginas web premium y personalizadas en Puebla. Sitios web headless a la medida, ultra rápidos, optimizados para SEO y captación de clientes B2B.",
    url: "https://aliedigital.com/puebla/diseno-paginas-web/",
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
    title: "Diseño de Páginas Web Premium y Headless en Puebla | Alié",
    description: "Diseño de páginas web premium y personalizadas en Puebla. Sitios web headless a la medida, ultra rápidos, optimizados para SEO y captación de clientes B2B.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  const pageSchema = createServiceSchema(
    "/puebla/diseno-paginas-web/",
    "Diseño de páginas web en Puebla | Alié Digital",
    "Diseño y desarrollo de páginas web premium y personalizadas en Puebla y Cholula. Sitios web a la medida ultra rápidos, optimizados para SEO y conversión."
  );

  return (
    <>
      <JsonLd data={pageSchema} />
      <PueblaDisenoWebPage />
    </>
  );
}
