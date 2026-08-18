"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import LeadForm from "@/components/LeadForm";

const stats = [
  { value: "35% - 45%", label: "Tasa de Apertura Promedio", tech: "ORBIT: OPEN_RATE" },
  { value: "4.8% - 7.5%", label: "CTR de Transmisión", tech: "RAD: CLICK_THROUGH" },
  { value: "99.8%", label: "Entregabilidad de Señal", tech: "SYS: DELIVERABILITY" },
  { value: "Klaviyo & GHL", label: "Sistemas de Despegue", tech: "TLM: PLATFORMS" }
];

const processSteps = [
  {
    num: "01",
    tag: "CARTOGRAFÍA",
    title: "Mapeo de Trayectoria y Objetivos",
    desc: "Analizamos tus metas comerciales, tu oferta y el perfil de tus tripulantes (audiencia). Diseñamos el plan de vuelo inicial definiendo qué mensajes transmitir, a quiénes y en qué momentos clave.",
    items: ["Estudio de buyer persona", "Definición de ofertas ganadoras", "Planificación de frecuencia de envío"],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "DEPURACIÓN",
    title: "Limpieza y Configuración de Señal",
    desc: "Eliminamos contactos inactivos o rebotes para proteger tu reputación de envío. Configuramos dominio, firmas DKIM/SPF y la arquitectura inicial para evitar caer en el agujero negro del spam.",
    items: ["Depuración de rebotes y spam", "Configuración técnica DNS", "Arquitectura de base de datos"],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "PLAN DE VUELO",
    title: "Estrategia de Campañas y Flujos",
    desc: "Diseñamos un calendario de transmisión mensual y definimos los flujos automatizados de respuesta rápida que guiarán a los usuarios en cada etapa de su viaje comercial.",
    items: ["Estrategias de nutrición", "Estructuración de flujos", "Calendario editorial interestelar"],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "REDACCIÓN",
    title: "Copywriting de Alta Frecuencia",
    desc: "Escribimos líneas de asunto magnéticas y textos persuasivos estructurados para captar la atención de tomadores de decisiones. Tono amigable, humano y libre de redundancias robóticas.",
    items: ["Redacción de líneas de asunto", "Llamadas a la acción (CTA) de alto impacto", "Storytelling adaptado"],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "05",
    tag: "MAQUETACIÓN",
    title: "Diseño de Cápsulas de Contenido (Plantillas)",
    desc: "Construimos maquetas responsivas impecables bajo tu línea gráfica premium. Optimizadas para dispositivos móviles y de escritorio, garantizando que el diseño mantenga su consistencia visual en cualquier puerto de lectura.",
    items: ["Maquetación en HTML responsivo", "Diseño de marca consistente", "Optimización de pesos de imágenes"],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "06",
    tag: "IGNICIÓN",
    title: "Automatización y Segmentación en Órbita",
    desc: "Activamos los motores de automatización y dividimos tu lista de contactos en grupos basados en su comportamiento (aperturas, clics, compras previas). Tu mensaje correcto llegará a la persona adecuada.",
    items: ["Segmentación avanzada", "Flujos automáticos de bienvenida", "E-commerce flows automáticos"],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "07",
    tag: "CALIBRACIÓN",
    title: "Pruebas A/B y Optimización",
    desc: "Testeo constante de variantes de asuntos, diseños y enlaces. Analizamos qué combinación genera mayor tracción para ajustar la potencia de envío y maximizar los resultados de tu canal.",
    items: ["A/B Testing en asuntos", "Pruebas de diseño interactivo", "Optimización de entregabilidad"],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "08",
    tag: "TELEMETRÍA",
    title: "Reportes de Misión y Crecimiento",
    desc: "Monitoreamos la tasa de apertura, clics y conversiones de ingresos. Te compartimos reportes claros y accionables con las optimizaciones realizadas y los próximos pasos para seguir conquistando terreno comercial.",
    items: ["Métricas de clics y conversiones", "Recomendaciones de estrategia", "Reportes sencillos y transparentes"],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  }
];

const packages = [
  {
    name: "Órbita 01 - Sonda de Contacto",
    tag: "Transmisión Esencial",
    desc: "Establece una línea de comunicación profesional y periódica con tu tripulación (base de datos) para mantener activa tu presencia de marca.",
    items: [
      "Diseño de Plantilla branded premium",
      "Redacción y Copywriting persuasivo B2B",
      "Envío de 4 Campañas al mes",
      "Segmentación básica de contactos",
      "Configuración y reporte mensual de telemetría",
      "Limpieza de bases de datos inicial"
    ],
    cta: "Iniciar Sonda",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Órbita 02 - Sistema de Acoplamiento",
    tag: "Automatización & Tracción",
    desc: "Automatiza las respuestas a los comportamientos de tus leads. Ideal para convertir prospectos fríos en oportunidades comerciales en piloto automático.",
    items: [
      "Todo lo incluido en la Sonda de Contacto",
      "Envío de 8 Campañas al mes",
      "Diseño avanzado e interactivo de correos",
      "Configuración de 2 Flujos de Automatización (e.g. Bienvenida + Recuperación)",
      "Segmentación de contactos avanzada por interés",
      "Pruebas A/B constantes en asuntos y CTAs",
      "Reporte mensual de rendimiento detallado"
    ],
    cta: "Acoplar Automatizaciones",
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/30"
  },
  {
    name: "Órbita 03 - Estación de Control",
    tag: "Dominación Interestelar",
    desc: "Estrategia multicanal completa con automatizaciones personalizadas VIP y sincronización total con tu CRM para marcas B2B de alto impacto.",
    items: [
      "Todo lo incluido en el Sistema de Acoplamiento",
      "Envío de 12 Campañas al mes",
      "Configuración de 4 Flujos de Automatización VIP avanzados",
      "Sincronización total con CRM y Embudos de Conversión",
      "Optimización SEO de entregabilidad avanzada en servidores de envío",
      "Seguimiento y telemetría avanzada de conversiones web",
      "Sesión mensual prioritaria de estrategia comercial"
    ],
    cta: "Lanzar Estación de Control",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  }
];

const includedFeatures = [
  {
    title: "Estrategia y Calendario Orbital",
    desc: "Mapeamos tus envíos en un calendario mensual estructurado. Sin improvisaciones; cada correo cumple un objetivo dentro de tu embudo comercial."
  },
  {
    title: "Copywriting Humano y Persuasivo",
    desc: "Redacción directa, amena e inteligente orientada a tomadores de decisiones. Aumenta tus aperturas y genera respuestas comerciales reales."
  },
  {
    title: "Plantillas Branded Responsivas",
    desc: "Diseños limpios y profesionales alineados a tu identidad gráfica. Visualización perfecta en smartphones, tablets y clientes de escritorio."
  },
  {
    title: "Segmentación y Depuración",
    desc: "Dividimos tu lista según el nivel de interacción y sector. Protegemos tu reputación enviando solo a señales activas y reduciendo el rebote."
  },
  {
    title: "Automatizaciones que Venden",
    desc: "Respuestas automáticas instantáneas al registrarse, descargar un recurso o abandonar un proceso de compra. Tu negocio atiende 24/7."
  },
  {
    title: "Integración con CRM y Embudos",
    desc: "Sincronizamos tus plataformas de Email con tu CRM principal (GHL, HubSpot, etc.). Registro y actualización automática de información."
  }
];

export default function EmailMarketingPageClient() {
  const [activePreviewTab, setActivePreviewTab] = useState<"welcome" | "nurture" | "stats">("welcome");

  return (
    <div className="relative z-10 w-full overflow-x-hidden">
      {/* Fondo de Estrellas Twinkling independiente */}
      <div className="absolute inset-0 -z-20 starfield pointer-events-none" />
      <OrbitalPath />

      {/* 🚀 Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(235,63,27,0.06)_0%,transparent_80%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
            {/* Tag / Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orangeleader/30 bg-orangeleader/10 text-tangerine text-[13px] font-black tracking-widest uppercase mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orangeleader animate-ping" />
              SISTEMAS DE TRANSMISIÓN INTERESTELAR
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] uppercase tracking-tight"
            >
              CONECTA CON TU AUDIENCIA <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orangeleader to-tangerine">
                EN CUALQUIER GALAXIA
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-starlight/75 text-[15px] sm:text-[17px] md:text-[19px] leading-relaxed max-w-2xl font-medium"
            >
              Diseñamos e implementamos campañas de **Email Marketing** y **Automatizaciones de CRM** que convierten prospectos fríos en clientes habituales. Mensajes persuasivos, plantillas branded impecables e integración directa con tu CRM operativo.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
            >
              <a
                href="#contacto-mision"
                className="w-full sm:w-auto bg-orangeleader hover:bg-tangerine text-white rounded-full px-8 py-4 font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_10px_30px_rgba(235,63,27,0.3)] text-center"
              >
                Iniciar Mi Transmisión →
              </a>
              <a
                href="#que-incluye"
                className="w-full sm:w-auto border border-white/20 hover:border-white text-white rounded-full px-8 py-4 font-black text-xs uppercase tracking-widest transition-all cursor-pointer text-center"
              >
                Explorar Componentes
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🖥️ Interactive Simulation Section (Interactive "Screenshot" and Telemetry) */}
      <section className="relative py-24 border-b border-white/5" id="telemetria-interactiva">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              DEMOSTRACIÓN DE SISTEMAS DE COMUNICACIÓN
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              TABLERO DE TELEMETRÍA EN VIVO
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Explora cómo viajan nuestras transmisiones y cómo estructuramos los correos para garantizar aperturas masivas y clics precisos.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            {/* Control Panel */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => setActivePreviewTab("welcome")}
                className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col ${
                  activePreviewTab === "welcome"
                    ? "bg-orangeleader/10 border-orangeleader/40 shadow-lg shadow-orangeleader/5"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                }`}
              >
                <span className="text-[10px] font-mono text-orangeleader uppercase tracking-wider mb-1">01 // AUTOMATION FLOW</span>
                <span className="text-sm font-black text-white uppercase">Secuencia de Bienvenida</span>
                <span className="text-xs text-starlight/50 mt-1">Activación inmediata tras el primer acoplamiento del prospecto.</span>
              </button>

              <button
                onClick={() => setActivePreviewTab("nurture")}
                className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col ${
                  activePreviewTab === "nurture"
                    ? "bg-orangeleader/10 border-orangeleader/40 shadow-lg shadow-orangeleader/5"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                }`}
              >
                <span className="text-[10px] font-mono text-orangeleader uppercase tracking-wider mb-1">02 // SALES SEQUENCE</span>
                <span className="text-sm font-black text-white uppercase">Campaña Persuasiva B2B</span>
                <span className="text-xs text-starlight/50 mt-1">Diseñada para guiar con suavidad hacia la conversión comercial.</span>
              </button>

              <button
                onClick={() => setActivePreviewTab("stats")}
                className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col ${
                  activePreviewTab === "stats"
                    ? "bg-orangeleader/10 border-orangeleader/40 shadow-lg shadow-orangeleader/5"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                }`}
              >
                <span className="text-[10px] font-mono text-orangeleader uppercase tracking-wider mb-1">03 // REAL-TIME METRICS</span>
                <span className="text-sm font-black text-white uppercase">Métricas de Transmisión</span>
                <span className="text-xs text-starlight/50 mt-1">Panel de control de entregabilidad y tasas de click en vivo.</span>
              </button>
            </div>

            {/* Live Preview Container (Visual Mockup of an Email App / CRM Dashboard) */}
            <div className="lg:col-span-8 bg-black/60 border border-white/10 rounded-3xl overflow-hidden p-1 shadow-2xl relative min-h-[420px] flex flex-col">
              {/* Fake App Header Bar */}
              <div className="bg-[#121212] px-6 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[11px] font-mono text-starlight/45 uppercase tracking-widest">
                  ALIE_SYS_TRANSMISSION_v3.2
                </div>
                <div className="w-4" />
              </div>

              {/* Live Preview Window */}
              <div className="p-6 flex-1 flex flex-col bg-[#050505]">
                <AnimatePresence mode="wait">
                  {activePreviewTab === "welcome" && (
                    <motion.div
                      key="welcome"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-5 mb-4 text-xs font-mono text-starlight/70 flex flex-col gap-2">
                        <div><span className="text-orangeleader">De:</span> Alié Digital &lt;transmisiones@aliedigital.com&gt;</div>
                        <div><span className="text-orangeleader">Para:</span> comandante@sectorcomercial.com</div>
                        <div className="border-t border-white/5 pt-2 mt-1"><span className="text-orangeleader">Asunto:</span> 🚀 Bienvenido a la Órbita de Alié Digital - Fase 01 de tu Despegue</div>
                      </div>
                      
                      {/* Simulated email body */}
                      <div className="bg-black border border-white/5 rounded-2xl p-6 text-xs text-starlight/85 leading-relaxed flex-1">
                        <div className="w-full flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                          <span className="font-black text-white tracking-widest uppercase">ALIÉ DIGITAL</span>
                          <span className="text-[9px] text-orangeleader font-mono">CONEXIÓN_SEGURA_ESTABLECIDA</span>
                        </div>
                        <p className="font-bold text-white text-sm mb-3">Hola, Tripulante.</p>
                        <p className="mb-4">
                          Tu señal ha sido recibida con éxito en nuestra estación base. A partir de hoy, tienes acceso a telemetría de primera mano para optimizar el rendimiento comercial de tus campañas y sitios web.
                        </p>
                        <div className="my-5 p-4 rounded-xl bg-orangeleader/5 border border-orangeleader/15 text-center">
                          <span className="block font-black text-white uppercase mb-1">Tu primer regalo de bienvenida</span>
                          <span className="text-[11px] text-starlight/70">Hemos desbloqueado tu plantilla de auditoría SEO de alto rendimiento. Descárgala a continuación:</span>
                          <span className="inline-block mt-3 bg-orangeleader text-white rounded-full px-4 py-2 font-black text-[10px] uppercase tracking-wider cursor-pointer">
                            Descargar Bitácora de Vuelo →
                          </span>
                        </div>
                        <p className="text-starlight/60">
                          Nos vemos en el espacio exterior,<br />
                          El equipo de Alié Digital.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activePreviewTab === "nurture" && (
                    <motion.div
                      key="nurture"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-5 mb-4 text-xs font-mono text-starlight/70 flex flex-col gap-2">
                        <div><span className="text-orangeleader">De:</span> Alié Digital &lt;estrategias@aliedigital.com&gt;</div>
                        <div><span className="text-orangeleader">Para:</span> director@empresab2b.com</div>
                        <div className="border-t border-white/5 pt-2 mt-1"><span className="text-orangeleader">Asunto:</span> ¿Por qué tus leads se están perdiendo en el vacío digital? 🛸</div>
                      </div>
                      
                      {/* Simulated email body */}
                      <div className="bg-black border border-white/5 rounded-2xl p-6 text-xs text-starlight/85 leading-relaxed flex-1">
                        <div className="w-full flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                          <span className="font-black text-white tracking-widest uppercase">ALIÉ DIGITAL</span>
                          <span className="text-[9px] text-[#ff8643] font-mono">SEÑAL: CAMPAÑA_VALOR</span>
                        </div>
                        <p className="mb-3 font-bold text-white text-sm">¿Señal interrumpida?</p>
                        <p className="mb-4">
                          El 97% de los usuarios que aterrizan en tu puerto web no están listos para comprar en ese mismo instante. Si no mantienes una frecuencia de comunicación con ellos, se desvanecerán en la galaxia digital de tu competencia.
                        </p>
                        <p className="mb-4">
                          Nuestro sistema de acoplamiento automático de emails mantiene tus señales activas sin requerir tu tiempo de forma constante. Logramos que tu marca sea recordada cuando el usuario esté listo para cerrar el contrato.
                        </p>
                        <div className="text-center my-4">
                          <span className="inline-block bg-[#ff8643] text-white rounded-full px-5 py-2.5 font-black text-[10px] uppercase tracking-wider cursor-pointer">
                            Agendar Análisis de Transmisión →
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activePreviewTab === "stats" && (
                    <motion.div
                      key="stats"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="flex-1 flex flex-col justify-center"
                    >
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                          <span className="text-[9px] font-mono text-starlight/45 uppercase tracking-wider block mb-1">APERTURAS</span>
                          <span className="text-2xl font-black text-green-400">42.4%</span>
                          <span className="text-[8px] font-mono text-green-400/80 block mt-1">▲ +8.2% vs. promedio</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                          <span className="text-[9px] font-mono text-starlight/45 uppercase tracking-wider block mb-1">CLICS</span>
                          <span className="text-2xl font-black text-white">6.8%</span>
                          <span className="text-[8px] font-mono text-orangeleader block mt-1">▲ +2.1% en flujos</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                          <span className="text-[9px] font-mono text-starlight/45 uppercase tracking-wider block mb-1">REBOTES</span>
                          <span className="text-2xl font-black text-starlight/75">0.18%</span>
                          <span className="text-[8px] font-mono text-starlight/40 block mt-1">SANO // EXCELENTE</span>
                        </div>
                      </div>

                      {/* Fake graph container using divs */}
                      <div className="bg-black border border-white/5 rounded-2xl p-4 flex flex-col gap-2 flex-1 justify-end min-h-[160px]">
                        <span className="text-[9px] font-mono text-starlight/40 uppercase tracking-widest mb-2">PROGRESIÓN DE ENTREGABILIDAD (MÓDULOS ACTIVOS)</span>
                        <div className="flex items-end justify-between gap-2 h-28 px-4 border-b border-l border-white/10 pt-2">
                          <div className="bg-orangeleader/20 border-t-2 border-orangeleader w-8 h-[40%]" />
                          <div className="bg-orangeleader/30 border-t-2 border-orangeleader w-8 h-[55%]" />
                          <div className="bg-orangeleader/40 border-t-2 border-orangeleader w-8 h-[70%]" />
                          <div className="bg-orangeleader/60 border-t-2 border-orangeleader w-8 h-[85%]" />
                          <div className="bg-orangeleader border-t-2 border-tangerine w-8 h-[98%] shadow-[0_0_15px_rgba(235,63,27,0.3)] animate-pulse" />
                        </div>
                        <div className="flex justify-between text-[8px] font-mono text-starlight/40 mt-1">
                          <span>S1: DEPURACIÓN</span>
                          <span>S2: TEMPLATES</span>
                          <span>S3: LANZAMIENTO</span>
                          <span>S4: AUTOMACIÓN</span>
                          <span>ACTUAL</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Packages Section (Without prices) */}
      <section className="relative py-24" id="paquetes">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              CONFIGURACIONES DE TRANSMISIÓN ORBITAL
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              MODELOS DE ENLACE DIGITAL
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Calibramos los motores de tu email marketing y de tu CRM de acuerdo con las dimensiones y necesidades de adquisición de tu marca.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <SpotlightCard
                key={idx}
                className="glass-liquid relative flex flex-col justify-between p-8 rounded-3xl h-full overflow-hidden"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${pkg.glow}, transparent 55%)`
                  }}
                />
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orangeleader bg-orangeleader/10 border border-orangeleader/30 rounded-full px-3 py-1">
                    {pkg.tag}
                  </span>
                  <h4 className="text-xl font-black text-white mt-6 mb-3 uppercase">
                    {pkg.name}
                  </h4>
                  <p className="text-starlight/60 text-xs leading-relaxed mb-6">
                    {pkg.desc}
                  </p>
                  <div className="h-px bg-white/10 my-6" />
                  <ul className="space-y-3.5 mb-8">
                    {pkg.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-starlight/85 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-orangeleader mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#contacto-mision"
                  className="w-full text-center bg-white/5 hover:bg-orangeleader text-white rounded-full py-3.5 px-6 font-black text-[11px] uppercase tracking-wider transition-all"
                >
                  {pkg.cta}
                </a>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 🛠️ Process Steps Section */}
      <section className="relative py-24 border-t border-white/5 bg-transparent" id="proceso">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              HOJA DE RUTA HACIA EL ÉXITO
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase">
              EL VIAJE DE TU MENSAJE INTERESTELAR
            </h2>
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

      {/* 🔮 What's Included / Included Components Section */}
      <section className="relative py-24 border-t border-white/5 bg-transparent" id="que-incluye">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              ¿QUÉ INCLUYEN NUESTROS COMPONENTES DE TRANSMISIÓN?
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              ELEMENTOS DE OPERACIÓN
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Cada elemento está calibrado para asegurar que tus mensajes lleguen al destino planeado sin interferencias.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {includedFeatures.map((feat, idx) => (
              <div key={idx} className="glass-liquid p-8 rounded-3xl relative overflow-hidden border border-white/5">
                <div className="w-8 h-8 rounded-full bg-orangeleader/10 border border-orangeleader/30 flex items-center justify-center text-orangeleader text-sm font-black font-mono mb-6">
                  {idx + 1}
                </div>
                <h4 className="text-base font-black text-white uppercase mb-2">
                  {feat.title}
                </h4>
                <p className="text-starlight/60 text-xs leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Formulario de Misión (CRM LeadForm) */}
      <section className="relative py-24 border-t border-white/5 bg-transparent" id="contacto-mision">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(235,63,27,0.04)_0%,transparent_75%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="mb-12">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              ¿LISTO PARA DESPEGAR EN TU ESTRATEGIA DE EMAIL?
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-4">
              CONECTEMOS TU EMISORA DE SEÑAL
            </h3>
            <p className="text-starlight/60 text-sm max-w-xl mx-auto">
              Agenda tu llamada de estrategia de 15 minutos en Google Meet para diseñar tu nueva infraestructura de automatizaciones de correo.
            </p>
          </div>

          <div className="max-w-xl mx-auto glass-liquid rounded-3xl p-8 shadow-2xl">
            <LeadForm servicioInteres="Email Marketing" />
          </div>
        </div>
      </section>
    </div>
  );
}
