"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import LeadForm from "@/components/LeadForm";

const processSteps = [
  {
    num: "MOMENTO 01",
    title: "Atención a clientes y prospectos",
    desc: "Un chatbot responde preguntas sobre materiales, grabados y políticas de compra con información aprobada por la tienda. Si surge una solicitud especial o un reclamo, deriva la conversación al equipo.",
    tags: ["CATÁLOGO", "PREGUNTAS FRECUENTES", "ATENCIÓN HUMANA"]
  },
  {
    num: "MOMENTO 02",
    title: "Gestión de pedidos",
    desc: "Cuando la tienda registra el pago, el pedido puede pasar al equipo responsable con el modelo, el color y las iniciales elegidas. Si faltan datos o hay instrucciones ambiguas, el equipo las revisa antes de preparar el pedido.",
    tags: ["PAGO CONFIRMADO", "DATOS DEL PEDIDO", "REVISIÓN DE INCIDENCIAS"]
  },
  {
    num: "MOMENTO 03",
    title: "Producción y envío",
    desc: "Una bolsa personalizada pasa al taller con sus especificaciones. Un producto en inventario pasa a preparación y empaque. Cuando la herramienta de envíos genera la guía, el flujo puede compartir el enlace de rastreo con el cliente.",
    tags: ["ORDEN DE TRABAJO", "EMPAQUE", "RASTREO"]
  }
];

const reasons = [
  {
    num: "01",
    tag: "ANTES DE COMPRAR",
    title: "Ayuda para elegir un producto",
    desc: "En la tienda del ejemplo, el asistente explica qué bolsas se pueden grabar, qué tipografías hay y dónde indicar las iniciales al hacer el pedido.",
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "DESPUÉS DE COMPRAR",
    title: "Consulta del estado del pedido",
    desc: "Si la tienda conecta el asistente con su sistema de pedidos, el cliente puede consultar si su compra está en preparación o en tránsito. El asistente verifica que el cliente tenga acceso a ese pedido antes de compartir su estado.",
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "POLÍTICAS DE LA TIENDA",
    title: "Respuestas basadas en información aprobada",
    desc: "El asistente puede explicar los plazos, cambios y devoluciones que la tienda haya definido. Si la información disponible no resuelve la duda, la consulta pasa al equipo.",
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "ATENCIÓN HUMANA",
    title: "Tu equipo decide en los casos especiales",
    desc: "Un reclamo, una solicitud de descuento o un cambio de dirección puede requerir una decisión del equipo. Según el canal conectado, el asistente puede pasar la consulta con un resumen de lo que pidió el cliente.",
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  }
];

const chaosSteps = [
  { text: "La tienda registra el pago de una bolsa personalizada." },
  { text: "Las reglas de la tienda comprueban que estén completas las iniciales y las opciones de grabado." },
  { text: "Si hay instrucciones escritas, la IA puede resumirlas y señalar dudas para que el equipo las aclare." },
  { text: "El taller recibe una orden de trabajo con el modelo, el color y el grabado confirmados." },
  { text: "El equipo fabrica la pieza, revisa el resultado y la empaca." },
  { text: "La herramienta de envíos genera la guía." },
  { text: "El flujo puede avisar al cliente y compartir el enlace de rastreo." }
];

const orderSteps = [
  { text: "La tienda registra el pago de un accesorio en inventario." },
  { text: "El flujo envía el pedido al equipo de almacén con el producto y la cantidad." },
  { text: "El equipo localiza el producto y comprueba que corresponda al pedido." },
  { text: "El equipo empaca el producto y registra que está listo para enviar." },
  { text: "La herramienta de envíos genera la guía." },
  { text: "El flujo puede avisar al cliente y compartir el enlace de rastreo." }
];

const outcomes = [
  {
    title: "Menos consultas repetitivas",
    desc: "El asistente puede responder preguntas frecuentes y pasar al equipo las consultas que necesitan atención personalizada."
  },
  {
    title: "Pedidos con instrucciones claras",
    desc: "Taller o almacén puede recibir los datos necesarios para trabajar cada pedido, con los pendientes señalados antes de fabricar o empacar."
  },
  {
    title: "Avisos de envío con datos de rastreo",
    desc: "El flujo puede compartir el enlace de rastreo cuando la herramienta de envíos lo proporcione."
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
          ECOMMERCE
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
              COMERCIO ELECTRÓNICO
            </span>
            <span className="px-3 py-1 rounded-full border border-orangeleader/30 bg-orangeleader/10 text-xs font-black text-orangeleader uppercase tracking-wider">
              INTELIGENCIA ARTIFICIAL
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase text-white leading-[0.95] tracking-tight mb-8">
            IA aplicada a tu ecommerce
          </h1>

          <p className="mt-8 text-base md:text-lg text-starlight/70 leading-relaxed font-light max-w-2xl mx-auto">
            Diseñamos asistentes y automatizaciones para atender a clientes y prospectos, gestionar pedidos y coordinar la producción, la preparación y el envío de tus productos.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="#contacto"
              className="bg-orangeleader hover:bg-orangeleader/80 text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-[0_10px_20px_rgba(235,63,27,0.3)] hover:shadow-[0_12px_24px_rgba(235,63,27,0.5)] cursor-pointer"
            >
              Cuéntanos qué quieres automatizar
            </a>
            <a
              href="#tres-momentos"
              className="border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
            >
              Ver los tres momentos
            </a>
          </div>
        </motion.div>
      </section>

      {/* 🚀 Vista General: Tres Momentos del Ecommerce */}
      <section className="relative py-24 border-b border-white/5 bg-transparent" id="tres-momentos">
        <span id="funcionamiento" className="sr-only" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              TRES MOMENTOS DEL ECOMMERCE
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              De la primera pregunta al envío
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Imagina una tienda de bolsas personalizadas. Así pueden trabajar juntos un asistente de atención, el sistema de pedidos y las herramientas del taller y de envíos.
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

      {/* 🛡️ Sección: Por Qué Automatizar */}
      <section className="relative py-24 border-b border-white/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              ATENCIÓN ANTES Y DESPUÉS DE LA COMPRA
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              Un chatbot que conoce tu tienda
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              El asistente usa el catálogo y las políticas aprobadas de tu tienda para responder preguntas frecuentes. Cuando una consulta requiere una decisión, puede pasarla a tu equipo.
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
                      CASO {reason.num}
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
              DEL PAGO AL ENVÍO
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              Cada producto sigue el proceso que necesita
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              En este ejemplo, la tienda vende bolsas personalizadas y accesorios que ya tiene en inventario. Tras confirmar el pago, el flujo dirige cada producto al equipo que lo va a fabricar o preparar.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Producto hecho bajo pedido (Taller) */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-white uppercase">Producto hecho bajo pedido</span>
                  <span className="bg-white/10 border border-white/20 text-white/80 text-[10px] font-mono font-bold tracking-wider px-3.5 py-1 rounded-full uppercase">
                    TALLER
                  </span>
                </div>
                
                <div className="flex flex-col gap-4">
                  {chaosSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="flex flex-col items-center flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 rounded-full border border-white/20 bg-black flex items-center justify-center text-[9px] font-mono text-white/70 font-bold">
                          {idx + 1}
                        </div>
                        {idx < chaosSteps.length - 1 && (
                          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-white/5 my-1" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-starlight/80 text-xs">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-starlight/60 font-mono tracking-wider uppercase">
                El taller recibe las especificaciones confirmadas antes de producir.
              </div>
            </div>

            {/* Producto en inventario (Almacén) */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-white uppercase">Producto en inventario</span>
                  <span className="bg-white/10 border border-white/20 text-white/80 text-[10px] font-mono font-bold tracking-wider px-3.5 py-1 rounded-full uppercase">
                    ALMACÉN
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {orderSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="flex flex-col items-center flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 rounded-full border border-white/20 bg-black flex items-center justify-center text-[9px] font-mono text-white/70 font-bold">
                          {idx + 1}
                        </div>
                        {idx < orderSteps.length - 1 && (
                          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-white/5 my-1" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-starlight/80 text-xs">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-starlight/60 font-mono tracking-wider uppercase">
                El almacén recibe los datos necesarios para preparar el envío.
              </div>
            </div>

          </div>

          <p className="text-center text-starlight/60 text-xs mt-12 max-w-2xl mx-auto leading-relaxed">
            Las reglas usan el estado registrado por la tienda, el taller o la herramienta de envíos. La vista de pendientes y las conexiones con inventario o ERP se definen según el proyecto.
          </p>
        </div>
      </section>

      {/* 💎 Outcomes */}
      <section className="relative py-24 border-b border-white/5 bg-black/25">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              BENEFICIOS OPERATIVOS
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              Qué puede mejorar en tu tienda
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Elige por dónde empezar según la tarea que más tiempo le toma a tu equipo y las herramientas que ya utiliza.
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
          HABLEMOS DE TU TIENDA
        </h2>
        <h3 className="text-3xl md:text-6xl font-black text-white uppercase mb-6">
          ¿Qué quieres automatizar en tu ecommerce?
        </h3>
        <p className="text-starlight/60 text-sm font-light max-w-xl mx-auto mb-12">
          Cuéntanos dónde vendes y qué tarea le toma más tiempo a tu equipo: responder consultas, gestionar pedidos, coordinar la producción o preparar envíos. Revisamos contigo por dónde empezar y qué herramientas habría que conectar.
        </p>

        <div className="glass-liquid rounded-3xl p-8 md:p-12 border border-white/10 max-w-xl mx-auto">
          <LeadForm servicioInteres="IA aplicada al ecommerce" submitLabel="Solicitar información" />
        </div>
      </section>

    </div>
  );
}
