"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LeadForm from "@/components/LeadForm";
import { ShipMark } from "@/components/agencia/hud";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Capitulo03Cierre() {
  return (
    <section
      id="cierre-conversion"
      className="relative z-10 flex items-center justify-center px-4 md:px-8 pb-36 pt-8"
    >
      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative glass-liquid rounded-[50px] p-7 md:p-16 text-center shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Glow */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(235,63,27,0.18),transparent_60%)]"
          />

          <div className="relative">
            {/* Naves de acoplamiento */}
            <div className="flex items-center justify-center gap-6 mb-10" aria-hidden="true">
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="rotate-180">
                  <ShipMark size={64} floating={false} />
                </div>
              </motion.div>

              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  className="w-20 h-1.5 rounded-full bg-gradient-to-r from-orangeleader to-tangerine"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                <div className="w-12 h-1 rounded-full bg-white/25" />
              </div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <ShipMark size={64} floating={false} />
              </motion.div>
            </div>

            <motion.h2
              variants={item}
              className="text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]"
            >
              ¿Quieres resultados predecibles como estos en tu empresa?
            </motion.h2>

            <motion.p variants={item} className="mt-6 text-base text-starlight/75 leading-relaxed font-light">
              No construimos sitios web{" "}
              <strong className="text-white font-semibold">&quot;bonitos&quot;</strong> que nadie
              visita. Diseñamos activos digitales que multiplican la facturación de tu negocio.
            </motion.p>

            <motion.div variants={item} className="mt-10">
              <LeadForm />
            </motion.div>

            <motion.div variants={item} className="mt-10 flex flex-col items-center gap-4">
              <Link
                href="/servicios/"
                className="glass-l2 rounded-full h-14 px-10 font-black text-base uppercase tracking-widest text-white inline-flex items-center justify-center"
              >
                Explorar Servicios
              </Link>
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
