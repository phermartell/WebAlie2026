import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Analytics | Alié Digital",
  description: "Medición y analítica para decisiones basadas en datos.",
};

export default function Page() {
  return <PlaceholderPage title="Analytics" />;
}
