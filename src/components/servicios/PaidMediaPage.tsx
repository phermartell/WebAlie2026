"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import LeadForm from "@/components/LeadForm";

const stats = [
  { value: "$1.5M+", label: "Ad Spend Optimizado", tech: "SYS: BUDGET_CTRL" },
  { value: "4.2x", label: "ROAS Promedio", tech: "RAD: RETURN_ON_AD" },
  { value: "4", label: "Casos de Éxito Insignia", tech: "ORBIT: SHIPS" },
  { value: "Multi", label: "Google, Meta & LinkedIn", tech: "TLM: PLATFORMS" }
];

const processSteps = [
  {
    num: "01",
    tag: "CARTOGRAFÍA",
    title: "Escaneo y Cartografía de Órbita",
    desc: "Antes de encender los motores, realizamos una auditoría profunda de tus competidores, identificamos las palabras clave con mayor intención de compra y cartografiamos la trayectoria óptima del embudo de conversión.",
    items: [
      "Auditoría técnica de cuentas de anuncios existentes",
      "Análisis de palabras clave y volumen de búsqueda",
      "Mapeo de la competencia en Google y Meta",
      "Definición de audiencias y avatares de cliente (buyer personas)"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "PROPULSORES",
    title: "Diseño de los Propulsores Creativos",
    desc: "Creamos anuncios nativos diseñados para detener el scroll y capturar el interés del tomador de decisiones. Desarrollamos copys persuasivos B2B/B2C enfocados en el dolor real de tu cliente y diseñamos piezas de alta gama.",
    items: [
      "Copywriting corporativo y ganchos persuasivos",
      "Estructuras de anuncios orientadas a resolver objeciones",
      "Diseño visual de banners, carruseles e infografías premium"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "IGNICIÓN",
    title: "Despegue e Ignición de Campaña",
    desc: "Activamos las campañas aplicando configuraciones de precisión. Segmentamos de manera quirúrgica para evitar quemar presupuesto con audiencias incorrectas, y lanzamos múltiples variaciones de anuncios desde el día uno.",
    items: [
      "Configuración milimétrica de píxeles y conversiones API",
      "Lanzamiento multivariante para testeo A/B inmediato",
      "Segmentación geográfica e intenciones comerciales activas"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "TELEMETRÍA",
    title: "Telemetría & Optimización de Órbita",
    desc: "Monitoreamos la pauta en tiempo real. Apagamos de inmediato los anuncios de bajo rendimiento y redirigimos la inversión hacia las variaciones más rentables, escalando de manera predecible para maximizar el ROAS.",
    items: [
      "Monitoreo semanal del Costo por Adquisición (CPA)",
      "Optimización de pujas mediante IA y control de presupuestos",
      "Reporte de telemetría y planeación de siguiente ciclo"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  }
];

const caseStudies = [
  {
    name: "MORECSA",
    sector: "Sector: Comercialización e Industria (Bombas Sumergibles)",
    metrics: "57 leads/mes · +2,190 contactos B2B",
    description: "Construimos un ecosistema de pauta híbrida activando campañas en Meta Ads y Google Ads para captar prospectos corporativos e incursionar en el mercado doméstico de la región central.",
    results: [
      "Generación promedio de 57 prospectos de alta intención cada mes.",
      "Base de datos de más de 2,190 contactos B2B acumulados.",
      "Campaña enfocada en cotización inmediata de equipos industriales."
    ],
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/20"
  },
  {
    name: "Vasos para Café",
    sector: "Sector: Insumos y Distribución Mayorista",
    metrics: "105 leads/mes · +1,900 empresas integradas",
    description: "Para este distribuidor mayorista de vasos desechables de cartón, desplegamos campañas hiper-segmentadas en Google Ads para dominar las búsquedas comerciales de cadenas y negocios corporativos.",
    results: [
      "Captación mensual promedio de 105 prospectos mayoristas.",
      "Conversión del tráfico de búsqueda a solicitudes formales de cotización.",
      "Crecimiento acelerado en base de datos de empresas compradoras."
    ],
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Dr. Peña Lares",
    sector: "Sector: Healthcare / Cirugía Maxilofacial",
    metrics: "48 pacientes/mes · +1,155 expedientes",
    description: "Establecimos un sistema predecible de adquisición de pacientes calificados para procedimientos de alto valor en el sector salud, interceptando búsquedas médicas urgentes en Google Ads.",
    results: [
      "48 nuevos prospectos y pacientes calificados en promedio mensual.",
      "Generación de más de 1,155 expedientes médicos digitales en 24 meses.",
      "Alta tasa de agendamiento gracias a la alineación del anuncio y landing page."
    ],
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Postes Puebla",
    sector: "Sector: Construcción e Ingeniería Civil",
    metrics: "46 cotizaciones B2B/mes · +1,124 constructoras",
    description: "Calibramos Google Ads de gran formato para conectar directamente con directores de obra, constructoras y contratistas interesados en la compra masiva de postes metálicos y de concreto.",
    results: [
      "46 cotizaciones a gran escala de obras públicas e ingeniería civil al mes.",
      "+1,124 constructoras registradas como prospectos calificados recurrentes.",
      "Retorno de inversión directo ligado al volumen de licitaciones obtenidas."
    ],
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/20"
  }
];

const packages = [
  {
    name: "Órbita 01 - Tracción",
    desc: "Para marcas que necesitan establecer captación de leads calificados activando pauta en un solo canal prioritario.",
    items: [
      "Gestión de pauta en 1 red (Google Ads o Meta Ads)",
      "Creación de piezas visuales publicitarias de alta gama",
      "Redacción de copys comerciales enfocados en ganchos",
      "Configuración de conversiones básicas y etiquetas",
      "Reporte de telemetría mensual"
    ],
    cta: "Iniciar Tracción",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Órbita 02 - Expansión",
    tag: "Más Recomendado",
    desc: "Estrategia de conversión omnicanal para interceptar demanda activa y generar volumen estable de leads.",
    items: [
      "Pauta multicanal activa (Google Ads + Meta Ads)",
      "Hasta 10 anuncios diseñados al mes (carruseles, gráficos, banners)",
      "Estrategia de retargeting para recuperar usuarios perdidos",
      "Optimización de conversiones avanzada y píxeles",
      "Reporte de telemetría y llamadas de optimización quincenales"
    ],
    cta: "Iniciar Expansión",
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/30"
  },
  {
    name: "Órbita 03 - Dominación",
    desc: "Para empresas que buscan liderar el mercado, estructurar embudos sofisticados de conversión con IA y presupuesto agresivo.",
    items: [
      "Pauta omnicanal robusta (Google, Meta & LinkedIn/TikTok Ads)",
      "Pruebas dinámicas multivariantes constantes",
      "Creación continua de ganchos publicitarios avanzados",
      "Embudos de conversión personalizados y landing pages de alta velocidad",
      "Soporte estratégico prioritario y telemetría en tiempo real"
    ],
    cta: "Iniciar Dominación",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  }
];

export default function PaidMediaPageClient() {
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
          PAID ADS
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
              PAID ADS AGENCY
            </span>
            <span className="px-3 py-1 rounded-full border border-orangeleader/30 bg-orangeleader/10 text-xs font-black text-orangeleader uppercase tracking-wider">
              PAUTA
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase text-white leading-[0.95] tracking-tight mb-8">
            ANUNCIOS DE ALTO IMPACTO.<br />
            <span className="text-transparent block mt-2" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.75)" }}>
              CONVERSIÓN DIRECTA.
            </span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-starlight/70 leading-relaxed font-light max-w-2xl mx-auto">
            Meta, Google, y LinkedIn campaigns calibradas bajo una estrategia omnicanal y ganchos publicitarios de alta retención. Llevamos compradores calificados directo a tu embudo corporativo.
          </p>

          <div className="mt-12 flex justify-center flex-wrap gap-2.5">
            {["Campañas B2B/B2C", "Copywriting de Conversión", "Optimización del ROAS", "Pauta Predictiva", "Monitoreo Semanal"].map((badge, idx) => (
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
              INICIA TU CAMPAÑA DE CONVERSIÓN →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 🛰️ Desglose del Servicio - Bento Grid */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto relative z-10 border-t border-white/[0.04]">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">SISTEMAS DEL MÓDULO DE TRÁFICO</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            El Plan de Vuelo
          </h2>
          <div className="h-0.5 w-16 bg-orangeleader/40 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {processSteps.map((w, idx) => (
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

      {/* 🌌 Bitácora de Éxito / Caso de Éxito Section */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto relative z-10 border-t border-white/[0.04]">
        <div className="mb-16 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">BITÁCORA DE EXPEDICIÓN</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Misiones de Pauta Cumplidas
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Explora las métricas y alcances de nuestros propulsores publicitarios activos para marcas líderes en distintos nichos comerciales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((cs, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className={`glass-liquid rounded-3xl border ${cs.border} p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative overflow-hidden`}
            >
              <div
                className="absolute inset-0 -z-10 pointer-events-none transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at top right, ${cs.glow}, transparent 60%)` }}
              />
              
              <div className="space-y-4">
                <div className="flex justify-between items-start pb-4 border-b border-white/5">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight leading-none mb-1">
                      {cs.name}
                    </h3>
                    <span className="text-[10px] font-mono text-starlight/45 uppercase tracking-wider block">
                      {cs.sector}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full border border-orangeleader/30 bg-orangeleader/10 text-[10px] font-mono font-bold text-orangeleader uppercase tracking-widest">
                    Misión 0{idx + 1}
                  </span>
                </div>

                <div className="py-2">
                  <span className="text-base font-bold text-[#bef264] tracking-tight block mb-2">
                    MÉTRICA CLAVE: {cs.metrics}
                  </span>
                  <p className="text-starlight/75 text-xs md:text-sm font-light leading-relaxed">
                    {cs.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  {cs.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2 text-xs text-starlight/60">
                      <span className="text-orangeleader mt-0.5">✦</span>
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📦 Configuraciones de Misión - Paquetes sin Precios */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto border-t border-white/[0.04] relative z-10">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">PAQUETES ADAPTABLES</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Configuraciones de Misión
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Alinea tus recursos publicitarios con los objetivos y la escala de adquisición requerida.
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
            ¿Listo para despegar en Paid Ads?
          </h2>
          <p className="text-starlight/75 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Diseñemos juntos la estrategia de pauta publicitaria ideal para tu marca. Llena el formulario a continuación para agendar tu llamada de estrategia.
          </p>
          <div className="pt-4 max-w-lg mx-auto">
            <LeadForm servicioInteres="Paid Ads" />
          </div>
        </div>
      </section>

    </div>
  );
}
