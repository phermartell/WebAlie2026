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

              {/* Canales directos: WhatsApp o correo */}
              <motion.div variants={item} className="mt-12 pt-8 border-t border-white/10">
                <h3 className="text-xl md:text-2xl font-black uppercase text-white leading-snug">
                  Escríbenos por WhatsApp o correo
                </h3>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 text-left">
                  {/* Atención en Monterrey */}
                  <div className="glass-liquid rounded-[24px] p-5 sm:p-6 border border-white/10 bg-black/20 hover:border-white/20 transition-all flex flex-col justify-between gap-4">
                    <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orangeleader" aria-hidden="true" />
                      Atención en Monterrey
                    </h4>
                    <div className="flex flex-col gap-3 text-xs sm:text-sm font-mono">
                      <div>
                        <span className="text-xs text-starlight/60 uppercase tracking-widest block mb-1">
                          WhatsApp
                        </span>
                        <a
                          href="https://wa.me/528115545351"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orangeleader font-bold hover:text-tangerine hover:underline transition-colors"
                        >
                          811 554 5351
                        </a>
                      </div>
                      <div>
                        <span className="text-xs text-starlight/60 uppercase tracking-widest block mb-1">
                          Correo
                        </span>
                        <a
                          href="mailto:monterrey@aliedigital.com"
                          className="text-white font-medium hover:text-orangeleader hover:underline transition-colors break-all sm:break-normal"
                        >
                          monterrey@aliedigital.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Atención en Puebla */}
                  <div className="glass-liquid rounded-[24px] p-5 sm:p-6 border border-white/10 bg-black/20 hover:border-white/20 transition-all flex flex-col justify-between gap-4">
                    <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orangeleader" aria-hidden="true" />
                      Atención en Puebla
                    </h4>
                    <div className="flex flex-col gap-3 text-xs sm:text-sm font-mono">
                      <div>
                        <span className="text-xs text-starlight/60 uppercase tracking-widest block mb-1">
                          WhatsApp
                        </span>
                        <a
                          href="https://wa.me/522213279555"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orangeleader font-bold hover:text-tangerine hover:underline transition-colors"
                        >
                          221 327 9555
                        </a>
                      </div>
                      <div>
                        <span className="text-xs text-starlight/60 uppercase tracking-widest block mb-1">
                          Correo
                        </span>
                        <a
                          href="mailto:puebla@aliedigital.com"
                          className="text-white font-medium hover:text-orangeleader hover:underline transition-colors break-all sm:break-normal"
                        >
                          puebla@aliedigital.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


