import type { Metadata } from "next";
import MonterreyDisenoWebPage from "@/components/monterrey/MonterreyDisenoWebPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño de páginas web en Monterrey | Alié Digital",
  description: "Diseño y desarrollo web B2B en Monterrey.",
  openGraph: {
    title: "Diseño de páginas web en Monterrey | Alié Digital",
    description: "Diseño y desarrollo web B2B en Monterrey.",
    url: "https://aliedigital.com/monterrey/diseno-de-paginas-web/",
    images: [{ url: "https://aliedigital.com/og-home.webp", width: 1200, height: 630, alt: "Diseño de páginas web en Monterrey | Alié Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseño de páginas web en Monterrey | Alié Digital",
    description: "Diseño y desarrollo web B2B en Monterrey.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return <>
      <JsonLd data={createServiceSchema("/monterrey/diseno-de-paginas-web/", "Diseño de páginas web en Monterrey | Alié Digital", "Diseño y desarrollo web B2B en Monterrey.")} />
      <MonterreyDisenoWebPage />
    </>;
}
