"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hud } from "@/components/agencia/hud";

export default function Capitulo01Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section
      id="hero-telemetria"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 md:px-8 pt-32 pb-20 z-10 overflow-hidden"
    >
      {/* Contenido */}
      <motion.div style={{ y: textY }} className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <Hud>Telemetría de Rendimiento</Hud>

          <h1 className="mt-8 text-3xl md:text-6xl font-black uppercase text-white leading-[1.02] tracking-tight">
            Campañas Reales. Resultados Medibles. ROI Sin Excusas.
          </h1>

          <h2 className="mt-8 text-lg md:text-2xl font-semibold text-tangerine leading-snug max-w-3xl mx-auto">
            Pauta publicitaria de alto rendimiento en sectores de alta competencia, nichos
            restringidos y mercados B2B complejos.
          </h2>

          <div className="mt-8 space-y-6 text-base md:text-lg text-starlight/75 leading-relaxed font-light max-w-3xl mx-auto">
            <p>
              En Alié Digital no reportamos clics superficiales ni impresiones vanidosas. Cada peso
              invertido en pauta publicitaria a través de{" "}
              <strong className="text-white font-semibold">Google Ads</strong>,{" "}
              <strong className="text-white font-semibold">Meta Ads</strong>,{" "}
              <strong className="text-white font-semibold">TikTok</strong> y{" "}
              <strong className="text-white font-semibold">LinkedIn</strong> está conectado
              directamente a sistemas de atribución de ventas, reducción del Costo por Adquisición
              (CPA) y generación constante de clientes potenciales calificados.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
