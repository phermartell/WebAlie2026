"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import LeadForm from "@/components/LeadForm";

const stats = [
  { value: "99.9%", label: "Precisión de Captura", tech: "SYS: COREAI_READ" },
  { value: "1 Touch", label: "Revisión de Excepciones", tech: "RAD: HUMAN_INPUT" },
  { value: "2x Vol", label: "Escalabilidad Operativa", tech: "ORBIT: SCALE_FACTOR" },
  { value: "Multi", label: "Formatos e Integración", tech: "TLM: CHANNELS" }
];

const reasons = [
  {
    num: "01",
    tag: "VARIABILIDAD",
    title: "Cada Cliente Transmite a su Estilo",
    desc: "PDFs redactados a mano, hojas de Excel estructuradas al revés, correos planos o archivos EDI. Cada cliente envía sus órdenes en formatos diferentes y cambiantes, creando un ruido de comunicación insostenible.",
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "INCOMPATIBILIDAD",
    title: "Incompatibilidad de Datos ERP",
    desc: "Tu ERP es estricto y estructurado. Los formatos arbitrarios de tus proveedores y clientes no pueden ingresar directamente, requiriendo traducción humana antes de cualquier procesamiento.",
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "COMPLEJIDAD",
    title: "La Fricción Operativa se Multiplica",
    desc: "Validar códigos de producto (SKUs), equivalencias de empaque, stock disponible y precios pactados requiere llamadas y correos interminables de validación interna.",
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "SATURACIÓN",
    title: "Cuello de Botella en el Despegue",
    desc: "El ingreso de datos manual consume horas de tu tripulación más valiosa. En vez de impulsar el crecimiento y optimizar el servicio, tu equipo pasa el día tecleando órdenes en pantallas negras.",
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  }
];

const chaosSteps = [
  { text: "Llega el correo con la orden de compra", icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2 6 12 13 22 6" />
    </svg>
  )},
  { text: "Un operador descarga el PDF y lo interpreta", icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )},
  { text: "Se digitan las partidas renglón por renglón", icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  )},
  { text: "Se verifica stock y precios de forma manual", icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )},
  { text: "Errores y discrepancias detectados tarde", icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )},
  { text: "Envío manual de confirmación de pedido", icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )},
  { text: "Se archiva la orden físicamente o en carpetas", icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  )}
];

const orderSteps = [
  { text: "El cliente transmite la orden por correo o portal.", type: "base" },
  { text: "Alié IA captura y extrae los datos del documento.", type: "auto" },
  { text: "Cotejo automático de SKUs, precios y stock contra el ERP.", type: "auto" },
  { text: "Resolución autónoma de discrepancias menores.", type: "auto" },
  { text: "Inserción automática y directa en el ERP de la orden limpia.", type: "auto" },
  { text: "La tripulación solo revisa las excepciones de alto nivel.", type: "human" }
];

const processSteps = [
  {
    num: "ETAPA 01",
    title: "CAPTURA AUTOMATIZADA",
    desc: "Alié IA intercepta y extrae información de pedidos o facturas desde cualquier puerto de transmisión: correos, portales de proveedores, archivos PDF estructurados, planillas de Excel, formatos CSV o conexiones EDI.",
    tags: ["PDF", "EXCEL", "CSV", "EDI", "EMAIL", "IMÁGENES"]
  },
  {
    num: "ETAPA 02",
    title: "VALIDACIÓN INTELIGENTE (COREAI)",
    desc: "El sistema mapea y valida cada renglón de información en tiempo real contra los registros internos de tu ERP. Traduce equivalencias de códigos de producto, verifica disponibilidad de inventario y valida las condiciones de precio acordadas de forma autónoma.",
    tags: ["VALIDACIÓN SKU", "PRECIOS", "STOCK", "ERRORES PREVIOS"]
  },
  {
    num: "ETAPA 03",
    title: "INSERCIÓN DIRECTA EN ERP",
    desc: "La información validada se inyecta directamente a la base de datos de tu ERP (SAP, Oracle, Dynamics, Intelisis, etc.) en segundos. Tu operación obtiene pedidos listos para surtir sin haber digitado una sola tecla.",
    tags: ["INTEGRACIÓN ERP", "CERO SEGUNDOS", "CERO ERRORES"]
  }
];

const outcomes = [
  {
    title: "Filtro de Errores",
    desc: "Las inconsistencias en precios, cantidades o códigos de productos se detectan y resuelven antes de entrar en tu ERP, evitando devoluciones y fallas logísticas aguas abajo."
  },
  {
    title: "Duplica tu Capacidad",
    desc: "Tu tripulación podrá procesar más del doble de volumen de transacciones con la misma cantidad de personal. El escalamiento operacional deja de requerir mayor contratación."
  },
  {
    title: "Ecosistema Unificado",
    desc: "No importa cómo elijan transmitir tus clientes o proveedores. Todo el caos multiformato se consolida de manera homogénea bajo un único flujo digital de la nave."
  }
];

export default function IaPageClient() {
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
          AUTOMATE
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
              PROPULSIÓN DE PROCESOS
            </span>
            <span className="px-3 py-1 rounded-full border border-orangeleader/30 bg-orangeleader/10 text-xs font-black text-orangeleader uppercase tracking-wider">
              INTELIGENCIA ARTIFICIAL
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase text-white leading-[0.95] tracking-tight mb-8">
            AUTOMATIZACIÓN DE PEDIDOS.<br />
            <span className="text-transparent block mt-2" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.75)" }}>
              CERO TRABAJO MANUAL.
            </span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-starlight/70 leading-relaxed font-light max-w-2xl mx-auto">
            Cada orden de compra que tu equipo digita a mano es combustible que tu operación pierde. Captura, valida e inserta pedidos y facturas en tu ERP con Inteligencia Artificial. Sin errores. Sin demoras.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="#contacto"
              className="bg-orangeleader hover:bg-orangeleader/80 text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-[0_10px_20px_rgba(235,63,27,0.3)] hover:shadow-[0_12px_24px_rgba(235,63,27,0.5)] cursor-pointer"
            >
              Iniciar Expedición de Automatización
            </a>
            <a
              href="#funcionamiento"
              className="border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
            >
              Ver Plan de Vuelo
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

      {/* 🛡️ Sección: Por Qué Automatizar */}
      <section className="relative py-24 border-b border-white/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              DIAGNÓSTICO DE INGENIERÍA
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              EL CUELLO DE BOTELLA MANUAL EN LA NAVE NODRIZA
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Mantener un equipo digitando caracteres es ineficiente y frena la propulsión comercial de tu flota. Conoce los desafíos de la transmisión convencional de datos.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {reasons.map((reason, idx) => (
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
                      DESAFÍO {reason.num}
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

      {/* 🔄 Órbitas en Contraste (Antes / Después) */}
      <section className="relative py-24 border-b border-white/5 bg-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              ANÁLISIS DE RUTA
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              UNA MISMA TRANSMISIÓN. DOS DESTINOS DISTINTOS.
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Compara el viaje de una orden de compra bajo la fricción de la órbita manual tradicional contra la trayectoria optimizada con los Motores IA de Alié.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Órbita Manual (Caos) */}
            <div className="rounded-3xl border border-red-500/20 bg-red-950/5 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-white uppercase">Sin Automatización Alié</span>
                  <span className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono font-bold tracking-wider px-3.5 py-1 rounded-full uppercase">
                    7 Pasos Manuales
                  </span>
                </div>
                
                <div className="flex flex-col gap-3">
                  {chaosSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.04]"
                      style={{
                        transform: `rotate(${(idx % 2 === 0 ? -0.8 : 0.8) * (idx * 0.3)}deg)`
                      }}
                    >
                      <span className="text-[10px] font-mono text-red-500/70 font-bold w-4 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-red-400/80 flex-shrink-0">
                        {step.icon}
                      </span>
                      <span className="text-starlight/75 text-xs">
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-red-500/60 font-mono tracking-wider uppercase">
                ADVERTENCIA // ALTO CONSUMO DE TIEMPO Y ERRORES LOGÍSTICOS
              </div>
            </div>

            {/* Órbita de Orden (Alié IA) */}
            <div className="rounded-3xl border border-green-500/30 bg-green-950/5 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_15px_40px_rgba(34,197,94,0.05)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-white uppercase">Órbita Optimizada Alié</span>
                  <span className="bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-mono font-bold tracking-wider px-3.5 py-1 rounded-full uppercase">
                    1 Solo Toque Humano
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {orderSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="flex flex-col items-center flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 rounded-full border border-green-500/30 bg-black flex items-center justify-center text-[9px] font-mono text-green-400 font-bold">
                          ✓
                        </div>
                        {idx < orderSteps.length - 1 && (
                          <div className="w-px h-10 bg-gradient-to-b from-green-500/30 to-green-500/10 my-1" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          {step.type === "auto" && (
                            <span className="text-[8px] font-mono font-black text-green-400 border border-green-500/30 bg-green-500/10 px-1.5 py-0.5 rounded tracking-wider uppercase">
                              AUTOMÁTICO
                            </span>
                          )}
                          {step.type === "human" && (
                            <span className="text-[8px] font-mono font-black text-orangeleader border border-orangeleader/30 bg-orangeleader/10 px-1.5 py-0.5 rounded tracking-wider uppercase">
                              SOPORTE HUMANO
                            </span>
                          )}
                        </div>
                        <p className="text-starlight/80 text-xs">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-green-400/70 font-mono tracking-wider uppercase">
                ESTADO // NÚCLEO AUTÓNOMO ACTIVO Y SEGURO
              </div>
            </div>

          </div>

          <p className="text-center text-starlight/60 text-xs mt-12 max-w-2xl mx-auto leading-relaxed">
            La gran mayoría de las órdenes navegan de forma 100% autónoma en piloto automático. <strong className="text-orangeleader font-bold">Tu equipo solo interviene en excepciones reales que demanden su juicio.</strong>
          </p>
        </div>
      </section>

      {/* 🚀 Cómo Funciona (El Motor de Tres Etapas) */}
      <section className="relative py-24 border-b border-white/5 bg-transparent" id="funcionamiento">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              MÓDULO DE TRANSMISIÓN
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              EL SISTEMA DE AUTOMATIZACIÓN EN 3 ETAPAS
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Desde el correo entrante hasta tu sistema de inventarios: así se procesa cada transacción de manera automatizada.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="glass-liquid p-8 rounded-3xl flex flex-col justify-between min-h-[300px] relative overflow-hidden">
                <div>
                  <span className="text-[10px] font-mono text-orangeleader tracking-widest uppercase block mb-4">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-black text-white uppercase mb-4">
                    {step.title}
                  </h3>
                  <p className="text-starlight/60 text-xs leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {step.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="bg-white/[0.03] border border-white/10 text-white/55 text-[8px] font-mono px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💎 Outcomes */}
      <section className="relative py-24 border-b border-white/5 bg-black/25">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              INDICADORES DE RETORNO
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              LO QUE MEJORA AL AUTOMATIZAR LA OPERACIÓN
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              La automatización con Inteligencia Artificial no solo elimina el teclado, sino que reestructura la eficiencia de tu negocio.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {outcomes.map((outcome, idx) => (
              <div key={idx} className="glass-liquid p-8 rounded-3xl flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-orangeleader/10 border border-orangeleader/20 flex items-center justify-center text-orangeleader font-black text-sm">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-black text-white uppercase">
                  {outcome.title}
                </h3>
                <p className="text-starlight/60 text-xs leading-relaxed">
                  {outcome.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛸 Contact Section / CRM integration */}
      <section className="relative py-32 px-6 md:px-8 max-w-5xl mx-auto text-center" id="contacto">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(235,63,27,0.04),transparent_70%)] pointer-events-none" />
        
        <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
          SALA DE TRANSMISIONES
        </h2>
        <h3 className="text-3xl md:text-6xl font-black text-white uppercase mb-6">
          CONECTA TU FLOTA HOY
        </h3>
        <p className="text-starlight/60 text-sm font-light max-w-xl mx-auto mb-12">
          Envíanos tus coordenadas. Agenda una llamada de estrategia para analizar tu volumen de órdenes y configurar tus motores de automatización.
        </p>

        <div className="glass-liquid rounded-3xl p-8 md:p-12 border border-white/10 max-w-xl mx-auto">
          <LeadForm servicioInteres="Automatización IA & Procesos" />
        </div>
      </section>

    </div>
  );
}
