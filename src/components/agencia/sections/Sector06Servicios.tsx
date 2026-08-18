"use client";

import { motion } from "framer-motion";
import { SERVICIOS } from "../data";
import { Hud, ServiceIcon } from "../hud";
import { SpotlightCard } from "../ui";

export default function Sector06Servicios() {
  return (
    <section className="relative z-10 px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Hud>Matriz de Servicios // Ingeniería y Crecimiento</Hud>
          <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]">
            Soluciones diseñadas para eliminar cuellos de botella y escalar
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICIOS.map((s, i) => (
            <motion.div
              key={s.titulo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <SpotlightCard className="glass-liquid rounded-[28px] p-7 flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  <span className="w-14 h-14 rounded-2xl border border-white/15 bg-white/5 flex items-center justify-center text-orangeleader">
                    <ServiceIcon i={i} />
                  </span>
                  <span className="font-mono text-xs text-white/30 tracking-[0.2em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-base font-black uppercase text-white leading-snug">{s.titulo}</h3>
                <p className="text-sm text-starlight/60 leading-relaxed">{s.desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
