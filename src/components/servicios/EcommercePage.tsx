"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import LeadForm from "@/components/LeadForm";

const stats = [
  { value: "Catálogo", label: "Productos organizados", tech: "PRESENTACIÓN" },
  { value: "Compra", label: "Carrito y proceso de pago", tech: "PEDIDOS" },
  { value: "Gestión", label: "Administración de la tienda", tech: "OPERACIÓN" },
  { value: "Conexión", label: "Integraciones según tu proyecto", tech: "HERRAMIENTAS" }
];

const processSteps = [
  {
    num: "01",
    tag: "PLANEACIÓN",
    title: "Definimos cómo venderás",
    desc: "Revisamos tus productos, tus clientes y la forma en que gestionas las ventas. Definimos la estructura del catálogo y los requisitos de compra, pago y envío.",
    items: [
      "Organización de categorías y productos",
      "Requisitos de pago y entrega",
      "Selección de plataforma",
      "Alcance de funciones e integraciones"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "DESARROLLO",
    title: "Construimos el catálogo y la compra",
    desc: "Diseñamos las páginas de la tienda y configuramos las funciones acordadas para que tus clientes puedan consultar productos, agregarlos al carrito y realizar pedidos.",
    items: [
      "Diseño de catálogo y fichas de producto",
      "Carrito y proceso de compra",
      "Búsqueda y filtros según el proyecto",
      "Adaptación a dispositivos móviles"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "CONFIGURACIÓN",
    title: "Preparamos la operación",
    desc: "Configuramos los métodos de pago, las opciones de envío y las notificaciones contempladas en la propuesta. Revisamos las conexiones con otras herramientas cuando el proyecto las requiere.",
    items: [
      "Configuración de métodos de pago",
      "Opciones de envío y notificaciones",
      "Herramientas de gestión de pedidos",
      "Integraciones según viabilidad y alcance"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "PUBLICACIÓN",
    title: "Probamos y publicamos",
    desc: "Revisamos el recorrido de compra y realizamos pruebas de las funciones acordadas. Coordinamos contigo la información, los accesos y la aprobación necesarios para publicar la tienda.",
    items: [
      "Pruebas del proceso de pedido",
      "Revisión en distintos dispositivos",
      "Revisión de imágenes y rendimiento",
      "Publicación y entrega según la propuesta"
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
    img: "/casos/web/arguellomotopartes-catalogo.webp",
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
    name: "Tienda con WooCommerce",
    tag: "WORDPRESS Y COMERCIO ELECTRÓNICO",
    desc: "Una opción para gestionar tu tienda desde WordPress y adaptar sus funciones mediante extensiones y desarrollo según el proyecto.",
    items: [
      "Diseño de catálogo y fichas de producto",
      "Configuración de carrito y pagos",
      "Gestión de productos y pedidos",
      "Opciones de envío según tu operación",
      "Extensiones e integraciones según el alcance"
    ],
    cta: "Consultar WooCommerce",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Tienda con Shopify",
    tag: "PLATAFORMA ADMINISTRADA",
    desc: "Una opción para administrar productos y pedidos en Shopify. Definimos el diseño, la configuración y las aplicaciones necesarias para tu operación.",
    items: [
      "Configuración y diseño de la tienda",
      "Organización del catálogo",
      "Configuración de pagos y envíos",
      "Selección de aplicaciones según necesidades",
      "Orientación para administrar la tienda"
    ],
    cta: "Consultar Shopify",
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/30"
  },
  {
    name: "Desarrollo a medida",
    tag: "FUNCIONES E INTEGRACIONES",
    desc: "Para proyectos con requisitos particulares de diseño, navegación o conexión con otros sistemas. Evaluamos la viabilidad técnica antes de definir la solución.",
    items: [
      "Definición de requisitos técnicos",
      "Diseño de interfaces y recorridos de compra",
      "Desarrollo de funciones acordadas",
      "Integraciones mediante APIs cuando correspondan",
      "Pruebas y documentación según el alcance"
    ],
    cta: "Consultar desarrollo",
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
              DISEÑO Y DESARROLLO ECOMMERCE
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] uppercase tracking-tight"
            >
              Tiendas en línea <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orangeleader to-tangerine">
                para vender tus productos
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-starlight/75 text-[15px] sm:text-[17px] md:text-[19px] leading-relaxed max-w-2xl"
            >
              Creamos tu tienda en línea con un catálogo organizado, un proceso de compra claro y herramientas para gestionar pedidos. Definimos la plataforma, los pagos y los envíos según las necesidades de tu negocio.
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
                Cotizar tienda →
              </a>
              <a
                href="#casos-orbita"
                className="w-full sm:w-auto border border-white/20 hover:border-white text-white rounded-full px-8 py-4 font-black text-xs uppercase tracking-widest transition-all cursor-pointer text-center"
              >
                Ver proyectos
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
              DE TU CATÁLOGO A LA TIENDA
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase">
              Cómo desarrollamos tu tienda en línea
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
              PROYECTOS REALIZADOS
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              Conoce nuestras tiendas en línea
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Explora una selección de tiendas que hemos desarrollado para presentar productos y facilitar su compra por internet.
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
                    <div className="absolute inset-0 bg-black/35 [@media(hover:hover)]:bg-black/0 [@media(hover:hover)]:group-hover:bg-black/40 group-focus-within:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-opacity duration-300 bg-orangeleader text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-[0_10px_20px_rgba(235,63,27,0.4)] text-center cursor-pointer"
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
              PLATAFORMA PARA TU OPERACIÓN
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              Elegimos la tecnología según tu negocio
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Revisamos tu catálogo, las funciones que necesitas y la forma en que administrarás la tienda para recomendar una plataforma y definir sus costos de operación.
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
              HABLEMOS DE TU TIENDA
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-4">
              Cuéntanos qué quieres vender por internet
            </h3>
            <p className="text-starlight/60 text-sm max-w-xl mx-auto">
              ¿Vas a crear una tienda o mejorar la que tienes? Cuéntanos qué productos vendes y cómo gestionas tus pedidos. Te orientamos sobre la plataforma, las funciones y el alcance para preparar una propuesta.
            </p>
          </div>

          <div className="max-w-xl mx-auto glass-liquid rounded-3xl p-8 shadow-2xl">
            <LeadForm servicioInteres="Desarrollo de tienda en línea" submitLabel="Solicitar cotización" />
          </div>
        </div>
      </section>
    </div>
  );
}
