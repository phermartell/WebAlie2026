"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SpotlightCard } from "@/components/agencia/ui";
import OrbitalPath from "@/components/agencia/OrbitalPath";
import LeadForm from "@/components/LeadForm";

const stats = [
  { value: "Diseño", label: "Alineado con tu marca", tech: "IDENTIDAD" },
  { value: "Móvil", label: "Adaptación a distintos dispositivos", tech: "NAVEGACIÓN" },
  { value: "Contenido", label: "Tu oferta organizada", tech: "CLARIDAD" },
  { value: "Contacto", label: "Canales para recibir consultas", tech: "COMUNICACIÓN" }
];


const packages = [
  {
    name: "Sitio empresarial",
    tag: "PRESENTACIÓN Y CONTACTO",
    desc: "Para empresas y profesionales que necesitan explicar sus servicios, mostrar su trabajo y facilitar que las personas interesadas los contacten.",
    items: [
      "Diseño alineado con tu identidad",
      "Organización de secciones y contenidos",
      "Adaptación a dispositivos móviles",
      "Formularios y canales de contacto",
      "Administración de contenidos según la plataforma"
    ],
    cta: "Cotizar sitio empresarial",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  },
  {
    name: "Tienda en línea",
    tag: "CATÁLOGO Y VENTAS",
    desc: "Para negocios que necesitan presentar productos y recibir pedidos por internet. Definimos la plataforma y las funciones según tu catálogo y tu operación.",
    items: [
      "Catálogo y fichas de producto",
      "Proceso de compra y métodos de pago",
      "Opciones de envío según tu operación",
      "Herramientas de gestión de pedidos",
      "Integraciones según viabilidad y alcance"
    ],
    cta: "Cotizar tienda",
    glow: "rgba(235,63,27,0.05)",
    border: "border-orangeleader/30"
  },
  {
    name: "Desarrollo a medida",
    tag: "FUNCIONES ESPECÍFICAS",
    desc: "Para proyectos que requieren una estructura o funciones particulares. Revisamos tus necesidades para definir la solución técnica y las integraciones necesarias.",
    items: [
      "Definición de requisitos del proyecto",
      "Diseño de interfaces y recorridos",
      "Desarrollo de funciones acordadas",
      "Conexión con herramientas y sistemas",
      "Pruebas y documentación según el alcance"
    ],
    cta: "Consultar desarrollo",
    glow: "rgba(255,255,255,0.01)",
    border: "border-white/5"
  }
];

const processSteps = [
  {
    num: "01",
    tag: "PLANEACIÓN",
    title: "Definimos la estructura y el diseño",
    desc: "Conocemos tu negocio, tus objetivos y la información que necesita tu cliente. Organizamos las secciones y definimos la propuesta visual antes de desarrollar.",
    items: [
      "Objetivos y alcance del sitio",
      "Organización de contenidos y navegación",
      "Diseño alineado con tu identidad"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  },
  {
    num: "02",
    tag: "DESARROLLO",
    title: "Construimos las páginas y funciones",
    desc: "Desarrollamos el sitio con la plataforma acordada y adaptamos su presentación a distintos dispositivos. Integramos las funciones contempladas en la propuesta.",
    items: [
      "Desarrollo de páginas y componentes",
      "Adaptación a móviles, tabletas y escritorio",
      "Integraciones según el alcance acordado"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "03",
    tag: "PREPARACIÓN",
    title: "Preparamos el sitio para su publicación",
    desc: "Configuramos los elementos técnicos básicos para buscadores y revisamos los recursos del sitio. Este trabajo prepara las páginas para su rastreo, sin garantizar posiciones en los resultados.",
    items: [
      "Títulos y descripciones de las páginas",
      "Configuración de rastreo según la plataforma",
      "Optimización de imágenes y otros recursos"
    ],
    bgGlow: "rgba(255,255,255,0.02)",
    colSpan: "lg:col-span-4"
  },
  {
    num: "04",
    tag: "PUBLICACIÓN",
    title: "Revisamos y publicamos",
    desc: "Revisamos la navegación, los formularios y la presentación del sitio antes de publicarlo. Coordinamos contigo los accesos, la aprobación y los pasos necesarios para la entrega.",
    items: [
      "Revisión en distintos dispositivos y navegadores",
      "Comprobación de funciones acordadas",
      "Publicación y entrega según la propuesta"
    ],
    bgGlow: "rgba(235,63,27,0.06)",
    colSpan: "lg:col-span-8"
  }
];

const successCases = [
  {
    name: "Alianza Francesa de Puebla",
    sector: "Sector: Educación e Idiomas",
    url: "https://afpuebla.mx/",
    img: "/casos/web/afpuebla.webp",
    stack: ["WordPress", "UI/UX", "SEO Local"],
    desc: "Renovamos el portal institucional con un diseño limpio que facilita el flujo de inscripción a cursos y exámenes oficiales de francés en Puebla."
  },
  {
    name: "Universidad de Oriente",
    sector: "Sector: Educación Superior",
    url: "https://uo.edu.mx/",
    img: "/casos/web/uo.webp",
    stack: ["WordPress", "Portal Educativo", "SEO Nacional"],
    desc: "Optimizamos la experiencia digital en su sitio institucional, integrando planes de estudio y captación directa para su oferta académica."
  },
  {
    name: "Arguello Motopartes",
    sector: "Sector: E-commerce / Automotriz",
    url: "https://arguellomotopartes.com/",
    img: "/casos/web/arguellomotopartes-catalogo.webp",
    stack: ["WooCommerce", "Buscador de Autopartes", "Pasarela de Pagos"],
    desc: "Construimos un e-commerce robusto de refacciones para motos con un buscador avanzado interno para facilitar la compra de piezas exactas."
  },
  {
    name: "Postes Puebla",
    sector: "Sector: Construcción e Ingeniería",
    url: "https://postespuebla.com/",
    img: "/casos/web/postespuebla.webp",
    stack: ["WordPress", "Catálogo B2B", "Campañas Google Ads"],
    desc: "Digitalizamos el proceso de cotización industrial, facilitando la descarga de fichas técnicas para ingenieros y constructoras de México."
  },
  {
    name: "Dr. Peña Lares",
    sector: "Sector: Healthcare / Cirugía Maxilofacial",
    url: "https://drpenalares.com/",
    img: "/casos/web/drpenalares.webp",
    stack: ["WordPress", "Salud", "Agendamiento Médico"],
    desc: "Diseñamos una landing page clínica de alta confianza orientada a resolver dudas y agendar citas directamente por WhatsApp."
  },
  {
    name: "Nexbin Capital",
    sector: "Sector: Finanzas e Inversiones",
    url: "https://nexbincapital.com/",
    img: "/casos/web/nexbincapital.webp",
    stack: ["WordPress", "Fintech", "Branding"],
    desc: "Rediseñamos el sitio corporativo en WordPress para representar la solidez y tecnología de su fondo de inversión."
  },
  {
    name: "HD Cargo",
    sector: "Sector: Logística y Transporte B2B",
    url: "https://hdcargo.mx/",
    img: "/casos/web/hdcargo.webp",
    stack: ["WordPress", "Logística", "Lead Generation"],
    desc: "Portal corporativo optimizado para la captación de prospectos empresariales interesados en transporte de carga nacional."
  },
  {
    name: "Acares Consultoría",
    sector: "Sector: Consultoría y Legal",
    url: "https://acaresconsultoria.com/",
    img: "/casos/web/acaresconsultoria.webp",
    stack: ["WordPress", "Branding", "SEO Local"],
    desc: "Sitio web elegante enfocado en la conversión y la explicación de servicios de consultoría integral para empresas."
  },
  {
    name: "Punto Activa",
    sector: "Sector: Bienestar & Fitness",
    url: "https://puntoactiva.com/",
    img: "/casos/web/puntoactiva.webp",
    stack: ["WordPress", "Deportes", "Diseño Dinámico"],
    desc: "Desarrollo de un sitio corporativo de entrenamiento enfocado en inspirar acción y captar prospectos presenciales y online."
  },
  {
    name: "Cubara",
    sector: "Sector: Industria y Manufactura",
    url: "https://cubara.mx/",
    img: "/casos/web/cubara.webp",
    stack: ["WordPress", "Industria", "SEO Técnico"],
    desc: "Página corporativa de fabricación y distribución de contenedores industriales para almacenamiento seguro."
  },
  {
    name: "Grupo Sedesil",
    sector: "Sector: Comercialización de granos y botanas",
    url: "https://gruposedesil.com/",
    img: "/casos/web/gruposedesil.webp",
    stack: ["WordPress", "Granos y botanas", "Sitio corporativo"],
    desc: "Sitio corporativo para presentar granos y botanas a granel, productos derivados de sus botanas y opciones de contacto comercial."
  },
  {
    name: "Colegio San Ángel",
    sector: "Sector: Educación Básica y Media",
    url: "https://sanangel.edu.mx/",
    img: "/casos/web/sanangel.webp",
    stack: ["WordPress", "Educación Escolar", "UI/UX Adaptable"],
    desc: "Portal educativo con herramientas de admisión, planes de estudio y comunicación para padres y alumnos desde primaria hasta bachillerato."
  }
];

export default function WebDevPageClient() {
  return (
    <div className="relative z-10 w-full overflow-x-hidden">
      {/* Fondo de Estrellas Twinkling independiente */}
      <div className="absolute inset-0 -z-20 starfield pointer-events-none" />
      {/* Nave lateral ligada al scroll */}
      <OrbitalPath planetColor="#3b82f6" />

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
              DISEÑO Y DESARROLLO WEB
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] uppercase tracking-tight"
            >
              Páginas web para presentar tu negocio <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orangeleader to-tangerine">
                y recibir consultas
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-starlight/75 text-[15px] sm:text-[17px] md:text-[19px] leading-relaxed max-w-2xl"
            >
              Creamos sitios que explican tus productos o servicios, muestran tu trabajo y facilitan que las personas interesadas te contacten. Definimos la estructura, el diseño y la tecnología según las necesidades de tu proyecto.
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
                Cotizar página web
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

      {/* 🚀 Packages Section */}
      <section className="relative py-24" id="paquetes">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              OPCIONES DE SITIO WEB
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
              Un sitio acorde con lo que necesita tu negocio
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Desde presentar tus servicios hasta vender productos o integrar funciones específicas. Te orientamos para definir el tipo de sitio y el alcance de tu proyecto.
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
              DEL OBJETIVO A LA PUBLICACIÓN
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase">
              Cómo desarrollamos tu sitio
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
              Conoce nuestro trabajo
            </h3>
            <p className="text-starlight/60 text-sm mt-4">
              Explora una selección de sitios empresariales, tiendas en línea y portales institucionales que hemos desarrollado para distintas necesidades de negocio.
            </p>
          </div>

          {/* Grid de 12 casos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        // fallback en caso de error de carga de imagen
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
                        Visitar Sitio →
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

      {/* 🚀 Formulario de Misión (Contacto) */}
      <section className="relative py-24 border-t border-white/5 bg-transparent" id="contacto-mision">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(235,63,27,0.04)_0%,transparent_75%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="mb-12">
            <h2 className="text-xs font-black tracking-[0.5em] text-orangeleader uppercase mb-3">
              HABLEMOS DE TU PROYECTO
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-4">
              Cuéntanos cómo necesitas tu página web
            </h3>
            <p className="text-starlight/60 text-sm max-w-xl mx-auto">
              ¿Vas a crear un sitio o renovar el que tienes? Comparte qué ofrece tu negocio y qué necesitas resolver. Te orientamos sobre el tipo de página, las funciones y el alcance para preparar una propuesta.
            </p>
          </div>

          <div className="max-w-xl mx-auto glass-liquid rounded-3xl p-8 shadow-2xl">
            <LeadForm servicioInteres="Diseño de páginas web" submitLabel="Solicitar cotización" />
          </div>
        </div>
      </section>
    </div>
  );
}
