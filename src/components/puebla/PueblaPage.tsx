"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useVelocity, useMotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import LeadForm from "@/components/LeadForm";
import { SERVICIOS } from "@/components/agencia/data";
import { ServiceIcon, Hud, ShipMark } from "@/components/agencia/hud";
import WhatsAppChat from "@/components/puebla/WhatsAppChat";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const cb = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);
  return isDesktop;
};

// Left Trajectory Spacecraft with Sun at top and Talavera Planet at bottom
const PueblaOrbitalPath = () => {
  const isDesktop = useIsDesktop();
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
  const isDesktop = useIsDesktop();
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
  const [activeStep, setActiveStep] = useState(0);
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // 4 Core Expertises inspired by SpinX Digital
  const coreExpertise = [
    {
      num: "01",
      title: "Diseño web e identidad visual",
      desc: "Preparamos sitios que ayudan a tus prospectos a conocer tu oferta y consultar proyectos antes de contactarte.",
      services: [
        { name: "Diseño de páginas web", desc: "Organizamos tus servicios, proyectos y opciones de contacto según lo que tus prospectos necesitan saber para solicitar una cotización." },
        { name: "Manuales de marca", desc: "Documentamos cómo usar el logotipo, los colores y las tipografías de tu identidad visual." }
      ],
      glow: "rgba(235,63,27,0.08)",
      borderColor: "group-hover:border-orangeleader/30"
    },
    {
      num: "02",
      title: "Publicidad digital y redes sociales",
      desc: "Planeamos campañas y contenidos según tu oferta y los canales que utiliza tu público.",
      services: [
        { name: "Google Ads y Meta Ads", desc: "Definimos anuncios, audiencias y acciones a medir según el objetivo y el presupuesto acordados." },
        { name: "Gestión de redes sociales", desc: "Planeamos, redactamos y diseñamos contenidos para los canales acordados." }
      ],
      glow: "rgba(34,211,238,0.08)",
      borderColor: "group-hover:border-cyan-400/30"
    },
    {
      num: "03",
      title: "SEO y seguimiento comercial B2B",
      desc: "Revisamos cómo encuentran tu empresa y cómo puedes dar seguimiento a las consultas que recibe tu equipo.",
      services: [
        { name: "Posicionamiento SEO", desc: "Revisamos la estructura, los contenidos y los aspectos técnicos del sitio para facilitar que tus servicios se encuentren en buscadores." },
        { name: "Email marketing", desc: "Preparamos campañas y secuencias de correo según tus objetivos, tus contactos y las herramientas disponibles." }
      ],
      glow: "rgba(168,85,247,0.08)",
      borderColor: "group-hover:border-purple-400/30"
    },
    {
      num: "04",
      title: "Ecommerce e IA aplicada",
      desc: "Diseñamos tiendas en línea y flujos de trabajo para atender consultas, gestionar pedidos y coordinar envíos.",
      services: [
        { name: "Tiendas en línea", desc: "Organizamos el catálogo y las opciones de compra, pago y entrega según las necesidades de tu tienda." },
        { name: "IA aplicada al ecommerce", desc: "Diseñamos asistentes para atender consultas y automatizaciones para coordinar pedidos, preparación y envío." }
      ],
      glow: "rgba(34,197,94,0.08)",
      borderColor: "group-hover:border-green-400/30"
    }
  ];

  // 5 Process Steps (Accordion style)
  const processSteps = [
    {
      num: "01",
      phase: "Revisión inicial",
      title: "Revisamos tu situación actual",
      desc: "Conversamos con tu equipo para entender qué vendes, a quién y cómo llegan las consultas. Si ya tienes un sitio o campañas, revisamos los materiales y datos disponibles.",
      points: ["Oferta y público", "Canales actuales", "Objetivo comercial"]
    },
    {
      num: "02",
      phase: "Alcance",
      title: "Acordamos el alcance y las prioridades",
      desc: "Definimos qué trabajaremos primero, qué necesita aportar tu equipo y cómo revisaremos los avances. La propuesta detalla las actividades y los entregables.",
      points: ["Prioridades", "Entregables", "Responsabilidades"]
    },
    {
      num: "03",
      phase: "Preparación",
      title: "Preparamos contenidos y diseños",
      desc: "Según el proyecto, preparamos la estructura y el diseño del sitio o los mensajes y anuncios de campaña. Revisamos contigo los materiales antes de implementarlos.",
      points: ["Estructura y mensajes", "Diseño o anuncios", "Revisión con tu equipo"]
    },
    {
      num: "04",
      phase: "Implementación",
      title: "Implementamos y hacemos pruebas",
      desc: "Desarrollamos el sitio o configuramos las campañas. Si forman parte del alcance, comprobamos los formularios, las integraciones y el registro de las acciones acordadas.",
      points: ["Implementación", "Pruebas de contacto e integraciones", "Medición acordada"]
    },
    {
      num: "05",
      phase: "Publicación",
      title: "Publicamos y revisamos los primeros datos",
      desc: "Publicamos el sitio o activamos las campañas después de la revisión acordada. Según el alcance, revisamos los primeros datos disponibles y señalamos qué conviene ajustar.",
      points: ["Publicación o activación", "Revisión inicial", "Ajustes prioritarios"]
    }
  ];

  return (
    <div className="relative text-white font-sans selection:bg-orangeleader/30 selection:text-white bg-transparent">
      {/* Trajectory spaceship on the left side */}
      <PueblaOrbitalPath />

      {/* SECCIÓN 1: HERO CON ESTRELLAS INTERACTIVAS */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden z-10 pt-28">
        <InteractiveStars />

        <div className="absolute inset-0 bg-gradient-to-br from-orangeleader/15 to-transparent pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-xs md:text-sm font-mono tracking-[0.4em] text-orangeleader uppercase block mb-6">
              PARA EMPRESAS B2B EN PUEBLA
            </span>

            <h1 className="text-4xl md:text-7xl font-black uppercase leading-[1.02] tracking-tighter mb-8 max-w-4xl">
              Marketing digital para empresas B2B en Puebla
            </h1>

            <p className="text-base md:text-lg text-starlight/85 max-w-2xl mx-auto leading-relaxed font-light mb-10">
              Diseñamos sitios web y gestionamos campañas de Google Ads y Meta Ads para que las empresas de Puebla presenten sus servicios y reciban solicitudes de cotización. Si ya tienes sitio o campañas, revisamos contigo qué conviene mejorar primero.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-4">
            <a
              href="#contacto"
              className="bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(235,63,27,0.4)] transition-all flex items-center justify-center cursor-pointer"
            >
              Solicitar información
            </a>
            <a
              href="#servicios"
              className="glass-l2 rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest text-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all"
            >
              Ver servicios
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: EXTRACTO QUIÉNES SOMOS TROPICALIZADO */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Hud>MARKETING PARA EMPRESAS QUE VENDEN A OTRAS EMPRESAS</Hud>
            <h2 className="mt-8 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05] tracking-tight">
              Facilita que tus prospectos evalúen tu oferta
            </h2>
            <p className="mt-8 text-base text-starlight/75 leading-relaxed font-light">
              Antes de pedir una cotización, un prospecto necesita saber qué ofreces, qué proyectos has realizado y cómo contactarte. Revisamos qué información falta en tu sitio y cómo conectar tus campañas con las páginas que resuelven esas dudas.
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
            <Hud>POR QUÉ TRABAJAR CON ALIÉ DIGITAL</Hud>
            <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05]">
              Qué acordamos antes de empezar
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="glass-liquid rounded-[32px] p-8 md:p-10 h-full flex flex-col justify-between border border-white/5 hover:border-orangeleader/20 transition-all">
              <div>
                <h3 className="mt-4 text-2xl md:text-3xl font-black uppercase text-white">
                  Entregables y responsabilidades
                </h3>
                <p className="mt-5 text-starlight/70 leading-relaxed text-sm md:text-base font-light">
                  La propuesta detalla qué páginas, campañas o integraciones trabajaremos y qué materiales necesita aportar tu equipo. También acordamos cuándo revisar los avances y quién aprueba cada entrega.
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
                <h3 className="mt-4 text-2xl md:text-3xl font-black uppercase text-white">
                  Cómo revisamos las consultas
                </h3>
                <p className="mt-5 text-starlight/70 leading-relaxed text-sm md:text-base font-light">
                  Si la medición forma parte del proyecto, acordamos qué acciones registrar, como solicitudes por formulario o clics a WhatsApp. Tu equipo nos ayuda a identificar cuáles se convirtieron en conversaciones comerciales y qué conviene ajustar.
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
            <Hud>SERVICIOS DE MARKETING DIGITAL</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              Diseño web, campañas y seguimiento comercial
            </h2>
            <p className="mt-6 text-starlight/70 max-w-2xl mx-auto text-sm leading-relaxed font-light">
              Si tu empresa necesita presentar mejor sus servicios, recibir solicitudes de cotización o dar seguimiento a las consultas que ya llegan, revisamos contigo qué conviene trabajar primero.
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
                      <span className="font-mono text-xs text-orangeleader tracking-widest">{exp.num}</span>
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

          {/* Enlaces directos a servicios en Puebla */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/puebla/diseno-de-paginas-web/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full glass-l2 border border-white/10 hover:border-orangeleader/50 text-white hover:text-orangeleader font-mono text-xs uppercase tracking-wider transition-all duration-300"
            >
              Diseño de páginas web en Puebla →
            </Link>
            <Link
              href="/puebla/growth-marketing-b2b/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full glass-l2 border border-white/10 hover:border-orangeleader/50 text-white hover:text-orangeleader font-mono text-xs uppercase tracking-wider transition-all duration-300"
            >
              Growth marketing B2B en Puebla →
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN NUEVA: PROCESO INTERACTIVO DE LANZAMIENTO (ACCORDION ESTILO SPINX) */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>PROCESO DE TRABAJO</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              Cómo trabajamos tu proyecto
            </h2>
            <p className="mt-6 text-starlight/70 max-w-2xl mx-auto text-sm leading-relaxed font-light">
              Revisamos cómo llegan hoy tus consultas comerciales. Con esa información acordamos qué conviene mejorar primero y qué revisaremos contigo antes de publicar el sitio o activar las campañas.
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
                      Fase {processSteps[activeStep].num}
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

      {/* SECCIÓN 5: PROYECTOS REALIZADOS */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>PROYECTOS REALIZADOS</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              Diseño web y comercio electrónico en la práctica
            </h2>
            <p className="mt-6 text-starlight/70 max-w-2xl mx-auto text-sm leading-relaxed font-light">
              Conoce dos proyectos con necesidades distintas: presentar un catálogo para consultas comerciales y organizar una tienda en línea con un catálogo amplio.
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            {/* Proyecto 1: MORECSA */}
            <div className="glass-liquid rounded-[32px] border border-white/10 p-6 md:p-8 overflow-hidden hover:border-orangeleader/30 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 relative aspect-[16/10] md:aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                  <Image
                    src="/branding/morecsa.webp"
                    alt="MORECSA"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
                      MORECSA
                    </h3>
                    <p className="mt-4 text-starlight/75 text-sm md:text-base font-light leading-relaxed">
                      Desarrollamos un sitio con catálogo de equipos de bombeo y trabajamos el posicionamiento local para apoyar la captación de consultas comerciales en Puebla.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/casos-de-exito/#mision-01-bombas-sumergibles"
                      className="inline-flex items-center gap-2 text-white hover:text-orangeleader font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                      Ver ficha del proyecto →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Proyecto 2: Argüello Motopartes */}
            <div className="glass-liquid rounded-[32px] border border-white/10 p-6 md:p-8 overflow-hidden hover:border-orangeleader/30 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 relative aspect-[16/10] md:aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                  <Image
                    src="/casos/web/arguellomotopartes-catalogo.webp"
                    alt="Argüello Motopartes"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
                      Argüello Motopartes
                    </h3>
                    <p className="mt-4 text-starlight/75 text-sm md:text-base font-light leading-relaxed">
                      Desarrollamos una tienda en línea de refacciones con búsqueda interna y opciones de pago. El sitio facilita que los compradores encuentren productos dentro de un catálogo amplio.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/casos-de-exito/#mision-06-motopartes-ecommerce"
                      className="inline-flex items-center gap-2 text-white hover:text-orangeleader font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                      Ver ficha del proyecto →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enlace general a casos de éxito */}
          <div className="mt-12 text-center">
            <Link
              href="/casos-de-exito"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full glass-l2 border border-white/10 hover:border-orangeleader/50 text-white hover:text-orangeleader font-mono text-xs uppercase tracking-wider transition-all duration-300"
            >
              Ver casos de éxito →
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: CONTACTO & CRM */}
      <section id="contacto" className="relative min-h-screen flex items-center justify-center px-4 pb-32 pt-20 z-10">
        <div className="max-w-4xl w-full mx-auto">
          <div className="glass-liquid border border-white/10 rounded-[48px] p-8 md:p-16 text-center shadow-[0_0_80px_rgba(16,27,57,0.7)]">
            <Hud>CONTACTO EN PUEBLA</Hud>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mt-6 mb-6">
              Cuéntanos qué necesita tu empresa
            </h2>
            <p className="text-sm md:text-base text-starlight/85 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Si necesitas un sitio web, quieres mejorar tus campañas o buscas dar seguimiento a las consultas que ya recibes, déjanos tus datos o escríbenos por WhatsApp. Revisaremos contigo qué conviene trabajar primero.
            </p>

            <LeadForm servicioInteres="Estrategia Puebla" submitLabel="Solicitar información" />

            <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-sm text-starlight/70 font-mono">
              <div>
                <span className="text-xs text-white/30 block mb-1">COBERTURA</span>
                <span className="text-white font-bold">Atención a empresas en Puebla y San Andrés Cholula</span>
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
