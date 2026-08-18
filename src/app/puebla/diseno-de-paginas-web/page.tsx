import type { Metadata } from "next";
import PueblaDisenoWebPage from "@/components/puebla/PueblaDisenoWebPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño de páginas web en Puebla | Alié Digital",
  description: "Diseño y desarrollo web B2B en Puebla.",
  openGraph: {
    title: "Diseño de páginas web en Puebla | Alié Digital",
    description: "Diseño y desarrollo web B2B en Puebla.",
    url: "https://aliedigital.com/puebla/diseno-de-paginas-web/",
    images: [{ url: "https://aliedigital.com/og-home.webp", width: 1200, height: 630, alt: "Diseño de páginas web en Puebla | Alié Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseño de páginas web en Puebla | Alié Digital",
    description: "Diseño y desarrollo web B2B en Puebla.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return <>
      <JsonLd data={createServiceSchema("/puebla/diseno-de-paginas-web/", "Diseño de páginas web en Puebla | Alié Digital", "Diseño y desarrollo web B2B en Puebla.")} />
      <PueblaDisenoWebPage />
    </>;
}

