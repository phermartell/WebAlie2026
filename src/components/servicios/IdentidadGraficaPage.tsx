"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import LeadForm from "@/components/LeadForm";
import Image from "next/image";

const stats = [
  { tech: "IDENTIDAD", value: "Logotipo", label: "Versiones y reglas de uso" },
  { tech: "PALETA", value: "Color", label: "Referencias para tus materiales" },
  { tech: "TIPOGRAFÍA", value: "Fuentes", label: "Jerarquías de texto" },
  { tech: "APLICACIONES", value: "Ejemplos", label: "Piezas según el alcance" }
];

const brandReason = [
  {
    num: "01",
    tag: "LOGOTIPO",
    title: "Elige la versión adecuada del logotipo",
    desc: "Consulta qué versión usar sobre fondos claros u oscuros, cuánto espacio dejar alrededor y qué tamaño conviene según la pieza.",
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "COLOR Y TIPOGRAFÍA",
    title: "Usa referencias comunes para cada pieza",
    desc: "Reúne los colores de marca y las pautas de tipografía para que quienes preparan presentaciones, publicaciones o impresos trabajen con los mismos criterios.",
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "EQUIPO Y PROVEEDORES",
    title: "Comparte una guía con quienes producen tus materiales",
    desc: "Dale a tu equipo, diseñadores e imprentas una referencia para resolver dudas habituales al preparar una pieza.",
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "APLICACIONES",
    title: "Revisa cómo se aplica tu identidad",
    desc: "Según el alcance, el manual puede incluir ejemplos en materiales como presentaciones, papelería o publicaciones digitales. Estos ejemplos sirven como referencia para preparar nuevas piezas.",
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  }
];

const packages = [
  {
    name: "Guía básica de marca",
    desc: "Para equipos que necesitan una referencia breve para usar su identidad visual en los materiales del día a día.",
    items: [
      "Versiones del logotipo y fondos de uso",
      "Tamaño mínimo y espacio alrededor del logotipo",
      "Paleta de colores y tipografías de marca",
      "Guía en PDF para compartir"
    ],
    cta: "Consultar guía básica",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Manual de identidad visual",
    desc: "Para empresas que necesitan documentar más usos de su marca y dar una referencia común a su equipo y a sus proveedores.",
    items: [
      "Variantes del logotipo y criterios de aplicación",
      "Referencias de color para medios digitales e impresos",
      "Jerarquías tipográficas para títulos y textos",
      "Ejemplos de usos correctos e incorrectos",
      "Manual y recursos en los formatos acordados"
    ],
    cta: "Consultar manual",
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/30"
  },
  {
    name: "Manual ampliado con aplicaciones",
    desc: "Para empresas que necesitan orientar el uso de su identidad en varios tipos de materiales, como papelería, presentaciones, empaques o uniformes.",
    items: [
      "Lineamientos visuales según los materiales acordados",
      "Reglas de composición para las piezas prioritarias",
      "Ejemplos de aplicación en los soportes seleccionados",
      "Manual y recursos acordados para el equipo y sus proveedores"
    ],
    cta: "Consultar manual ampliado",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  }
];

const brandManualsShowcase = [
  {
    title: "Mercado de Mar",
    category: "CORTES DE PESCADO A DOMICILIO",
    img: "/branding/mercado_mar.webp",
    desc: "Diseñamos la identidad visual de Mercado de Mar, un negocio de cortes de pescado que vende por encargo y entrega a domicilio."
  },
  {
    title: "MORECSA",
    category: "EQUIPOS DE BOMBEO Y REFACCIONES",
    img: "/branding/morecsa.webp",
    desc: "Elaboramos un manual de marca para MORECSA, distribuidor de equipos de bombeo sumergible, refacciones y productos de jardinería."
  },
  {
    title: "Trebal",
    category: "FIRMA DE ABOGADOS",
    img: "/branding/trebal.webp",
    desc: "Diseñamos la identidad visual y sus lineamientos de uso para Trebal, una firma de abogados en Monterrey."
  },
  {
    title: "Nirue",
    category: "JOYERÍA DE ACERO INOXIDABLE",
    img: "/branding/nirue.webp",
    desc: "Elaboramos un manual de marca para Nirue, una tienda de joyería de acero inoxidable en la Ciudad de México."
  },
  {
    title: "SAX",
    category: "EQUIPO MÉDICO",
    img: "/branding/sax.webp",
    desc: "Rediseñamos la identidad visual de SAX, comercializadora de equipo médico en Puebla, y documentamos su uso en un manual de marca."
  }
];

const processSteps = [
  {
    num: "01",
    tag: "REVISIÓN",
    title: "Revisamos tu identidad actual",
    desc: "Revisamos tu logotipo, los archivos disponibles y las piezas que ya utiliza tu empresa. Identificamos qué dudas debe resolver el manual y acordamos su alcance.",
    items: ["Archivos disponibles", "Usos actuales", "Alcance del manual"],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "LINEAMIENTOS",
    title: "Definimos los criterios visuales",
    desc: "Organizamos las versiones del logotipo, los colores y las tipografías. Si algún elemento necesita ajustarse, definimos contigo si ese trabajo formará parte del proyecto.",
    items: ["Versiones del logotipo", "Paleta de color", "Tipografías"],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "DOCUMENTACIÓN",
    title: "Preparamos el manual",
    desc: "Reunimos las reglas de uso y los ejemplos acordados. Revisamos contigo que la guía responda a las dudas que surgen al preparar materiales para tu empresa.",
    items: ["Reglas de uso", "Ejemplos acordados", "Revisión del manual"],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "ENTREGA",
    title: "Entregamos la guía y sus recursos",
    desc: "Entregamos el manual y los recursos acordados para que tu equipo pueda consultarlos y compartirlos con sus proveedores.",
    items: ["Manual de marca", "Recursos acordados", "Formatos de entrega"],
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
              ← Ver servicios
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-orangeleader text-xs font-black tracking-[0.5em] uppercase">
              IDENTIDAD GRÁFICA
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase text-white leading-[0.95] tracking-tight mb-8">
            Manuales de marca para tu empresa
          </h1>

          <p className="mt-8 text-base md:text-lg text-starlight/70 leading-relaxed font-light max-w-2xl mx-auto">
            Documentamos cómo usar el logotipo, los colores y las tipografías de tu marca. Así, tu equipo y tus proveedores tienen una referencia común al preparar publicaciones, presentaciones o materiales impresos.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="#paquetes"
              className="bg-orangeleader hover:bg-orangeleader/80 text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-[0_10px_20px_rgba(235,63,27,0.3)] hover:shadow-[0_12px_24px_rgba(235,63,27,0.5)] cursor-pointer"
            >
              Ver opciones de manual
            </a>
            <a
              href="#showcase"
              className="border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
            >
              Ver ejemplos
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
              USO DIARIO DE TU MARCA
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              ¿Para qué sirve un manual de marca?
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Un manual reúne las reglas y ejemplos que tu equipo y tus proveedores necesitan para aplicar tu identidad visual en distintos materiales.
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
              PORTAFOLIO
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              Ejemplos de identidad visual y manuales de marca
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Explora una selección de trabajos de diseño, rediseño y documentación de identidad visual para empresas de distintos sectores.
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
              PROCESO DE TRABAJO
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              Cómo preparamos tu manual de marca
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Revisamos los recursos que ya tiene tu marca, acordamos qué usos debe cubrir el manual y documentamos las reglas que tu equipo necesita para preparar sus materiales.
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
              OPCIONES DE MANUAL DE MARCA
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              Una guía según cómo usas tu marca
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Partimos de tu identidad visual actual. Acordamos qué reglas, ejemplos y archivos necesita tu equipo. Si tu logotipo u otros elementos requieren ajustes, los definimos por separado en la propuesta.
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
              HABLEMOS DE TU MARCA
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-4">
              ¿Qué necesitas documentar de tu marca?
            </h3>
            <p className="text-starlight/60 text-sm max-w-xl mx-auto">
              Cuéntanos qué archivos tienes y en qué materiales usas tu marca. Revisamos contigo qué reglas, ejemplos y recursos necesita tu equipo para preparar una propuesta.
            </p>
          </div>

          <div className="max-w-xl mx-auto glass-liquid rounded-3xl p-8 shadow-2xl">
            <LeadForm servicioInteres="Manuales de marca" submitLabel="Solicitar información" />
          </div>
        </div>
      </section>
    </div>
  );
}
