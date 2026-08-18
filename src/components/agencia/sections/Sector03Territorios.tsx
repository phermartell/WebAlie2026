"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GRUPOS } from "../data";
import { Hud } from "../hud";

export default function Sector03Territorios() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative z-10 px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Hud>Cobertura Multi-Industria // Territorio Probado</Hud>
          <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]">
            No adivinamos tu negocio: ya lo hemos construido en más de 30 giros comerciales
          </h2>
          <p className="mt-6 text-starlight/60 leading-relaxed">
            No somos teóricos. Como{" "}
            <strong className="text-white font-semibold">
              agencia de marketing digital impulsada por inteligencia artificial
            </strong>{" "}
            e ingeniería web, hemos estado en las trincheras de industrias complejas, técnicas e
            hipercompetitivas. Entendemos la psicología del comprador de tu sector porque ya hemos
            diseñado ecosistemas de conversión exitosos para él.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.4fr] gap-6">
          {/* Nodos de constelación */}
          <div className="flex flex-col gap-3">
            {GRUPOS.map((g, i) => (
              <button
                key={g.titulo}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`group flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-300 cursor-pointer ${
                  i === active ? "glass-liquid border-orangeleader/40" : "glass-liquid hover:border-white/25"
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === active
                      ? "bg-orangeleader shadow-[0_0_12px_rgba(235,63,27,0.9)] scale-125"
                      : "bg-white/25 group-hover:bg-white/50"
                  }`}
                />
                <span className="flex-1 min-w-0">
                  <span
                    className={`font-mono text-xs tracking-[0.2em] ${
                      i === active ? "text-orangeleader" : "text-white/30"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`block text-sm md:text-base font-black uppercase leading-snug ${
                      i === active ? "text-white" : "text-white/70 group-hover:text-white/90"
                    }`}
                  >
                    {g.titulo}
                  </span>
                </span>
                <span
                  className={`transition-all duration-300 ${
                    i === active ? "text-orangeleader opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  }`}
                >
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Panel de giros del grupo activo */}
          <div className="relative glass-liquid rounded-[28px] p-7 md:p-10 min-h-[320px] flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(235,63,27,0.10),transparent_55%)]" />
            <div className="relative grid">
              {GRUPOS.map((g, i) => {
                const isActive = i === active;
                return (
                  <motion.div
                    key={g.titulo}
                    aria-hidden={!isActive}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
                    transition={{ duration: 0.35 }}
                    className={`[grid-area:1/1] ${isActive ? "" : "pointer-events-none"}`}
                  >
                    <h3 className="text-xl md:text-2xl font-black uppercase text-white mb-6 flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orangeleader to-tangerine shadow-[0_0_10px_rgba(235,63,27,0.7)]" />
                      {g.titulo}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {g.giros.map((giro) => (
                        <span
                          key={giro}
                          className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-starlight/70 leading-relaxed"
                        >
                          {giro}
                        </span>
                      ))}
                    </div>
                    <span className="mt-8 inline-block font-mono text-xs tracking-[0.25em] text-white/30 uppercase">
                      {g.giros.length} giros dominados
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
