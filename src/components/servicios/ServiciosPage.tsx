"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";

const modules = [
  {
    num: "01",
    title: "SEO Técnico & AI SEO - GOOGLE, CHATGPT",
    desc: "Rankea en las órbitas donde la gente busca: Google, ChatGPT y más. Combinamos el SEO tradicional con el SEO optimizado con IA. Dominamos los motores de búsqueda mediante optimización de código fuente, estructuración de datos para modelos de IA y arquitectura de contenidos estratégica.",
    items: [
      "Optimización On-Page y Core Web Vitals",
      "Estrategia de Contenidos para Búsqueda e IA (llms.txt & entity SEO)",
      "Auditoría de Arquitectura Técnica SEO y reparación SEO técnica",
      "Búsqueda de palabras clave y generación de contenido estratégico",
      "Optimización de Schema",
      "LinkBuilding"
    ],
    price: "Desde $6,000/mes.",
    tag: "AI SEO",
    href: "/seo"
  },
  {
    num: "02",
    title: "Diseño de Páginas Web & Desarrollo Web Headless - NEXT.JS, WORDPRESS",
    desc: "Tu Nave Madre. Sitios web construidos con Next.js, WordPress o código cien por ciento personalizado. Optimizados para SEO y dispositivos móviles, diseñados como máquinas de conversión. Desarrollamos sitios ultrarrápidos (One Page, Corporativos, Catálogos y E-commerce) hechos a la medida, liberándote de las plantillas pesadas y lentas del pasado.",
    items: [
      "Diseño personalizado UI/UX (Liquid Glass)",
      "Construcción híbrida con Headless WordPress",
      "Diseño mobile first",
      "Desarrollo Next.js/React de carga ultrarrápida",
      "Arquitectura optimizada para SEO",
      "Configuración de analítica",
      "Interfaces orientadas a conversión"
    ],
    price: "Desde $7,000 MXN.",
    tag: "HEADLESS",
    href: "/diseno-paginas-web"
  },
  {
    num: "03",
    title: "Ecommerce & Tiendas en Línea - SHOPIFY, WOOCOMMERCE, HEADLESS",
    desc: "Desarrollamos tiendas en línea y plataformas transaccionales de alta velocidad preparadas para vender de forma más eficiente. Creamos flujos de compra optimizados para conversiones (CRO), pasarelas de pago integradas y control autoadministrable de stock.",
    items: [
      "Diseño personalizado UI/UX optimizado para conversión",
      "Programación limpia en WooCommerce, Shopify o Next.js",
      "Integración de pasarelas de pago (Stripe, PayPal, MercadoPago)",
      "Configuración de operadores logísticos y alertas de envío",
      "Sincronización con CRM y control de stock automatizado"
    ],
    price: "Desde $8,000 MXN.",
    tag: "ECOMMERCE",
    href: "/ecommerce"
  },
  {
    num: "04",
    title: "Meta & Google Ads - PAID ADS",
    desc: "Combustible de alta combustión. Captamos clientes con intención directa de compra inmediata a través de campañas pautadas con seguimiento avanzado de conversiones y eventos.",
    items: [
      "Configuración de campañas estratégicas",
      "Búsqueda y segmentación de audiencias",
      "Rastreo de conversiones",
      "Producción creativa de anuncios",
      "A/B Testing Continuo de Anuncios y Copys",
      "Reporteo Transparente de Retorno de Inversión (ROI)",
      "Campañas de Búsqueda y Display en Google",
      "Configuración de Píxeles y Eventos de Conversión"
    ],
    price: "Desde $2,500/mes + saldo publicitario.",
    tag: "PAID ADS",
    href: "/paid-media"
  },
  {
    num: "05",
    title: "Social Media Marketing - SMM",
    desc: "Transmite tu señal a través del cosmos. Desde la creación de contenido orgánico, generamos ecosistemas para TikTok, Instagram, LinkedIn y YouTube con estrategias basadas en datos para crecer tu marca y generar conversiones.",
    items: [
      "Calendario Editorial & Copywriting B2B",
      "Diseño de Piezas Visuales de Alta Gama",
      "Análisis de tendencias",
      "Administración de comunidades",
      "Reportes de rendimiento"
    ],
    price: "Desde $4,000/mes + saldo publicitario.",
    tag: "SMM",
    href: "/redes-sociales"
  },
  {
    num: "06",
    title: "Email Marketing & Automatización de Flujos - NEWSLETTERS, CRM",
    desc: "Diseñamos campañas y automatizaciones de email marketing de alto impacto para nutrir contactos y activar ventas continuas. Establecemos canales profesionales de comunicación para educar, retener y convertir prospectos en piloto automático.",
    items: [
      "Diseño de plantillas branded premium y personalizadas",
      "Redacción y copywriting persuasivo B2B / B2C",
      "Configuración de flujos automatizados de nutrición y venta",
      "Segmentación avanzada de contactos por comportamiento e interés",
      "Seguimiento, pruebas A/B de asuntos/CTAs y reportes mensuales"
    ],
    price: "Desde $3,000/mes.",
    tag: "EMAIL",
    href: "/email-marketing"
  },
  {
    num: "07",
    title: "Asistentes IA & Automatizaciones - CLAUDE, OPENAI, CHATBOTS",
    desc: "Tus copilotos autónomos. Implementamos flujos automatizados de captación y atención con Inteligencia Artificial para acelerar la respuesta a prospectos sin aumentar la nómina. Asistentes de IA personalizados desarrollados con Claude o OpenAI, entrenados para tu negocio, activos en el radar 24/7. Nosotros manejamos toda la estrategia, construcción y optimización en vivo.",
    items: [
      "Análisis de las necesidades de tu negocio",
      "Desarrollo con Claude/OpenAI/Gemini",
      "Diseño personalizado de asistentes de IA",
      "Integración de WhatsApp Web API & CRMs",
      "Agentes de IA y Chatbots de Calificación",
      "Automatización de Calificación de Leads B2B",
      "Seguimiento Omnicanal Automatizado"
    ],
    price: "Precio personalizado.",
    tag: "CHATBOTS",
    href: "/ia"
  },
  {
    num: "08",
    title: "Identidad Gráfica & Branding Corporativo",
    desc: "La insignia de tu flota. Desde el posicionamiento de marca y el tono de voz, hasta la identidad visual y las directrices maestras. Construimos marcas que destacan en la oscuridad y atraen a los aliados adecuados.",
    items: [
      "Estrategias de posicionamiento de marca",
      "Voz de marca y copywriting",
      "Manual de Identidad & Tipografía Corporativa",
      "Paleta Cromática e Iconografía Institucional",
      "Aplicaciones de Marca y Papelería Digital"
    ],
    price: "Desde $4,000 MXN.",
    tag: "BRANDING",
    href: "/identidad-grafica"
  }
];

const steps = [
  {
    num: "01",
    phase: "PASO 01 - SEMANA 1 • AUDITORÍA",
    title: "Descubrimiento",
    desc: "Análisis exhaustivo de tu negocio, metas y competidores. Auditoría sin costo incluida.",
    sphereBg: "radial-gradient(circle at 35% 35%, #eb3f1b, #4a0f05, #000)"
  },
  {
    num: "02",
    phase: "PASO 02 - SEMANA 2 • ESTRATEGIA",
    title: "Hoja de Ruta",
    desc: "Plan de crecimiento personalizado priorizando las oportunidades de mayor valor comercial.",
    sphereBg: "radial-gradient(circle at 35% 35%, #eb3f1b, #4a0f05, #000)"
  },
  {
    num: "03",
    phase: "PASO 03 - SEMANAS 3-4 • CONSTRUCCIÓN",
    title: "Ejecución",
    desc: "Flujos de trabajo acelerados por Inteligencia Artificial para resultados más rápidos y rentables.",
    sphereBg: "radial-gradient(circle at 35% 35%, #eb3f1b, #4a0f05, #000)"
  },
  {
    num: "04",
    phase: "PASO 04 - CONSTANTE • OPTIMIZACIÓN",
    title: "Resultados",
    desc: "Monitoreo continuo, reportes de rendimiento y optimización para potenciar conversiones.",
    sphereBg: "radial-gradient(circle at 35% 35%, #eb3f1b, #4a0f05, #000)"
  }
];

const stats = [
  { value: "6 sem", label: "TIEMPO ESTIMADO" },
  { value: "24/7", label: "MONITOREO IA" },
  { value: "14 días", label: "VENTANA DE AJUSTES" },
  { value: "∞", label: "ITERACIONES" }
];

export default function ServiciosPage() {
  return (
    <div className="relative z-10 w-full overflow-hidden">
      
      {/* Trayectoria orbital: nave "A" ligada al scroll del layout (nativa, consistente con nosotros/agencia) */}
      <OrbitalPath />

      {/* 🚀 Hero Section - Propuesta Abierta y Cinematográfica */}
      <section className="relative pt-48 pb-32 px-6 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Soft Background Brand Glow (no borders, no box) */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(235,63,27,0.06),transparent_60%)] pointer-events-none" />

        {/* Ambient SERVICES text in background */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 select-none pointer-events-none text-[15vw] font-black tracking-[0.12em] text-white/[0.012] leading-none uppercase font-sans">
          SERVICIOS
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orangeleader/30 bg-orangeleader/10 text-orangeleader text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orangeleader animate-ping" />
            NUESTROS MÓDULOS DE ESCALAMIENTO
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase text-white leading-[1.0] tracking-tight mb-8">
            FULL-STACK<br />
            <span className="text-transparent block mt-2" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.75)" }}>
              MARKETING.
            </span>
          </h1>

          <p className="mt-8 text-base md:text-xl text-starlight/70 leading-relaxed font-light max-w-2xl mx-auto">
            Construimos la infraestructura digital que escala las ventas de tu empresa. Un ecosistema impulsado por Inteligencia Artificial y código Headless.
          </p>

          <div className="mt-12">
            <Link
              href="/contacto"
              className="inline-block bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full px-8 py-4 font-black text-sm uppercase tracking-widest transition-all cursor-pointer shadow-[0_10px_30px_rgba(235,63,27,0.4)] hover:scale-105 active:scale-95"
            >
              OBTÉN UNA AUDITORÍA SIN COSTO →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 🛰️ Catálogo de Servicios (Bento Grid 2-columnas - 100% SEO Friendly) */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">HANGAR DE INGENIERÍA</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Sistemas de Propulsión de Flota
          </h2>
          <div className="h-0.5 w-16 bg-orangeleader/40 mx-auto mt-4 rounded-full" />
        </div>

        {/* 2-Column Grid (all cards directly in DOM for search engine indexing) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
            >
              <SpotlightCard
                className="glass-liquid rounded-[32px] border border-white/10 p-8 md:p-10 flex flex-col justify-between h-full hover:border-white/20 transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-3xl font-mono font-black text-white/10 leading-none">{m.num}</span>
                    <span className="px-3 py-1 rounded-full border border-orangeleader/20 bg-orangeleader/5 text-[10px] font-mono text-orangeleader uppercase tracking-widest">
                      {m.tag}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight leading-snug">
                    {m.title}
                  </h3>

                  <p className="text-starlight/75 text-sm md:text-base font-light leading-relaxed">
                    {m.desc}
                  </p>

                  <div className="space-y-3.5 pt-4 border-t border-white/5">
                    {m.items.map((item, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2.5 text-xs text-starlight/60">
                        <span className="text-orangeleader mt-0.5">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 mt-8 flex flex-col gap-4">
                  <div>
                    <p className="text-lg md:text-xl font-black text-white">{m.price}</p>
                  </div>
                  {/* Vertical Stacked Buttons to prevent overflow/desborde on narrower grids */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Link
                      href="/contacto"
                      className="flex-1 bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full py-3 px-6 font-black text-[11px] uppercase tracking-widest text-center shadow-[0_4px_12px_rgba(235,63,27,0.2)] transition-all"
                    >
                      EMPEZAR PROYECTO →
                    </Link>
                    <Link
                      href={m.href}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white rounded-full py-3 px-6 font-black text-[11px] uppercase tracking-widest border border-white/10 transition-all text-center hover:border-white/20"
                    >
                      VER PORTAFOLIO →
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🗺️ El Plan de Vuelo */}
      <section className="py-28 px-6 md:px-8 max-w-6xl mx-auto relative z-10">
        
        {/* Giant background "4" watermark */}
        <div className="absolute top-[10%] right-[10%] select-none pointer-events-none text-[30vw] font-black text-white/[0.006] leading-none">
          4
        </div>

        <div className="mb-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-starlight text-xs font-mono uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orangeleader" />
            CÓMO TRABAJAMOS • 4 PASOS
          </div>
          <h2 className="text-4xl md:text-7xl font-black uppercase text-white tracking-tight">
            EL{" "}
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>
              Proceso.
            </span>
          </h2>
          <p className="mt-6 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Del descubrimiento a los resultados de escalamiento: un marco de trabajo de 4 pasos para lanzar tu infraestructura digital.
          </p>
        </div>

        {/* Steps Grid (Clean cards with brand gradient spheres) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {steps.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-liquid rounded-[32px] border border-white/5 p-8 flex flex-col justify-between items-start min-h-[300px] hover:border-white/15 transition-all duration-300 group"
            >
              <div className="space-y-4 w-full">
                <div className="flex justify-between items-center">
                  <div
                    className="w-12 h-12 rounded-full border border-white/10 group-hover:scale-110 transition-transform duration-500"
                    style={{ background: s.sphereBg, boxShadow: "inset -5px -5px 15px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.5)" }}
                  />
                  <span className="text-5xl font-mono font-black text-white/5 leading-none">{s.num}</span>
                </div>

                <div className="space-y-1.5 pt-4">
                  <p className="text-[10px] font-mono font-bold tracking-widest text-orangeleader uppercase">{s.phase}</p>
                  <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight">
                    {s.title}
                  </h3>
                </div>

                <p className="text-starlight/60 text-sm font-light leading-relaxed pt-2">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Row of stats */}
        <div className="mt-24 text-center relative z-10">
          <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-wider">
            Tiempos Promedio y Garantías de Misión
          </h3>
          <div className="h-0.5 w-12 bg-orangeleader/30 mx-auto mt-3 rounded-full" />
        </div>

        <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          {stats.map((st, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl md:text-5xl font-black text-white tracking-tight">{st.value}</p>
              <p className="text-[9px] font-mono tracking-widest text-white/40 uppercase">{st.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
