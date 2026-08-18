"use client";

import { useRef } from "react";
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
            <Hud>Bitácora de Agencia // Operando como Alié desde 2021</Hud>
            <h1 className="mt-8 text-3xl md:text-6xl font-black uppercase text-white leading-[1.02] tracking-tight">
              Creemos en las marcas que sueñan grande y trabajamos para hacerlas llegar lejos
            </h1>
            <p className="mt-8 text-base md:text-lg text-starlight/75 leading-relaxed font-light max-w-3xl mx-auto">
              Nacimos con una convicción clara: las empresas no necesitan sitios web estáticos ni
              agencias burocráticas; necesitan una{" "}
              <strong className="text-white font-semibold">
                agencia digital potenciada por inteligencia artificial
              </strong>{" "}
              que sea transparente y un aliado estratégico orientado a entender sus metas
              financieras y potenciar sus ventas. Como{" "}
              <strong className="text-white font-semibold">
                agencia de diseño web impulsada por inteligencia artificial
              </strong>{" "}
              y{" "}
              <strong className="text-white font-semibold">
                agencia de marketing digital potenciada por inteligencia artificial
              </strong>{" "}
              con más de 7 años de trayectoria en el sector y operando bajo el sello Alié desde
              2021, acompañamos a empresas en Monterrey, Puebla, Ciudad de México y Latinoamérica a
              construir activos comerciales impulsados por ingeniería tecnológica e Inteligencia
              Artificial que generan resultados reales y medibles.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
