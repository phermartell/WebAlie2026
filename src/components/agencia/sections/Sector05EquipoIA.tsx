"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hud } from "../hud";

export default function Sector05EquipoIA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const merge = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const ringAY = useTransform(merge, [0, 1], [-70, 0]);
  const ringBX = useTransform(merge, [0, 1], [90, 0]);
  const coreScale = useTransform(merge, [0.5, 1], [0.4, 1]);
  const coreOpacity = useTransform(merge, [0.4, 1], [0, 1]);

  return (
    <section className="relative z-10 px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative glass-liquid rounded-[40px] p-8 md:p-16 overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(235,63,27,0.10),transparent_55%)]" />

          {/* Núcleo humano ↔ IA */}
          <div className="relative h-40 md:h-48 flex items-center justify-center mb-10" aria-hidden="true">
            <motion.div
              style={{ y: ringAY }}
              className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-orangeleader/50 shadow-[0_0_40px_rgba(235,63,27,0.25)]"
            />
            <motion.div
              style={{ x: ringBX }}
              className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-elevatedblue shadow-[0_0_40px_rgba(22,38,79,0.6)]"
            />
            <motion.div
              style={{ scale: coreScale, opacity: coreOpacity }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-orangeleader to-tangerine shadow-[0_0_50px_rgba(235,63,27,0.7)]"
            />
          </div>

          <div className="relative">
            <Hud>Integración Total // Motor Híbrido de Marketing</Hud>
            <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]">
              Somos tu equipo de marketing integrado en la era de la inteligencia artificial
            </h2>

            <blockquote className="mt-10 text-lg md:text-xl text-starlight/85 leading-relaxed font-light border-l-2 border-orangeleader pl-6 md:pl-8 text-left md:text-center">
              &quot;Somos una{" "}
              <strong className="text-white font-semibold">
                agencia digital potenciada por inteligencia artificial
              </strong>{" "}
              de visión futurista que combina la creatividad estratégica con la potencia operativa
              de la Inteligencia Artificial. Desde posicionamiento en motores de búsqueda y
              publicidad pagada de alto rendimiento, hasta estrategias virales para redes sociales
              y asistentes de Inteligencia Artificial personalizados.&quot;
            </blockquote>

            <p className="mt-8 text-starlight/65 leading-relaxed text-left md:text-center">
              Eliminamos la frontera entre la &quot;agencia externa&quot; y tu empresa. Nos
              integramos directamente como un brazo tecnológico e interno que combina el criterio
              creativo humano con la capacidad operativa de la Inteligencia Artificial. Como tu{" "}
              <strong className="text-white font-semibold">
                agencia de marketing digital impulsada por inteligencia artificial
              </strong>
              , no vendemos servicios aislados; operamos el motor completo de atracción, conversión
              y automatización para escalar tu negocio.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
