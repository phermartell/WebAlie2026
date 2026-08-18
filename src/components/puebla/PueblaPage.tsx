"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useVelocity, useMotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import LeadForm from "@/components/LeadForm";
import { SERVICIOS } from "@/components/agencia/data";
import { ServiceIcon, Hud, ShipMark } from "@/components/agencia/hud";
import WhatsAppChat from "@/components/puebla/WhatsAppChat";

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

// Left Trajectory Spacecraft with Sun at top and Talavera Planet at bottom
const PueblaOrbitalPath = () => {
  const isDesktop = useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP_QUERY).matches, () => false);
  if (!isDesktop) return null;
  return <PueblaOrbitalPathInner />;
};

const PueblaOrbitalPathInner = () => {
  const shouldReduce = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20, mass: 0.4 });
  const top = useTransform(smooth, [0, 1], ["13%", "87%"]);

  const velocity = useVelocity(scrollY);
  const rotateTarget = useMotionValue(0);
  const rotate = useSpring(rotateTarget, { stiffness: 120, damping: 20 });

  useMotionValueEvent(velocity, "change", (v) => {
    if (v > 40) rotateTarget.set(180);
    else if (v < -40) rotateTarget.set(0);
  });

  return (
    <div className="fixed left-4 md:left-8 top-0 bottom-0 w-8 z-20 pointer-events-none" aria-hidden="true">
      {/* Base orbital line */}
      <div className="absolute left-1/2 top-[10%] bottom-[10%] w-px -translate-x-1/2 bg-gradient-to-b from-yellow-400/30 via-white/10 to-cyan-400/30" />

      {/* Dotted flow animation */}
      <div
        className="absolute left-1/2 top-[10%] bottom-[10%] w-px -translate-x-1/2 opacity-60"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, rgba(235,63,27,0.5) 0 6px, transparent 6px 16px)",
          backgroundSize: "100% 100px",
          animation: shouldReduce ? "none" : "orbit-flow 6s linear infinite",
        }}
      />

      {/* Sun at the start of trajectory */}
      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-400/20 border border-yellow-400/60 shadow-[0_0_15px_rgba(250,204,21,0.6)] flex items-center justify-center text-sm z-30" style={{ top: "10%" }}>
        ☀️
      </div>

      {/* Talavera Planet at the end of trajectory */}
      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-cyan-400/50 overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.5)] z-30" style={{ top: "90%" }}>
        <Image src="/puebla-talavera.webp" width={32} height={32} className="w-full h-full object-cover" alt="Planeta Talavera" />
      </div>

      {/* Spacecraft following scroll */}
      <motion.div style={{ top }} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
        <motion.span style={{ rotate: shouldReduce ? 0 : rotate }} className="block relative">
          <ShipMark size={32} floating={false} />
        </motion.span>
      </motion.div>
    </div>
  );
};

// Canvas of Interactive Stars reacting to Mouse
const InteractiveStars = () => {
  const isDesktop = useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP_QUERY).matches, () => false);
  if (!isDesktop) return null;
  return <InteractiveStarsInner />;
};

const InteractiveStarsInner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars: Array<{
      x: number;
      y: number;
      ox: number;
      oy: number;
      size: number;
      color: string;
      speed: number;
    }> = [];

    for (let i = 0; i < 90; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      stars.push({
        x,
        y,
        ox: x,
        oy: y,
        size: Math.random() * 2 + 0.5,
        color: i % 8 === 0 ? "rgba(235, 63, 27, 0.75)" : "rgba(255, 255, 255, 0.8)",
        speed: Math.random() * 0.12 + 0.04,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.oy -= star.speed;
        if (star.oy < 0) {
          star.oy = height;
          star.ox = Math.random() * width;
        }

        const dx = mouseX - star.ox;
        const dy = mouseY - star.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = star.ox;
        let targetY = star.oy;

        if (dist < 160) {
          const force = (160 - dist) / 160;
          targetX -= (dx / dist) * force * 40;
          targetY -= (dy / dist) * force * 40;
        }

        star.x += (targetX - star.x) * 0.08;
        star.y += (targetY - star.y) * 0.08;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

export default function PueblaPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const slides = [
    {
      title: "Agencia de Marketing Digital en Puebla",
      subtitle: "Lanzamos marcas poblanas al hiperespacio desde nuestra central en Cholula; aquí no nos camoteamos y te impulsamos con la energía ilimitada de nuestra ingeniería digital.",
      tag: "ESTACIÓN ESPACIAL CHOLULA // SUEÑA GRANDE, LLEGA LEJOS",
      bgGradient: "from-orangeleader/15 to-transparent",
    },
    {
      title: "Publicidad Digital en Puebla",
      subtitle: "Campañas de Google Ads and Meta Ads que hacen tiro con tus metas de venta, con la fuerza de una erupción de Don Goyo Cósmico.",
      tag: "PROPULSIÓN POPOCATÉPETL // PUBLICIDAD DIGITAL EN PUEBLA",
      bgGradient: "from-cyan-500/15 to-transparent",
    },
    {
      title: "Agencia de Marketing Digital Puebla",
      subtitle: "Desarrollamos sitios web robustos, rápidos y más chulos que la Catedral, con blindaje de Talavera Estelar, optimizados para SEO y conversión.",
      tag: "BLINDAJE DE TALAVERA ESTELAR // MARKETING DIGITAL PUEBLA",
      bgGradient: "from-purple-500/15 to-transparent",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const clientLogos = [
    "/logos/logo-acares.webp",
    "/logos/logo-alianza.webp",
    "/logos/logo-amha.webp",
    "/logos/logo-arguello.webp",
    "/logos/logo-carolina.webp",
    "/logos/logo-saf.webp",
    "/logos/logo-sax.webp",
    "/logos/logo-xicotepec.webp",
    "/logos/logo-confirma.webp",
    "/logos/logo-conkretar.webp",
    "/logos/logo-daisys.webp",
    "/logos/logo-efocat.webp",
    "/logos/logo-morecsa-hogar.webp",
    "/logos/logo-morecsa.webp",
    "/logos/logo-penalares.webp",
    "/logos/logo-prisma.webp",
    "/logos/logo-psangelopolis.webp",
    "/logos/logo-tectepexi.webp"
  ];

  const testimonialsRow1 = [
    { quote: "Logramos un incremento del 45% en inscripciones este ciclo gracias a su SEO y experiencia de usuario.", author: "Directora Académica", company: "Alianza Francesa Puebla" },
    { quote: "Las campañas de Google Ads han impulsado leads calificados diariamente sin interrupciones.", author: "Administración", company: "AMHA Medics" },
    { quote: "Aceleraron nuestro ecommerce llevándolo a niveles récord de ventas.", author: "Fundadora", company: "Joyerías Carolina" },
    { quote: "Un equipo B2B impecable que comprende el mercado local de Puebla.", author: "Director Comercial", company: "Prisma Habita" }
  ];

  const testimonialsRow2 = [
    { quote: "Nuestra tienda B2B ahora soporta más de 15,000 refacciones con búsquedas ultra rápidas.", author: "Gerente B2B", company: "Argüello Motopartes" },
    { quote: "El growth marketing potenciado por IA nos generó leads de alto valor constantes.", author: "Director General", company: "MORECSA Hogar" },
    { quote: "Excelente comunicación y reportes transparentes basados en datos comerciales reales.", author: "Socio Principal", company: "Confirma Legal" },
    { quote: "La automatización del inventario liberó por completo la carga del equipo.", author: "CEO", company: "Conkretar" }
  ];

  const testimonialsRow3 = [
    { quote: "Campañas de Google Ads optimizadas al centavo con excelente retorno.", author: "Compras B2B", company: "SAX Medical" },
    { quote: "Diseño web vanguardista que superó por mucho lo que esperábamos.", author: "Coordinadora", company: "EFOCAT" },
    { quote: "Soluciones de seguridad y CRM integradas perfectamente.", author: "Sistemas", company: "ACARES" },
    { quote: "El portal educativo es rápido y fácil de autoadministrar por el equipo.", author: "Rectoría", company: "Tecnológico de Tepexi" }
  ];

  // 4 Core Expertises inspired by SpinX Digital
  const coreExpertise = [
    {
      num: "01",
      title: "DISEÑO WEB & BRANDING",
      desc: "Creamos portales web a medida y marcas de alto impacto visual sin usar plantillas genéricas. Nos enfocamos en la estética premium y la usabilidad.",
      services: [
        { name: "Diseño Web UI/UX Custom", desc: "Interfaces limpias, rápidas y orientadas a captar leads." },
        { name: "Identidad Gráfica & Branding", desc: "Logotipos, guías de estilo, tono de voz y directrices visuales." }
      ],
      glow: "rgba(235,63,27,0.08)",
      borderColor: "group-hover:border-orangeleader/30"
    },
    {
      num: "02",
      title: "PAID MEDIA & SOCIAL",
      desc: "Publicidad inteligente y gestión de contenido diseñada para generar leads y ventas recurrentes en tu portal comercial.",
      services: [
        { name: "Publicidad en Meta & Google Ads", desc: "Campañas segmentadas orientadas a un retorno de inversión real." },
        { name: "Gestión de Redes Sociales", desc: "Estrategia de contenido, diseño gráfico y redacción persuasiva." }
      ],
      glow: "rgba(34,211,238,0.08)",
      borderColor: "group-hover:border-cyan-400/30"
    },
    {
      num: "03",
      title: "SEO & GROWTH B2B",
      desc: "Posicionamos tu empresa en las primeras páginas de Google y en los motores de búsqueda de Inteligencia Artificial de nueva generación.",
      services: [
        { name: "Posicionamiento SEO IA", desc: "Optimización técnica para motores tradicionales y modelos LLM." },
        { name: "Email Marketing & Nutrición", desc: "Automatizaciones para reactivar y nutrir clientes sin esfuerzo manual." }
      ],
      glow: "rgba(168,85,247,0.08)",
      borderColor: "group-hover:border-purple-400/30"
    },
    {
      num: "04",
      title: "IA & AUTOMATIZACIONES",
      desc: "Sistemas autónomos y tiendas transaccionales complejas que automatizan la cotización y la atención de prospectos.",
      services: [
        { name: "Asistentes de IA 24/7", desc: "Agentes entrenados para calificar y atender prospectos de forma autónoma." },
        { name: "Ecommerce (Tiendas en Línea)", desc: "Tiendas estables preparadas para procesar miles de transacciones." }
      ],
      glow: "rgba(34,197,94,0.08)",
      borderColor: "group-hover:border-green-400/30"
    }
  ];

  // 5 Process Steps (Accordion style)
  const processSteps = [
    {
      num: "01",
      phase: "Descubrimiento & Telemetría",
      title: "Entendimiento Profundo de la Misión",
      desc: "Antes de programar una sola línea de código, nos sumergimos en tu modelo de negocio B2B. Analizamos tu competencia en Puebla y definimos los objetivos clave de ventas y posicionamiento digital.",
      points: ["Auditoría de activos digitales actuales", "Análisis de competidores clave en Puebla", "Definición de KPIs comerciales"]
    },
    {
      num: "02",
      phase: "Planificación & Estructura",
      title: "Mapa de Órbita e Ingeniería de Conversión",
      desc: "Diseñamos la arquitectura de la información y definimos el embudo de ventas. Mapeamos las palabras clave (SEO) y estructuramos las pasarelas de pago y las integraciones con tu CRM.",
      points: ["Keyword Research de alto valor transaccional", "Esquemas de flujos de conversión (Wireframes)", "Definición de stack tecnológico idóneo"]
    },
    {
      num: "03",
      phase: "Diseño Web UI/UX",
      title: "Estética Premium sin Plantillas",
      desc: "Creamos la interfaz visual de tu proyecto desde cero. Cuidamos cada detalle tipográfico, de color y de espaciado para reflejar solidez corporativa y garantizar una navegación intuitiva.",
      points: ["Prototipos interactivos de alta fidelidad", "Diseño responsivo móvil quirúrgico", "Aprobación visual antes de desarrollo"]
    },
    {
      num: "04",
      phase: "Desarrollo e Integraciones",
      title: "Ensamble Tecnológico Limpio",
      desc: "Nuestros ingenieros escriben código rápido, limpio y optimizado. Integramos los formularios de captación, los asistentes de IA autónomos y los sistemas de seguimiento analítico.",
      points: ["Programación con Next.js o WordPress modular", "Integración con CRM y WhatsApp automatizado", "Conexión de pixeles de seguimiento y reCAPTCHA v3"]
    },
    {
      num: "05",
      phase: "Lanzamiento y Auditoría",
      title: "Puesta en Órbita y Optimización de Velocidad",
      desc: "Sometemos el sitio a pruebas rigurosas de rendimiento en Google PageSpeed Insights. Garantizamos que el sitio cargue en menos de un segundo y sea completamente estable antes de abrirlo al público.",
      points: ["Prueba de velocidad (PageSpeed 90+ obligatorio)", "Configuración de SEO técnico (Schema JSON-LD)", "Lanzamiento final libre de fricciones"]
    }
  ];

  return (
    <div className="relative text-white font-sans selection:bg-orangeleader/30 selection:text-white bg-transparent">
      
      {/* Styles for continuous infinite marquee loops */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: scroll-left 55s linear infinite;
        }
        .animate-marquee-right {
          animation: scroll-right 55s linear infinite;
        }
        .animate-marquee-left-fast {
          animation: scroll-left 45s linear infinite;
        }
      `}</style>

      {/* Trajectory spaceship on the left side */}
      <PueblaOrbitalPath />

      {/* SECCIÓN 1: HERO SLIDER ESPECTACULAR CON ESTRELLAS INTERACTIVAS */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden z-10 pt-28">
        <InteractiveStars />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgGradient} to-transparent pointer-events-none z-0`}
          />
        </AnimatePresence>

        <div className="max-w-5xl mx-auto text-center relative z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <span className="text-xs md:text-sm font-mono tracking-[0.4em] text-orangeleader uppercase block mb-6">
                {slides[currentSlide].tag}
              </span>
              
              {currentSlide === 0 ? (
                <h1 className="text-4xl md:text-7xl font-black uppercase leading-[1.02] tracking-tighter mb-8 max-w-4xl">
                  {slides[currentSlide].title}
                </h1>
              ) : (
                <h2 className="text-4xl md:text-7xl font-black uppercase leading-[1.02] tracking-tighter mb-8 max-w-4xl">
                  {slides[currentSlide].title}
                </h2>
              )}

              <p className="text-base md:text-lg text-starlight/85 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                {slides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-4">
            <button
              onClick={() => setIsWhatsAppOpen(true)}
              className="bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(235,63,27,0.4)] transition-all flex items-center justify-center cursor-pointer"
            >
              Iniciar Conversación
            </button>
            <a
              href="#servicios"
              className="glass-l2 rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest text-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all"
            >
              Explorar Soluciones
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === currentSlide
                  ? "w-8 h-2.5 bg-orangeleader shadow-[0_0_10px_rgba(235,63,27,0.6)]"
                  : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* SECCIÓN 2: EXTRACTO QUIÉNES SOMOS TROPICALIZADO */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Hud>Bitácora de Vuelo // Base de Lanzamiento Puebla</Hud>
            <h2 className="mt-8 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05] tracking-tight">
              Nacimos a las faldas de Don Goyo Cósmico
            </h2>
            <p className="mt-8 text-base text-starlight/75 leading-relaxed font-light">
              Nacimos en el corazón de Puebla con una convicción tan clara como el cielo de Cholula: aquí no venimos a chacharear ni a hacer perder el tiempo. Las empresas no necesitan sitios web estáticos ni
              agencias burocráticas; necesitan una{" "}
              <strong className="text-white font-semibold">
                agencia digital potenciada por inteligencia artificial
              </strong>{" "}
              que sea transparente y un aliado estratégico orientado a entender sus metas
              financieras y potenciar sus ventas. Como{" "}
              <strong className="text-white font-semibold">
                agencia de diseño web impulsada por inteligencia artificial
              </strong>{" "}
              y{" "}
              <strong className="text-white font-semibold">
                agencia de marketing digital potenciada por inteligencia artificial
              </strong>{" "}
              con más de 7 años de trayectoria en el sector, acompañamos a empresas en Puebla, Cholula y Latinoamérica a
              construir activos comerciales impulsados por ingeniería tecnológica e Inteligencia
              Artificial que generan resultados reales y medibles.
            </p>
          </div>

          <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(235,63,27,0.15)] aspect-square max-w-md mx-auto">
            <Image
              src="/puebla-popo.webp"
              alt="Ilustración plana vectorial del volcán Popocatépetl flotando en el espacio"
              fill
              sizes="(max-width: 768px) 100vw, 448px"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a]/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: POR QUÉ NOSOTROS TROPICALIZADO */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>Doctrina de Misión // ADN Poblano & Espacial</Hud>
            <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]">
              Nuestra filosofía: éxito compartido y pasión por crecer en Puebla
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="glass-liquid rounded-[32px] p-8 md:p-10 h-full flex flex-col justify-between border border-white/5 hover:border-orangeleader/20 transition-all">
              <div>
                <span className="font-mono text-xs tracking-[0.3em] text-orangeleader uppercase">
                  Módulo de Crecimiento A
                </span>
                <h3 className="mt-4 text-2xl md:text-3xl font-black uppercase text-white">
                  Éxito Compartido
                </h3>
                <p className="mt-5 text-starlight/70 leading-relaxed text-sm md:text-base font-light">
                  Creemos firmemente que si a nuestros clientes les va bien, a nosotros nos va bien.
                  No buscamos transacciones de una sola vez ni contratos inflados. Aquí nos gusta hacer tiro de verdad. Construimos
                  relaciones comerciales a largo plazo donde nuestro indicador clave de rendimiento es
                  el impacto real en las oportunidades de negocio y ventas de tu empresa con estrategias sólidas de{" "}
                  <strong className="text-white font-medium">marketing digital en Puebla</strong>. Conectamos tu marca con la solidez de las torres de la Catedral Galáctica, sin rodeos ni camoteaderas.
                </p>
              </div>
            </div>

            <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.15)] aspect-square max-w-sm mx-auto">
              <Image
                src="/puebla-talavera.webp"
                alt="Ilustración plana vectorial del planeta cubierto con patrón Talavera"
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="glass-liquid rounded-[32px] p-8 md:p-10 h-full flex flex-col justify-between border border-white/5 hover:border-tangerine/20 transition-all">
              <div>
                <span className="font-mono text-xs tracking-[0.3em] text-tangerine uppercase">
                  Módulo de Crecimiento B
                </span>
                <h3 className="mt-4 text-2xl md:text-3xl font-black uppercase text-white">
                  Creemos en los Sueños
                </h3>
                <p className="mt-5 text-starlight/70 leading-relaxed text-sm md:text-base font-light">
                  Creemos en los sueños y amamos ayudar a las marcas a soñar en grande; ¡qué chula es Puebla y qué chulo es ver despegar tu negocio!
                  Acompañamos a pequeñas y medianas empresas a proyectar una imagen imponente, dándoles
                  acceso a la misma infraestructura de alta gama que utilizan los grandes corporativos
                  para competir y dominar su mercado con servicios integrales de{" "}
                  <strong className="text-white font-medium">marketing digital puebla</strong> y la velocidad de giro de la Rueda Estelar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: CUADRÍCULA INTERACTIVA DE CORE EXPERTISE (ESTILO SPINX) */}
      <section id="servicios" className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>Nuestras Capacidades // Core Expertise</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              QUÉ HACEMOS MEJOR EN PUEBLA
            </h2>
            <p className="mt-6 text-starlight/70 max-w-lg mx-auto text-sm leading-relaxed font-light">
              Desplegamos infraestructura de alta gama para acelerar tus ventas B2B. Selecciona un área para ver nuestros servicios detallados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {coreExpertise.map((exp, idx) => {
              const isSelected = activeExpertise === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveExpertise(idx)}
                  className={`glass-liquid rounded-[32px] p-8 border transition-all duration-500 cursor-pointer flex flex-col justify-between group min-h-[360px] relative overflow-hidden ${
                    isSelected ? "border-orangeleader/60 bg-white/[0.03]" : "border-white/5 hover:border-white/20"
                  }`}
                >
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${exp.glow}, transparent 70%)`,
                      opacity: isSelected ? 1 : 0.4
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-mono text-xs text-orangeleader tracking-widest">{exp.num} // CORE</span>
                      <span className={`w-2.5 h-2.5 rounded-full transition-all ${isSelected ? "bg-orangeleader scale-125" : "bg-white/20"}`} />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-4 group-hover:text-orangeleader transition-colors">
                      {exp.title}
                    </h3>
                    
                    <p className="text-xs text-starlight/60 leading-relaxed font-light">
                      {exp.desc}
                    </p>
                  </div>

                  <div className="mt-8 relative z-10">
                    <span className="text-[10px] font-mono tracking-widest text-orangeleader/80 uppercase">
                      {isSelected ? "Servicios Desplegados ↑" : "Ver Servicios ↓"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sub-servicios detallados con animación */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExpertise}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="glass-liquid rounded-[32px] p-8 md:p-12 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {coreExpertise[activeExpertise].services.map((s, idx) => (
                  <div key={idx} className="flex gap-5 group/item">
                    <span className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orangeleader shrink-0 group-hover/item:bg-orangeleader/10 transition-colors">
                      <ServiceIcon i={activeExpertise * 2 + idx} />
                    </span>
                    <div>
                      <h4 className="text-lg font-black uppercase text-white tracking-tight mb-2 group-hover/item:text-orangeleader transition-colors">
                        {s.name}
                      </h4>
                      <p className="text-sm text-starlight/60 leading-relaxed font-light">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECCIÓN NUEVA: PROCESO INTERACTIVO DE LANZAMIENTO (ACCORDION ESTILO SPINX) */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>Hoja de Ruta // Proceso de Ingeniería</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              Cómo Hacemos Sinergia con tu Proyecto en Puebla
            </h2>
            <p className="mt-6 text-starlight/70 max-w-lg mx-auto text-sm leading-relaxed font-light">
              Nuestra metodología estructurada de 5 fases, diseñada para entregar velocidad y resultados sin perder calidad.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side Accordion selection */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {processSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                      isActive ? "bg-white/[0.04] border-orangeleader/50 shadow-[0_4px_20px_rgba(235,63,27,0.1)]" : "bg-transparent border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-sm ${isActive ? "text-orangeleader" : "text-white/40"}`}>{step.num}</span>
                      <h3 className={`text-base font-bold uppercase ${isActive ? "text-white" : "text-white/60"}`}>
                        {step.phase}
                      </h3>
                    </div>
                    <span className={`text-lg font-bold leading-none ${isActive ? "text-orangeleader rotate-90" : "text-white/30"} transition-transform duration-300`}>
                      →
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Right side Detail Panel with Animation */}
            <div className="lg:col-span-7 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="glass-liquid rounded-[32px] p-8 md:p-10 border border-white/10 flex flex-col justify-between min-h-[380px]"
                >
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.25em] text-orangeleader uppercase px-3 py-1 rounded-full border border-orangeleader/20 bg-orangeleader/5">
                      Fase {processSteps[activeStep].num} // {processSteps[activeStep].phase}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight mt-6 mb-4">
                      {processSteps[activeStep].title}
                    </h3>
                    <p className="text-sm md:text-base text-starlight/70 leading-relaxed font-light mb-6">
                      {processSteps[activeStep].desc}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-6">
                    <h4 className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-3">Entregables de Fase:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-starlight/85 font-light">
                      {processSteps[activeStep].points.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orangeleader" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: TESTIMONIALES EN 3 FILAS DE MARQUESINAS FLOTANTES (CON ESPACIO DE ALTO PARA HOVER) */}
      <section className="relative z-10 py-16 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
          <div className="flex justify-center mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-orangeleader animate-pulse" />
          </div>
          <Hud>Comunicaciones Confirmadas // Testimonios en Órbita</Hud>
          <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
            ¡Qué chula es nuestra tripulación en el Espacio de Puebla!
          </h2>
        </div>

        {/* Row 1 - Scroll Left */}
        <div className="flex overflow-hidden w-full mb-8 relative py-4">
          <div className="flex gap-6 animate-marquee-left whitespace-nowrap min-w-full">
            {[...testimonialsRow1, ...testimonialsRow1].map((t, idx) => (
              <div
                key={idx}
                className="glass-liquid rounded-[24px] p-6 border border-white/5 w-[350px] shrink-0 flex flex-col justify-between whitespace-normal hover:-translate-y-2 hover:border-orangeleader/40 hover:shadow-[0_10px_25px_rgba(235,63,27,0.15)] transition-all duration-300 cursor-pointer"
              >
                <p className="text-xs text-starlight/80 italic font-light">&quot;{t.quote}&quot;</p>
                <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-3">
                  <div className="w-8 h-8 rounded-full bg-orangeleader flex items-center justify-center font-mono font-bold text-[10px] text-white">AF</div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-white leading-none">{t.company}</h4>
                    <span className="text-[10px] text-starlight/40 block mt-1 leading-none">{t.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Scroll Right */}
        <div className="flex overflow-hidden w-full mb-8 relative py-4">
          <div className="flex gap-6 animate-marquee-right whitespace-nowrap min-w-full">
            {[...testimonialsRow2, ...testimonialsRow2].map((t, idx) => (
              <div
                key={idx}
                className="glass-liquid rounded-[24px] p-6 border border-white/5 w-[350px] shrink-0 flex flex-col justify-between whitespace-normal hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_10px_25px_rgba(34,211,238,0.15)] transition-all duration-300 cursor-pointer"
              >
                <p className="text-xs text-starlight/80 italic font-light">&quot;{t.quote}&quot;</p>
                <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center font-mono font-bold text-[10px] text-black">AM</div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-white leading-none">{t.company}</h4>
                    <span className="text-[10px] text-starlight/40 block mt-1 leading-none">{t.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 - Scroll Left Fast */}
        <div className="flex overflow-hidden w-full relative py-4">
          <div className="flex gap-6 animate-marquee-left-fast whitespace-nowrap min-w-full">
            {[...testimonialsRow3, ...testimonialsRow3].map((t, idx) => (
              <div
                key={idx}
                className="glass-liquid rounded-[24px] p-6 border border-white/5 w-[350px] shrink-0 flex flex-col justify-between whitespace-normal hover:-translate-y-2 hover:border-purple-400/40 hover:shadow-[0_10px_25px_rgba(168,85,247,0.15)] transition-all duration-300 cursor-pointer"
              >
                <p className="text-xs text-starlight/80 italic font-light">&quot;{t.quote}&quot;</p>
                <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-mono font-bold text-[10px] text-white">MH</div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-white leading-none">{t.company}</h4>
                    <span className="text-[10px] text-starlight/40 block mt-1 leading-none">{t.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: CLIENTES LOCALES ESPECTACULARES CON CARUSEL DE LOGOS REALES */}
      <section className="relative z-10 py-16 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
          <Hud>Aliados en Órbita // Trayectoria Comprobada</Hud>
          <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
            Nuestras Marcas de Puebla en el Espacio Comercial
          </h2>
          <p className="mt-4 text-sm text-starlight/55 max-w-md mx-auto">
            Más del 70% de nuestros clientes se encuentran en la zona metropolitana de Puebla.
          </p>
        </div>

        {/* Logos Marquee Row 1 - Left */}
        <div className="flex overflow-hidden w-full mb-8 relative py-4">
          <div className="flex gap-12 animate-marquee-left items-center min-w-full">
            {[...clientLogos, ...clientLogos].map((src, idx) => (
              <div key={idx} className="w-24 md:w-32 shrink-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <Image src={src} width={128} height={64} className="w-full h-auto object-contain filter brightness-0 invert" alt="Cliente Alié Puebla" />
              </div>
            ))}
          </div>
        </div>

        {/* Logos Marquee Row 2 - Right */}
        <div className="flex overflow-hidden w-full relative py-4">
          <div className="flex gap-12 animate-marquee-right items-center min-w-full">
            {[...clientLogos, ...clientLogos].reverse().map((src, idx) => (
              <div key={idx} className="w-24 md:w-32 shrink-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <Image src={src} width={128} height={64} className="w-full h-auto object-contain filter brightness-0 invert" alt="Cliente Alié Puebla" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 7: CONTACTO & CRM TROPICALIZADO CON FONDO LIQUID GLASS */}
      <section id="contacto" className="relative min-h-screen flex items-center justify-center px-4 pb-32 pt-20 z-10">
        <div className="max-w-4xl w-full mx-auto">
          <div className="glass-liquid border border-white/10 rounded-[48px] p-8 md:p-16 text-center shadow-[0_0_80px_rgba(16,27,57,0.7)]">
            <Hud>ESTACIÓN DE CONTROL ANGELÓPOLIS // CONEXIÓN PUEBLA</Hud>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mt-6 mb-6">
              Hagamos despegar tu proyecto en Puebla
            </h2>
            <p className="text-sm md:text-base text-starlight/85 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Somos originarios de Puebla y te atendemos mediante videollamada y WhatsApp directo para agilizar procesos.
              Cuéntanos qué necesitas para potenciar la <strong className="text-white font-medium">publicidad digital en Puebla</strong> o diseño web de tu negocio.
            </p>

            <LeadForm servicioInteres="Estrategia Puebla" />

            <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-sm text-starlight/70 font-mono">
              <div>
                <span className="text-xs text-white/30 block mb-1">UBICACIÓN</span>
                <span className="text-white font-bold">Puebla, México</span>
                <span className="block text-xs mt-1 text-white/50">Base San Andrés Cholula</span>
              </div>
              <div>
                <span className="text-xs text-white/30 block mb-1">WHATSAPP DIRECTO</span>
                <button
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="text-orangeleader font-bold hover:underline cursor-pointer border-none bg-transparent p-0 text-left"
                >
                  221 327 9555
                </button>
              </div>
              <div>
                <span className="text-xs text-white/30 block mb-1">CENTRAL DE CORREO</span>
                <a href="mailto:puebla@aliedigital.com" className="text-white font-bold hover:underline">
                  puebla@aliedigital.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <WhatsAppChat services={SERVICIOS.map((s) => s.titulo)} isOpen={isWhatsAppOpen} setIsOpen={setIsWhatsAppOpen} />
    </div>
  );
}
