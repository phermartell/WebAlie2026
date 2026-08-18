"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import LeadForm from "@/components/LeadForm";

const stats = [
  { value: "+$4.5M", label: "Ventas Procesadas", tech: "SYS: REVENUE_TRACK" },
  { value: "<950ms", label: "Carga de Ficha de Producto", tech: "RAD: FCP_CATALOG" },
  { value: "99.99%", label: "Uptime de Puerto Comercial", tech: "ORBIT: RUNTIME" },
  { value: "Shopify & Woo", label: "Sistemas de Propulsión", tech: "TLM: ENGINE" }
];

const processSteps = [
  {
    num: "01",
    tag: "CARTOGRAFÍA",
    title: "Estrategia y Arquitectura Comercial",
    desc: "Mapeamos tus objetivos comerciales y diseñamos un flujo de compra intuitivo. Analizamos la experiencia de usuario (UX) ideal para tu cliente objetivo, estructuramos categorías lógicas y definimos el mapa de integraciones clave (pagos, envíos y CRM).",
    items: [
      "Diseño UI/UX de embudos de compra",
      "Estructura de arquitectura de catálogo de productos",
      "Definición de pasarelas de pago y operadores de logística",
      "Mapeo de integraciones de CRM y ERP"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "ENSAMBLE",
    title: "Desarrollo y Optimización de Conversión (CRO)",
    desc: "Nuestros ingenieros construyen tu tienda en línea sobre el stack tecnológico idóneo. Optimizamos cada paso del proceso: desde un buscador interno inteligente y filtros dinámicos hasta un checkout en un solo paso diseñado para reducir carritos abandonados.",
    items: [
      "Programación limpia y modular (WooCommerce / Shopify / Next.js)",
      "Buscador predictivo y filtros avanzados de producto",
      "Checkout optimizado para reducir la fricción de pago",
      "Diseño responsivo quirúrgico para compras en móviles"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "IGNICIÓN",
    title: "Sincronización y Automatización Integral",
    desc: "Conectamos tu tienda con el resto de tus sistemas operativos. Automatizamos las notificaciones de compra y envío para tus clientes, sincronizamos inventarios en tiempo real para evitar roturas de stock y enlazamos los formularios directamente a tu CRM.",
    items: [
      "Conexión segura de pasarelas de pago (Stripe, PayPal, MercadoPago)",
      "Integración de etiquetas de conversión (Meta, Google, Pinterest)",
      "Automatización de correos de confirmación y carritos abandonados",
      "Sincronización con CRM para seguimiento de clientes"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "TELEMETRÍA",
    title: "Lanzamiento y Optimización de Velocidad",
    desc: "Realizamos una auditoría exhaustiva antes de abrir tu puerto comercial al público. Optimizamos tiempos de carga, compresión de imágenes y almacenamiento en caché para asegurar que tu tienda sea ultrarrápida, mejorando el posicionamiento SEO y la tasa de conversión.",
    items: [
      "Auditoría final de velocidad en PageSpeed Insights",
      "Implementación de redes de distribución de contenido (CDN) y caché avanzada",
      "Configuración de Schema JSON-LD de producto para motores de búsqueda",
      "Lanzamiento de producción libre de fricciones"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  }
];

const successCases = [
  {
    name: "Arguello Motopartes",
    sector: "Sector: E-commerce / Refacciones",
    url: "https://arguellomotopartes.com/",
    img: "/casos/web/arguellomotopartes.webp",
    stack: ["WooCommerce", "Buscador de Autopartes", "Pasarela de Pagos"],
    desc: "Construimos un e-commerce robusto de refacciones para motos con un buscador avanzado interno para facilitar la compra de piezas exactas."
  },
  {
    name: "Nirue Joyería",
    sector: "Sector: E-commerce / Joyería de Diseño",
    url: "http://niruejoyeria.com/",
    img: "/casos/web/niruejoyeria.webp",
    stack: ["WooCommerce", "UI/UX Minimalista", "Catálogo Visual"],
    desc: "Diseñamos una boutique digital refinada y limpia, enfocada en resaltar la elegancia y los detalles de joyería de diseño exclusivo con flujos de pago rápidos."
  },
  {
    name: "Joyerías Carolina",
    sector: "Sector: E-commerce / Alta Joyería",
    url: "https://joyeriascarolina.com/",
    img: "/casos/web/joyeriascarolina.webp",
    stack: ["WooCommerce", "Pasarela Stripe/PayPal", "Filtros Personalizados"],
    desc: "Digitalizamos un catálogo de alta joyería tradicional, implementando pasarelas de pago de máxima seguridad y una experiencia premium de compra móvil."
  },
  {
    name: "Taller Imagina",
    sector: "Sector: E-commerce / Impacto Social",
    url: "https://tallerimagina.com/",
    img: "/casos/web/tallerimagina.webp",
    stack: ["WooCommerce", "Artesanías y Serigrafía", "Causa Social"],
    desc: "Diseñamos y desarrollamos la tienda en línea para el taller de artesanías, serigrafía y carpintería del Instituto Nuevo Amanecer, facilitando la venta digital de sus productos con causa."
  }
];

const packages = [
  {
    name: "Órbita 01 - Puerto WooCommerce",
    tag: "Flexible y Sin Cuotas",
    desc: "Construye tu tienda sobre WordPress con total propiedad y libertad de cuotas de plataforma recurrentes. Perfecto para marcas en crecimiento.",
    items: [
      "Diseño personalizado UI/UX optimizado para conversión (CRO)",
      "Integración de pasarelas de pago (Stripe, PayPal, MercadoPago)",
      "Buscador inteligente de productos y filtros avanzados",
      "Optimización de velocidad (caché avanzada y compresión de assets)",
      "Panel autoadministrable para control de stock y pedidos",
      "Garantía de propiedad total del código"
    ],
    cta: "Iniciar WooCommerce",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Órbita 02 - Estación Shopify",
    tag: "Lanzamiento y Estabilidad",
    desc: "Lanza tu e-commerce sobre la infraestructura en la nube más confiable del mundo. Ideal para catálogos dinámicos con alta transaccionalidad.",
    items: [
      "Maquetación y configuración premium de la tienda Shopify",
      "Diseño de fichas de producto persuasivas y veloces",
      "Integración con transportistas y alertas de envío en tiempo real",
      "Configuración de etiquetas y píxeles de pauta publicitaria",
      "Sincronización con CRM e inventario externo",
      "Capacitación de uso del administrador de Shopify"
    ],
    cta: "Construir Puerto Comercial",
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/30"
  },
  {
    name: "Órbita 03 - Crucero Headless (Next.js)",
    tag: "Velocidad Interestelar",
    desc: "La cúspide del rendimiento digital. Una experiencia web desacoplada ultrarrápida donde el frontend vuela y se conecta por API al motor e-commerce.",
    items: [
      "Frontend a la medida programado con Next.js y React",
      "Carga instantánea de fichas de producto (Core Web Vitals al 100%)",
      "Máxima seguridad y blindaje ante ataques (arquitectura desacoplada)",
      "Personalización absoluta del checkout y carrito de compras",
      "Optimización SEO avanzada a nivel servidor (SSR/ISR)",
      "Soporte estratégico prioritario y telemetría en vivo"
    ],
    cta: "Lanzar Nave Custom",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  }
];

export default function EcommercePageClient() {
  return (
    <div className="relative z-10 w-full overflow-x-hidden">
      {/* Fondo de Estrellas Twinkling independiente */}
      <div className="absolute inset-0 -z-20 starfield pointer-events-none" />
      {/* Nave lateral ligada al scroll */}
      <OrbitalPath planetColor="#f97316" />

      {/* 🚀 Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[85vh] flex items-center">
        {/* Resplandor galáctico */}
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
              PUERTOS COMERCIALES INTERESTELARES
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] uppercase tracking-tight"
            >
              TIENDAS EN LÍNEA DE <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orangeleader to-tangerine">
                ALTO RENDIMIENTO
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-starlight/75 text-[15px] sm:text-[17px] md:text-[19px] leading-relaxed max-w-2xl"
            >
              Desarrollamos ecosistemas e-commerce a la medida con **Shopify**, **WooCommerce** y **Next.js**. Sitios web ultrarrápidos, optimizados para buscadores y estructurados para guiar al usuario directo a la conversión.
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
                Lanzar Mi Tienda →
              </a>
              <a
                href="#casos-orbita"
                className="w-full sm:w-auto border border-white/20 hover:border-white text-white rounded-full px-8 py-4 font-black text-xs uppercase tracking-widest transition-all cursor-pointer text-center"
              >
                Ver Tiendas Activas
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 📊 Telemetry Stats Section */}
      <section className="relative py-12 border-y border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <span className="text-[10px] font-mono text-orangeleader/80 tracking-widest uppercase mb-1">
                {stat.tech}
              </span>
              <span className="text-3xl md:text-4xl font-black text-white">
                {stat.value}
              </span>
              <span className="text-xs text-starlight/50 font-bold uppercase tracking-wider mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 🛠️ Process Steps Section */}
      <section className="relative py-24 border-t border-white/5 bg-transparent" id="proceso">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              HOJA DE RUTA AL LANZAMIENTO
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase">
              EL VIAJE HACIA LAS VENTAS EN LÍNEA
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

      {/* 🚀 Success Cases Section ("Misiones en Órbita") */}
      <section className="relative py-24 border-t border-white/5" id="casos-orbita">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              PUERTOS COMERCIALES OPERATIVOS
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              MISIONES E-COMMERCE COMPLETADAS
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Explora las tiendas y sistemas transaccionales que hemos diseñado y desarrollado para impulsar las ventas de marcas líderes en sus respectivos sectores.
            </p>
          </div>

          {/* Grid de 4 casos */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {successCases.map((site, idx) => (
              <div
                key={idx}
                className="glass-liquid group flex flex-col justify-between rounded-3xl overflow-hidden hover:border-orangeleader/40 transition-all duration-300 h-full"
              >
                <div>
                  {/* Contenedor Imagen Web */}
                  <div className="relative aspect-[16/10] bg-black/60 overflow-hidden">
                    <Image
                      src={site.img}
                      alt={site.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/og-home.webp";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-orangeleader text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-[0_10px_20px_rgba(235,63,27,0.4)] text-center cursor-pointer"
                      >
                        Visitar Tienda →
                      </a>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] font-mono text-orangeleader/80 uppercase tracking-widest">
                      {site.sector}
                    </span>
                    <h4 className="text-lg font-black text-white mt-1.5 mb-3 group-hover:text-tangerine transition-colors">
                      {site.name}
                    </h4>
                    <p className="text-starlight/60 text-xs leading-relaxed mb-6">
                      {site.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                    {site.stack.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-white/[0.04] text-white/50 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Packages Section */}
      <section className="relative py-24 border-t border-white/5" id="paquetes">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              CONFIGURACIONES DE NAVE COMERCIAL
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              MODELOS DE OPERACIÓN
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Calibramos los motores de tu negocio en línea según la escala y necesidades de transaccionalidad de tu marca.
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

      {/* 🚀 Formulario de Misión (Contacto) */}
      <section className="relative py-24 border-t border-white/5 bg-transparent" id="contacto-mision">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(235,63,27,0.04)_0%,transparent_75%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="mb-12">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              ¿LISTO PARA DESPEGAR EN LAS VENTAS DIGITALES?
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-4">
              DESARROLLEMOS TU PUERTO DE VENTAS
            </h3>
            <p className="text-starlight/60 text-sm max-w-xl mx-auto">
              Agenda tu llamada de estrategia de 15 minutos en Google Meet para modelar tu nueva tienda en línea de alto rendimiento.
            </p>
          </div>

          <div className="max-w-xl mx-auto glass-liquid rounded-3xl p-8 shadow-2xl">
            <LeadForm servicioInteres="E-commerce" />
          </div>
        </div>
      </section>
    </div>
  );
}
