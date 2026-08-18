"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import LeadForm from "@/components/LeadForm";

const stats = [
  { value: "10+", label: "Clientes en Órbita", tech: "SYS: RANKED" },
  { value: "3×", label: "Aumento de Tráfico", tech: "RAD: SENSITIVITY" },
  { value: "6 meses", label: "Tránsito a Pág. 1", tech: "ORBIT: COMPLETE" },
  { value: "40+", label: "Señales Monitoreadas", tech: "TLM: ACTIVE" }
];

const seoWork = [
  {
    num: "01",
    tag: "SISTEMA DE PRECISIÓN",
    title: "AI Search Optimization (AI SEO)",
    desc: "ChatGPT, Perplexity y las búsquedas con IA de Google están respondiendo las preguntas directamente. Diseñamos la estructura técnica de tus contenidos para que los modelos de lenguaje (LLMs) extraigan tus datos y los citen como la recomendación oficial.",
    items: [
      "Optimización para resúmenes de IA de Google",
      "Estrategia de citación en ChatGPT y Perplexity",
      "Modelado de entidades y grafo de conocimiento B2B",
      "Implementación técnica de llms.txt",
      "Estructuración de contenido para extracción de datos por IA"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8" // Asymmetric Grid
  },
  {
    num: "02",
    tag: "INFRAESTRUCTURA",
    title: "SEO Técnico",
    desc: "Reparamos los fallos técnicos invisibles que matan tu autoridad: Core Web Vitals, sitemaps, redirecciones, códigos de rastreo y marcado Schema.",
    items: [
      "Velocidad de carga y Core Web Vitals (LCP, INP, CLS)",
      "Marcado de datos estructurados Schema.org",
      "Optimización de rastreabilidad e indexación"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "MÉTRICA ON-PAGE",
    title: "Optimización On-Page",
    desc: "Optimizamos cada elemento visible dentro de tus páginas clave (títulos, encabezados H1-H3, enlaces internos e intenciones de búsqueda) para maximizar la lectura de Google.",
    items: [
      "Optimización de metaetiquetas de título y descripción",
      "Jerarquía de encabezados semánticos (H1–H3)",
      "Alineación de contenidos con la intención de búsqueda"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "FUERZA DE GRAVEDAD",
    title: "Estrategia de Contenidos B2B",
    desc: "Google recompensa la autoridad temática profunda. Creamos estrategias de contenidos basadas en pilares y subtemas para demostrar expertise en tu nicho y capturar búsquedas de alta intención de compra.",
    items: [
      "Creación mensual de contenidos gestionada",
      "Estrategia de autoridad y clusters temáticos",
      "Modelado de páginas pilares y ramificaciones",
      "Calendario editorial y gestión de publicaciones"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "05",
    tag: "AUTORIDAD",
    title: "Link Building Seguro",
    desc: "Los enlaces desde sitios externos son el pilar de autoridad más fuerte para Google. Ejecutamos campañas seguras de relaciones públicas digitales para conseguir referencias de alta calidad.",
    items: [
      "Campañas de relaciones públicas para medios digitales",
      "Menciones editoriales y publicaciones invitadas",
      "Auditoría y desautorización de enlaces tóxicos"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-6"
  },
  {
    num: "06",
    tag: "CONQUISTA LOCAL",
    title: "Local SEO & Google Maps",
    desc: "Para marcas con mercados regionales, aparecer en el mapa de Google es la principal fuente de prospectos comerciales. Optimizamos tu ficha de Google Business e impulsamos tus menciones locales.",
    items: [
      "Optimización completa del Perfil de Negocio de Google",
      "Creación de directorios locales consistentes (NAP)",
      "Estrategias de reputación y fomento de reseñas"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-6"
  }
];

const monthlyPlan = [
  {
    week: "Semana 1",
    title: "Escaneo Técnico y Análisis de Gaps",
    desc: "Auditoría SEO técnica completa y mapeo de brechas de palabras clave respecto a tu competencia.",
    status: "ESCANEO RADAR: OK",
    metric: "COORD // 88.02.18"
  },
  {
    week: "Semana 2",
    title: "Ajustes Estructurales en Nave Madre",
    desc: "Implementación de los primeros cambios técnicos prioritarios, Schema y optimizaciones de velocidad.",
    status: "ESTRUCTURA: EN LÍNEA",
    metric: "LATENCY // 12MS"
  },
  {
    week: "Semana 3",
    title: "Propulsión de Contenido y Enlaces",
    desc: "Publicación de los primeros artículos estratégicos y arranque de campañas para adquirir menciones.",
    status: "PROPULSORES: EN EJECUCIÓN",
    metric: "OUTREACH // SENT"
  },
  {
    week: "Semana 4",
    title: "Telemetría y Siguiente Plan de Vuelo",
    desc: "Envío de reportes de tráfico orgánico, monitoreo de palabras clave y llamada de planeación mensual.",
    status: "TELEMETRÍA: LISTO",
    metric: "COMPILATION // DONE"
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
              ← Módulos de Flota
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-orangeleader text-xs font-black tracking-[0.5em] uppercase">
              SEARCH ENGINE OPTIMIZATION
            </span>
            <span className="px-3 py-1 rounded-full border border-orangeleader/30 bg-orangeleader/10 text-xs font-black text-orangeleader uppercase tracking-wider">
              + AI SEO
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase text-white leading-[0.95] tracking-tight mb-8">
            POSICIONA EN GOOGLE.<br />
            <span className="text-transparent block mt-2" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.75)" }}>
              APARECE EN LA IA.
            </span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-starlight/70 leading-relaxed font-light max-w-2xl mx-auto">
            Bases de SEO tradicional para dominar buscadores, integradas con optimización de IA para que los asistentes inteligentes te citen como referencia en ChatGPT, Perplexity y las Resúmenes de IA.
          </p>

          <div className="mt-12 flex justify-center flex-wrap gap-2.5">
            {["Rankings en Google", "Citas en ChatGPT", "Perplexity AI", "Resúmenes de IA", "Estructuración llms.txt"].map((badge, idx) => (
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
              OBTÉN UNA AUDITORÍA SIN COSTO →
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
                  SYSTEM DIAGNOSTIC // ACTIVE
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🛰️ Desglose del Servicio - Asymmetric Bento Grid (100% SEO Friendly) */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">SISTEMAS DEL MÓDULO SEO</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Despliegue Técnico
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
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">EL MANUAL DE LA FLOTA</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            El SEO ha cambiado.<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.75)" }}>
              No vueles con brújulas viejas.
            </span>
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl leading-relaxed">
            La mayoría de las agencias siguen usando el manual del 2019. Esto es lo que realmente importa para dominar los radares de búsqueda en la actualidad:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Respuestas Directas (AI Overviews)",
              subtitle: "Responde directamente o serás ignorado.",
              desc: "La IA de Google ahora responde preguntas directamente en la cima de los resultados. Estructuramos tus datos para responder con precisión y captar menciones.",
              glow: "rgba(235,63,27,0.04)"
            },
            {
              title: "Citas en ChatGPT & Perplexity",
              subtitle: "Ser citado por LLMs es la nueva pág. 1.",
              desc: "Millones de usuarios consultan copilotos de IA en lugar de Google. Diseñamos la densidad semántica necesaria para que tu marca aparezca recomendada en las IA.",
              glow: "rgba(255,255,255,0.01)"
            },
            {
              title: "E-E-A-T Avanzado",
              subtitle: "Experiencia, Especialidad, Autoridad y Confianza.",
              desc: "Google penaliza el contenido de IA basura. Resaltamos las credenciales reales de tu equipo, datos de primera mano e indicadores reales para construir credibilidad.",
              glow: "rgba(255,255,255,0.01)"
            },
            {
              title: "Core Web Vitals Reales",
              subtitle: "LCP, INP y CLS son obligatorios.",
              desc: "La experiencia de página es un factor crítico. Maximizamos el rendimiento de tu código para pasar los umbrales exigentes del radar técnico de Google.",
              glow: "rgba(255,255,255,0.01)"
            },
            {
              title: "SEO de Entidades B2B",
              subtitle: "Google piensa en entidades, no en palabras clave.",
              desc: "Vinculamos conceptualmente tu marca a personas, lugares y conceptos clave del Grafo de Conocimiento para decirle a Google exactamente qué problemas resuelves.",
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
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">PLAN DE VUELO MENSUAL</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            La Secuencia Mensual
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            El SEO es un viaje constante: cada mes construimos bases sólidas y medimos los progresos para asegurar el despegue comercial.
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
              Y luego repetimos la secuencia — cada órbita se construye sobre la anterior.{" "}
              <strong className="text-white font-bold">Los rankings se acumulan. El tráfico se acumula. Los resultados se multiplican.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 🏆 Caso de Éxito Destacado - MORECSA */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto border-t border-white/[0.04] relative z-10">
        <div className="mb-16 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">Misión Cumplida</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Caso de Éxito: MORECSA
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Cómo logramos posicionar una comercializadora industrial líder en búsquedas transaccionales de alta intención de compra.
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
                  Posicionamiento de Alta Intención
                </h3>

                <p className="text-starlight/75 text-sm leading-relaxed font-light">
                  MORECSA requería posicionar su catálogo especializado frente a ingenieros, constructoras y tomadores de decisiones. La estrategia se centró en interceptar intenciones de compra específicas del sector.
                </p>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-orangeleader">Estrategia Táctica</h4>
                    <p className="text-starlight/60 text-xs mt-1 leading-relaxed">
                      SEO Técnico profundo combinado con optimización de arquitectura web e intención de búsqueda local para palabras clave de alta intención.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-orangeleader">Palabra Clave Insignia</h4>
                    <p className="text-white text-sm font-bold mt-1">
                      &quot;bombas sumergibles en puebla&quot; <span className="text-xs text-[#bef264]/80 font-mono">(TOP 1 GOOGLE)</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <div className="flex items-start gap-2.5 text-xs text-starlight/60">
                    <span className="text-orangeleader mt-0.5">✦</span>
                    <span>Crecimiento constante de tráfico orgánico altamente calificado.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-starlight/60">
                    <span className="text-orangeleader mt-0.5">✦</span>
                    <span>Captación directa de cotizaciones y leads comerciales B2B.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-starlight/60">
                    <span className="text-orangeleader mt-0.5">✦</span>
                    <span>Dominio en búsquedas de alta relevancia e intención transaccional.</span>
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
                  INDEXACIÓN Y RANKINGS
                </span>
                <h4 className="text-lg font-black uppercase text-white tracking-tight">
                  Palabras Clave Transaccionales Posicionadas
                </h4>
                <p className="text-starlight/60 text-xs font-light leading-relaxed">
                  Evidencia técnica de las posiciones de liderazgo en los motores de búsqueda logradas a través de nuestra estrategia SEO focalizada.
                </p>
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 group mt-4">
                  <img
                    src="/casos/morecsa/morecsa-kw.webp"
                    alt="Posicionamiento de Palabras Clave MORECSA"
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
                MÉTRICAS DE TRÁFICO
              </span>
              <h4 className="text-lg font-black uppercase text-white tracking-tight mt-1">
                Evolución del Tráfico Orgánico
              </h4>
              <p className="text-starlight/60 text-xs font-light leading-relaxed mt-1">
                Visualización de la trayectoria de crecimiento sostenido en visitas orgánicas a través de las fases consecutivas del proyecto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Fase de Crecimiento Inicial", img: "/casos/morecsa/morecsa-1.webp", desc: "Establecimiento de cimientos técnicos y saneamiento de arquitectura." },
                { title: "Fase de Aceleración", img: "/casos/morecsa/morecsa-2.webp", desc: "Alineación de contenidos con intenciones de búsqueda y tracción inicial." },
                { title: "Fase de Consolidación", img: "/casos/morecsa/morecsa-3.webp", desc: "Estabilización del liderazgo de visibilidad y flujo constante de clics." }
              ].map((phase, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden border border-white/5 bg-black/20 group">
                    <img
                      src={phase.img}
                      alt={phase.title}
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
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">PAQUETES ADAPTABLES</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Configuraciones de Misión
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Sin contratos forzosos. Elige la configuración que se adapte a tu altitud comercial y escala tu potencia a medida que llegan los resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {[
            {
              name: "Fase 01 - Inicialización",
              desc: "Para empresas listas para cimentar su base SEO técnica y local.",
              items: [
                "Auditoría técnica inicial completa",
                "Optimización On-Page (hasta 10 páginas clave)",
                "2 artículos estratégicos al mes",
                "Gestión de Perfil de Negocio en Google",
                "Reporte de rankings mensual",
                "Llamada mensual de estrategia"
              ],
              cta: "Iniciar Fase Inicial",
              glow: "rgba(255,255,255,0.01)",
              border: "border-white/5"
            },
            {
              name: "Fase 02 - Expansión",
              tag: "Más Recomendado",
              desc: "Para marcas decididas a competir agresivamente y superar a la competencia.",
              items: [
                "Todo lo incluido en la Fase Inicial",
                "4 artículos estratégicos al mes",
                "Adquisición de 5 enlaces mensuales (DR 30+)",
                "Optimización local extendida",
                "Optimización para respuestas en IA (SGE + ChatGPT)",
                "Métricas de conversión y analítica avanzada",
                "Análisis de brechas competitivas (trimestral)"
              ],
              cta: "Iniciar Expansión",
              glow: "rgba(235,63,27,0.05)",
              border: "border-orangeleader/30"
            },
            {
              name: "Fase 03 - Dominación",
              desc: "Para corporativos que buscan liderar por completo el mercado y la IA.",
              items: [
                "Todo lo incluido en la Fase de Expansión",
                "8 artículos estratégicos al mes",
                "Backlinks de autoridad (15 enlaces/mes, DR 40+)",
                "Campañas estratégicas de relaciones públicas digitales",
                "Estrategia de visibilidad total en LLMs",
                "SEO de Entidades y mapeo de Grafo de Conocimiento",
                "Monitoreo semanal y soporte de prioridad"
              ],
              cta: "Iniciar Dominación",
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
                    CONFIGURACIÓN 0{idx + 1}
                  </span>
                  {pack.tag && (
                    <span className="px-2 py-0.5 rounded-full bg-orangeleader/15 border border-orangeleader/30 text-[10px] font-mono font-bold text-orangeleader uppercase tracking-widest">
                      {pack.tag}
                    </span>
                  )}
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
                  {pack.cta} →
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
          
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">INICIA TU MISIÓN</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight leading-none">
            ¿Listo para posicionar en la era de la IA?
          </h2>
          <p className="text-starlight/75 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Permítenos escanear los radares de tu negocio y diseñar una hoja de ruta tecnológica personalizada para dominar Google y los buscadores inteligentes.
          </p>
          <div className="pt-4 max-w-lg mx-auto">
            <LeadForm servicioInteres="SEO Técnico & IA" />
          </div>
        </div>
      </section>

    </div>
  );
}
