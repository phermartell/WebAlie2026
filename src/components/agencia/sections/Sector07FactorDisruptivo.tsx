"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PILARES, TRADICIONAL } from "../data";
import { Hud } from "../hud";

export default function Sector07FactorDisruptivo() {
  const [mode, setMode] = useState<"alie" | "tradicional">("alie");

  return (
    <section className="relative z-10 px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Hud>Diferencial Vectorial // Ventaja Competitiva</Hud>
          <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]">
            Por qué nuestro modelo impulsado por inteligencia artificial supera a las agencias
            tradicionales
          </h2>
        </div>

        {/* Toggle comparativo */}
        <div className="flex justify-center mb-14">
          <div className="glass-liquid rounded-full p-1.5 flex items-center gap-1">
            {(["tradicional", "alie"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative z-10 px-6 md:px-8 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                  mode === m ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {m === "alie" ? "Motor Alié · IA" : "Agencia Tradicional"}
                {mode === m && (
                  <motion.span
                    layoutId="factor-toggle"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-orangeleader to-tangerine shadow-[0_0_24px_rgba(235,63,27,0.5)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tarjetas comparativas */}
        <div className="relative grid">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orangeleader/40 to-transparent" />
          {(["alie", "tradicional"] as const).map((m) => {
            const isActive = mode === m;
            const items = m === "alie" ? PILARES : TRADICIONAL;
            return (
              <div
                key={m}
                aria-hidden={!isActive}
                className={`[grid-area:1/1] grid grid-cols-1 md:grid-cols-2 gap-6 ${
                  isActive ? "" : "pointer-events-none"
                }`}
              >
                {items.map((p, i) => (
                  <motion.div
                    key={`${m}-${p.num}`}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 24 }}
                    transition={{ duration: 0.4, delay: isActive ? (i % 2) * 0.08 + 0.1 : 0 }}
                    className={`glass-liquid rounded-[28px] p-8 flex flex-col gap-4 ${
                      i % 2 === 1 ? "md:ml-12" : "md:mr-12"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-xs tracking-[0.25em] rounded-full px-4 py-1.5 uppercase ${
                          m === "alie"
                            ? "text-orangeleader bg-orangeleader/10 border border-orangeleader/30"
                            : "text-white/40 bg-white/5 border border-white/10"
                        }`}
                      >
                        {p.num}
                      </span>
                      <h3 className="text-lg md:text-xl font-black uppercase text-white leading-snug">
                        {p.titulo}
                      </h3>
                    </div>
                    <p className="text-sm text-starlight/60 leading-relaxed">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
