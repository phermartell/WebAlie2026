"use client";

import OrbitalPath from "@/components/agencia/OrbitalPath";
import Capitulo01Hero from "./sections/Capitulo01Hero";
import Capitulo02Misiones from "./sections/Capitulo02Misiones";
import Capitulo03Cierre from "./sections/Capitulo03Cierre";

export default function CasosPage() {
  return (
    <main className="relative z-10">
      <OrbitalPath />
      <Capitulo01Hero />
      <Capitulo02Misiones />
      <Capitulo03Cierre />
    </main>
  );
}
