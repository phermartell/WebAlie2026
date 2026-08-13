import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Servicios | Alié Digital",
  description: "Servicios de marketing digital B2B de Alié Digital.",
};

export default function Page() {
  return <PlaceholderPage title="Servicios" />;
}
