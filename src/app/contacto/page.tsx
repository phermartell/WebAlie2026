import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Contacto | Alié Digital",
  description: "Contáctanos: agenda una llamada de estrategia con Alié Digital.",
};

export default function Page() {
  return <PlaceholderPage title="Contacto" />;
}
