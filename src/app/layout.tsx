import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SpaceLayoutWrapper from "@/components/SpaceLayoutWrapper";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Alié Digital | Diseño Web B2B & Marketing de Alto Rendimiento",
  description: "Alié Digital es una agencia B2B experta en diseño web Next.js y marketing digital de alto retorno. Más de 7 años digitalizando canales de venta con arquitectura Headless e infraestructura ultra-rápida. Garantía anti-secuestro de código y soporte administrado.",
  keywords: [
    "diseño web b2b",
    "agencia de marketing digital",
    "next.js react",
    "desarrollo headless wordpress",
    "landing pages b2b",
    "tiendas en linea ecommerce",
    "publicidad google ads",
    "marketing redes sociales",
    "puebla",
    "monterrey"
  ],
  authors: [{ name: "Alié Digital" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-oled text-starlight selection:bg-orangeleader selection:text-white">
        <SpaceLayoutWrapper>{children}</SpaceLayoutWrapper>
      </body>
    </html>
  );
}
