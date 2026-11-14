"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import LeadForm from "@/components/LeadForm";

const stats = [
  { value: "Técnica", label: "Estructura y rastreo", tech: "BASE DEL SITIO" },
  { value: "Contenido", label: "Búsquedas de tus clientes", tech: "RELEVANCIA" },
  { value: "Local", label: "Presencia en tu zona", tech: "UBICACIÓN" },
  { value: "Medición", label: "Seguimiento de avances", tech: "EVALUACIÓN" }
];

const seoWork = [
  {
    num: "01",
    tag: "SISTEMA DE PRECISIÓN",
    title: "Contenido para buscadores y respuestas con IA",
    desc: "Organizamos la información de tu negocio para que sea clara, útil y fácil de interpretar por buscadores y herramientas de consulta con IA. La aparición o recomendación de tu marca depende de cada plataforma y no está garantizada.",
    items: [
      "Revisión de preguntas relacionadas con tu oferta",
      "Organización de respuestas claras y útiles",
      "Consistencia de la información sobre tu empresa",
      "Datos estructurados cuando correspondan",
      "Seguimiento de menciones cuando puedan verificarse"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8" // Asymmetric Grid
  },
  {
    num: "02",
    tag: "INFRAESTRUCTURA",
    title: "SEO técnico",
    desc: "Revisamos los aspectos técnicos que pueden dificultar que los buscadores encuentren e interpreten tu sitio. Priorizamos las mejoras según su impacto y las posibilidades de tu plataforma.",
    items: [
      "Revisión de rastreo e indexación",
      "Detección de errores y redirecciones",
      "Revisión de velocidad y experiencia de página"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "MÉTRICA ON-PAGE",
    title: "Optimización de páginas",
    desc: "Ajustamos tus páginas para explicar mejor tus productos o servicios y responder a lo que buscan tus posibles clientes. Trabajamos títulos, encabezados y contenidos con una estructura clara.",
    items: [
      "Optimización de títulos y descripciones",
      "Organización de encabezados y enlaces internos",
      "Contenidos alineados con la intención de búsqueda"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "FUERZA DE GRAVEDAD",
    title: "Estrategia de contenidos",
    desc: "Identificamos los temas y preguntas que ayudan a tus posibles clientes a conocer tu oferta. Planeamos contenidos relacionados con tus productos o servicios y con las distintas etapas de su decisión de compra.",
    items: [
      "Investigación de temas y preguntas de tus clientes",
      "Organización de contenidos por productos o servicios",
      "Planeación de nuevas páginas y artículos",
      "Publicación según el alcance acordado"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "05",
    tag: "AUTORIDAD",
    title: "Referencias y presencia externa",
    desc: "Revisamos cómo aparece tu empresa en otros sitios y detectamos oportunidades de obtener referencias relevantes para tu sector. Priorizamos la calidad y la relación con tu negocio.",
    items: [
      "Revisión de enlaces y menciones existentes",
      "Identificación de sitios relevantes para tu sector",
      "Propuestas de colaboración y difusión"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-6"
  },
  {
    num: "06",
    tag: "CONQUISTA LOCAL",
    title: "SEO local y Google Maps",
    desc: "Ayudamos a presentar tu negocio en búsquedas relacionadas con tu ubicación y zona de servicio. Revisamos tu Perfil de Negocio de Google y la consistencia de tus datos en los canales correspondientes.",
    items: [
      "Revisión del Perfil de Negocio de Google",
      "Consistencia de nombre, dirección y teléfono",
      "Contenidos relacionados con tu zona de servicio"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-6"
  }
];

const monthlyPlan = [
  {
    week: "Etapa 1",
    title: "Revisamos tu sitio y tu mercado",
    desc: "Analizamos la estructura, los contenidos y las búsquedas relacionadas con tu oferta para identificar oportunidades de mejora.",
    status: "PUNTO DE PARTIDA",
    metric: "DIAGNÓSTICO"
  },
  {
    week: "Etapa 2",
    title: "Definimos el plan de trabajo",
    desc: "Acordamos las páginas, los ajustes y los contenidos que se trabajarán, junto con las responsabilidades y los tiempos del proyecto.",
    status: "ALCANCE ACORDADO",
    metric: "PRIORIDADES"
  },
  {
    week: "Etapa 3",
    title: "Aplicamos las mejoras",
    desc: "Realizamos los ajustes técnicos y de contenido acordados, coordinando contigo los accesos, la información y las revisiones necesarias.",
    status: "TRABAJO EN CURSO",
    metric: "IMPLEMENTACIÓN"
  },
  {
    week: "Etapa 4",
    title: "Revisamos avances y siguientes acciones",
    desc: "Compartimos el trabajo realizado y revisamos los datos disponibles de visibilidad, visitas y consultas para orientar las siguientes acciones.",
    status: "REVISIÓN DE AVANCES",
    metric: "SEGUIMIENTO"
  }
];

export default function SeoPageClient() {
  return (
    <div className="relative z-10 w-full overflow-x-hidden">
      
      {/* Nave lateral ligada al scroll */}
      <OrbitalPath />

      {/* 🚀 Hero Section - Propuesta Abierta, Espacial e Inmersiva */}
      <section className="relative pt-48 pb-32 px-6 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Soft Background Brand Glow & Orbital HUD decoration */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(235,63,27,0.06),transparent_60%)] pointer-events-none" />
        
        {/* Rotating concentric tech circles in the background */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/[0.02] -z-10 animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-dashed border-white/[0.015] -z-10 animate-[spin_40s_linear_infinite_reverse]" />

        {/* Ambient watermark */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 select-none pointer-events-none text-[15vw] font-black tracking-[0.12em] text-white/[0.012] leading-none uppercase font-sans">
          SEO
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl relative z-10"
        >
          <div className="flex justify-center mb-6">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest hover:text-orangeleader transition-colors"
            >
              ← Ver servicios
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-orangeleader text-xs font-black tracking-[0.5em] uppercase">
              POSICIONAMIENTO SEO
            </span>
            <span className="px-3 py-1 rounded-full border border-orangeleader/30 bg-orangeleader/10 text-xs font-black text-orangeleader uppercase tracking-wider">
              ESTRATEGIA Y OPTIMIZACIÓN
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase text-white leading-[0.95] tracking-tight mb-8">
            SEO para que<br />
            <span className="text-white block mt-2">
              encuentren tu negocio
            </span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-starlight/70 leading-relaxed font-light max-w-2xl mx-auto">
            Mejoramos la estructura y los contenidos de tu sitio para aumentar su visibilidad cuando las personas buscan tus productos o servicios. Definimos prioridades de trabajo según tu oferta, tu mercado y el estado actual de tu página.
          </p>

          <div className="mt-12 flex justify-center flex-wrap gap-2.5">
            {["Revisión técnica", "Palabras clave", "Contenidos", "SEO local", "Medición"].map((badge, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#eb3f1b]/5 border border-[#eb3f1b]/20 text-orangeleader"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/contacto"
              className="inline-block bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full px-8 py-4 font-black text-sm uppercase tracking-widest transition-all cursor-pointer shadow-[0_10px_30px_rgba(235,63,27,0.4)] hover:scale-105 active:scale-95"
            >
              Consultar SEO →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 📊 Numeralia Section - Estilo Módulos de Telemetría Glíptica */}
      <section className="pb-24 px-6 max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="glass-liquid rounded-2xl border border-white/10 p-6 flex flex-col justify-between items-start gap-4 relative overflow-hidden backdrop-blur-md bg-white/[0.01] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] group hover:border-white/20 transition-all duration-300"
            >
              {/* Corner tech brackets */}
              <span className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/15 group-hover:border-orangeleader/45 transition-colors" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/15 group-hover:border-orangeleader/45 transition-colors" />
              <span className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/15 group-hover:border-orangeleader/45 transition-colors" />
              <span className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/15 group-hover:border-orangeleader/45 transition-colors" />

              <div className="flex w-full justify-between items-start">
                <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orangeleader to-[#ff8643] bg-clip-text text-transparent tracking-tight drop-shadow-[0_4px_12px_rgba(235,63,27,0.15)]">
                  {s.value}
                </span>
                <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest pl-1 mt-1">
                  {s.tech}
                </span>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-xs font-black uppercase text-white tracking-wider leading-none">
                  {s.label}
                </h4>
                <span className="font-mono text-[10px] text-orangeleader/50 uppercase tracking-widest block">
                  ÁREAS DE TRABAJO SEO
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🛰️ Desglose del Servicio - Asymmetric Bento Grid (100% SEO Friendly) */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">SERVICIO DE POSICIONAMIENTO SEO</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Qué trabajamos en tu sitio
          </h2>
          <div className="h-0.5 w-16 bg-orangeleader/40 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {seoWork.map((w, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`${w.colSpan}`}
            >
              <SpotlightCard
                className="glass-liquid rounded-[32px] border border-white/10 p-8 md:p-10 flex flex-col justify-between h-full hover:border-white/20 transition-all duration-300 relative overflow-hidden"
              >
                {/* Background soft glow per card */}
                <div
                  className="absolute inset-0 -z-10 pointer-events-none transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at top right, ${w.bgGlow}, transparent 60%)` }}
                />

                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-3xl font-mono font-black text-white/10 leading-none">{w.num}</span>
                    <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-starlight/40 uppercase tracking-widest">
                      {w.tag}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight leading-snug">
                    {w.title}
                  </h3>

                  <p className="text-starlight/75 text-sm md:text-base font-light leading-relaxed">
                    {w.desc}
                  </p>

                  <div className="space-y-3.5 pt-4 border-t border-white/5">
                    {w.items.map((item, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2.5 text-xs text-starlight/60">
                        <span className="text-orangeleader mt-0.5">✦</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🗺️ El Cambio de Órbita - El Manual del 2026 */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto border-t border-white/[0.04] relative z-10">
        <div className="mb-20">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">CÓMO ENFOCAMOS EL SEO</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Una estrategia centrada en tus clientes
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl leading-relaxed">
            Trabajamos para que tu sitio responda preguntas relevantes, presente información confiable y facilite conocer tu oferta. Estas son las prioridades que orientan las mejoras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "RESPUESTAS ÚTILES",
              subtitle: "Resuelve las dudas antes del contacto",
              desc: "Organizamos información sobre tus productos, servicios y procesos para ayudar a las personas a evaluar si tu negocio ofrece lo que necesitan.",
              glow: "rgba(235,63,27,0.04)"
            },
            {
              title: "INFORMACIÓN CONSISTENTE",
              subtitle: "Presenta tu empresa con claridad",
              desc: "Revisamos que la información sobre tu negocio sea coherente en las páginas y perfiles que forman parte del trabajo acordado.",
              glow: "rgba(255,255,255,0.01)"
            },
            {
              title: "CONFIANZA",
              subtitle: "Respalda lo que dices",
              desc: "Incorporamos experiencia, proyectos y credenciales que tu empresa pueda acreditar para ayudar a tus posibles clientes a conocer tu trabajo.",
              glow: "rgba(255,255,255,0.01)"
            },
            {
              title: "EXPERIENCIA DE NAVEGACIÓN",
              subtitle: "Facilita encontrar información",
              desc: "Revisamos la organización y el rendimiento de las páginas para detectar obstáculos que dificulten consultar tu oferta o ponerse en contacto.",
              glow: "rgba(255,255,255,0.01)"
            },
            {
              title: "RELEVANCIA COMERCIAL",
              subtitle: "Relaciona las búsquedas con tu oferta",
              desc: "Priorizamos temas y páginas relacionados con lo que vendes, las necesidades de tus clientes y las zonas que atiendes.",
              glow: "rgba(235,63,27,0.04)"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-liquid rounded-3xl border border-white/5 p-6 flex flex-col justify-between min-h-[220px] relative overflow-hidden"
            >
              <div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${item.glow}, transparent 55%)` }}
              />
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-orangeleader uppercase block">
                  {item.title}
                </span>
                <h3 className="text-lg font-black uppercase text-white tracking-tight leading-snug">
                  {item.subtitle}
                </h3>
                <p className="text-starlight/60 text-xs md:text-sm font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🗺️ Plan Mensual - Bitácora de Vuelo Horizontal (Experiencial y Único) */}
      <section className="py-24 px-6 md:px-8 max-w-5xl mx-auto border-t border-white/[0.04] relative z-10">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">PROCESO DE TRABAJO</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Cómo trabajamos el SEO de tu negocio
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Partimos del estado de tu sitio y de tus objetivos comerciales para definir prioridades. Organizamos las actividades y el seguimiento según el alcance contratado.
          </p>
        </div>

        {/* Flight Log / Table Row Layout */}
        <div className="space-y-4">
          {monthlyPlan.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-liquid rounded-3xl border border-white/5 hover:border-white/15 p-6 md:p-8 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Badge Column */}
                <div className="lg:col-span-3 flex flex-col items-start gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-orangeleader/15 text-orangeleader">
                    <span className="w-1.5 h-1.5 rounded-full bg-orangeleader" />
                    {p.week}
                  </div>
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block pl-2">
                    {p.metric}
                  </span>
                </div>

                {/* Core Description Column */}
                <div className="lg:col-span-6 space-y-1">
                  <h3 className="text-lg md:text-xl font-black uppercase text-white tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-starlight/60 text-xs md:text-sm font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                {/* Diagnostics Status Column */}
                <div className="lg:col-span-3 lg:text-right">
                  <span className="inline-block rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] font-mono text-[#bef264]/80 tracking-widest uppercase">
                    {p.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto relative z-10">
          <div className="rounded-2xl border border-white/[0.05] bg-[#0d0d0f]/60 p-6">
            <p className="text-starlight/60 text-sm">
              El SEO requiere seguimiento. Los tiempos y resultados varían según el estado del sitio, la competencia y las acciones implementadas.
            </p>
          </div>
        </div>
      </section>

      {/* 🏆 Caso de Éxito Destacado - MORECSA */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto border-t border-white/[0.04] relative z-10">
        <div className="mb-16 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">PROYECTO SEO</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            MORECSA: presencia en búsquedas de productos
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Un proyecto enfocado en organizar un catálogo industrial y mejorar la visibilidad de sus productos en buscadores.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Detalles del Caso */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="glass-liquid rounded-3xl border border-white/5 p-8 flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(235,63,27,0.04),transparent_60%)] pointer-events-none" />
              
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-orangeleader/15 text-orangeleader">
                  SECTOR INDUSTRIAL
                </div>

                <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                  Búsquedas relacionadas con su catálogo
                </h3>

                <p className="text-starlight/75 text-sm leading-relaxed font-light">
                  El trabajo se centró en la estructura del sitio y los contenidos relacionados con productos del catálogo de MORECSA.
                </p>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-orangeleader">Enfoque del proyecto</h4>
                    <p className="text-starlight/60 text-xs mt-1 leading-relaxed">
                      Revisión técnica, organización de páginas y optimización de contenidos para búsquedas relacionadas con su oferta.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-orangeleader">Consulta incluida en el reporte</h4>
                    <p className="text-white text-sm font-bold mt-1">
                      &quot;bombas sumergibles en puebla&quot;
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <div className="flex items-start gap-2.5 text-xs text-starlight/60">
                    <span className="text-orangeleader mt-0.5">✦</span>
                    <span>Organización de páginas de productos</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-starlight/60">
                    <span className="text-orangeleader mt-0.5">✦</span>
                    <span>Contenidos relacionados con búsquedas del sector</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-starlight/60">
                    <span className="text-orangeleader mt-0.5">✦</span>
                    <span>Seguimiento de visibilidad y tráfico orgánico</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posicionamiento de Palabras Clave */}
          <div className="lg:col-span-7">
            <div className="glass-liquid rounded-3xl border border-white/5 p-6 flex flex-col justify-between h-full relative overflow-hidden">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-orangeleader uppercase block">
                  REPORTE DE CONSULTAS
                </span>
                <h4 className="text-lg font-black uppercase text-white tracking-tight">
                  Búsquedas registradas
                </h4>
                <p className="text-starlight/60 text-xs font-light leading-relaxed">
                  La captura presenta consultas, impresiones y posiciones promedio. El periodo y los filtros no aparecen en la imagen.
                </p>
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 group mt-4">
                  <Image
                    src="/casos/morecsa/morecsa-kw.webp"
                    alt="Posicionamiento de Palabras Clave MORECSA"
                    width={700}
                    height={400}
                    className="w-full h-auto object-cover opacity-90 transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Evolución del Tráfico */}
        <div className="mt-8">
          <div className="glass-liquid rounded-3xl border border-white/5 p-8 relative overflow-hidden">
            <div className="mb-6">
              <span className="text-[10px] font-mono tracking-widest text-orangeleader uppercase block">
                ADQUISICIÓN DE TRÁFICO
              </span>
              <h4 className="text-lg font-black uppercase text-white tracking-tight mt-1">
                Registros de sesiones por canal
              </h4>
              <p className="text-starlight/60 text-xs font-light leading-relaxed mt-1">
                Las capturas distinguen las sesiones de búsqueda orgánica de otros canales. Al no mostrar fechas, no permiten comparar periodos equivalentes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Registro 1", img: "/casos/morecsa/morecsa-1.webp", desc: "Organic Search: 679 sesiones en la captura." },
                { title: "Registro 2", img: "/casos/morecsa/morecsa-2.webp", desc: "Organic Search: 2 mil sesiones en la captura." },
                { title: "Registro 3", img: "/casos/morecsa/morecsa-3.webp", desc: "Organic Search: 4 mil sesiones en la captura." }
              ].map((phase, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden border border-white/5 bg-black/20 group">
                    <Image
                      src={phase.img}
                      alt={phase.title}
                      width={350}
                      height={200}
                      className="w-full h-auto object-cover opacity-80 transition-transform duration-500 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold uppercase text-white tracking-wider">{phase.title}</h5>
                    <p className="text-xs md:text-sm text-starlight/60 mt-1.5 leading-relaxed font-light">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 📦 Configuraciones de Misión - Paquetes SEO sin Precios */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto border-t border-white/[0.04] relative z-10">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">OPCIONES DE SERVICIO</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Encuentra el enfoque para tu proyecto
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Tu sitio puede necesitar mejoras puntuales o un trabajo continuo. Cuéntanos qué buscas para definir las actividades, la inversión y los tiempos adecuados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {[
            {
              indicator: "ENFOQUE 01",
              name: "Revisión y mejoras iniciales",
              desc: "Para empresas que necesitan conocer el estado de su sitio y atender las prioridades de SEO.",
              items: [
                "Revisión técnica y de contenidos",
                "Identificación de páginas prioritarias",
                "Propuesta de ajustes iniciales",
                "Alcance e inversión según diagnóstico"
              ],
              cta: "Consultar revisión →",
              glow: "rgba(255,255,255,0.01)",
              border: "border-white/5"
            },
            {
              indicator: "ENFOQUE 02",
              name: "SEO continuo",
              desc: "Para negocios que buscan trabajar de forma periódica en la visibilidad de sus productos o servicios.",
              items: [
                "Plan de actividades según prioridades",
                "Optimización de páginas y contenidos",
                "Seguimiento de datos disponibles",
                "Revisión de avances y siguientes acciones"
              ],
              cta: "Consultar SEO continuo →",
              glow: "rgba(235,63,27,0.05)",
              border: "border-orangeleader/30"
            },
            {
              indicator: "ENFOQUE 03",
              name: "Proyecto a medida",
              desc: "Para sitios con necesidades específicas por su catálogo, estructura o zonas de servicio.",
              items: [
                "Revisión de necesidades particulares",
                "Definición de páginas y áreas de trabajo",
                "Coordinación de requisitos técnicos",
                "Propuesta de entregables y calendario"
              ],
              cta: "Consultar proyecto →",
              glow: "rgba(255,255,255,0.01)",
              border: "border-white/5"
            }
          ].map((pack, idx) => (
            <div
              key={idx}
              className={`glass-liquid rounded-3xl border ${pack.border} p-8 flex flex-col justify-between relative overflow-hidden`}
            >
              <div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${pack.glow}, transparent 60%)` }}
              />

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest text-starlight/40 uppercase">
                    {pack.indicator}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight">
                    {pack.name}
                  </h3>
                  <p className="text-starlight/50 text-xs leading-relaxed">
                    {pack.desc}
                  </p>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                <ul className="space-y-3">
                  {pack.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2 text-xs text-starlight/75">
                      <span className="text-orangeleader font-mono mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="/contacto"
                  className="block text-center py-3.5 px-6 rounded-full font-black text-xs uppercase tracking-widest border border-white/10 text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                >
                  {pack.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🧭 CTA final */}
      <section className="py-24 px-6 md:px-8 max-w-4xl mx-auto text-center relative z-10 mb-20">
        <div className="glass-liquid rounded-[40px] border border-white/10 p-8 md:p-16 space-y-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(235,63,27,0.08),transparent_60%)] pointer-events-none" />
          
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">HABLEMOS DE TU SITIO</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight leading-none">
            ¿Quieres mejorar la visibilidad de tu negocio?
          </h2>
          <p className="text-starlight/75 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Cuéntanos qué productos o servicios ofreces y comparte la dirección de tu sitio. Conversaremos sobre tus objetivos para definir cómo podemos ayudarte con SEO.
          </p>
          <div className="pt-4 max-w-lg mx-auto">
            <LeadForm servicioInteres="Posicionamiento SEO" submitLabel="Solicitar información" />
          </div>
        </div>
      </section>

    </div>
  );
}
