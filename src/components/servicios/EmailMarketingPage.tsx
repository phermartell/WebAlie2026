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
    tag: "OBJETIVOS",
    title: "Definimos qué necesitas comunicar",
    desc: "Revisamos tu oferta, tus contactos y el objetivo de los correos para acordar qué mensajes preparar y a quiénes dirigirlos.",
    items: ["Objetivo de la comunicación", "Perfil de los destinatarios", "Frecuencia de envío acordada"],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "PREPARACIÓN",
    title: "Revisamos contactos y plataforma",
    desc: "Revisamos el origen y el estado de los contactos, las bajas y los requisitos de la herramienta de envío. Comprobamos la configuración del remitente según los accesos y el alcance acordados.",
    items: ["Revisión de listas y suscripciones", "Gestión de bajas y rebotes", "Configuración del remitente"],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "PLANEACIÓN",
    title: "Organizamos campañas y secuencias",
    desc: "Definimos los temas, el calendario y las condiciones de las secuencias automatizadas cuando formen parte del proyecto.",
    items: ["Temas y calendario", "Recorridos de seguimiento", "Condiciones de automatización"],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "REDACCIÓN",
    title: "Preparamos asuntos y mensajes",
    desc: "Redactamos el contenido del correo para explicar tu oferta y proponer un siguiente paso claro. Revisamos contigo la información antes del envío.",
    items: ["Asuntos y textos de vista previa", "Contenido del mensaje", "Llamados a la acción"],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "05",
    tag: "DISEÑO",
    title: "Diseñamos la plantilla",
    desc: "Adaptamos el contenido a una plantilla alineada con tu marca. Revisamos su presentación en los dispositivos y clientes de correo contemplados en la propuesta.",
    items: ["Estructura y jerarquía visual", "Adaptación a dispositivos móviles", "Preparación de imágenes"],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "06",
    tag: "CONFIGURACIÓN",
    title: "Configuramos destinatarios y envíos",
    desc: "Preparamos los segmentos y las condiciones de envío con la información disponible. Configuramos las automatizaciones incluidas en el alcance.",
    items: ["Criterios de selección de contactos", "Programación de campañas", "Configuración de flujos acordados"],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "07",
    tag: "PRUEBAS",
    title: "Revisamos antes de activar",
    desc: "Comprobamos textos, enlaces y funcionamiento de los correos. Coordinamos la aprobación y realizamos pruebas de las secuencias cuando correspondan.",
    items: ["Revisión de contenido y enlaces", "Envíos de prueba", "Pruebas de condiciones y recorridos"],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "08",
    tag: "SEGUIMIENTO",
    title: "Revisamos resultados y ajustes",
    desc: "Revisamos los indicadores disponibles en la plataforma y compartimos observaciones para los siguientes envíos. La medición de acciones en el sitio depende de la configuración acordada.",
    items: ["Aperturas, clics y rebotes registrados", "Acciones medidas cuando corresponda", "Recomendaciones para próximos envíos"],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  }
];

const packages = [
  {
    name: "Campañas de correo",
    tag: "COMUNICACIÓN CON TUS CONTACTOS",
    desc: "Para negocios que necesitan preparar y enviar correos con novedades, productos o información de interés para su base de contactos.",
    items: [
      "Planeación de temas y envíos",
      "Redacción de asuntos y mensajes",
      "Diseño de plantilla según tu marca",
      "Selección de destinatarios según criterios acordados",
      "Revisión de resultados del envío"
    ],
    cta: "Consultar campañas",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Automatizaciones de correo",
    tag: "SEGUIMIENTO PROGRAMADO",
    desc: "Para negocios que necesitan organizar mensajes de bienvenida o seguimiento a partir de acciones y condiciones definidas.",
    items: [
      "Definición del recorrido y sus condiciones",
      "Preparación de mensajes de la secuencia",
      "Configuración según la plataforma disponible",
      "Pruebas antes de activar el flujo",
      "Revisión y ajustes según el alcance"
    ],
    cta: "Consultar automatización",
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/30"
  },
  {
    name: "Integración con tus herramientas",
    tag: "CONEXIONES SEGÚN EL PROYECTO",
    desc: "Para negocios que necesitan conectar sus formularios, contactos o CRM con una plataforma de correo. Revisamos la viabilidad antes de definir la solución.",
    items: [
      "Revisión de herramientas y accesos",
      "Definición de datos y eventos necesarios",
      "Integraciones según compatibilidad",
      "Pruebas de funcionamiento",
      "Documentación y entrega según la propuesta"
    ],
    cta: "Consultar integración",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  }
];

const includedFeatures = [
  {
    title: "Planeación de campañas",
    desc: "Organizamos los temas, los destinatarios y el calendario de envíos para que cada correo tenga un objetivo definido."
  },
  {
    title: "Redacción de mensajes",
    desc: "Preparamos asuntos, textos de vista previa y contenido para explicar tu oferta y proponer un siguiente paso claro."
  },
  {
    title: "Diseño de plantillas",
    desc: "Diseñamos correos alineados con tu marca y revisamos su presentación en los dispositivos y clientes de correo acordados."
  },
  {
    title: "Organización de contactos",
    desc: "Revisamos listas, suscripciones y criterios de segmentación para preparar los destinatarios de cada campaña."
  },
  {
    title: "Secuencias automatizadas",
    desc: "Configuramos mensajes que se activan mediante acciones o condiciones definidas, según las funciones de la plataforma y el alcance del proyecto."
  },
  {
    title: "Conexión con otras herramientas",
    desc: "Evaluamos la conexión de formularios, CRM y plataformas de correo para compartir los datos necesarios según su compatibilidad."
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
              EMAIL MARKETING Y AUTOMATIZACIÓN
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] uppercase tracking-tight"
            >
              Correos para mantener <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orangeleader to-tangerine">
                el contacto con tus clientes
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-starlight/75 text-[15px] sm:text-[17px] md:text-[19px] leading-relaxed max-w-2xl font-medium"
            >
              Planeamos y preparamos campañas de correo para compartir novedades, presentar productos y dar seguimiento a tus contactos. Definimos los mensajes, los envíos y las automatizaciones según las necesidades de tu negocio.
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
                Consultar email marketing →
              </a>
              <a
                href="#que-incluye"
                className="w-full sm:w-auto border border-white/20 hover:border-white text-white rounded-full px-8 py-4 font-black text-xs uppercase tracking-widest transition-all cursor-pointer text-center"
              >
                Conocer el servicio
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
              EJEMPLOS DE EMAIL MARKETING
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              Explora mensajes y métricas
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Estos ejemplos ilustran cómo puede presentarse un correo y qué indicadores pueden revisarse después de un envío. Son demostraciones y no corresponden a campañas ni resultados de clientes.
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
                <span className="text-[10px] font-mono text-orangeleader uppercase tracking-wider mb-1">01 // EJEMPLO</span>
                <span className="text-sm font-black text-white uppercase">Correo de bienvenida</span>
                <span className="text-xs text-starlight/50 mt-1">Un primer mensaje para presentar tu negocio y orientar al contacto.</span>
              </button>

              <button
                onClick={() => setActivePreviewTab("nurture")}
                className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col ${
                  activePreviewTab === "nurture"
                    ? "bg-orangeleader/10 border-orangeleader/40 shadow-lg shadow-orangeleader/5"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                }`}
              >
                <span className="text-[10px] font-mono text-orangeleader uppercase tracking-wider mb-1">02 // EJEMPLO</span>
                <span className="text-sm font-black text-white uppercase">Correo de seguimiento</span>
                <span className="text-xs text-starlight/50 mt-1">Un mensaje para compartir información y ofrecer un siguiente paso.</span>
              </button>

              <button
                onClick={() => setActivePreviewTab("stats")}
                className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col ${
                  activePreviewTab === "stats"
                    ? "bg-orangeleader/10 border-orangeleader/40 shadow-lg shadow-orangeleader/5"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                }`}
              >
                <span className="text-[10px] font-mono text-orangeleader uppercase tracking-wider mb-1">03 // INDICADORES</span>
                <span className="text-sm font-black text-white uppercase">Indicadores de envío</span>
                <span className="text-xs text-starlight/50 mt-1">Conoce qué información revisar después de una campaña.</span>
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
                  VISTA PREVIA DE EJEMPLO
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
                        <div><span className="text-orangeleader">De:</span> Alié Digital &lt;hola@example.com&gt;</div>
                        <div><span className="text-orangeleader">Para:</span> contacto@example.com</div>
                        <div className="border-t border-white/5 pt-2 mt-1"><span className="text-orangeleader">Asunto:</span> Gracias por tu interés en nuestros servicios</div>
                      </div>
                      
                      {/* Simulated email body */}
                      <div className="bg-black border border-white/5 rounded-2xl p-6 text-xs text-starlight/85 leading-relaxed flex-1">
                        <div className="w-full flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                          <span className="font-black text-white tracking-widest uppercase">ALIÉ DIGITAL</span>
                          <span className="text-[9px] text-orangeleader font-mono">EJEMPLO DE BIENVENIDA</span>
                        </div>
                        <h4 className="font-bold text-white text-sm mb-3">Gracias por ponerte en contacto</h4>
                        <p className="mb-4">
                          Recibimos tu solicitud de información. Para orientarte, nos gustaría conocer qué ofrece tu negocio y qué necesitas resolver.
                        </p>
                        <p className="mb-6">
                          Puedes consultar nuestros servicios y compartirnos cuáles te interesan. Con esa información podremos revisar el alcance de una propuesta.
                        </p>
                        <div className="text-center my-4">
                          <a
                            href="/servicios"
                            className="inline-block bg-orangeleader hover:bg-tangerine text-white rounded-full px-5 py-2.5 font-black text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Conocer los servicios →
                          </a>
                        </div>
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
                        <div><span className="text-orangeleader">De:</span> Alié Digital &lt;hola@example.com&gt;</div>
                        <div><span className="text-orangeleader">Para:</span> contacto@example.com</div>
                        <div className="border-t border-white/5 pt-2 mt-1"><span className="text-orangeleader">Asunto:</span> ¿Retomamos lo que necesitas para tu negocio?</div>
                      </div>
                      
                      {/* Simulated email body */}
                      <div className="bg-black border border-white/5 rounded-2xl p-6 text-xs text-starlight/85 leading-relaxed flex-1">
                        <div className="w-full flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                          <span className="font-black text-white tracking-widest uppercase">ALIÉ DIGITAL</span>
                          <span className="text-[9px] text-[#ff8643] font-mono">EJEMPLO DE SEGUIMIENTO</span>
                        </div>
                        <h4 className="font-bold text-white text-sm mb-3">Sigamos con tu proyecto</h4>
                        <p className="mb-4">
                          Si todavía estás revisando cómo mejorar la presencia digital de tu negocio, podemos ayudarte a ordenar las prioridades y definir qué necesitas.
                        </p>
                        <p className="mb-6">
                          Cuéntanos qué productos o servicios ofreces y cuál es tu objetivo. Con esa información podremos orientarte sobre las opciones de trabajo.
                        </p>
                        <div className="text-center my-4">
                          <a
                            href="#contacto-mision"
                            className="inline-block bg-[#ff8643] hover:bg-orangeleader text-white rounded-full px-5 py-2.5 font-black text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Consultar mi proyecto →
                          </a>
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
                          <span className="text-xl sm:text-2xl font-black text-white block">Lectura</span>
                          <span className="text-[10px] sm:text-xs text-starlight/60 block mt-1 leading-snug">Aperturas registradas por la plataforma</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                          <span className="text-[9px] font-mono text-starlight/45 uppercase tracking-wider block mb-1">CLICS</span>
                          <span className="text-xl sm:text-2xl font-black text-white block">Interés</span>
                          <span className="text-[10px] sm:text-xs text-starlight/60 block mt-1 leading-snug">Clics registrados en los enlaces</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                          <span className="text-[9px] font-mono text-starlight/45 uppercase tracking-wider block mb-1">REBOTES</span>
                          <span className="text-xl sm:text-2xl font-black text-white block">Entrega</span>
                          <span className="text-[10px] sm:text-xs text-starlight/60 block mt-1 leading-snug">Mensajes que no pudieron entregarse</span>
                        </div>
                      </div>

                      {/* Text block container */}
                      <div className="bg-black border border-white/5 rounded-2xl p-5 flex flex-col justify-center flex-1 min-h-[160px]">
                        <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2">
                          Cómo revisamos un envío
                        </h4>
                        <p className="text-xs text-starlight/75 leading-relaxed mb-3">
                          Revisamos los indicadores disponibles en la plataforma y los relacionamos con el objetivo del correo. Las aperturas, los clics y los rebotes ayudan a detectar aspectos que conviene revisar.
                        </p>
                        <p className="text-[11px] text-starlight/50 leading-relaxed">
                          Las aperturas registradas no equivalen necesariamente a lecturas reales.
                        </p>
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
              OPCIONES DE SERVICIO
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              Campañas y automatizaciones según tu negocio
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Revisamos tus contactos, los mensajes que necesitas enviar y las herramientas disponibles. La propuesta detalla las actividades, la frecuencia de trabajo y los costos de plataforma por separado de los honorarios del servicio.
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
              DE LA PLANEACIÓN AL SEGUIMIENTO
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase">
              Cómo preparamos tus campañas de correo
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
              ACTIVIDADES DEL SERVICIO
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              Qué podemos trabajar en tus correos
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Acordamos las actividades necesarias para preparar tus campañas y automatizaciones según tus objetivos, tus contactos y las herramientas disponibles.
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
              HABLEMOS DE TUS CAMPAÑAS
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-4">
              ¿Qué necesitas comunicar por correo?
            </h3>
            <p className="text-starlight/60 text-sm max-w-xl mx-auto">
              Cuéntanos qué mensajes quieres enviar, a quiénes y qué herramientas usas. Podemos ayudarte a definir si necesitas campañas, mensajes automáticos o una integración con las herramientas que ya utilizas.
            </p>
          </div>

          <div className="max-w-xl mx-auto glass-liquid rounded-3xl p-8 shadow-2xl">
            <LeadForm servicioInteres="Email Marketing" submitLabel="Solicitar información" />
          </div>
        </div>
      </section>
    </div>
  );
}
