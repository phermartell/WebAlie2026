import type { Metadata } from "next";
import PueblaDisenoWebPage from "@/components/puebla/PueblaDisenoWebPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño de páginas web en Puebla | Alié Digital",
  description: "Diseño y desarrollo de páginas web premium y personalizadas en Puebla y Cholula. Sitios web a la medida ultra rápidos, optimizados para SEO y conversión.",
  robots: "index, follow",
  alternates: {
    canonical: "https://aliedigital.com/puebla/diseno-paginas-web/",
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Diseño de páginas web en Puebla | Alié Digital",
    description: "Diseño y desarrollo de páginas web premium y personalizadas en Puebla y Cholula. Sitios web a la medida ultra rápidos, optimizados para SEO y conversión.",
    url: "https://aliedigital.com/puebla/diseno-paginas-web/",
    images: [
      {
        url: "https://aliedigital.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Diseño de páginas web en Puebla | Alié Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseño de páginas web en Puebla | Alié Digital",
    description: "Diseño y desarrollo de páginas web premium y personalizadas en Puebla y Cholula. Sitios web a la medida ultra rápidos, optimizados para SEO y conversión.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

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
