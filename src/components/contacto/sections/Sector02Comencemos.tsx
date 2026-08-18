"use client";

import { motion } from "framer-motion";
import ContactoForm from "../ContactoForm";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Sector02Comencemos() {
  return (
    <section className="relative z-10 flex items-center justify-center px-4 md:px-8 pb-36 pt-10">
      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          {/* Badge flotante */}
          <motion.div variants={item} className="absolute -top-5 left-6 z-10">
            <span className="inline-block px-5 py-2 bg-orangeleader rounded-full text-xs md:text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(235,63,27,0.5)]">
              Terminal de Abordaje
            </span>
          </motion.div>

          {/* Tarjeta liquid glass */}
          <div className="relative glass-liquid rounded-[40px] p-7 md:p-12 overflow-hidden">
            {/* Glow de ignición naranja inferior */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(235,63,27,0.18),transparent_60%)]"
            />

            <div className="relative">
              <motion.h2
                variants={item}
                className="text-3xl md:text-4xl font-black uppercase text-white leading-[1.05]"
              >
                Comencemos tu proyecto
              </motion.h2>
              <motion.p
                variants={item}
                className="mt-4 text-base text-starlight/70 leading-relaxed font-light"
              >
                Completa la terminal de abordaje y calibra tu plan de vuelo. Nuestro equipo de
                misión analizará tu señal y preparará una trayectoria a la medida.
              </motion.p>

              <motion.div variants={item} className="mt-8">
                <ContactoForm />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


