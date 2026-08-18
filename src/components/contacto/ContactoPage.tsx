"use client";

import { motion } from "framer-motion";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import Sector01Construyamos from "./sections/Sector01Construyamos";
import Sector02Comencemos from "./sections/Sector02Comencemos";

export default function ContactoPage() {
  return (
    <main className="relative z-10">
      {/* Nave en órbita (riel izquierdo), igual que /agencia y /casos-de-exito */}
      <OrbitalPath />

      {/* Nebulosa naranja pulsante (esquina superior derecha) */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed -top-[100px] -right-[100px] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-[radial-gradient(circle,rgba(235,63,27,0.2),transparent_70%)] blur-[60px] z-0"
      />

      <Sector01Construyamos />
      <Sector02Comencemos />
    </main>
  );
}
