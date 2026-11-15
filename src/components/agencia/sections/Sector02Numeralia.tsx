"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROYECTOS_AGENCIA } from "../data";
import { Hud } from "../hud";
import { SpotlightCard } from "../ui";

export default function Sector02Numeralia() {
  return (
    <section className="relative z-10 px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Hud>PROYECTOS REALIZADOS</Hud>
          <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]">
            Cómo trabajamos con distintos negocios
          </h2>
          <p className="mt-6 text-starlight/60 leading-relaxed font-light">
            Explora proyectos de catálogo industrial, captación mayorista y comercio electrónico. En cada ficha puedes consultar qué necesitaba el cliente y qué implementamos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROYECTOS_AGENCIA.map((p, i) => (
            <motion.div
              key={p.titulo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
            >
              <SpotlightCard className="glass-liquid rounded-[28px] p-7 md:p-8 flex flex-col justify-between gap-6 h-full">
                <div>
                  <span className="font-mono text-xs tracking-[0.25em] text-orangeleader uppercase">
                    PROYECTO 0{i + 1}
                  </span>
                  <h3 className="mt-3 text-xl md:text-2xl font-black uppercase text-white leading-snug">
                    {p.titulo}
                  </h3>
                  <p className="mt-4 text-sm text-starlight/70 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orangeleader hover:text-tangerine transition-colors group/link cursor-pointer"
                  >
                    <span>Ver ficha del proyecto</span>
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                  </Link>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Enlace al pie */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/casos-de-exito"
            className="w-full sm:w-auto glass-l2 rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest text-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all"
          >
            Ver todos los casos de éxito
          </Link>
        </div>
      </div>
    </section>
  );
}
