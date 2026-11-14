"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useVelocity, useMotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import LeadForm from "@/components/LeadForm";
import { Hud, ShipMark, ServiceIcon } from "@/components/agencia/hud";
import WhatsAppChat from "@/components/monterrey/WhatsAppChat";

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

const MonterreyOrbitalPath = () => {
  const isDesktop = useIsDesktop();
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
        <Image src="/ilustraciones/planeta1.webp" width={32} height={32} className="w-full h-full object-cover" alt="Planeta Monterrey" />
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

export default function MonterreyDisenoWebPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // 3 Opciones de Diseño Web adaptadas a Monterrey B2B
  const coreExpertise = [
    {
      num: "01",
      title: "Sitio web nuevo",
      desc: "Organizamos tus servicios, proyectos y datos de contacto en un sitio que ayude a tus prospectos a entender tu oferta y solicitar una cotización.",
      services: [
        { name: "Estructura y contenidos", desc: "Organizamos las secciones de servicios, proyectos y contacto para presentar tu oferta de manera clara.", icon: 0 },
        { name: "Diseño y desarrollo web", desc: "Diseñamos una interfaz adaptada a computadoras y dispositivos móviles, facilitando la consulta de información.", icon: 1 }
      ],
      glow: "rgba(235,63,27,0.08)",
      borderColor: "group-hover:border-orangeleader/30"
    },
    {
      num: "02",
      title: "Rediseño de un sitio existente",
      desc: "Revisamos qué páginas y contenidos conviene conservar. A partir de eso proponemos cambios en la estructura, el diseño y las rutas de contacto.",
      services: [
        { name: "Revisión del sitio actual", desc: "Analizamos qué contenidos y secciones conviene mantener y cuáles necesitan actualización.", icon: 7 },
        { name: "Actualización visual y navegación", desc: "Mejoramos la presentación de tus páginas y optimizamos las rutas hacia los puntos de contacto.", icon: 1 }
      ],
      glow: "rgba(34,211,238,0.08)",
      borderColor: "group-hover:border-cyan-400/30"
    },
    {
      num: "03",
      title: "Mejoras e integraciones",
      desc: "Si el sitio ya cumple su función principal, podemos trabajar en una parte concreta, como el formulario, el acceso a WhatsApp, la conexión con tu CRM o la medición de solicitudes. Revisamos la compatibilidad antes de definir el alcance.",
      services: [
        { name: "Formularios y WhatsApp", desc: "Optimizamos los puntos de contacto directo para facilitar que los prospectos envíen sus consultas.", icon: 6 },
        { name: "Conexión a CRM y analítica", desc: "Configuramos el envío de datos a tu sistema comercial y la medición de acciones clave acordadas.", icon: 5 }
      ],
      glow: "rgba(168,85,247,0.08)",
      borderColor: "group-hover:border-purple-400/30"
    }
  ];

  // 5 Process Steps Accordion (SpinX style)
  const processSteps = [
    {
      num: "01",
      phase: "Alcance",
      title: "Definimos el alcance",
      desc: "Revisamos tu oferta, a quién va dirigido el sitio y qué acciones quieres facilitar. Si ya tienes un sitio, identificamos los contenidos y las funciones que conviene conservar.",
      points: ["Objetivo del sitio", "Páginas y contenidos", "Integraciones necesarias"]
    },
    {
      num: "02",
      phase: "Diseño",
      title: "Preparamos la estructura y el diseño",
      desc: "Ordenamos la navegación y preparamos el diseño de las páginas acordadas. Revisamos contigo cómo se presentan los servicios y dónde aparecen las opciones de contacto.",
      points: ["Estructura de páginas", "Diseño visual", "Revisión con tu equipo"]
    },
    {
      num: "03",
      phase: "Desarrollo",
      title: "Desarrollamos el sitio",
      desc: "Implementamos las páginas y, según el alcance, configuramos el formulario, WhatsApp y las conexiones con tus herramientas comerciales.",
      points: ["Desarrollo web", "Formularios y contacto", "Integraciones acordadas"]
    },
    {
      num: "04",
      phase: "Revisión",
      title: "Revisamos antes de publicar",
      desc: "Comprobamos la navegación en computadora y móvil. Según el alcance, revisamos los formularios, la medición, los metadatos y el rendimiento de las páginas principales.",
      points: ["Navegación y dispositivos", "Pruebas de contacto", "Revisión SEO y de rendimiento"]
    },
    {
      num: "05",
      phase: "Publicación",
      title: "Coordinamos la publicación",
      desc: "Acordamos cuándo publicar y qué accesos se necesitan. Después de publicar, revisamos las páginas principales y entregamos los recursos previstos en la propuesta.",
      points: ["Publicación coordinada", "Revisión posterior", "Entrega acordada"]
    }
  ];

  return (
    <div className="relative text-white font-sans selection:bg-orangeleader/30 selection:text-white bg-transparent overflow-x-hidden w-full">
      {/* Spacecraft following scroll */}
      <MonterreyOrbitalPath />

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
              DISEÑO WEB PARA EMPRESAS B2B
            </span>

            <h1 className="text-4xl md:text-7xl font-black uppercase leading-[1.02] tracking-tighter mb-8 max-w-4xl">
              Diseño de páginas web <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orangeleader to-tangerine">
                en Monterrey
              </span>
            </h1>

            <p className="text-base md:text-lg text-starlight/85 max-w-2xl mx-auto leading-relaxed font-light mb-10">
              Diseñamos sitios web para que las empresas de Monterrey presenten sus servicios, muestren sus proyectos y reciban solicitudes de cotización. Si ya tienes un sitio, revisamos contigo qué conviene conservar y qué necesita mejorar.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-4">
            <a
              href="#contacto"
              className="bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(235,63,27,0.4)] transition-all flex items-center justify-center cursor-pointer"
            >
              Solicitar cotización
            </a>
            <a
              href="#capacidades"
              className="glass-l2 rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest text-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all"
            >
              Ver opciones de diseño web
            </a>
          </div>
        </div>
      </section>

      {/* 🌌 NUESTRA PROPUESTA DE AVENTURA */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Hud>DISEÑO WEB PARA TU EQUIPO COMERCIAL</Hud>
            <h2 className="mt-8 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05] tracking-tight">
              Un sitio que facilite solicitar una cotización
            </h2>
            <p className="mt-8 text-base text-starlight/75 leading-relaxed font-light">
              Organizamos la información que tus prospectos necesitan para evaluar tu oferta: qué servicios prestas, en qué proyectos has trabajado y cómo pueden contactarte. Si ya tienes un sitio, revisamos qué vale la pena conservar antes de definir los cambios.
            </p>
          </div>

          <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(235,63,27,0.15)] aspect-square max-w-md mx-auto">
            <Image
              src="/monterrey-silla.webp"
              alt="Ilustración del Cerro de la Silla en Monterrey bajo un cielo estrellado y espacial"
              fill
              sizes="(max-width: 768px) 100vw, 448px"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a]/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 💻 EXPERTISE & CAPABILITIES GRID */}
      <section id="capacidades" className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>OPCIONES DE DISEÑO WEB</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              Qué podemos trabajar en tu sitio web
            </h2>
            <p className="mt-6 text-starlight/70 max-w-lg mx-auto text-sm leading-relaxed font-light">
              El alcance depende de lo que ya tienes y de lo que necesitas que el sitio haga por tu equipo comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <span className="font-mono text-xs text-orangeleader tracking-widest">{`${exp.num} // OPCIÓN`}</span>
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
                      <ServiceIcon i={s.icon ?? (activeExpertise * 2 + idx)} />
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

      {/* 🗺️ INTERACTIVE PROCESS ROADMAP */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>PROCESO DE TRABAJO</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              Cómo diseñamos y publicamos tu sitio
            </h2>
            <p className="mt-6 text-starlight/70 max-w-lg mx-auto text-sm leading-relaxed font-light">
              Antes de cotizar, revisamos qué páginas necesita el sitio, qué materiales tiene tu equipo y qué integraciones deben formar parte del proyecto.
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
                      {`Fase ${processSteps[activeStep].num} // ${processSteps[activeStep].phase}`}
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

      {/* PORTAFOLIO DE DISEÑO WEB */}
      <section className="relative z-10 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>PORTAFOLIO DE DISEÑO WEB</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              Ejemplos de sitios que hemos desarrollado
            </h2>
            <p className="mt-6 text-starlight/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
              Conoce proyectos de distintos sectores y cómo organizamos la información de cada empresa según lo que necesita presentar en su sitio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <div className="glass-liquid rounded-[32px] border border-white/10 p-6 md:p-8 flex flex-col justify-between hover:border-orangeleader/30 transition-all duration-300">
              <div>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/40 mb-6">
                  <Image
                    src="/casos/web/gruposedesil.webp"
                    alt="Grupo Sedesil"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-3">
                  Grupo Sedesil
                </h3>
                <p className="text-starlight/75 text-sm font-light leading-relaxed">
                  Sitio corporativo para presentar granos y botanas a granel, productos derivados de sus botanas y opciones de contacto comercial.
                </p>
              </div>
            </div>

            <div className="glass-liquid rounded-[32px] border border-white/10 p-6 md:p-8 flex flex-col justify-between hover:border-orangeleader/30 transition-all duration-300">
              <div>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/40 mb-6">
                  <Image
                    src="/casos/web/puntoactiva.webp"
                    alt="Punto Activa"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-3">
                  Punto Activa
                </h3>
                <p className="text-starlight/75 text-sm font-light leading-relaxed">
                  Desarrollo de un sitio corporativo de entrenamiento enfocado en inspirar acción y captar prospectos presenciales y online.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/diseno-de-paginas-web/#casos-orbita"
              className="inline-flex items-center gap-2 text-white hover:text-orangeleader font-mono text-xs uppercase tracking-wider transition-colors"
            >
              Ver portafolio de diseño web →
            </Link>
          </div>
        </div>
      </section>

      {/* 🚀 FORMULARIO & CRM INTEGRATION */}
      <section id="contacto" className="relative min-h-screen flex items-center justify-center px-4 pb-32 pt-20 z-10 border-t border-white/5">
        <div className="max-w-4xl w-full mx-auto">
          <div className="glass-liquid border border-white/10 rounded-[48px] p-8 md:p-16 text-center shadow-[0_0_80px_rgba(16,27,57,0.7)]">
            <Hud>CONTACTO EN MONTERREY</Hud>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mt-6 mb-6">
              Solicita una cotización para tu sitio web
            </h2>
            <p className="text-sm md:text-base text-starlight/85 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Cuéntanos si necesitas un sitio nuevo, un rediseño o una mejora puntual. Si ya tienes un sitio, puedes compartirnos el enlace por WhatsApp. Con esa información podremos revisar qué necesita tu empresa y definir el alcance de la propuesta.
            </p>

            <LeadForm servicioInteres="Diseño de páginas web" submitLabel="Solicitar cotización" />

            <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-sm text-starlight/70 font-mono">
              <div>
                <span className="text-xs text-white/30 block mb-1">COBERTURA</span>
                <span className="text-white font-bold">Atención a empresas en Monterrey, Nuevo León</span>
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

      {/* Floating WhatsApp Widget */}
      <WhatsAppChat services={["Diseño de páginas web", "Desarrollo E-commerce", "SEO Técnico", "Estrategia Digital"]} isOpen={isWhatsAppOpen} setIsOpen={setIsWhatsAppOpen} />
    </div>
  );
}
