"use client";

import { motion } from "framer-motion";
import { Hud } from "../hud";
import { TiltCard } from "../ui";

export default function Sector04Manifiesto() {
  return (
    <section className="relative z-10 px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Hud>Principios de Navegación // Nuestra Doctrina</Hud>
          <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]">
            Nuestra filosofía: éxito compartido y pasión por crecer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 [perspective:1200px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <TiltCard className="glass-liquid rounded-[32px] p-10 md:p-12 h-full">
              <span className="font-mono text-xs tracking-[0.3em] text-orangeleader uppercase">
                Módulo A
              </span>
              <h3 className="mt-4 text-2xl md:text-3xl font-black uppercase text-white">
                Éxito Compartido
              </h3>
              <p className="mt-5 text-starlight/70 leading-relaxed">
                Creemos firmemente que si a nuestros clientes les va bien, a nosotros nos va bien.
                No buscamos transacciones de una sola vez ni contratos inflados. Construimos
                relaciones comerciales a largo plazo donde nuestro indicador clave de rendimiento es
                el impacto real en las oportunidades de negocio y ventas de tu empresa.
              </p>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TiltCard className="glass-liquid rounded-[32px] p-10 md:p-12 h-full">
              <span className="font-mono text-xs tracking-[0.3em] text-tangerine uppercase">
                Módulo B
              </span>
              <h3 className="mt-4 text-2xl md:text-3xl font-black uppercase text-white">
                Creemos en los Sueños
              </h3>
              <p className="mt-5 text-starlight/70 leading-relaxed">
                Creemos en los sueños y amamos ayudar a las marcas a soñar; de ahí nuestro eslogan{" "}
                <strong className="text-white font-semibold">&quot;Sueña grande, llega lejos&quot;</strong>.
                Acompañamos a pequeñas y medianas empresas a proyectar una imagen imponente, dándoles
                acceso a la misma infraestructura de alta gama que utilizan los grandes corporativos
                para competir y dominar su mercado.
              </p>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
