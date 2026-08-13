import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Desarrollo web | Alié Digital",
  description: "Desarrollo web a la medida con stack moderno y headless.",
};

export default function Page() {
  return <PlaceholderPage title="Desarrollo web" />;
}
