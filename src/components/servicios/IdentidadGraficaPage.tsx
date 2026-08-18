"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import LeadForm from "@/components/LeadForm";
import Image from "next/image";

const stats = [
  { value: "100%", label: "Consistencia Estelar", tech: "SYS: BRAND_ALIGN" },
  { value: "+30", label: "Flotas de Marca Diseñadas", tech: "RAD: LOGOS_LAUNCHED" },
  { value: "Hex/RGB", label: "Coordenadas de Color Precisas", tech: "ORBIT: SPECTRUM" },
  { value: "Vector", label: "Archivos Escalables HD", tech: "TLM: FORMATS" }
];

const brandReason = [
  {
    num: "01",
    tag: "IDENTIDAD",
    title: "Construir Reconocimiento y Confianza",
    desc: "Una marca coherente es memorable. Cuando tu audiencia ve los mismos colores, tipografías y el mismo tono de comunicación en cada canal, se construye una reputación de solidez y profesionalismo.",
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "ALINEACIÓN",
    title: "Alineación de la Tripulación",
    desc: "Obtén a todos tus colaboradores y socios externos (diseñadores, imprentas, agencias) hablando el mismo lenguaje gráfico. Evita desvíos visuales.",
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "EFICIENCIA",
    title: "Ahorro de Tiempo y Recursos",
    desc: "Las reglas claras eliminan la incertidumbre. Dile adiós a las idas y venidas de diseño y acelera las aprobaciones internas con pautas ya definidas y listas para aplicar.",
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "PROTECCIÓN",
    title: "Proteger la Integridad de la Marca",
    desc: "Evita la dilución y malas interpretaciones de tu imagen. Tu marca mantendrá su distinción y fuerza visual sin importar quién la ejecute ni en qué medio se imprima o publique.",
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  }
];

const packages = [
  {
    name: "Hoja de Ruta Estelar (Style Sheet)",
    desc: "Ideal para startups y tripulaciones que necesitan una referencia visual de marca ágil y consistente.",
    items: [
      "Manual básico de uso de logotipo (overview)",
      "Coordenadas de color oficiales (RGB, HEX, CMYK)",
      "Tipografía de transmisión (fuentes primarias y secundarias)",
      "Pautas de escala y área de seguridad del escudo de marca",
      "Formato de entrega: PDF Interactivo listo para compartir"
    ],
    cta: "Trazar Hoja de Ruta",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Manual de Navegación Core (Core Guidelines)",
    desc: "Perfecto para marcas en expansión que buscan orden estructural sin la carga de un sistema masivo.",
    items: [
      "Pautas completas de logotipo (variaciones de fondo, área de seguridad)",
      "Códigos de color extendidos (pantone, digital, editorial)",
      "Guía tipográfica detallada con jerarquía (h1, h2, cuerpo de texto)",
      "Reglas de aplicación en formatos digitales comunes",
      "Ejemplos visuales de usos correctos e incorrectos (Do's & Don'ts)",
      "Formato de entrega: PDF corporativo editable y recursos vectoriales"
    ],
    cta: "Obtener Manual Core",
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/30",
    tag: "Más Recomendado"
  },
  {
    name: "Protocolo Interestelar Completo (Comprehensive)",
    desc: "La suite definitiva para flotas y corporativos que demandan una consistencia visual total en toda la galaxia.",
    items: [
      "Manual extendido de branding (arquitectura de marca e isotipos)",
      "Guías de fotografía y dirección de arte (estilo de imágenes)",
      "Retículas de composición y maquetación de layouts",
      "Framework de iconos corporativos personalizados (con set inicial)",
      "Ejemplos de aplicación real (papelería, empaques, uniformes, naves)",
      "Guías de movimiento/animación de marca básica",
      "Formato de entrega: Manual interactivo, recursos en la nube y kit de assets"
    ],
    cta: "Desplegar Protocolo Interestelar",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  }
];

const brandManualsShowcase = [
  {
    title: "Mercado de Mar",
    category: "CORTES MARINOS A DOMICILIO",
    img: "/branding/mercado_mar.webp",
    desc: "Diseño de identidad visual para Mercado de Mar. Desarrollamos una marca para amantes de la variedad y los cortes de pescado premium, comunicando un modelo de negocio exclusivo de entrega a domicilio bajo pedido por anticipado."
  },
  {
    title: "MORECSA",
    category: "BOMBAS SUMERGIBLES Y EQUIPOS",
    img: "/branding/morecsa.webp",
    desc: "Manual de marca para MORECSA, distribuidor especializado de refacciones, equipos de bombeo sumergible y jardinería. Estructuramos su identidad visual para respaldar la distribución oficial de grandes marcas nacionales como BONASA y EVANS."
  },
  {
    title: "Trebal",
    category: "FIRMA LEGAL INTERNACIONAL",
    img: "/branding/trebal.webp",
    desc: "Branding y lineamientos visuales para TREBAL, firma de abogados en Monterrey. Diseñamos una identidad sólida y de alta confianza orientada a clientes americanos para la formalización y cumplimiento de sus operaciones comerciales en México."
  },
  {
    title: "Nirue",
    category: "JOYERÍA DE ACERO INOXIDABLE",
    img: "/branding/nirue.webp",
    desc: "Manual de branding para NIRUE, un negocio boutique de joyería de acero inoxidable en la Ciudad de México. Línea gráfica moderna, elegante y brillante orientada a resaltar la durabilidad y estética de sus accesorios."
  },
  {
    title: "SAX",
    category: "EQUIPO MÉDICO CREATIVO",
    img: "/branding/sax.webp",
    desc: "Rediseño de identidad visual para SAX, comercializadora de equipo médico en la ciudad de Puebla. Desarrollamos un manual de marca sumamente creativo y profesional para refrescar su presencia institucional en el sector salud."
  }
];

const processSteps = [
  {
    num: "01",
    tag: "DESCUBRIMIENTO",
    title: "Exploración de Órbita",
    desc: "Estudiamos tu sector, tus competidores y tus metas espaciales. Definimos los cimientos conceptuales que harán que tu marca resalte en el vacío digital.",
    items: ["Estudio de mercado", "Talleres de ADN de marca", "Análisis de competidores"],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "DISEÑO",
    title: "Ensamble Visual",
    desc: "Nuestros creativos diseñan los escudos estelares (logotipos) y definen las coordenadas cromáticas. Damos vida a la identidad a través de mockups realistas.",
    items: ["Diseño de logotipo e isotipo", "Definición de paleta de colores", "Tipografías oficiales"],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "DOCUMENTACIÓN",
    title: "Codificación del Manual",
    desc: "Estructuramos las directrices visuales en un manual de identidad detallado. Definimos las reglas de juego para asegurar el buen uso de tu marca en cualquier plataforma.",
    items: ["Do's & Don'ts de marca", "Jerarquía de tamaños y espacios", "Reglas de composición"],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "LANZAMIENTO",
    title: "Despegue Visual",
    desc: "Entregamos todos los archivos fuente finales en formatos vectoriales editables y PDF interactivo de alta definición, listos para propulsar la presencia de tu marca.",
    items: ["Archivos vectoriales (AI, SVG, PDF)", "Formatos listos para web (PNG, WebP)", "Inducción al equipo de trabajo"],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  }
];

export default function IdentidadGraficaPageClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

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
          BRANDING
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
              IDENTIDAD GRÁFICA & BRANDING
            </span>
            <span className="px-3 py-1 rounded-full border border-orangeleader/30 bg-orangeleader/10 text-xs font-black text-orangeleader uppercase tracking-wider">
              CORE
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase text-white leading-[0.95] tracking-tight mb-8">
            MANUALES DE MARCA.<br />
            <span className="text-transparent block mt-2" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.75)" }}>
              CONSISTENCIA ESTELAR.
            </span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-starlight/70 leading-relaxed font-light max-w-2xl mx-auto">
            Equipa a tu equipo con lineamientos visuales y verbales claros para representar tu marca con precisión y elegancia en toda la galaxia. Diseñamos manuales de identidad personalizados que protegen y consolidan tu reputación.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="#paquetes"
              className="bg-orangeleader hover:bg-orangeleader/80 text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-[0_10px_20px_rgba(235,63,27,0.3)] hover:shadow-[0_12px_24px_rgba(235,63,27,0.5)] cursor-pointer"
            >
              Ver Órbitas de Servicio
            </a>
            <a
              href="#showcase"
              className="border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
            >
              Ver Manuales de la Flota
            </a>
          </div>
        </motion.div>
      </section>

      {/* 📊 Módulo de Telemetría (Estadísticas) */}
      <section className="relative border-y border-white/5 py-12 bg-black/25">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-[9px] font-mono text-orangeleader tracking-widest uppercase mb-1">
                  {stat.tech}
                </span>
                <span className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                  {stat.value}
                </span>
                <span className="text-starlight/50 text-xs mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛡️ Sección: Por Qué un Manual de Identidad */}
      <section className="relative py-24 border-b border-white/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              SEGURIDAD Y RECONOCIMIENTO
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              PROTEGE LA FIRMA VISUAL DE TU NAVE NODRIZA
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Piensa en tu marca como una nave espacial: cada transmisión, módulo y detalle debe estar perfectamente alineado bajo un mismo manual de ingeniería para garantizar el éxito de la misión.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {brandReason.map((reason, idx) => (
              <div
                key={idx}
                className={`glass-liquid p-8 rounded-3xl flex flex-col justify-between min-h-[250px] ${reason.colSpan} relative overflow-hidden`}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${reason.bgGlow}, transparent 50%)`
                  }}
                />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-mono text-orangeleader tracking-widest uppercase">
                      {reason.tag}
                    </span>
                    <span className="text-xs font-black text-white/20">
                      FASE {reason.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white uppercase mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-starlight/60 text-xs leading-relaxed max-w-3xl">
                    {reason.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📈 Showcase de Manuales de la Flota */}
      <section className="relative py-24 border-b border-white/5 bg-transparent" id="showcase">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              EXPEDICIONES GRÁFICAS
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              SISTEMAS DE IDENTIDAD EN ÓRBITA
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Navega a través de los manuales de identidad visual que hemos diseñado para tripulaciones aliadas en distintos sectores de la galaxia.
            </p>
          </div>

          {/* Galería de Logos y Manuales */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Panel de Selección */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <span className="text-[10px] font-mono tracking-widest text-orangeleader uppercase block mb-1">
                SELECCIONA UN MANUAL DE IDENTIDAD
              </span>
              <div className="flex flex-col gap-2.5">
                {brandManualsShowcase.map((manual, idx) => (
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
                      {manual.category}
                    </span>
                    <span className="text-sm font-bold block">{manual.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Visualizador de Alta Resolución */}
            <div className="lg:col-span-8">
              <div className="glass-liquid rounded-3xl border border-white/5 p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono tracking-widest text-orangeleader uppercase">
                      VISUALIZADOR // {brandManualsShowcase[activeTab].category}
                    </span>
                    <span className="text-[9px] font-mono text-[#bef264]/80 tracking-widest uppercase">
                      PULSA PARA AMPLIAR 🔍
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-black uppercase text-white tracking-tight">
                    {brandManualsShowcase[activeTab].title}
                  </h4>
                  
                  <p className="text-starlight/60 text-xs md:text-sm font-light leading-relaxed">
                    {brandManualsShowcase[activeTab].desc}
                  </p>

                  {/* Contenedor de la Imagen */}
                  <div
                    onClick={() => setIsZoomed(true)}
                    className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 cursor-pointer group mt-4 aspect-video flex items-center justify-center"
                  >
                    <Image
                      src={brandManualsShowcase[activeTab].img}
                      alt={brandManualsShowcase[activeTab].title}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-black/80 text-white border border-white/15 rounded-full px-4 py-2 text-xs font-mono tracking-widest uppercase">
                        Ver Imagen Completa
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox / Zoom Modal */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={brandManualsShowcase[activeTab].img}
                    alt={brandManualsShowcase[activeTab].title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <button
                  onClick={() => setIsZoomed(false)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 🚀 Proceso de Construcción de Marca */}
      <section className="relative py-24 border-b border-white/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              NUESTRA INGENIERÍA
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              EL PROCESO DE CARTOGRAFÍA DE MARCA
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Desde la conceptualización del logotipo hasta la codificación final del manual, guiamos tu marca en un viaje seguro de diseño y consistencia corporativa.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className={`glass-liquid p-8 rounded-3xl flex flex-col justify-between min-h-[250px] ${step.colSpan} relative overflow-hidden`}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${step.bgGlow}, transparent 50%)`
                  }}
                />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-mono text-orangeleader tracking-widest uppercase">
                      {step.tag}
                    </span>
                    <span className="text-xs font-black text-white/20">
                      FASE {step.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white uppercase mb-3">
                    {step.title}
                  </h3>
                  <p className="text-starlight/60 text-xs leading-relaxed max-w-3xl mb-6">
                    {step.desc}
                  </p>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {step.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/[0.03] text-starlight/65 border border-white/[0.05]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📦 Órbitas de Servicio (Paquetes) */}
      <section className="relative py-24 border-b border-white/5 bg-transparent" id="paquetes">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              CONFIGURACIONES DISPONIBLES
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              ÓRBITAS DE DISEÑO DE IDENTIDAD
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Selecciona el nivel de estructuración y profundidad que necesita tu tripulación para operar de manera consistente.
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
                  <a
                    href="#contacto-mision"
                    className="w-full flex items-center justify-center bg-white/5 hover:bg-orangeleader hover:text-white text-white border border-white/10 hover:border-orangeleader text-xs font-black uppercase tracking-widest py-4 rounded-full transition-all duration-300 text-center cursor-pointer"
                  >
                    {pack.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Formulario de Misión (Contacto) */}
      <section className="relative py-24 bg-transparent" id="contacto-mision">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(235,63,27,0.04)_0%,transparent_75%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="mb-12">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              ¿LISTO PARA TU VIAJE?
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-4">
              ENVIAR SOLICITUD DE DESPEGUE DE MARCA
            </h3>
            <p className="text-starlight/60 text-sm max-w-xl mx-auto">
              Comienza a modelar tu manual de identidad gráfica y branding. Agenda tu llamada de estrategia de 15 minutos en Google Meet con nuestros expertos.
            </p>
          </div>

          <div className="max-w-xl mx-auto glass-liquid rounded-3xl p-8 shadow-2xl">
            <LeadForm servicioInteres="Identidad Gráfica y Branding" />
          </div>
        </div>
      </section>
    </div>
  );
}
