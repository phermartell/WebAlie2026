"use client";

import { motion } from "framer-motion";
import LeadForm from "@/components/LeadForm";
import { Hud } from "../hud";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Sector09Ignicion() {
  return (
    <section className="relative z-10 flex items-center justify-center px-4 md:px-8 pb-36 pt-8">
      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative glass-liquid rounded-[50px] p-7 md:p-16 text-center shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Glow de ignición */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(235,63,27,0.18),transparent_60%)]"
          />

          <div className="relative">
            <motion.div variants={item}>
              <Hud>Despegue Comercial // Inicia la Ignición</Hud>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]"
            >
              Listo para crecer: construyamos algo increíble
            </motion.h2>
            <motion.p variants={item} className="mt-6 text-base text-starlight/75 leading-relaxed font-light">
              Como tu{" "}
              <strong className="text-white font-semibold">
                agencia de marketing digital potenciada por inteligencia artificial
              </strong>{" "}
              y desarrollo tecnológico, estamos listos para analizar tu presencia digital actual,
              identificar fugas en tu proceso comercial y diseñar la hoja de ruta para tu siguiente
              nivel de crecimiento.
            </motion.p>
            <motion.div variants={item} className="mt-10">
              <LeadForm />
            </motion.div>
            <motion.div
              variants={item}
              className="mt-10 pt-6 border-t border-white/10 flex flex-col items-center gap-1 opacity-70"
            >
              <span className="text-base font-bold text-white uppercase">
                &quot;Por un mundo lleno de marcas increíbles&quot;
              </span>
              <span className="text-base font-mono tracking-widest uppercase text-orangeleader">
                Sueña grande · Llega lejos
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
