"use client";

import { motion } from "framer-motion";
import { Hud } from "../hud";

export default function Sector08CompromisoSocial() {
  return (
    <section className="relative z-10 px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative glass-liquid rounded-[40px] p-8 md:p-14 overflow-hidden border-amber-300/20"
        >
          {/* "Encendido de luz" cálido */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.14),transparent_55%)]"
          />

          <div className="relative">
            <Hud>Responsabilidad Social // Impacto Humano Real</Hud>
            <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]">
              Tenemos compromiso social: apoyo a fundaciones sin ánimo de lucro
            </h2>

            <div className="mt-8 space-y-6 text-starlight/70 leading-relaxed">
              <p>
                Tenemos compromiso social, es por ello que ayudamos a fundaciones sin ánimo de
                lucro. Desde el 2023 nos dimos a la tarea de construir para Taller IMAGINA una
                tienda en línea y ayudarlos a comercializar sus productos.
              </p>
              <p>
                Taller IMAGINA es un Programa para la Vida y el Trabajo (PROVYT) en donde trabajan
                en conjunto con jóvenes con parálisis cerebral, desarrollando sus talentos y
                realizando actividades laborales que les permiten lograr su máximo nivel de
                autonomía en el ámbito productivo y social.
              </p>
              <p>
                Forman parte de la gran familia del Instituto Nuevo Amanecer A.B.P. donde se brinda
                atención integral a personas con Parálisis Cerebral.
              </p>
              <p>
                Cuentan con tres áreas principales: serigrafía, arte y maquila. En nuestro taller
                creemos que:
              </p>
            </div>

            <blockquote className="mt-8 border-l-2 border-amber-300/60 pl-6 text-lg md:text-xl text-amber-100/90 italic leading-relaxed">
              &quot;Los días no se cuentan como números, sino como oportunidades para despertar y
              alcanzar tus objetivos&quot;.
            </blockquote>

            <p className="mt-8 text-starlight/70 leading-relaxed">
              Es por eso que ejecutamos con amor este catálogo que tienes en tus manos, para
              demostrarte que nada es imposible cuando tienes la pasión para seguir tus sueños.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
