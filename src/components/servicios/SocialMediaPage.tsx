"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import LeadForm from "@/components/LeadForm";

const stats = [
  { value: "Facebook", label: "Canal del proyecto", tech: "PLATAFORMA" },
  { value: "Productos", label: "Contenido de catálogo", tech: "ENFOQUE" },
  { value: "Reels", label: "Ejemplos en video", tech: "FORMATO" },
  { value: "Métricas", label: "Revisión de desempeño", tech: "SEGUIMIENTO" }
];

const smmWork = [
  {
    num: "01",
    tag: "ESTRATEGIA",
    title: "Planeación de contenido",
    desc: "Conocemos tu negocio, tu oferta y las personas a las que quieres llegar. Definimos temas y formatos para organizar publicaciones que expliquen tus productos o servicios.",
    items: [
      "Objetivos y temas de comunicación",
      "Organización del calendario editorial",
      "Selección de formatos y canales",
      "Llamados a la acción según cada publicación"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "REDACCIÓN",
    title: "Mensajes que expliquen tu oferta",
    desc: "Redactamos textos para presentar tus productos, responder dudas frecuentes y comunicar sus características. Adaptamos el tono y los llamados a la acción a tu marca y a cada canal.",
    items: [
      "Textos para publicaciones",
      "Mensajes sobre productos y servicios",
      "Revisión de información con tu equipo"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "DISEÑO",
    title: "Diseño para tus publicaciones",
    desc: "Creamos piezas visuales alineadas con la identidad de tu negocio. Definimos los formatos y los materiales necesarios según el contenido y el alcance acordados.",
    items: [
      "Línea visual consistente",
      "Diseño de imágenes y carruseles",
      "Adaptación de materiales a cada formato"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "INTERACCIÓN",
    title: "Seguimiento de tu comunidad",
    desc: "Cuando el servicio incluye gestión de comunidad, acordamos cómo revisar comentarios y mensajes, qué respuestas podemos atender y qué consultas deben pasar a tu equipo.",
    items: [
      "Canales y horarios de atención acordados",
      "Criterios para responder y canalizar consultas",
      "Seguimiento según el alcance contratado"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  }
];

const monthlyPlan = [
  {
    week: "Etapa 01",
    title: "Planeación de temas",
    desc: "Definimos los temas y las publicaciones según tus objetivos, las novedades del negocio y la información disponible.",
    status: "TEMAS Y CALENDARIO",
    metric: "PLANEACIÓN"
  },
  {
    week: "Etapa 02",
    title: "Diseño y redacción",
    desc: "Preparamos los textos y las piezas visuales contempladas en la propuesta. Compartimos el contenido para revisión antes de publicarlo.",
    status: "CONTENIDO PARA REVISIÓN",
    metric: "PRODUCCIÓN"
  },
  {
    week: "Etapa 03",
    title: "Aprobación y publicación",
    desc: "Incorporamos los ajustes acordados y programamos el contenido aprobado en los canales definidos.",
    status: "PUBLICACIÓN ACORDADA",
    metric: "PUBLICACIÓN"
  },
  {
    week: "Etapa 04",
    title: "Revisión de resultados",
    desc: "Revisamos las métricas disponibles de las publicaciones y compartimos observaciones para orientar los siguientes contenidos.",
    status: "MÉTRICAS Y RECOMENDACIONES",
    metric: "SEGUIMIENTO"
  }
];

const packages = [
  {
    name: "Contenido para tus redes",
    desc: "Para negocios que necesitan organizar los temas y preparar publicaciones para presentar sus productos o servicios.",
    items: [
      "Planeación de temas y calendario",
      "Redacción de textos",
      "Diseño de publicaciones",
      "Revisión y aprobación del contenido",
      "Formatos y cantidades acordados"
    ],
    cta: "Consultar contenido",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Contenido y publicación",
    desc: "Para negocios que necesitan coordinar la preparación y la publicación de contenido en los canales acordados.",
    items: [
      "Planeación de temas y formatos",
      "Diseño y redacción de publicaciones",
      "Programación del contenido aprobado",
      "Revisión de métricas disponibles",
      "Reportes según la propuesta"
    ],
    cta: "Consultar gestión",
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/30"
  },
  {
    name: "Gestión a medida",
    desc: "Para negocios con necesidades particulares de contenido, coordinación de canales o atención de su comunidad.",
    items: [
      "Revisión de canales y necesidades",
      "Definición de formatos y materiales",
      "Coordinación con tu equipo",
      "Atención de comunidad cuando se incluya",
      "Actividades y horarios acordados"
    ],
    cta: "Consultar proyecto",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  }
];

export default function SocialMediaPageClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const screenshots = [
    {
      title: "Resumen de la cuenta de Facebook",
      category: "MÉTRICAS DE LA CUENTA",
      img: "/casos/uniformes-mexicanos/crecimiento-fb.webp",
      desc: "Captura del panel con indicadores de seguidores, visualizaciones, visitas a la página y contenido publicado. El gráfico muestra fechas de enero a julio; la imagen no distingue resultados orgánicos y pagados."
    },
    {
      title: "Cinco publicaciones ordenadas por visualizaciones",
      category: "MÉTRICAS DE PUBLICACIONES",
      img: "/casos/uniformes-mexicanos/top-5-post.webp",
      desc: "La tabla muestra cinco publicaciones ordenadas por visualizaciones, con valores entre 6,76 mil y 9,99 mil. También presenta alcance, reacciones y comentarios de cada publicación."
    },
    {
      title: "Cinco reels ordenados por visualizaciones",
      category: "MÉTRICAS DE VIDEO",
      img: "/casos/uniformes-mexicanos/top-5-reels.webp",
      desc: "La tabla muestra cinco reels con entre 14,82 mil y 27,79 mil visualizaciones de video. Las publicaciones tienen fechas entre enero y junio de 2026."
    },
    {
      title: "Reel sobre calzado de seguridad",
      category: "EJEMPLO DE CONTENIDO",
      img: "/casos/uniformes-mexicanos/post1.webp",
      desc: "Ejemplo de contenido sobre calzado de seguridad. La captura registra 33,6 mil visualizaciones, 22,6 mil espectadores y 60 interacciones."
    },
    {
      title: "Presentación de calzado del catálogo",
      category: "EJEMPLO DE CONTENIDO",
      img: "/casos/uniformes-mexicanos/post2.webp",
      desc: "Reel que presenta un modelo de calzado del catálogo. La captura registra 18,1 mil visualizaciones, 14 mil espectadores y 45 interacciones."
    },
    {
      title: "Otro ejemplo de contenido de producto",
      category: "EJEMPLO DE CONTENIDO",
      img: "/casos/uniformes-mexicanos/post3.webp",
      desc: "Reel de presentación de calzado. La captura registra 14,7 mil visualizaciones, 10,9 mil espectadores y 32 interacciones."
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
              ← Ver servicios
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-orangeleader text-xs font-black tracking-[0.5em] uppercase">
              GESTIÓN DE REDES SOCIALES
            </span>
            <span className="px-3 py-1 rounded-full border border-orangeleader/30 bg-orangeleader/10 text-xs font-black text-orangeleader uppercase tracking-wider">
              CONTENIDO PARA TU NEGOCIO
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase text-white leading-[0.95] tracking-tight mb-8">
            Redes sociales para<br />
            <span className="text-white block mt-2">
              presentar tu negocio
            </span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-starlight/70 leading-relaxed font-light max-w-2xl mx-auto">
            Planeamos, diseñamos y publicamos contenido para explicar qué ofrece tu negocio. Definimos los temas, los formatos y los canales según tus objetivos, y revisamos los resultados para orientar las siguientes publicaciones.
          </p>

          <div className="mt-12 flex justify-center flex-wrap gap-2.5">
            {["Planeación de contenido", "Diseño y redacción", "Publicación", "Gestión según alcance", "Reportes"].map((badge, idx) => (
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
              Consultar redes sociales →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 🛰️ Desglose del Servicio - Bento Grid */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto relative z-10 border-t border-white/[0.04]">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">CONTENIDO Y GESTIÓN</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Qué trabajamos en tus redes sociales
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
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">DE LA PLANEACIÓN A LA PUBLICACIÓN</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Cómo organizamos tu contenido
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Acordamos un calendario de trabajo para preparar, revisar y publicar el contenido. Los tiempos dependen de los formatos, los materiales disponibles y las aprobaciones de tu equipo.
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
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">EXPERIENCIA EN CONTENIDO</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Uniformes Mexicanos
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Una selección de contenido y métricas de Facebook para un negocio de uniformes y calzado de seguridad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
              Contenido para presentar sus productos
            </h3>
            <p className="text-starlight/75 text-sm md:text-base font-light leading-relaxed">
              Trabajamos la comunicación de sus productos mediante textos y piezas visuales para Facebook. Esta selección muestra publicaciones sobre calzado de seguridad y capturas del desempeño registrado en la cuenta.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-2.5 text-xs md:text-sm text-starlight/65">
                <span className="text-orangeleader mt-1">✦</span>
                <span>Presentación de productos y sus características</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs md:text-sm text-starlight/65">
                <span className="text-orangeleader mt-1">✦</span>
                <span>Diseño y redacción de publicaciones</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs md:text-sm text-starlight/65">
                <span className="text-orangeleader mt-1">✦</span>
                <span>Revisión de visualizaciones e interacciones</span>
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
                    DATOS DEL PROYECTO
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
                  <Image
                    src={screenshots[activeTab].img}
                    alt={screenshots[activeTab].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
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
                <Image
                  src={screenshots[activeTab].img}
                  alt={screenshots[activeTab].title}
                  width={1200}
                  height={800}
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
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">OPCIONES DE GESTIÓN</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Contenido según las necesidades de tu negocio
          </h2>
          <p className="mt-4 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Definimos los canales, los formatos y la cantidad de publicaciones según tus objetivos y los materiales disponibles. La propuesta detalla las actividades incluidas y la forma de trabajo.
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
          
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">HABLEMOS DE TUS REDES</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight leading-none">
            ¿Qué necesitas comunicar de tu negocio?
          </h2>
          <p className="text-starlight/75 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Cuéntanos qué productos o servicios ofreces, qué redes utilizas y qué apoyo necesitas con tu contenido. Te orientamos sobre los canales, los formatos y las actividades para preparar una propuesta.
          </p>
          <div className="pt-4 max-w-lg mx-auto">
            <LeadForm servicioInteres="Gestión de redes sociales" submitLabel="Solicitar información" />
          </div>
        </div>
      </section>

    </div>
  );
}
