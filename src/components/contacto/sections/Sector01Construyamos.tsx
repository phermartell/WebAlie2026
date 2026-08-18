"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SpotlightCard } from "@/components/agencia/ui";
import { useChatModal } from "@/components/ChatModalContext";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* Íconos de plataforma (mismos que ChatWidget) */
function MessengerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.24 0 0 4.952 0 11.64c0 3.499 1.434 6.521 3.769 8.61a.96.96 0 0 1 .322.684l.066 2.136a.96.96 0 0 0 1.346.849l2.382-1.05a.96.96 0 0 1 .64-.047c1.132.308 2.3.462 3.475.462 6.76 0 12-4.952 12-11.64S18.76 0 12 0Zm7.206 8.956-3.525 5.594a1.8 1.8 0 0 1-2.603.48l-2.803-2.103a.72.72 0 0 0-.868.002l-3.786 2.874c-.505.384-1.165-.221-.827-.758l3.525-5.593a1.8 1.8 0 0 1 2.603-.48l2.803 2.103a.72.72 0 0 0 .868-.002l3.786-2.874c.505-.384 1.165.221.827.758Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Sector01Construyamos() {
  const openSocial = useChatModal();

  return (
    <section className="relative z-10 px-4 md:px-8 pt-36 pb-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl w-full mx-auto text-center"
      >
        <motion.h1
          variants={item}
          className="mt-6 text-4xl md:text-6xl font-black uppercase text-white leading-[1.02] tracking-tight"
        >
          Construyamos{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orangeleader to-tangerine">
            algo genial
          </span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-8 text-base md:text-lg text-starlight/75 leading-relaxed font-light space-y-5"
        >
          <p>
            Prepara tu nave para el despegue. En{" "}
            <strong className="text-white font-semibold">Alié Digital</strong> trabajamos{" "}
            <em className="text-starlight/90 not-italic font-medium">
              &quot;Por un mundo lleno de marcas increíbles&quot;
            </em>
            . Sabemos que el espacio digital está lleno de agujeros negros: agencias que
            secuestran dominios, códigos obsoletos y sitios abandonados a su suerte.
          </p>
          <div className="flex items-center justify-center gap-4 text-orangeleader font-semibold">
            <span>Sueña grande</span>
            <span className="h-px w-8 bg-orangeleader" />
            <span>Llega lejos</span>
          </div>
        </motion.div>

        {/* Módulo integrado: Chatea con Alice */}
        <motion.div variants={item} className="mt-12">
          <SpotlightCard className="glass-liquid rounded-[28px] p-6 md:p-8 text-left transition-transform duration-500 hover:scale-[1.02]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative shrink-0">
                <Image
                  src="/ilustraciones/botalice.webp"
                  alt="Alice — Oficial de Inteligencia"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full border-2 border-orangeleader/50 object-cover"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-deepspace rounded-full" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-black uppercase text-white leading-snug">
                  Chatea con Alice
                </h3>
                <p className="text-xs text-orangeleader font-semibold tracking-tight mt-1">
                  Oficial de Inteligencia en Órbita
                </p>
                <p className="mt-3 text-base text-starlight/70 leading-relaxed font-light">
                  ¿Necesitas respuestas rápidas antes de iniciar la secuencia de despegue? Alice
                  es nuestra Inteligencia Artificial en guardia permanente. Escríbele para obtener
                  información inmediata sobre{" "}
                  <strong className="text-white font-semibold">
                    precios aproximados, servicios y tiempos de entrega
                  </strong>
                  .
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => openSocial("facebook")}
                className="flex flex-1 items-center justify-between gap-3 rounded-full bg-[#1877F2] hover:bg-[#0e5fd0] px-5 py-3 text-white transition-all cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <MessengerIcon className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-black uppercase tracking-wide leading-tight text-left">
                    Messenger
                  </span>
                </span>
                <span aria-hidden className="text-lg leading-none shrink-0">→</span>
              </button>
              <button
                type="button"
                onClick={() => openSocial("instagram")}
                className="flex flex-1 items-center justify-between gap-3 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F58529] hover:opacity-90 px-5 py-3 text-white transition-all cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <InstagramIcon className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-black uppercase tracking-wide leading-tight text-left">
                    Instagram
                  </span>
                </span>
                <span aria-hidden className="text-lg leading-none shrink-0">→</span>
              </button>
            </div>
          </SpotlightCard>
        </motion.div>
      </motion.div>
    </section>
  );
}

