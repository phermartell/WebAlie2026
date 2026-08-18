"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import LeadForm from "@/components/LeadForm";

const stats = [
  { value: "B2B", label: "Enfoque Estratégico", tech: "SYS: AUDIENCE" },
  { value: "Mayoreo", label: "Orientado a Ventas", tech: "RAD: CONVERSION" },
  { value: "Alta Gama", label: "Línea Gráfica Premium", tech: "ORBIT: BRANDING" },
  { value: "Activo", label: "Comunidad Moderada", tech: "TLM: ENGAGEMENT" }
];

const smmWork = [
  {
    num: "01",
    tag: "ESTRATEGIA",
    title: "Estructura de Embudos (Funnel Building)",
    desc: "No publicamos por publicar. Diseñamos cada publicación según la etapa del embudo comercial: atracción (awareness), educación (engagement) y conversión. El contenido está estructurado para transformar seguidores en prospectos calificados B2B.",
    items: [
      "Atracción de prospectos calificados en frío",
      "Carruseles informativos y de autoridad industrial",
      "Llamadas a la acción (CTA) de alta conversión",
      "Embudos orgánicos hacia WhatsApp y Messenger"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "REDACCIÓN",
    title: "Copywriting Persuasivo B2B",
    desc: "Hablamos el idioma de tu sector. Redactamos copys orientados a tomadores de decisiones corporativas, directores de compras, recursos humanos y directivos, abordando sus pain points reales con profesionalismo.",
    items: [
      "Tono corporativo y especializado",
      "Ganchos (hooks) iniciales magnéticos",
      "Redacción orientada a resolver objeciones"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "DISEÑO",
    title: "Diseño Visual de Alta Gama",
    desc: "Tu imagen corporativa lo es todo en canales digitales. Creamos piezas visuales personalizadas e infografías sofisticadas que transmiten la calidad y durabilidad de tus soluciones, alejándonos de plantillas baratas y genéricas.",
    items: [
      "Identidad visual de marca consistente",
      "Diseño de infografías y gráficos premium",
      "Carruseles corporativos interactivos"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "INTERACCIÓN",
    title: "Administración de Comunidades",
    desc: "Mantenemos una comunicación activa con tu audiencia. Monitoreamos comentarios e interacciones entrantes para detectar y canalizar oportunidades comerciales y cotizaciones con rapidez.",
    items: [
      "Monitoreo constante de comentarios y mensajes",
      "Fomento de interacciones de calidad",
      "Detección de prospectos interesados (leads calificados)"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  }
];

const monthlyPlan = [
  {
    week: "Semana 1",
    title: "Planeación & Línea Editorial",
    desc: "Definición del calendario de publicaciones mensual, temas clave y alineación con los objetivos comerciales de tu empresa.",
    status: "PLANEACIÓN: APROBADA",
    metric: "STRATEGY // OK"
  },
  {
    week: "Semana 2",
    title: "Diseño & Redacción Creativa",
    desc: "Creación de las piezas visuales premium y redacción de copys persuasivos B2B listos para revisión y aprobación.",
    status: "PRODUCCIÓN: LISTA",
    metric: "CREATIVE // PROD"
  },
  {
    week: "Semana 3",
    title: "Programación & Distribución",
    desc: "Calendarización y distribución de los contenidos en las redes sociales acordadas utilizando herramientas de precisión.",
    status: "DISTRIBUCIÓN: ACTIVA",
    metric: "SCHEDULER // ON"
  },
  {
    week: "Semana 4",
    title: "Telemetría & Optimización de Órbita",
    desc: "Evaluación de métricas de alcance e interacción, entrega del reporte mensual y planeación de la siguiente órbita comercial.",
    status: "REPORTE: ENVIADO",
    metric: "TELEMETRY // RPT"
  }
];

const packages = [
  {
    name: "Órbita 01 - Lanzamiento",
    desc: "Para marcas B2B que necesitan establecer una presencia digital profesional y sólida.",
    items: [
      "Calendario Editorial mensual",
      "Diseño de Piezas Visuales de Alta Gama (12 posts/mes)",
      "Copywriting B2B persuasivo",
      "Publicación y programación en 2 redes sociales",
      "Reporte mensual de rendimiento",
      "Llamada de planeación mensual"
    ],
    cta: "Iniciar Lanzamiento",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Órbita 02 - Expansión",
    tag: "Más Recomendado",
    desc: "Para empresas que buscan aumentar su engagement, educar a su mercado y captar prospectos calificados.",
    items: [
      "Todo lo incluido en la Órbita 01",
      "Diseño de Piezas Visuales extendido (16 posts/mes)",
      "Creación y publicación de 4 Reels mensuales",
      "Creación de carruseles interactivos e historias de engagement",
      "Análisis continuo de tendencias de tu nicho",
      "Moderación y administración de comunidades activa",
      "Reporte detallado de rendimiento y métricas clave"
    ],
    cta: "Iniciar Expansión",
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/30"
  },
  {
    name: "Órbita 03 - Dominación",
    desc: "Para corporativos que buscan una estrategia multicanal agresiva para liderar su sector.",
    items: [
      "Todo lo incluido en la Órbita 02",
      "Diseño de Piezas Visuales premium (24 posts/mes)",
      "Creación y publicación de 8 Reels mensuales",
      "Distribución y adaptación en múltiples canales (Instagram, LinkedIn, FB)",
      "Estrategia de contenidos enfocada en conversiones B2B",
      "Optimización de embudos orgánicos (Lead Gen)",
      "Soporte estratégico prioritario y llamadas quincenales"
    ],
    cta: "Iniciar Dominación",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  }
];

export default function SocialMediaPageClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const screenshots = [
    {
      title: "Crecimiento de Comunidad",
      category: "MÉTRICAS DE EVOLUCIÓN",
      img: "/casos/uniformes-mexicanos/crecimiento-fb.webp",
      desc: "Evolución constante de la cuenta de Facebook. Muestra el crecimiento sostenido de la comunidad orgánica y el alcance de las publicaciones dirigidas a tomadores de decisiones corporativos."
    },
    {
      title: "Top 5 Posts con Mayor Tracción",
      category: "MÉTRICAS DE EVOLUCIÓN",
      img: "/casos/uniformes-mexicanos/top-5-post.webp",
      desc: "Análisis y métricas detalladas de las 5 publicaciones con mayor nivel de engagement, comentarios e interacciones de calidad en el sector de uniformes corporativos."
    },
    {
      title: "Top 5 Reels de Mayor Alcance",
      category: "MÉTRICAS DE EVOLUCIÓN",
      img: "/casos/uniformes-mexicanos/top-5-reels.webp",
      desc: "Rendimiento y visualizaciones de los Reels líderes. El video corto estructurado con ganchos comerciales representó el canal de tracción más acelerado."
    },
    {
      title: "Optimización de Formato y Gancho",
      category: "OPTIMIZACIÓN DE ALCANCE",
      img: "/casos/uniformes-mexicanos/post1.webp",
      desc: "Ejemplo de publicación optimizada. Estructura visual de alta gama y copy persuasivo diseñados específicamente para resolver necesidades de departamentos de compras."
    },
    {
      title: "Exhibición de Catálogo Corporativo",
      category: "OPTIMIZACIÓN DE ALCANCE",
      img: "/casos/uniformes-mexicanos/post2.webp",
      desc: "Publicación enfocada en la presentación y calidad técnica de los materiales textiles. Incremento notable en el tiempo de retención y guardados."
    },
    {
      title: "Conversión Directa a Cotización",
      category: "OPTIMIZACIÓN DE ALCANCE",
      img: "/casos/uniformes-mexicanos/post3.webp",
      desc: "Estrategia de llamado a la acción directa. Diseñado para guiar a los prospectos de Facebook hacia WhatsApp Business y Messenger para cotizaciones al mayoreo."
    }
  ];

  return (
    <div className="relative z-10 w-full overflow-x-hidden">
      
      {/* Nave lateral ligada al scroll */}
      <OrbitalPath />

      {/* 🚀 Hero Section */}
      <section className="relative pt-48 pb-32 px-6 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Soft Background Brand Glow & Orbital HUD decoration */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(235,63,27,0.06),transparent_60%)] pointer-events-none" />
        
        {/* Concentric tech circles in the background */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/[0.02] -z-10 animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-dashed border-white/[0.015] -z-10 animate-[spin_40s_linear_infinite_reverse]" />

        {/* Ambient watermark */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 select-none pointer-events-none text-[15vw] font-black tracking-[0.12em] text-white/[0.012] leading-none uppercase font-sans">
          SOCIAL
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
              SOCIAL MEDIA MARKETING
            </span>
            <span className="px-3 py-1 rounded-full border border-orangeleader/30 bg-orangeleader/10 text-xs font-black text-orangeleader uppercase tracking-wider">
              SMM
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase text-white leading-[0.95] tracking-tight mb-8">
            TRANSMITE TU SEÑAL.<br />
            <span className="text-transparent block mt-2" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.75)" }}>
              CONECTA TU MARCA.
            </span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-starlight/70 leading-relaxed font-light max-w-2xl mx-auto">
            Estrategias de contenido orgánico y gestión de redes sociales (SMM) diseñadas para posicionar tu marca B2B en la órbita correcta, interactuar de manera profesional con tu comunidad y generar conversiones reales.
          </p>

          <div className="mt-12 flex justify-center flex-wrap gap-2.5">
            {["Calendario B2B", "Diseño de Alta Gama", "Copywriting Persuasivo", "Comunidad Activa", "Reportes de Rendimiento"].map((badge, idx) => (
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
              OBTÉN UN DIAGNÓSTICO SIN COSTO →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 🛰️ Desglose del Servicio - Bento Grid */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto relative z-10 border-t border-white/[0.04]">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">SISTEMAS DEL MÓDULO SMM</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Despliegue de Redes
          </h2>
          <div className="h-0.5 w-16 bg-orangeleader/40 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {smmWork.map((w, idx) => (
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

      {/* 🗺️ Secuencia Mensual */}
      <section className="py-24 px-6 md:px-8 max-w-5xl mx-auto border-t border-white/[0.04] relative z-10">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">PLAN DE VUELO MENSUAL</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            La Secuencia de Publicación
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            La constancia y la calidad en redes sociales construyen una marca memorable. Cada mes ejecutamos un ciclo completo para asegurar que tu señal se mantenga activa y con el mejor alcance.
          </p>
        </div>

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
      </section>

      {/* 📊 Featured Case Study Section - Uniformes Mexicanos */}
      <section className="py-24 px-6 md:px-8 max-w-5xl mx-auto relative z-10 border-t border-white/[0.04]">
        <div className="mb-16 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">CASO DE ÉXITO RECIENTE</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Uniformes Mexicanos
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Cómo estructuramos la presencia digital y el crecimiento de la comunidad para un líder en uniformes industriales y corporativos B2B, logrando un despegue en visualizaciones y alcance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
              Diseño Industrial y Comunicación B2B
            </h3>
            <p className="text-starlight/75 text-sm md:text-base font-light leading-relaxed">
              Uniformes Mexicanos destaca por la resistencia, calidad y personalización de sus prendas. Diseñamos una estrategia de contenido en Facebook enfocada en destacar la calidad de confección, bordados y tecnología textil, conectando directamente con tomadores de decisiones de compras y recursos humanos que buscan cotizaciones de uniformes al mayoreo.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-2.5 text-xs md:text-sm text-starlight/65">
                <span className="text-orangeleader mt-1">✦</span>
                <span>Línea gráfica profesional que proyecta la durabilidad e identidad de marca de las empresas clientes.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs md:text-sm text-starlight/65">
                <span className="text-orangeleader mt-1">✦</span>
                <span>Evolución constante de la comunidad y del engagement mediante formatos dinámicos y educativos.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs md:text-sm text-starlight/65">
                <span className="text-orangeleader mt-1">✦</span>
                <span>Implementación de un embudo de conversión orgánico directo a WhatsApp Business y Messenger para cotizaciones.</span>
              </li>
            </ul>

            <div className="pt-4">
              <a
                href="https://www.facebook.com/uniformexworkwear"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#bef264] hover:text-[#d9f99d] text-sm font-bold uppercase tracking-wider transition-colors"
              >
                Ver página de Facebook de Uniformes Mexicanos ↗
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="glass-liquid rounded-2xl border border-white/10 p-5 flex flex-col justify-between items-start gap-4 relative overflow-hidden backdrop-blur-md bg-white/[0.01] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] group hover:border-white/20 transition-all duration-300"
              >
                <span className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/15 group-hover:border-orangeleader/45 transition-colors" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/15 group-hover:border-orangeleader/45 transition-colors" />
                
                <div className="flex w-full justify-between items-start">
                  <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-orangeleader to-[#ff8643] bg-clip-text text-transparent tracking-tight drop-shadow-[0_4px_12px_rgba(235,63,27,0.15)]">
                    {s.value}
                  </span>
                  <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest pl-1 mt-1">
                    {s.tech}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-[10px] font-black uppercase text-white tracking-wider leading-none">
                    {s.label}
                  </h4>
                  <span className="font-mono text-[10px] text-orangeleader/50 uppercase tracking-widest block mt-0.5">
                    DIAGNOSTIC // ACTIVE
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 📈 Galería Interactiva de Casos y Métricas */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Panel Lateral: Selector de Capturas */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-orangeleader uppercase block mb-1">
              SELECCIONA UNA CAPTURA
            </span>
            <div className="flex flex-col gap-2.5">
              {screenshots.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                    activeTab === idx
                      ? "bg-white/[0.04] border-orangeleader/60 text-white shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.06)]"
                      : "bg-transparent border-white/5 text-starlight/60 hover:text-white hover:bg-white/[0.01] hover:border-white/15"
                  }`}
                >
                  {activeTab === idx && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-orangeleader" />
                  )}
                  <span className="text-[9px] font-mono text-orangeleader/75 tracking-wider block mb-1">
                    {s.category}
                  </span>
                  <span className="text-sm font-bold block">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Visualizador Principal de Alta Definición */}
          <div className="lg:col-span-8">
            <div className="glass-liquid rounded-3xl border border-white/5 p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest text-orangeleader uppercase">
                    VISUALIZADOR // {screenshots[activeTab].category}
                  </span>
                  <span className="text-[9px] font-mono text-[#bef264]/80 tracking-widest uppercase">
                    PULSA PARA AMPLIAR 🔍
                  </span>
                </div>
                
                <h4 className="text-xl font-black uppercase text-white tracking-tight">
                  {screenshots[activeTab].title}
                </h4>
                
                <p className="text-starlight/60 text-xs md:text-sm font-light leading-relaxed">
                  {screenshots[activeTab].desc}
                </p>

                {/* Frame del Screenshot */}
                <div
                  onClick={() => setIsZoomed(true)}
                  className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 cursor-pointer group mt-4 aspect-video flex items-center justify-center"
                >
                  <img
                    src={screenshots[activeTab].img}
                    alt={screenshots[activeTab].title}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-black/80 text-white border border-white/15 rounded-full px-4 py-2 text-xs font-mono tracking-widest uppercase">
                      Ver en Pantalla Completa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔍 Lightbox Modal / Zoom en Pantalla Completa */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col justify-center items-center"
              >
                <img
                  src={screenshots[activeTab].img}
                  alt={screenshots[activeTab].title}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl border border-white/10 shadow-2xl"
                />
                
                <div className="mt-4 text-center max-w-2xl px-4">
                  <h4 className="text-lg font-black uppercase text-white tracking-tight">
                    {screenshots[activeTab].title}
                  </h4>
                  <p className="text-starlight/60 text-xs md:text-sm mt-1 leading-relaxed">
                    {screenshots[activeTab].desc}
                  </p>
                  <span className="inline-block mt-4 text-[10px] font-mono text-white/40 border border-white/10 rounded-full px-3 py-1 uppercase tracking-widest">
                    Haz clic en cualquier parte para cerrar
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 📦 Configuraciones de Misión - Paquetes SMM sin Precios */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto border-t border-white/[0.04] relative z-10">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">PAQUETES ADAPTABLES</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Configuraciones de Misión
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Selecciona la órbita de cobertura que se adapte al nivel de actividad y canales que requiere tu marca corporativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {packages.map((pack, idx) => (
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

      {/* ✉️ Formulario de Contacto */}
      <section className="py-24 px-6 md:px-8 max-w-4xl mx-auto text-center relative z-10 mb-20 border-t border-white/[0.04]">
        <div className="glass-liquid rounded-[40px] border border-white/10 p-8 md:p-16 space-y-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(235,63,27,0.08),transparent_60%)] pointer-events-none" />
          
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">INICIA TU MISIÓN</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight leading-none">
            ¿Listo para despegar en redes sociales?
          </h2>
          <p className="text-starlight/75 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Diseñemos juntos la estrategia de redes sociales ideal para tu marca. Llena el formulario a continuación para agendar tu llamada de estrategia.
          </p>
          <div className="pt-4 max-w-lg mx-auto">
            <LeadForm servicioInteres="Social Media (SMM)" />
          </div>
        </div>
      </section>

    </div>
  );
}
