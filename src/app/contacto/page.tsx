import type { Metadata } from "next";
import ContactoPage from "@/components/contacto/ContactoPage";
import JsonLd from "@/components/JsonLd";
import { CONTACTO_SCHEMA } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contacto | Alié Digital",
  description: "Cuéntanos sobre tu proyecto mediante el formulario o escríbenos por WhatsApp o correo a nuestros equipos de atención en Monterrey y Puebla.",
  alternates: {
    canonical: "https://aliedigital.com/contacto/",
    languages: {
      "es-MX": "https://aliedigital.com/contacto/",
      "x-default": "https://aliedigital.com/contacto/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Contacto | Alié Digital",
    description: "Cuéntanos sobre tu proyecto mediante el formulario o escríbenos por WhatsApp o correo a nuestros equipos de atención en Monterrey y Puebla.",
    url: "https://aliedigital.com/contacto/",
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
    title: "Contacto | Alié Digital",
    description: "Cuéntanos sobre tu proyecto mediante el formulario o escríbenos por WhatsApp o correo a nuestros equipos de atención en Monterrey y Puebla.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={CONTACTO_SCHEMA} />
      <ContactoPage />
    </>
  );
}

