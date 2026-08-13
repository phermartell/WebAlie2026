import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Nosotros | Alié Digital",
  description: "Conoce a Alié Digital, agencia de marketing B2B.",
};

export default function Page() {
  return <PlaceholderPage title="Nosotros" />;
}
