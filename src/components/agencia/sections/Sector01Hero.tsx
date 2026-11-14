"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hud } from "../hud";

export default function Sector01Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const h1Y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 md:px-8 pt-36 pb-20 z-10"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Contenido con parallax */}
        <motion.div style={{ y: h1Y }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <Hud>CONOCE ALIÉ DIGITAL</Hud>
            <h1 className="mt-8 text-3xl md:text-6xl font-black uppercase text-white leading-[1.02] tracking-tight">
              Agencia de marketing digital y desarrollo web
            </h1>
            <p className="mt-8 text-base md:text-lg text-starlight/75 leading-relaxed font-light max-w-3xl mx-auto">
              Ayudamos a empresas a presentar su oferta, captar consultas y darles seguimiento. Diseñamos sitios web, trabajamos su posicionamiento en buscadores y gestionamos campañas digitales según las necesidades de cada proyecto.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href="#CTAContacto"
                className="w-full sm:w-auto bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(235,63,27,0.4)] transition-all flex items-center justify-center cursor-pointer"
              >
                Solicitar información
              </a>
              <Link
                href="/servicios"
                className="w-full sm:w-auto glass-l2 rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest text-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all"
              >
                Ver servicios
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
