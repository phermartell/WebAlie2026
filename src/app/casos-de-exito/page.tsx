import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Casos de éxito | Alié Digital",
  description: "Casos de éxito y proyectos de Alié Digital.",
};

export default function Page() {
  return <PlaceholderPage title="Casos de éxito" />;
}
