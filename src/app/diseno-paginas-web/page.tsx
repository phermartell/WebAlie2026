import type { Metadata } from "next";
import WebDevPageClient from "@/components/servicios/WebDevPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño de páginas web para empresas | Alié Digital",
  description: "Diseñamos páginas web para presentar tu negocio y facilitar el contacto con clientes. Sitios empresariales, tiendas en línea y desarrollo a medida. Cotiza tu proyecto.",
  alternates: {
    canonical: "https://aliedigital.com/diseno-paginas-web/",
    languages: {
      "es-MX": "https://aliedigital.com/diseno-paginas-web/",
      "x-default": "https://aliedigital.com/diseno-paginas-web/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Diseño de páginas web para empresas | Alié Digital",
    description: "Diseñamos páginas web para presentar tu negocio y facilitar el contacto con clientes. Sitios empresariales, tiendas en línea y desarrollo a medida. Cotiza tu proyecto.",
    url: "https://aliedigital.com/diseno-paginas-web/",
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
    title: "Diseño de páginas web para empresas | Alié Digital",
    description: "Diseñamos páginas web para presentar tu negocio y facilitar el contacto con clientes. Sitios empresariales, tiendas en línea y desarrollo a medida. Cotiza tu proyecto.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/diseno-paginas-web/",
          "Diseño de páginas web para empresas | Alié Digital",
          "Diseño y desarrollo de sitios empresariales, tiendas en línea y funciones a medida, con estructura, diseño y tecnología definidos según las necesidades de cada proyecto."
        )}
      />
      <WebDevPageClient />
    </>
  );
}

