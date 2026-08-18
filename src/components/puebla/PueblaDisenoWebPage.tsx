"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useVelocity, useMotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import LeadForm from "@/components/LeadForm";
import { Hud, ShipMark, ServiceIcon } from "@/components/agencia/hud";
import WhatsAppChat from "@/components/puebla/WhatsAppChat";

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

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
        <img src="/puebla-talavera.webp" className="w-full h-full object-cover" alt="Planeta Talavera" onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }} />
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

export default function PueblaDisenoWebPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeExpertise, setActiveExpertise] = useState(0);

  // SpinX style Capabilities Grid adapted to Web Design & Space Theme
  const coreExpertise = [
    {
      num: "01",
      title: "ESTRATEGIA & PLANIFICACIÓN",
      desc: "Cartografiamos los objetivos de tu nave comercial. Trazamos el mapa de órbita y arquitectura para garantizar conversiones B2B de alto calibre.",
      services: [
        { name: "Consultoría y Auditoría Digital", desc: "Escaneo de competidores locales y análisis de brechas de velocidad en tu web actual." },
        { name: "Arquitectura de Información (UX)", desc: "Mapeo lógico de wireframes interactivos y flujo de conversión intuitivo para el usuario." }
      ],
      glow: "rgba(235,63,27,0.08)",
      borderColor: "group-hover:border-orangeleader/30"
    },
    {
      num: "02",
      title: "DISEÑO UI/UX PREMIUM",
      desc: "Estética galáctica a la medida. Nada de plantillas baratas ni interfaces lentas. Creamos diseños fluidos, responsivos y altamente atractivos.",
      services: [
        { name: "Diseño Mobile-First Personalizado", desc: "El 80% de tu tráfico viene de móviles. Diseñamos con precisión quirúrgica para pantallas pequeñas." },
        { name: "Identidad Visual y Prototipos", desc: "Modelado interactivo en alta fidelidad y directrices visuales coherentes alineadas a tu marca." }
      ],
      glow: "rgba(34,211,238,0.08)",
      borderColor: "group-hover:border-cyan-400/30"
    },
    {
      num: "03",
      title: "DESARROLLO HEADLESS & CMS",
      desc: "Motores Next.js con velocidad de escape. Escribimos código ultrarrápido y seguro, integrado con administradores modulares como WordPress y Shopify.",
      services: [
        { name: "Desarrollo Headless (Next.js / React)", desc: "Sitios web estáticos e híbridos con tiempos de carga menores a un segundo." },
        { name: "Gestores Autoadministrables", desc: "WordPress modular o Shopify robusto para que gestiones tu nave comercial sin depender de un programador." }
      ],
      glow: "rgba(168,85,247,0.08)",
      borderColor: "group-hover:border-purple-400/30"
    },
    {
      num: "04",
      title: "SEO TÉCNICO & PERFORMANCE",
      desc: "Blindaje técnico para que Google y la IA recomienden tu marca. Estructuras preparadas para posicionarse en los primeros puestos.",
      services: [
        { name: "Optimización Core Web Vitals", desc: "Velocidad real de carga, estabilidad visual y tiempos de respuesta interactivos al 100%." },
        { name: "Marcado de Datos Schema JSON-LD", desc: "Microdatos enriquecidos para una visibilidad destacada en motores de búsqueda e inteligencias artificiales." }
      ],
      glow: "rgba(34,197,94,0.08)",
      borderColor: "group-hover:border-green-400/30"
    }
  ];

  // 5 Process Steps Accordion (SpinX style)
  const processSteps = [
    {
      num: "01",
      phase: "Descubrimiento & Mapeo",
      title: "Definición del Destino Interestelar",
      desc: "Analizamos tu modelo de negocio B2B en Puebla. Identificamos tu propuesta de valor, tu perfil de cliente ideal y definimos las metas comerciales de tu nuevo sitio web.",
      points: ["Auditoría técnica del sitio actual", "Keyword Research enfocado en Puebla y nacional", "Definición de requerimientos técnicos y APIs"]
    },
    {
      num: "02",
      phase: "Diseño e Interfaz UI/UX",
      title: "Construcción del Prototipo Visual",
      desc: "Modelamos la interfaz visual desde cero. Diseñamos componentes elegantes con estética premium cuidando el contraste de color, tipografía y adaptabilidad móvil.",
      points: ["Diseño de wireframes interactivos", "Maquetación visual en alta fidelidad", "Aprobación de la estética antes de programar"]
    },
    {
      num: "03",
      phase: "Ensamble & Programación",
      title: "Codificación con Velocidad Estelar",
      desc: "Nuestros desarrolladores escriben código limpio, semántico y modular. Programamos los componentes de la interfaz usando tecnologías modernas como Next.js y React.",
      points: ["Desarrollo responsivo ultra optimizado", "Integración con CRM y APIs transaccionales", "Cumplimiento estricto de estándares W3C"]
    },
    {
      num: "04",
      phase: "Optimización de Motores",
      title: "Blindaje de SEO e Integración IA",
      desc: "Preparamos la página para su indexación. Inyectamos microformatos Schema JSON-LD, integramos metaetiquetas dinámicas y configuramos la velocidad extrema del servidor.",
      points: ["Inyección de metadatos SEO y Open Graph", "Integración de recaptcha v3 y honeypot anti-bots", "Optimización de assets y compresión de imágenes"]
    },
    {
      num: "05",
      phase: "Despegue & Monitoreo",
      title: "Lanzamiento y Auditoría PageSpeed",
      desc: "Sometemos el sitio web a una auditoría estricta de rendimiento. Una vez validada la velocidad óptima de carga en móviles y computadoras, lanzamos el sitio sin tiempo muerto.",
      points: ["Auditoría final PageSpeed (Score de 90+)", "Cambio de DNS seguro libre de caídas", "Monitoreo post-lanzamiento e indexación en Google"]
    }
  ];

  const clientLogos = [
    "/logos/logo-acares.webp",
    "/logos/logo-alianza.webp",
    "/logos/logo-arguello.webp",
    "/logos/logo-penalares.webp",
    "/logos/logo-morecsa.webp",
    "/logos/logo-prisma.webp",
    "/logos/logo-confirma.webp",
    "/logos/logo-conkretar.webp"
  ];

  return (
    <div className="relative text-white font-sans selection:bg-orangeleader/30 selection:text-white bg-transparent overflow-x-hidden w-full">
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
          animation: scroll-left 50s linear infinite;
        }
        .animate-marquee-right {
          animation: scroll-right 50s linear infinite;
        }
      `}</style>

      {/* Spacecraft following scroll */}
      <PueblaOrbitalPath />

      {/* 🚀 HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden z-10 pt-28">
        <InteractiveStars />
        <div className="absolute inset-0 bg-gradient-to-br from-orangeleader/15 via-transparent to-transparent pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-xs md:text-sm font-mono tracking-[0.4em] text-orangeleader uppercase block mb-6">
              DISEÑO & DESARROLLO DE PÁGINAS WEB // PUEBLA
            </span>

            <h1 className="text-4xl md:text-7xl font-black uppercase leading-[1.02] tracking-tighter mb-8 max-w-4xl">
              Diseño de páginas web <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orangeleader to-tangerine">
                en Puebla
              </span>
            </h1>

            <p className="text-base md:text-lg text-starlight/85 max-w-2xl mx-auto leading-relaxed font-light mb-10">
              Desarrollamos portales corporativos premium, e-commerce y aplicaciones web headless a la medida en Puebla y Cholula. Sitios ultrarrápidos, optimizados para SEO local e integrados a tu CRM.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-4">
            <a
              href="#contacto"
              className="bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(235,63,27,0.4)] transition-all flex items-center justify-center cursor-pointer"
            >
              Iniciar Despegue Web
            </a>
            <a
              href="#capacidades"
              className="glass-l2 rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest text-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all"
            >
              Explorar Capacidades
            </a>
          </div>
        </div>
      </section>

      {/* 🌌 NUESTRA PROPUESTA DE AVENTURA */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Hud>Bitácora de Ingeniería // Portal Puebla</Hud>
            <h2 className="mt-8 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05] tracking-tight">
              Construimos Sitios Chulos que Conectan con la Galaxia
            </h2>
            <p className="mt-8 text-base text-starlight/75 leading-relaxed font-light">
              Desde nuestra central digital en Cholula, diseñamos páginas web que no solo se ven espectaculares sino que operan como verdaderas naves de captación de clientes. Nos enfocamos en eliminar toda fricción técnica: velocidad extrema con Next.js, seguridad inquebrantable, formularios conectados a tu CRM y diseño visual de alto nivel. Cero plantillas lentas, puro código de alto rendimiento.
            </p>
          </div>

          <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(235,63,27,0.15)] aspect-square max-w-md mx-auto">
            <img
              src="/puebla-popo.webp"
              alt="Ilustración Popocatépetl flotando en el espacio"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/og-home.webp";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a]/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 💻 EXPERTISE & CAPABILITIES GRID (SPINX INSPIRATION) */}
      <section id="capacidades" className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>Especialidades Digitales // Core Capabilities</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              Capacidades de Diseño Web en Puebla
            </h2>
            <p className="mt-6 text-starlight/70 max-w-lg mx-auto text-sm leading-relaxed font-light">
              Desplegamos soluciones de diseño de primer nivel para empresas que no se conforman con lo ordinario.
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
                      <span className="font-mono text-xs text-orangeleader tracking-widest">{exp.num} // AREA</span>
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
                      {isSelected ? "Detalles Desplegados ↑" : "Ver Detalles ↓"}
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

      {/* 🗺️ INTERACTIVE PROCESS ROADMAP (ACCORDION STYLE) */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>Hoja de Ruta // Proceso de Despegue</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              Nuestra Metodología de Desarrollo en Puebla
            </h2>
            <p className="mt-6 text-starlight/70 max-w-lg mx-auto text-sm leading-relaxed font-light">
              Nuestra ingeniería de 5 fases estructuradas para garantizar un sitio rápido, seguro y libre de errores.
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
                    <h4 className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-3">Entregables:</h4>
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

      {/* 🤝 CLIENTS SECTION */}
      <section className="relative z-10 py-16 md:py-24 border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
          <Hud>Aliados Locales // Casos de Éxito</Hud>
          <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
            PROYECTOS LANZADOS EN PUEBLA
          </h2>
        </div>

        {/* Logos Marquee */}
        <div className="flex overflow-hidden w-full relative py-4">
          <div className="flex gap-12 animate-marquee-left items-center min-w-full">
            {[...clientLogos, ...clientLogos].map((src, idx) => (
              <div key={idx} className="w-24 md:w-32 shrink-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <img src={src} className="w-full h-auto object-contain filter brightness-0 invert" alt="Cliente Alié Digital Puebla" onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 FORMULARIO & CRM INTEGRATION */}
      <section id="contacto" className="relative min-h-screen flex items-center justify-center px-4 pb-32 pt-20 z-10 border-t border-white/5">
        <div className="max-w-4xl w-full mx-auto">
          <div className="glass-liquid border border-white/10 rounded-[48px] p-8 md:p-16 text-center shadow-[0_0_80px_rgba(16,27,57,0.7)]">
            <Hud>ESTACIÓN DE CONTROL ANGELÓPOLIS // CRM CONNECT</Hud>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mt-6 mb-6">
              Agendemos tu Estrategia de Diseño en Puebla
            </h2>
            <p className="text-sm md:text-base text-starlight/85 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Platiquemos sobre el diseño y velocidad de tu próximo sitio web. Llena el formulario para sincronizar con nuestro CRM y agendar una llamada.
            </p>

            <LeadForm servicioInteres="Diseño de páginas web" />

            <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-sm text-starlight/70 font-mono">
              <div>
                <span className="text-xs text-white/30 block mb-1">CENTRAL</span>
                <span className="text-white font-bold">Puebla, México</span>
              </div>
              <div>
                <span className="text-xs text-white/30 block mb-1">WHATSAPP DIRECTO</span>
                <a href="https://wa.me/522213279555" target="_blank" rel="noopener noreferrer" className="text-orangeleader font-bold hover:underline">
                  221 327 9555
                </a>
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

      {/* Floating WhatsApp Widget */}
      <WhatsAppChat services={["Diseño de páginas web", "Desarrollo E-commerce", "SEO Técnico", "Estrategia Digital"]} />
    </div>
  );
}
