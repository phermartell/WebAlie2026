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
          <Hud>PORTAFOLIO DE ALIÉ DIGITAL</Hud>

          <h1 className="mt-8 text-3xl md:text-6xl font-black uppercase text-white leading-[1.02] tracking-tight">
            Casos de éxito en marketing digital y desarrollo web
          </h1>

          <p className="mt-8 text-base md:text-lg text-starlight/75 leading-relaxed font-light max-w-3xl mx-auto">
            Conoce cómo trabajamos campañas, sitios web y tiendas en línea para empresas de distintos sectores. En cada proyecto puedes consultar qué necesitaba el cliente y qué implementamos.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="#misiones-casos-exito"
              className="w-full sm:w-auto bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(235,63,27,0.4)] transition-all flex items-center justify-center cursor-pointer"
            >
              Ver proyectos
            </a>
            <a
              href="#cierre-conversion"
              className="w-full sm:w-auto glass-l2 rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest text-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all"
            >
              Solicitar información
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
