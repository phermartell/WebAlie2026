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
    tag: "PLANEACIÓN",
    title: "Definimos objetivos y presupuesto",
    desc: "Conocemos tu oferta, las zonas que atiendes y el tipo de consultas que buscas recibir. Revisamos tus campañas existentes, si las tienes, para definir prioridades y una propuesta de trabajo.",
    items: [
      "Objetivos y acciones que se medirán",
      "Revisión de cuentas existentes cuando corresponda",
      "Investigación de búsquedas y audiencias",
      "Definición de presupuesto y canales"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "ANUNCIOS",
    title: "Preparamos mensajes y piezas",
    desc: "Desarrollamos anuncios que expliquen tu oferta y den a las personas interesadas un siguiente paso claro. Coordinamos los textos y materiales según los formatos y el alcance acordados.",
    items: [
      "Redacción de mensajes y llamados a la acción",
      "Diseño de piezas según el alcance",
      "Alineación entre anuncios y página de destino"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "CONFIGURACIÓN",
    title: "Configuramos y activamos",
    desc: "Preparamos las campañas, su segmentación y la medición de las acciones acordadas. Revisamos los anuncios y destinos antes de enviarlos a aprobación en cada plataforma.",
    items: [
      "Configuración de campañas y audiencias",
      "Configuración y revisión de conversiones",
      "Activación sujeta a aprobación de la plataforma"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "SEGUIMIENTO",
    title: "Revisamos resultados y ajustamos",
    desc: "Damos seguimiento al gasto, las consultas registradas y el desempeño de los anuncios. Con los datos disponibles proponemos ajustes y revisamos contigo la calidad de los contactos recibidos.",
    items: [
      "Seguimiento de presupuesto y costo por resultado",
      "Pruebas de mensajes y segmentación",
      "Reportes y recomendaciones de siguientes acciones"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  }
];

const caseStudies = [
  {
    name: "MORECSA",
    sector: "Sector: Comercialización e Industria (Bombas Sumergibles)",
    metrics: "Promedio de 57 prospectos al mes",
    description: "Campañas en Google Ads y Meta Ads orientadas a recibir consultas sobre productos de su catálogo.",
    results: [
      "Promedio mensual reportado: 57 prospectos",
      "Base acumulada de más de 2,190 contactos",
      "Consultas relacionadas con equipos y productos del negocio"
    ],
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/20"
  },
  {
    name: "Vasos para Café",
    sector: "Sector: Insumos y Distribución Mayorista",
    metrics: "Más de 1,900 leads en 18 meses",
    description: "Campañas en Google Ads orientadas a generar consultas sobre vasos e insumos para cafeterías y otros negocios.",
    results: [
      "Promedio mensual reportado: 105 prospectos",
      "Más de 1,900 leads generados en 18 meses",
      "Campañas enfocadas en consultas sobre su oferta mayorista"
    ],
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Dr. Peña Lares",
    sector: "Sector: Healthcare / Cirugía Maxilofacial",
    metrics: "Promedio de 48 prospectos al mes",
    description: "Campañas en Google Ads orientadas a recibir consultas de personas interesadas en sus servicios de cirugía maxilofacial.",
    results: [
      "Promedio mensual reportado: 48 prospectos",
      "Más de 1,155 contactos acumulados",
      "Anuncios y página de destino enfocados en sus servicios"
    ],
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Postes Puebla",
    sector: "Sector: Construcción e Ingeniería Civil",
    metrics: "Promedio de 46 prospectos al mes",
    description: "Campañas en Google Ads orientadas a recibir consultas sobre postes y productos para proyectos de construcción.",
    results: [
      "Promedio mensual reportado: 46 prospectos",
      "Más de 1,124 contactos acumulados",
      "Campañas relacionadas con búsquedas de sus productos"
    ],
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/20"
  }
];

const packages = [
  {
    name: "Campañas en un canal",
    desc: "Para negocios que buscan concentrar su publicidad en Google Ads o Meta Ads según su oferta y sus objetivos.",
    items: [
      "Definición de objetivos y audiencias",
      "Configuración de campañas en el canal acordado",
      "Mensajes y piezas según el alcance",
      "Medición de acciones y seguimiento de presupuesto",
      "Reportes y recomendaciones"
    ],
    cta: "Consultar un canal",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Google Ads y Meta Ads",
    desc: "Para negocios que necesitan coordinar campañas de búsqueda y redes sociales con mensajes y objetivos relacionados.",
    items: [
      "Planeación de campañas en ambos canales",
      "Coordinación de mensajes y anuncios",
      "Distribución y seguimiento del presupuesto",
      "Medición de acciones por canal",
      "Revisión de resultados y ajustes"
    ],
    cta: "Consultar gestión",
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/30"
  },
  {
    name: "Gestión a medida",
    desc: "Para empresas con campañas existentes o necesidades particulares de medición, anuncios y páginas de destino.",
    items: [
      "Revisión de cuentas y necesidades",
      "Definición de prioridades de trabajo",
      "Propuesta de campañas y medición",
      "Coordinación de materiales e integraciones",
      "Alcance y calendario acordados"
    ],
    cta: "Consultar proyecto",
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
              ← Ver servicios
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-orangeleader text-xs font-black tracking-[0.5em] uppercase">
              PUBLICIDAD DIGITAL
            </span>
            <span className="px-3 py-1 rounded-full border border-orangeleader/30 bg-orangeleader/10 text-xs font-black text-orangeleader uppercase tracking-wider">
              GOOGLE ADS Y META ADS
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase text-white leading-[0.95] tracking-tight mb-8">
            Campañas para atraer<br />
            <span className="text-white block mt-2">
              consultas sobre tu negocio
            </span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-starlight/70 leading-relaxed font-light max-w-2xl mx-auto">
            Gestionamos campañas en Google Ads y Meta Ads para acercar tus productos o servicios a personas interesadas. Definimos objetivos, anuncios y presupuesto, y medimos las acciones registradas para orientar los ajustes.
          </p>

          <div className="mt-12 flex justify-center flex-wrap gap-2.5">
            {["Planeación de campañas", "Mensajes y anuncios", "Audiencias", "Medición de consultas", "Seguimiento de presupuesto"].map((badge, idx) => (
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
              Consultar campañas →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 🛰️ Desglose del Servicio - Bento Grid */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto relative z-10 border-t border-white/[0.04]">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">GESTIÓN DE PUBLICIDAD DIGITAL</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Cómo trabajamos tus campañas
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
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">EXPERIENCIA EN CAMPAÑAS</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Proyectos de publicidad digital
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Estos proyectos muestran nuestro trabajo de captación de consultas en distintos sectores. Las cifras corresponden a cada caso y no representan una garantía para nuevas campañas.
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
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">OPCIONES DE GESTIÓN</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Un alcance acorde con tus campañas
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Definimos los canales, las actividades y los materiales según tus objetivos. La propuesta distingue los honorarios de gestión del presupuesto destinado a anuncios.
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
          
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">HABLEMOS DE TUS CAMPAÑAS</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight leading-none">
            ¿Quieres anunciar tus productos o servicios?
          </h2>
          <p className="text-starlight/75 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Cuéntanos qué ofrece tu negocio, a quién quieres llegar y si ya tienes campañas activas. Te orientamos sobre los canales, la medición y el alcance de gestión para preparar una propuesta.
          </p>
          <div className="pt-4 max-w-lg mx-auto">
            <LeadForm servicioInteres="Google Ads y Meta Ads" submitLabel="Solicitar información" />
          </div>
        </div>
      </section>

    </div>
  );
}
