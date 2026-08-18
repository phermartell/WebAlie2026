import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Agencia de Marketing y Tecnología B2B | Alié Digital",
  description: "Conoce a Alié Digital, nuestro equipo experto en marketing digital, diseño web y automatizaciones con IA dedicado al crecimiento comercial de tu empresa.",
  alternates: {
    canonical: "https://aliedigital.com/nosotros/",
    languages: {
      "es-MX": "https://aliedigital.com/nosotros/",
      "x-default": "https://aliedigital.com/nosotros/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Conoce a Alié Digital: Agencia de Marketing B2B | Alié Digital",
    description: "Conoce a Alié Digital, el equipo experto en marketing digital B2B, diseño web corporativo y automatizaciones con IA enfocados al crecimiento de tu empresa.",
    url: "https://aliedigital.com/nosotros/",
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
    title: "Conoce a Alié Digital: Agencia de Marketing B2B | Alié Digital",
    description: "Conoce a Alié Digital, el equipo experto en marketing digital B2B, diseño web corporativo y automatizaciones con IA enfocados al crecimiento de tu empresa.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  redirect("/agencia");
}
