import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Nosotros | Alié Digital",
  description: "Conoce a Alié Digital, agencia de marketing digital potenciada por inteligencia artificial.",
  openGraph: {
    title: "Nosotros | Alié Digital",
    description: "Conoce a Alié Digital, agencia de marketing digital potenciada por inteligencia artificial.",
    url: "https://aliedigital.com/nosotros/",
    images: [{ url: "https://aliedigital.com/og-home.webp", width: 1200, height: 630, alt: "Nosotros | Alié Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Alié Digital",
    description: "Conoce a Alié Digital, agencia de marketing digital potenciada por inteligencia artificial.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  redirect("/agencia");
}
