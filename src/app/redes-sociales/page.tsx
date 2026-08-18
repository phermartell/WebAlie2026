import type { Metadata } from "next";
import SocialMediaPageClient from "@/components/servicios/SocialMediaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Redes Sociales B2B & SMM | Alié Digital",
  description: "Estrategias de contenido orgánico y gestión de redes sociales (SMM) B2B. Diseños de alta gama y embudos de conversión orgánicos.",
  openGraph: {
    title: "Redes Sociales B2B & SMM | Alié Digital",
    description: "Estrategias de contenido orgánico y gestión de redes sociales (SMM) B2B. Diseños de alta gama y embudos de conversión orgánicos.",
    url: "https://aliedigital.com/redes-sociales/",
    images: [{ url: "https://aliedigital.com/og-home.webp", width: 1200, height: 630, alt: "Redes Sociales B2B & SMM | Alié Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redes Sociales B2B & SMM | Alié Digital",
    description: "Estrategias de contenido orgánico y gestión de redes sociales (SMM) B2B. Diseños de alta gama y embudos de conversión orgánicos.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

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
