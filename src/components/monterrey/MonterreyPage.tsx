"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useVelocity, useMotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import LeadForm from "@/components/LeadForm";
import { SERVICIOS } from "@/components/agencia/data";
import { ServiceIcon, Hud, ShipMark } from "@/components/agencia/hud";
import WhatsAppChat from "@/components/monterrey/WhatsAppChat";

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

// Left Trajectory Spacecraft with Sun at top and Monterrey Planet at bottom
const MonterreyOrbitalPath = () => {
  const isDesktop = useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP_QUERY).matches, () => false);
  if (!isDesktop) return null;
  return <MonterreyOrbitalPathInner />;
};

const MonterreyOrbitalPathInner = () => {
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

      {/* Monterrey Space Planet at the end of trajectory */}
      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-cyan-400/50 overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.5)] z-30" style={{ top: "90%" }}>
        <img src="/ilustraciones/planeta1.webp" className="w-full h-full object-cover" alt="Planeta Monterrey" />
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

export default function MonterreyPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // Forzar recálculo de Lenis al montar e imágenes cargadas
  useEffect(() => {
    const handleResize = () => {
      window.dispatchEvent(new Event("resize"));
    };

    const timer1 = setTimeout(handleResize, 800);
    const timer2 = setTimeout(handleResize, 2000);
    const timer3 = setTimeout(handleResize, 4000);

    window.addEventListener("load", handleResize);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("load", handleResize);
    };
  }, []);

  const slides = [
    {
      title: "Agencia de Marketing Digital en Monterrey",
      subtitle: "Ponemos a jalar tus campañas al hiperespacio. Trabajamos desde el norte y jalamos con la misma garra que cualquier regio para hacer crecer tu negocio.",
      tag: "ESTACIÓN ESPACIAL MONTERREY // SUEÑA GRANDE, LLEGA LEJOS",
      bgGradient: "from-orangeleader/15 to-transparent",
    },
    {
      title: "Servicios de Marketing Digital en Monterrey",
      subtitle: "Campañas de Google Ads y Meta Ads diseñadas a la medida de tus metas, con la potencia y solidez de un Cerro de la Silla Cósmico. Cero rodeos, puro jale de alta ingeniería.",
      tag: "PROPULSIÓN EN NUEVO LEÓN // PUBLICIDAD DIGITAL ESTRATÉGICA",
      bgGradient: "from-cyan-500/15 to-transparent",
    },
    {
      title: "Empresas de Marketing Digital en Monterrey",
      subtitle: "Desarrollamos sitios web robustos y más rápidos que una carne asada bien armada. Sitios con blindaje estelar listos para captar leads.",
      tag: "INGENIERÍA WEB Y SEO IA // MARKETING DIGITAL EN MONTERREY",
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
    "https://aliedigital.com/wp-content/uploads/2024/09/logo-viveterapia.webp",
    "https://aliedigital.com/wp-content/uploads/2024/09/logo-uniformex.webp",
    "https://aliedigital.com/wp-content/uploads/2024/09/logo-trebal.webp",
    "https://aliedigital.com/wp-content/uploads/2024/09/logo-sedesil.webp",
    "https://aliedigital.com/wp-content/uploads/2024/09/logo-salud-digna.webp",
    "https://aliedigital.com/wp-content/uploads/2024/09/logo-punto-activa.webp",
    "https://aliedigital.com/wp-content/uploads/2024/09/logo-marlosa.webp",
    "https://aliedigital.com/wp-content/uploads/2024/09/logo-forcelift.webp",
    "https://aliedigital.com/wp-content/uploads/2024/09/logo-famisa.webp",
    "https://aliedigital.com/wp-content/uploads/2024/09/logo-envfor.webp",
    "https://aliedigital.com/wp-content/uploads/2024/09/cliente-historiente.webp"
  ];

  // Monterrey Testimonials in Puebla Style
  const testimonialsRow1 = [
    { quote: "El rediseño de nuestro sitio web B2B quedó con madre. Los leads se duplicaron en menos de tres meses.", author: "Sra. Laura Garza", company: "Vive Terapia" },
    { quote: "Un equipo muy profesional que sabe cómo jalar en el mercado B2B corporativo de Monterrey.", author: "Socio Principal", company: "Trebal Abogados" },
    { quote: "Nuestra landing de uniformes industriales está jalando de lo lindo con Google Ads.", author: "Gerente de Planta", company: "Uniformex" },
    { quote: "Cero rodeos. El SEO técnico con IA nos posicionó por encima de competidores nacionales.", author: "Director Comercial", company: "Sedesil" }
  ];

  const testimonialsRow2 = [
    { quote: "Excelente comunicación y entregas ultra rápidas. Su infraestructura de IA nos ahorró semanas.", author: "Coordinador Tecnológico", company: "Salud Digna" },
    { quote: "La automatización del CRM y los formularios de captación nos aligeraron el jale diario.", author: "Gerente General", company: "Punto Activa" },
    { quote: "Campañas de Paid Media optimizadas que atraen prospectos calificados recurrentemente.", author: "Director de TI", company: "Grupo Marlosa" },
    { quote: "Nuestra plataforma de e-commerce de montacargas ahora procesa cotizaciones automáticamente.", author: "CEO", company: "Forcelift" }
  ];

  const testimonialsRow3 = [
    { quote: "Diseño web de primer nivel. Entienden perfectamente el dinamismo de la industria en Monterrey.", author: "Adquisiciones", company: "Famisa" },
    { quote: "Un aliado estratégico de primer nivel. Su soporte y empuje regio marcan la diferencia.", author: "Director de Proyectos", company: "Envfor" },
    { quote: "La landing page es rápida, chula y convierte visitas en clientes constantemente.", author: "Fundador", company: "Historiente" },
    { quote: "El jale que hicieron con el posicionamiento orgánico superó todas nuestras metas anuales.", author: "Director Comercial", company: "Trebal Monterrey" }
  ];

  // 4 Core Expertises inspired by SpinX Digital without prices
  const coreExpertise = [
    {
      num: "01",
      title: "DISEÑO WEB & BRANDING",
      desc: "Creamos portales web a medida y marcas de alto impacto visual sin usar plantillas genéricas. Nos enfocamos en la estética premium y la usabilidad.",
      services: [
        { name: "Diseño Web UI/UX Custom", desc: "Interfaces limpias, rápidas y orientadas a captar leads en Monterrey." },
        { name: "Identidad Gráfica & Branding", desc: "Logotipos, guías de estilo, tono de voz and directrices visuales corporativas." }
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
      desc: "Antes de programar una sola línea de código, nos sumergimos en tu modelo de negocio B2B. Analizamos tu competencia en Monterrey y definimos los objetivos clave de ventas y posicionamiento digital.",
      points: ["Auditoría de activos digitales actuales", "Análisis de competidores clave en Monterrey", "Definición de KPIs comerciales"]
    },
    {
      num: "02",
      phase: "Planificación & Estructura",
      title: "Mapa de Órbita e Ingeniería de Conversión",
      desc: "Diseñamos la arquitectura de la información y definimos el embudo de ventas. Mapeamos las palabras clave (SEO) y estructuramos las pasarelas de pago y las integraciones con tu CRM.",
      points: ["Keyword Research de alto valor transaccional en Monterrey", "Esquemas de flujos de conversión (Wireframes)", "Definición de stack tecnológico idóneo"]
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
      <MonterreyOrbitalPath />

      {/* SECCIÓN 1: HERO SLIDER CON ESTRELLAS INTERACTIVAS */}
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
            <div className="mb-4">
              <span className="text-xs text-orangeleader tracking-widest uppercase font-mono block mb-1">Jalamos con garra en el norte</span>
              <div className="w-12 h-0.5 bg-orangeleader"></div>
            </div>
            <Hud>Bitácora de Vuelo // Base de Lanzamiento Monterrey</Hud>
            <h2 className="mt-8 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05] tracking-tight">
              Habitamos en el norte con el Cerro de la Silla en nuestro horizonte
            </h2>
            <p className="mt-8 text-base text-starlight/75 leading-relaxed font-light">
              Trabajamos en el norte con el Cerro de la Silla en nuestro horizonte. Aquí no venimos a tirar barra ni a hacerte perder el tiempo; sabemos que en Monterrey el jale es serio. Las empresas regias no necesitan sitios web estáticos ni agencias burocráticas; necesitan una <strong className="text-white font-semibold">agencia digital potenciada por inteligencia artificial</strong> que sea transparente y un aliado estratégico orientado a entender sus metas financieras y potenciar sus ventas. Como <strong className="text-white font-semibold">agencia de diseño web impulsada por inteligencia artificial</strong> y <strong className="text-white font-semibold">agencia de marketing digital potenciada por inteligencia artificial</strong> con más de 7 años de trayectoria en el sector, acompañamos a empresas en Monterrey, San Pedro Garza García y toda la región a construir activos comerciales impulsados por ingeniería tecnológica e Inteligencia Artificial que generan resultados reales y medibles.
            </p>
          </div>

          <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(235,63,27,0.15)] aspect-square max-w-md mx-auto">
            <img
              src="/monterrey-silla.webp"
              alt="Ilustración del Cerro de la Silla en Monterrey bajo un cielo estrellado y espacial"
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a]/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: POR QUÉ NOSOTROS TROPICALIZADO */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>Doctrina de Misión // ADN Regio & Espacial</Hud>
            <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]">
              Nuestra filosofía: éxito compartido y pasión por crecer en Monterrey
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
                  el impacto real en las oportunidades de negocio y ventas de tu empresa con estrategias sólidas de <strong className="text-white font-medium">marketing digital en Monterrey</strong>. Conectamos tu marca con la solidez del Cerro de la Silla Galáctico, sin rodeos ni tiradera de barra.
                </p>
              </div>
            </div>

            <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.15)] aspect-[3/4.5] max-w-sm mx-auto h-[480px]">
              <img
                src="/monterrey-fundidora.webp"
                alt="Silueta del Horno 3 de Fundidora en Monterrey en una constelación de estrellas y planetas"
                className="w-full h-full object-cover rounded-[40px]"
                width={400}
                height={580}
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
                  Creemos en los sueños y amamos ayudar a las marcas a soñar en grande; ¡qué chulada es Monterrey y qué con ganas es ver despegar tu negocio!
                  Acompañamos a pequeñas y medianas empresas a proyectar una imagen sólida, dándoles
                  acceso a la misma infraestructura de alta gama que utilizan los grandes corporativos
                  para competir y dominar su mercado con servicios de <strong className="text-white font-medium">marketing digital monterrey</strong> y la fuerza templada del acero de Fundidora Estelar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: CUADRÍCULA DE CAPACIDADES SIN PRECIOS */}
      <section id="servicios" className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>Nuestras Capacidades // Core Expertise</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              QUÉ HACEMOS MEJOR EN MONTERREY
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

      {/* PROCESO INTERACTIVO DE LANZAMIENTO */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>Hoja de Ruta // Proceso de Ingeniería</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              CÓMO HACEMOS TIRO CON TU PROYECTO
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
                      isActive ? "bg-white/[0.04] border-orangeleader/50 shadow-[0_4px_20px_rgba(235,63,27,0.15)]" : "bg-transparent border-white/5 hover:border-white/15"
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

      {/* SECCIÓN 5: TESTIMONIALES (MARQUESINAS ESTILO PUEBLA) */}
      <section className="relative z-10 py-16 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
          <div className="flex justify-center mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-orangeleader animate-pulse" />
          </div>
          <Hud>Comunicaciones Confirmadas // Testimonios en Órbita</Hud>
          <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
            ¡Qué chulada de jale en el norte!
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
                  <div className="w-8 h-8 rounded-full bg-orangeleader flex items-center justify-center font-mono font-bold text-[10px] text-white">MTY</div>
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
                  <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center font-mono font-bold text-[10px] text-black">B2B</div>
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
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-mono font-bold text-[10px] text-white">IA</div>
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

      {/* SECCIÓN 6: CLIENTES LOCALES DE MONTERREY */}
      <section className="relative z-10 py-16 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
          <Hud>Aliados en Órbita // Trayectoria Comprobada</Hud>
          <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
            Nuestras Marcas de Monterrey en el Espacio Comercial
          </h2>
          <p className="mt-4 text-sm text-starlight/55 max-w-md mx-auto">
            Más de 20 empresas en Monterrey ya confían en nuestro jale.
          </p>
        </div>

        {/* Logos Marquee Row 1 - Left */}
        <div className="flex overflow-hidden w-full mb-8 relative py-4">
          <div className="flex gap-12 animate-marquee-left items-center min-w-full">
            {[...clientLogos, ...clientLogos].map((src, idx) => (
              <div key={idx} className="w-24 md:w-32 shrink-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <img src={src} className="w-full h-auto object-contain filter brightness-0 invert" alt="Cliente Alié Monterrey" />
              </div>
            ))}
          </div>
        </div>

        {/* Logos Marquee Row 2 - Right */}
        <div className="flex overflow-hidden w-full relative py-4">
          <div className="flex gap-12 animate-marquee-right items-center min-w-full">
            {[...clientLogos, ...clientLogos].reverse().map((src, idx) => (
              <div key={idx} className="w-24 md:w-32 shrink-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <img src={src} className="w-full h-auto object-contain filter brightness-0 invert" alt="Cliente Alié Monterrey" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 7: CONTACTO & CRM */}
      <section id="contacto" className="relative min-h-screen flex items-center justify-center px-4 pb-32 pt-20 z-10">
        <div className="max-w-4xl w-full mx-auto">
          <div className="glass-liquid border border-white/10 rounded-[48px] p-8 md:p-16 text-center shadow-[0_0_80px_rgba(16,27,57,0.7)]">
            <Hud>ESTACIÓN DE CONTROL DE MONTERREY // CONEXIÓN ESTELAR</Hud>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mt-6 mb-6">
              Hagamos despegar tu proyecto en Monterrey
            </h2>
            <p className="text-sm md:text-base text-starlight/85 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Operamos en Monterrey mediante videollamada y WhatsApp directo para agilizar procesos y maximizar la efectividad de tus campañas de <strong className="text-white font-medium">marketing digital en Monterrey</strong>.
            </p>

            <LeadForm servicioInteres="Estrategia Monterrey" />

            <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-sm text-starlight/70 font-mono">
              <div>
                <span className="text-xs text-white/30 block mb-1">UBICACIÓN</span>
                <span className="text-white font-bold">Monterrey, Nuevo León</span>
                <span className="block text-xs mt-1 text-white/50">Base San Pedro Garza García</span>
              </div>
              <div>
                <span className="text-xs text-white/30 block mb-1">WHATSAPP DIRECTO</span>
                <button
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="text-orangeleader font-bold hover:underline cursor-pointer border-none bg-transparent p-0 text-left"
                >
                  811 554 5351
                </button>
              </div>
              <div>
                <span className="text-xs text-white/30 block mb-1">CENTRAL DE CORREO</span>
                <a href="mailto:monterrey@aliedigital.com" className="text-white font-bold hover:underline">
                  monterrey@aliedigital.com
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
