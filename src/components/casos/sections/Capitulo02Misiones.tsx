"use client";

import { motion } from "framer-motion";
import { MISIONES } from "../data";
import { Hud } from "@/components/agencia/hud";
import { CountUp } from "@/components/agencia/ui";
import Planeta from "../Planeta";

const TINTES = ["#38bdf8", "#fbbf24", "#34d399", "#a78bfa", "#f472b6", "#fb923c", "#22d3ee"];

function Radar() {
  return (
    <div className="relative w-24 h-24 mx-auto mb-6" aria-hidden="true">
      <div className="absolute inset-0 rounded-full border border-orangeleader/30" />
      <div className="absolute inset-3 rounded-full border border-orangeleader/20" />
      <div className="absolute inset-6 rounded-full border border-orangeleader/15" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(235,63,27,0.12),transparent_70%)]" />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "conic-gradient(from 0deg, rgba(235,63,27,0.55), transparent 70deg)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function Capitulo02Misiones() {
  return (
    <section
      id="misiones-casos-exito"
      className="relative z-10 px-4 md:px-8 py-24 md:py-32"
    >
      {/* Asteroides decorativos */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <motion.img
          src="/asteroides/asteroide-1.webp"
          alt=""
          className="absolute left-[8%] top-[12%] w-24 md:w-32 opacity-30"
          animate={{ y: [0, -24, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src="/asteroides/asteroide-2.webp"
          alt=""
          className="absolute right-[6%] top-[38%] w-16 md:w-24 opacity-25"
          animate={{ y: [0, 20, 0], rotate: [0, -14, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src="/asteroides/asteroide-3.webp"
          alt=""
          className="absolute left-[12%] bottom-[10%] w-20 md:w-28 opacity-25"
          animate={{ y: [0, -18, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Radar />
          <Hud>Bitácora de Misiones Cumplidas // Radar Táctico</Hud>
          <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]">
            Bitácora de Misiones Cumplidas
          </h2>
          <p className="mt-6 text-starlight/60 leading-relaxed">
            Casos de estudio donde la tecnología web y la pauta estratégica se tradujeron en
            crecimiento financiero.
          </p>
        </div>

        <div className="flex flex-col gap-20 md:gap-40 mt-16">
          {MISIONES.map((m, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={m.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                {/* Planeta */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`flex justify-center ${flip ? "lg:order-2" : ""}`}
                >
                  <Planeta tint={TINTES[i]} tag={m.tag} />
                </motion.div>

                {/* Panel de misión */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className={flip ? "lg:order-1" : ""}
                >
                  <article
                    id={m.id}
                    className="glass-liquid rounded-[28px] p-7 md:p-8 flex flex-col gap-5"
                  >
                    <div>
                      <p className="font-mono text-xs tracking-[0.2em] text-tangerine uppercase">
                        {m.categoria}
                      </p>
                      <h3 className="mt-2 text-xl md:text-2xl font-black uppercase text-white leading-snug">
                        {m.titulo}
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <CountUp
                        to={m.metrica.count}
                        prefix={m.metrica.prefix}
                        suffix={m.metrica.suffix}
                        className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orangeleader to-tangerine bg-clip-text text-transparent"
                      />
                      <span className="text-xs uppercase tracking-wide text-starlight/50">
                        {m.metrica.label}
                      </span>
                    </div>

                    <div className="flex flex-col gap-4 text-sm leading-relaxed text-starlight/75">
                      <div>
                        <span className="block text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-1">
                          Cliente
                        </span>
                        <p>
                          <strong className="text-white font-semibold">{m.cliente}</strong>
                        </p>
                      </div>
                      <div>
                        <span className="block text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-1">
                          Reto
                        </span>
                        <p>{m.reto}</p>
                      </div>
                      <div>
                        <span className="block text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-1">
                          Resultados de Impacto
                        </span>
                        <ul className="flex flex-col gap-1.5">
                          {m.resultados.map((r) => (
                            <li key={r.destacado} className="flex gap-2">
                              <span className="text-orangeleader mt-0.5 shrink-0">▸</span>
                              <span>
                                <strong className="text-white font-semibold">{r.destacado}</strong>
                                {r.resto}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="block text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-1">
                          Despliegue Técnico
                        </span>
                        <p>{m.despliegue}</p>
                      </div>
                    </div>
                  </article>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
