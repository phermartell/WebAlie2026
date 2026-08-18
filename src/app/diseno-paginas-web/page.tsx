import type { Metadata } from "next";
import WebDevPageClient from "@/components/servicios/WebDevPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño de Páginas Web & Desarrollo Headless | Alié Digital",
  description: "Diseño y desarrollo de páginas web a la medida con Next.js, WordPress y Shopify. Sitios web ultrarrápidos y optimizados para SEO y conversión.",
  alternates: {
    canonical: "https://aliedigital.com/diseno-paginas-web/",
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Diseño de Páginas Web & Desarrollo Headless | Alié Digital",
    description: "Diseño y desarrollo de páginas web a la medida con Next.js, WordPress y Shopify. Sitios web ultrarrápidos y optimizados para SEO y conversión.",
    url: "https://aliedigital.com/diseno-paginas-web/",
    images: [{ url: "https://aliedigital.com/og-home.webp", width: 1200, height: 630, alt: "Diseño de Páginas Web | Alié Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseño de Páginas Web & Desarrollo Headless | Alié Digital",
    description: "Diseño y desarrollo de páginas web a la medida con Next.js, WordPress y Shopify. Sitios web ultrarrápidos y optimizados para SEO y conversión.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/diseno-paginas-web/",
          "Diseño de Páginas Web & Desarrollo Headless | Alié Digital",
          "Diseño y desarrollo de páginas web a la medida con Next.js, WordPress y Shopify. Sitios web ultrarrápidos y optimizados para SEO y conversión."
        )}
      />
      <WebDevPageClient />
    </>
  );
}

