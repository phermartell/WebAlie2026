"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { CASOS, METRICAS } from "../data";
import { Hud } from "../hud";
import { CountUp } from "../ui";

const AUTO_MS = 6000;

export default function Sector02Numeralia() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInView = useInView(carouselRef, { margin: "-80px" });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!carouselInView || !!shouldReduce) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 100 / (AUTO_MS / 60);
        if (next >= 100) {
          setCaseIndex((prev) => (prev + 1) % CASOS.length);
          return 0;
        }
        return next;
      });
    }, 60);
    return () => clearInterval(id);
  }, [carouselInView, shouldReduce]);

  const goTo = (i: number) => {
    setProgress(0);
    setCaseIndex(i);
  };
  const prev = () => goTo(caseIndex === 0 ? CASOS.length - 1 : caseIndex - 1);
  const next = () => goTo((caseIndex + 1) % CASOS.length);

  return (
    <section className="relative z-10 px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Columna fija (sticky) */}
          <div className="md:sticky md:top-28 self-start">
            <Hud>Métricas en Tiempo Real // Impacto en el Estado de Resultados</Hud>
            <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]">
              Números reales que moverán tu estado de resultados
            </h2>
            <p className="mt-6 text-starlight/60 leading-relaxed">
              Sin métricas de vanidad. El éxito de nuestra{" "}
              <strong className="text-white font-semibold">
                agencia digital impulsada por inteligencia artificial
              </strong>{" "}
              se mide en la aceleración comercial, la captación de prospectos calificados y la
              rentabilidad directa de las marcas que confían en nosotros.
            </p>
          </div>

          {/* Columna deslizante con contadores */}
          <div className="flex flex-col gap-5">
            {METRICAS.map((m, i) => (
              <motion.div
                key={m.titulo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass-liquid rounded-[28px] p-7 flex flex-col gap-4"
              >
                <CountUp
                  to={m.count}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orangeleader to-tangerine bg-clip-text text-transparent"
                />
                <h3 className="text-base font-black uppercase text-white leading-snug">{m.titulo}</h3>
                <p className="text-sm text-starlight/60 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Carrusel de historias de éxito con auto-avance */}
        <div className="mt-24">
          <p className="font-mono text-xs md:text-sm tracking-[0.3em] text-tangerine uppercase mb-6 text-center">
            Historias de Éxito // Casos Reales
          </p>
          <div ref={carouselRef} className="relative glass-liquid rounded-[32px] p-8 md:p-14 overflow-hidden">
            <div className="relative grid">
              {CASOS.map((c, i) => {
                const isActive = i === caseIndex;
                return (
                  <motion.div
                    key={c.titulo}
                    aria-hidden={!isActive}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 40 }}
                    transition={{ duration: 0.4 }}
                    className={`[grid-area:1/1] flex flex-col items-center gap-5 text-center ${
                      isActive ? "" : "pointer-events-none"
                    }`}
                  >
                    <span className="text-4xl md:text-6xl font-black bg-gradient-to-r from-tangerine to-orangeleader bg-clip-text text-transparent">
                      {c.valor}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black uppercase text-white">{c.titulo}</h3>
                    <p className="text-starlight/70 leading-relaxed max-w-3xl">{c.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 flex items-center justify-between gap-6">
              <button
                onClick={prev}
                aria-label="Caso anterior"
                className="w-12 h-12 rounded-full glass-liquid flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all cursor-pointer shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Indicadores de progreso segmentado */}
              <div className="flex flex-col items-center gap-3 flex-1 max-w-xs mx-auto">
                <div className="flex items-center gap-2 w-full">
                  {CASOS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Caso ${i + 1}`}
                      className="relative h-2 rounded-full overflow-hidden transition-all duration-500 cursor-pointer"
                      style={{ flexGrow: i === caseIndex ? 2.5 : 1, flexBasis: 0 }}
                    >
                      <span className="absolute inset-0 bg-white/15" />
                      {i === caseIndex && (
                        <span
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-orangeleader to-tangerine shadow-[0_0_10px_rgba(235,63,27,0.7)]"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                    </button>
                  ))}
                </div>
                <span className="font-mono text-xs tracking-[0.3em] text-white/50">
                  0{caseIndex + 1} / 0{CASOS.length}
                </span>
              </div>

              <button
                onClick={next}
                aria-label="Siguiente caso"
                className="w-12 h-12 rounded-full glass-liquid flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all cursor-pointer shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
