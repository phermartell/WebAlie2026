"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";

interface ServiceModule {
  num: string;
  title: string;
  desc: string;
  items: string[];
  price: string;
  tag: string;
  href: string;
  primaryCta?: string;
  secondaryCta?: string;
}

const modules: ServiceModule[] = [
  {
    num: "01",
    title: "Posicionamiento SEO",
    desc: "Ayuda a tus clientes a encontrar tu empresa cuando buscan tus productos o servicios. Mejoramos la estructura y los contenidos de tu sitio para aumentar su visibilidad en búsquedas relevantes para tu negocio.",
    items: [
      "Revisión técnica del sitio y prioridades de mejora",
      "Investigación de palabras clave relacionadas con tu oferta",
      "Optimización de títulos, contenidos y enlaces internos",
      "Mejoras de rastreo, indexación y rendimiento",
      "Datos estructurados para describir tu contenido",
      "Estrategia de contenidos y referencias externas"
    ],
    price: "Desde $6,000/mes.",
    tag: "SEO",
    href: "/seo",
    primaryCta: "Consultar SEO →",
    secondaryCta: "Conocer el servicio →"
  },
  {
    num: "02",
    title: "Diseño de páginas web",
    desc: "Presenta tu negocio con un sitio que explique tu oferta, transmita confianza y facilite el contacto. Diseñamos páginas empresariales, catálogos y sitios personalizados según los objetivos y necesidades de tu proyecto.",
    items: [
      "Diseño alineado con la identidad de tu negocio",
      "Estructura y navegación para encontrar información",
      "Adaptación a dispositivos móviles",
      "Desarrollo con la tecnología adecuada para tu proyecto",
      "Preparación técnica básica para buscadores",
      "Configuración de analítica",
      "Recorridos que faciliten consultas y solicitudes"
    ],
    price: "Desde $7,000 MXN.",
    tag: "DISEÑO WEB",
    href: "/diseno-paginas-web",
    primaryCta: "Cotizar página web →",
    secondaryCta: "Conocer el servicio →"
  },
  {
    num: "03",
    title: "Desarrollo de tiendas en línea",
    desc: "Vende tus productos por internet con una tienda adaptada a tu catálogo y a la operación de tu negocio. Organizamos la presentación de productos, el proceso de compra y la gestión de pedidos según el alcance de tu proyecto.",
    items: [
      "Diseño de catálogo y fichas de producto",
      "Desarrollo en la plataforma adecuada para tu negocio",
      "Configuración de métodos de pago",
      "Configuración de opciones y notificaciones de envío",
      "Integraciones de inventario y CRM según el proyecto"
    ],
    price: "Desde $8,000 MXN.",
    tag: "ECOMMERCE",
    href: "/ecommerce",
    primaryCta: "Cotizar tienda →",
    secondaryCta: "Conocer el servicio →"
  },
  {
    num: "04",
    title: "Gestión de Google Ads y Meta Ads",
    desc: "Acerca tu oferta a personas interesadas mediante campañas publicitarias. Definimos objetivos, audiencias y mensajes, damos seguimiento al presupuesto y revisamos las consultas registradas para mejorar el desempeño de tus anuncios.",
    items: [
      "Planeación y configuración de campañas",
      "Investigación de búsquedas y audiencias",
      "Redacción y diseño de anuncios",
      "Configuración de medición de conversiones",
      "Pruebas de mensajes y creatividades",
      "Seguimiento y ajustes de presupuesto",
      "Reportes de resultados y recomendaciones"
    ],
    price: "Desde $2,500/mes + saldo publicitario.",
    tag: "PUBLICIDAD DIGITAL",
    href: "/paid-media",
    primaryCta: "Consultar campañas →",
    secondaryCta: "Conocer el servicio →"
  },
  {
    num: "05",
    title: "Gestión de redes sociales",
    desc: "Mantén una presencia consistente y comunica con claridad lo que ofrece tu negocio. Planeamos contenido, diseñamos publicaciones y damos seguimiento a la actividad de tus redes según los canales y el alcance acordados.",
    items: [
      "Planeación del calendario de contenidos",
      "Redacción de textos para publicaciones",
      "Diseño de piezas alineadas con tu marca",
      "Revisión de temas y tendencias relevantes",
      "Gestión de comunidad según el alcance contratado",
      "Reportes de actividad y recomendaciones"
    ],
    price: "Desde $4,000/mes + saldo publicitario.",
    tag: "REDES SOCIALES",
    href: "/redes-sociales",
    primaryCta: "Consultar redes →",
    secondaryCta: "Conocer el servicio →"
  },
  {
    num: "06",
    title: "Email marketing y automatización",
    desc: "Mantén el contacto con tus prospectos y clientes mediante correos relevantes. Creamos campañas y secuencias automatizadas para comunicar novedades, acompañar decisiones de compra y dar seguimiento según las necesidades de tu negocio.",
    items: [
      "Diseño de plantillas alineadas con tu marca",
      "Redacción de mensajes y llamados a la acción",
      "Segmentación de tu base de contactos",
      "Configuración de secuencias automatizadas",
      "Pruebas de asuntos y mensajes",
      "Reportes de resultados y recomendaciones"
    ],
    price: "Desde $3,000/mes.",
    tag: "EMAIL MARKETING",
    href: "/email-marketing",
    primaryCta: "Consultar email →",
    secondaryCta: "Conocer el servicio →"
  },
  {
    num: "07",
    title: "IA y automatización para tu negocio",
    desc: "Reduce tareas repetitivas y agiliza la atención con soluciones adaptadas a tu operación. Revisamos tus procesos y herramientas para definir qué puede automatizarse y dónde necesita intervenir tu equipo.",
    items: [
      "Análisis del proceso que necesitas mejorar",
      "Definición del alcance y las herramientas",
      "Diseño de asistentes y flujos automatizados",
      "Integraciones según viabilidad y alcance del proyecto",
      "Configuración de respuestas y criterios de seguimiento",
      "Pruebas y ajustes de la solución"
    ],
    price: "Precio personalizado.",
    tag: "IA Y AUTOMATIZACIÓN",
    href: "/ia",
    primaryCta: "Consultar IA →",
    secondaryCta: "Conocer el servicio →"
  },
  {
    num: "08",
    title: "Diseño de identidad gráfica",
    desc: "Presenta una imagen coherente en los distintos puntos de contacto de tu negocio. Definimos elementos visuales y criterios de uso para ayudarte a crear una identidad o mejorar la que ya tienes.",
    items: [
      "Definición del enfoque visual de la marca",
      "Diseño de logotipo según el alcance del proyecto",
      "Selección de colores y tipografías",
      "Lineamientos de uso y aplicaciones",
      "Archivos y recursos gráficos acordados",
      "Guía de identidad según la opción contratada"
    ],
    price: "Desde $4,000 MXN.",
    tag: "IDENTIDAD GRÁFICA",
    href: "/identidad-grafica",
    primaryCta: "Cotizar identidad →",
    secondaryCta: "Conocer el servicio →"
  }
];

const steps = [
  {
    num: "01",
    phase: "CONTEXTO",
    title: "Conocemos tu necesidad",
    desc: "Conversamos sobre tu negocio, tus objetivos y las herramientas que utilizas para identificar qué necesitas resolver.",
    sphereBg: "radial-gradient(circle at 35% 35%, #eb3f1b, #4a0f05, #000)"
  },
  {
    num: "02",
    phase: "ALCANCE",
    title: "Definimos la propuesta",
    desc: "Precisamos los entregables, la inversión, los tiempos y las responsabilidades de cada parte antes de iniciar.",
    sphereBg: "radial-gradient(circle at 35% 35%, #eb3f1b, #4a0f05, #000)"
  },
  {
    num: "03",
    phase: "EJECUCIÓN",
    title: "Desarrollamos el trabajo",
    desc: "Ejecutamos las actividades acordadas y coordinamos contigo la información y las revisiones necesarias.",
    sphereBg: "radial-gradient(circle at 35% 35%, #eb3f1b, #4a0f05, #000)"
  },
  {
    num: "04",
    phase: "SEGUIMIENTO",
    title: "Revisamos los avances",
    desc: "Compartimos los entregables y revisamos los resultados disponibles según el servicio contratado.",
    sphereBg: "radial-gradient(circle at 35% 35%, #eb3f1b, #4a0f05, #000)"
  }
];

const stats = [
  { value: "Alcance", label: "Entregables acordados" },
  { value: "Tiempos", label: "Calendario por proyecto" },
  { value: "Revisión", label: "Ajustes según propuesta" },
  { value: "Atención", label: "Canales y horarios acordados" }
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
            Servicios de Alié Digital
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase text-white leading-[1.0] tracking-tight mb-8">
            Marketing digital y desarrollo web para tu empresa
          </h1>

          <p className="mt-8 text-base md:text-xl text-starlight/70 leading-relaxed font-light max-w-2xl mx-auto">
            Encuentra apoyo para crear tu sitio, promocionar tus productos o servicios y mejorar el seguimiento de tus prospectos. Cuéntanos qué necesita tu negocio y te orientamos sobre las opciones para tu proyecto.
          </p>

          <div className="mt-12">
            <Link
              href="/contacto"
              className="inline-block bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full px-8 py-4 font-black text-sm uppercase tracking-widest transition-all cursor-pointer shadow-[0_10px_30px_rgba(235,63,27,0.4)] hover:scale-105 active:scale-95"
            >
              Solicitar información →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 🛰️ Catálogo de Servicios (Bento Grid 2-columnas - 100% SEO Friendly) */}
      <section className="py-24 px-6 md:px-8 max-w-6xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <span className="text-xs font-mono tracking-[0.2em] text-orangeleader uppercase">HANGAR DE INGENIERÍA</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-2">
            Encuentra el servicio que necesita tu negocio
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
                      {m.primaryCta || "EMPEZAR PROYECTO →"}
                    </Link>
                    <Link
                      href={m.href}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white rounded-full py-3 px-6 font-black text-[11px] uppercase tracking-widest border border-white/10 transition-all text-center hover:border-white/20"
                    >
                      {m.secondaryCta || "VER PORTAFOLIO →"}
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
            Cómo trabajamos contigo
          </h2>
          <p className="mt-6 text-starlight/60 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Primero entendemos lo que necesita tu negocio. Después definimos el alcance, las actividades y la forma de dar seguimiento a tu proyecto.
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
            Un alcance claro desde el inicio
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
