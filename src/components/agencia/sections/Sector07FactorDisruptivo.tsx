"use client";

import { motion } from "framer-motion";
import { PROCESO_TRABAJO } from "../data";
import { Hud } from "../hud";
import { SpotlightCard } from "../ui";

export default function Sector07FactorDisruptivo() {
  return (
    <section className="relative z-10 px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Hud>PROCESO DE TRABAJO</Hud>
          <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]">
            Cómo trabajamos con tu equipo
          </h2>
          <p className="mt-6 text-starlight/60 leading-relaxed font-light">
            Partimos de lo que tu empresa necesita resolver y de las herramientas que ya usa. La propuesta define qué haremos, qué necesita aportar tu equipo y cómo revisaremos el trabajo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROCESO_TRABAJO.map((paso, i) => (
            <motion.div
              key={paso.titulo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
            >
              <SpotlightCard className="glass-liquid rounded-[28px] p-7 md:p-8 flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.25em] text-orangeleader uppercase">
                    {paso.paso}
                  </span>
                  <span className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center font-mono text-xs text-white/40">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase text-white leading-snug">
                  {paso.titulo}
                </h3>
                <p className="text-sm text-starlight/70 leading-relaxed font-light">
                  {paso.desc}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
