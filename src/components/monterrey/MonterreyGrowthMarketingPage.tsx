"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useVelocity, useMotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import LeadForm from "@/components/LeadForm";
import { Hud, ShipMark } from "@/components/agencia/hud";
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
      <div className="absolute left-1/2 top-[10%] bottom-[10%] w-px -translate-x-1/2 bg-gradient-to-b from-orangeleader/30 via-white/10 to-cyan-400/30" />

      {/* Dotted flow animation */}
      <div
        className="absolute left-1/2 top-[10%] bottom-[10%] w-px -translate-x-1/2 opacity-60"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, rgba(235,63,27,0.5) 0 6px, transparent 6px 16px)",
          backgroundSize: "100% 100px",
          animation: shouldReduce ? "none" : "orbit-flow 6s linear infinite",
        }}
      />

      {/* Sun/Core at the start of trajectory */}
      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-orangeleader/20 border border-orangeleader/60 shadow-[0_0_15px_rgba(235,63,27,0.6)] flex items-center justify-center text-sm z-30" style={{ top: "10%" }}>
        🚀
      </div>

      {/* Planet Monterrey at the end of trajectory */}
      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-cyan-400/50 overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.5)] z-30 flex items-center justify-center bg-black" style={{ top: "90%" }}>
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

export default function MonterreyGrowthMarketingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const packages = [
    {
      id: "captar-consultas",
      tag: "Opción 01",
      title: "Empezar a captar consultas",
      desc: "Para empresas que necesitan poner en marcha un canal de captación y saber qué anuncios o páginas generan solicitudes.",
      features: [
        "Campañas en Google Ads o Meta Ads según el proyecto",
        "Página de captación y opciones de contacto",
        "Medición de las acciones acordadas",
      ],
      cta: "Consultar esta opción",
      gradient: "from-yellow-500/5 via-transparent to-transparent",
      borderColor: "border-white/10 hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]",
      pillBg: "bg-yellow-500/10 text-yellow-400 border-yellow-400/30",
    },
    {
      id: "mejorar-campanas",
      tag: "Opción 02",
      title: "Mejorar campañas activas",
      desc: "Para empresas que ya invierten en publicidad y quieren entender dónde se pierden consultas o qué ajustes conviene probar.",
      features: [
        "Revisión de campañas y páginas de destino",
        "Validación de la medición disponible",
        "Prioridades de optimización según los datos",
      ],
      cta: "Consultar esta opción",
      gradient: "from-orangeleader/10 via-transparent to-transparent",
      borderColor: "border-[#eb3f1b]/40 hover:border-orangeleader hover:shadow-[0_0_40px_rgba(235,63,27,0.2)]",
      pillBg: "bg-[#eb3f1b]/20 text-orangeleader border-[#eb3f1b]/40",
    },
    {
      id: "seguimiento-comercial",
      tag: "Opción 03",
      title: "Organizar el seguimiento comercial",
      desc: "Para empresas que ya reciben consultas y necesitan registrarlas, asignarlas y saber en qué etapa está cada oportunidad.",
      features: [
        "Criterios de calificación acordados con ventas",
        "Registro y asignación en el CRM según compatibilidad",
        "Seguimiento por correo o WhatsApp según el alcance",
      ],
      cta: "Consultar esta opción",
      gradient: "from-cyan-500/5 via-transparent to-transparent",
      borderColor: "border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
      pillBg: "bg-cyan-500/10 text-cyan-400 border-cyan-400/30",
    },
  ];

  const coreCapabilities = [
    {
      num: "01",
      title: "Campañas",
      desc: "Configuramos o revisamos anuncios en Google Ads y Meta Ads según el público, el objetivo y el presupuesto acordados.",
    },
    {
      num: "02",
      title: "Página de captación",
      desc: "Preparamos o revisamos la página a la que llegan los anuncios para que el prospecto entienda la oferta y pueda solicitar información.",
    },
    {
      num: "03",
      title: "Medición",
      desc: "Acordamos qué acciones registrar, como envíos de formulario o clics a WhatsApp, y revisamos su origen cuando los datos disponibles lo permiten.",
    },
    {
      num: "04",
      title: "CRM y seguimiento",
      desc: "Cuando forma parte del proyecto, configuramos el registro y la asignación de consultas. Tu equipo aporta los criterios de calificación y actualiza el estado de cada oportunidad.",
    },
  ];

  const faqs = [
    {
      q: "¿Qué puede incluir la propuesta?",
      a: "Según lo que ya tenga tu empresa, la propuesta puede incluir campañas en Google Ads o Meta Ads, una página de captación, medición de consultas y conexiones con tu CRM. Acordamos qué se implementa y qué herramientas necesita aportar tu equipo.",
    },
    {
      q: "¿Cómo atienden a empresas en Monterrey?",
      a: "Atendemos a empresas en Monterrey por videollamada y WhatsApp. En la primera conversación revisamos qué quieres mejorar y qué herramientas ya usas.",
    },
    {
      q: "¿Cómo se define el presupuesto?",
      a: "Revisamos el alcance y la inversión disponible. La propuesta detalla los honorarios del servicio y, si incluye campañas, distingue el presupuesto destinado a anuncios.",
    },
    {
      q: "¿Cuándo podremos evaluar los primeros datos?",
      a: "Depende de la configuración inicial, el presupuesto y el volumen de consultas. Al definir el alcance acordamos cuándo revisar los datos disponibles y qué señales usaremos para decidir ajustes.",
    },
    {
      q: "¿Quién da seguimiento a las consultas?",
      a: "Podemos ayudarte a registrar y asignar las consultas y a definir criterios para calificarlas. Tu equipo comercial contacta a los prospectos, actualiza el estado de cada oportunidad y lleva la negociación.",
    },
  ];

  return (
    <div className="relative text-white font-sans selection:bg-orangeleader/30 selection:text-white bg-transparent overflow-x-hidden w-full">
      <style jsx global>{`
        @keyframes orbit-flow {
          0% { background-position: 0 0; }
          100% { background-position: 0 1000px; }
        }
      `}</style>

      {/* Spacecraft following scroll */}
      <MonterreyOrbitalPath />

      {/* 🌌 HERO SECTION */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center px-4 overflow-hidden z-10 pt-32 pb-16 bg-transparent">
        <InteractiveStars />
        <div className="absolute inset-0 bg-gradient-to-br from-orangeleader/10 via-transparent to-transparent pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-xs md:text-sm font-mono tracking-[0.4em] text-orangeleader uppercase block mb-6 px-4">
              CAPTACIÓN Y SEGUIMIENTO COMERCIAL
            </span>

            <h1 className="text-4xl md:text-7xl font-black uppercase leading-[1.02] tracking-tighter mb-8 max-w-4xl px-2">
              Growth Marketing <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orangeleader to-tangerine">
                B2B en Monterrey
              </span>
            </h1>

            <p className="text-base md:text-lg text-starlight/85 max-w-2xl mx-auto leading-relaxed font-light mb-10 px-4">
              Ayudamos a empresas que venden a otras empresas a conectar sus campañas con una página de captación y medir de dónde llegan las consultas. Si ya recibes prospectos, revisamos cómo registrarlos y darles seguimiento con tu equipo comercial.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-4 px-4">
            <a
              href="#contacto"
              className="w-full sm:w-auto bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(235,63,27,0.4)] transition-all flex items-center justify-center cursor-pointer"
            >
              Solicitar información
            </a>
            <a
              href="#paquetes"
              className="w-full sm:w-auto glass-l2 rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest text-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all"
            >
              Ver opciones de trabajo
            </a>
          </div>
        </div>
      </section>

      {/* 🚀 INTRODUCCIÓN */}
      <section className="relative z-10 px-4 md:px-8 py-20 bg-transparent">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="flex flex-col justify-center">
            <Hud>DE LA CAMPAÑA A LA CONSULTA</Hud>
            <h2 className="mt-8 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05] tracking-tight">
              Conecta tu publicidad con el seguimiento comercial
            </h2>
            <p className="mt-8 text-base text-starlight/75 leading-relaxed font-light font-sans">
              Una campaña puede llevar a un prospecto a tu sitio, pero el seguimiento empieza cuando tu equipo recibe la consulta. Revisamos cómo se registra, quién la atiende y qué información necesita ventas para decidir el siguiente paso.
            </p>
          </div>

          <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(235,63,27,0.15)] w-full min-h-[300px] md:min-h-[450px] lg:min-h-full flex items-center justify-center bg-black">
            <Image
              src="/monterrey-silla.webp"
              alt="Ilustración del Cerro de la Silla en Monterrey bajo un cielo cósmico"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* 🚀 THE PACKAGES SECTION */}
      <section id="paquetes" className="relative z-10 px-4 md:px-8 py-20 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>OPCIONES DE TRABAJO</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              Por dónde empezar según lo que ya tienes
            </h2>
            <p className="mt-6 text-starlight/70 max-w-2xl mx-auto text-sm leading-relaxed font-light font-sans">
              La propuesta detalla qué vamos a implementar y qué necesita aportar tu equipo. Podemos ayudarte a registrar las consultas y definir criterios para calificarlas. Tu equipo comercial atiende a los prospectos y lleva la negociación hasta el cierre.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`relative rounded-[32px] border ${pkg.borderColor} bg-white/[0.03] backdrop-blur-md p-8 flex flex-col justify-between overflow-hidden transition-all duration-500`}
              >
                {/* Background Gradient glow */}
                <div className={`absolute inset-0 bg-gradient-to-b ${pkg.gradient} pointer-events-none z-0`} />

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-[10px] font-mono tracking-widest border rounded-full px-3 py-1 uppercase ${pkg.pillBg}`}>
                      {pkg.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3 font-sans">
                    {pkg.title}
                  </h3>
                  <p className="text-sm text-starlight/70 leading-relaxed mb-6 font-light font-sans">
                    {pkg.desc}
                  </p>

                  <ul className="flex flex-col gap-3.5 mb-8 pt-4 border-t border-white/10">
                    {pkg.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start gap-2.5 text-sm text-starlight/85 font-light font-sans">
                        <span className="text-orangeleader mt-0.5">✦</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10">
                  <a
                    href="#contacto"
                    className="w-full h-12 rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center transition-all cursor-pointer glass-l2 text-white hover:bg-white/10 hover:border-orangeleader/40"
                  >
                    {pkg.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 WHAT'S INCLUDED (THE ENGINE PARTS) */}
      <section className="relative z-10 px-4 md:px-8 py-16 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>QUÉ PODEMOS CONECTAR</Hud>
            <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-tight tracking-tight">
              Campañas, medición y seguimiento en un mismo flujo
            </h2>
            <p className="mt-6 text-starlight/70 max-w-2xl mx-auto text-sm leading-relaxed font-light font-sans">
              Partimos de las herramientas que ya usas. La propuesta especifica qué piezas hacen falta y qué conexiones son compatibles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {coreCapabilities.map((cap, cidx) => (
              <div key={cidx} className="glass-liquid rounded-3xl p-8 border border-white/5 hover:border-orangeleader/30 hover:shadow-[0_0_25px_rgba(235,63,27,0.05)] transition-all duration-500">
                <span className="font-mono text-xs text-orangeleader block mb-3">{`${cap.num} · Componente`}</span>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2 font-sans">{cap.title}</h3>
                <p className="text-sm text-starlight/70 leading-relaxed font-light font-sans">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 EJEMPLO ILUSTRATIVO */}
      <section className="relative z-10 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>EJEMPLO ILUSTRATIVO</Hud>
            <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-tight tracking-tight">
              Cómo se da seguimiento a una solicitud de cotización
            </h2>
            <p className="mt-6 text-starlight/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light font-sans">
              Imagina que una empresa de mantenimiento industrial recibe una solicitud desde una campaña de Google Ads. Así podría organizar el seguimiento con las herramientas incluidas en su proyecto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-liquid rounded-3xl p-8 border border-white/5 hover:border-orangeleader/30 transition-all duration-300">
              <span className="font-mono text-2xl text-orangeleader font-bold">01</span>
              <h3 className="text-xl font-black uppercase text-white mt-4 mb-3 font-sans">
                El prospecto envía la solicitud
              </h3>
              <p className="text-sm text-starlight/75 leading-relaxed font-light font-sans">
                El anuncio lleva a una página que explica el servicio. El prospecto comparte qué tipo de mantenimiento necesita y dónde se encuentra su planta.
              </p>
            </div>

            <div className="glass-liquid rounded-3xl p-8 border border-white/5 hover:border-orangeleader/30 transition-all duration-300">
              <span className="font-mono text-2xl text-cyan-400 font-bold">02</span>
              <h3 className="text-xl font-black uppercase text-white mt-4 mb-3 font-sans">
                La consulta llega al equipo responsable
              </h3>
              <p className="text-sm text-starlight/75 leading-relaxed font-light font-sans">
                Si el CRM está conectado, se registra la solicitud con los datos del formulario y el origen de la campaña, cuando esté disponible. El equipo comercial recibe la consulta para atenderla.
              </p>
            </div>

            <div className="glass-liquid rounded-3xl p-8 border border-white/5 hover:border-orangeleader/30 transition-all duration-300">
              <span className="font-mono text-2xl text-green-400 font-bold">03</span>
              <h3 className="text-xl font-black uppercase text-white mt-4 mb-3 font-sans">
                Ventas califica y actualiza la oportunidad
              </h3>
              <p className="text-sm text-starlight/75 leading-relaxed font-light font-sans">
                El equipo confirma si el servicio y la zona encajan con su oferta. Si la solicitud es viable, acuerda el siguiente paso con el prospecto y actualiza el estado de la oportunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 HOW WE WORK (WITH HOVER & TRANSLATE ANIMATION) */}
      <section className="relative z-10 px-4 md:px-8 py-20 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>PROCESO DE TRABAJO</Hud>
            <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-tight tracking-tight">
              Cómo ponemos en marcha y ajustamos el servicio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-[2px] text-left hover:border-orangeleader/45 hover:bg-white/[0.03] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(235,63,27,0.12)] transition-all duration-500 cursor-default">
              <span className="font-mono text-2xl text-orangeleader font-bold">01</span>
              <h3 className="text-xl font-black uppercase text-white mt-4 mb-2 font-sans">Revisamos cómo llegan tus consultas</h3>
              <p className="text-sm text-starlight/75 leading-relaxed font-light font-sans">
                Identificamos qué campañas, páginas y herramientas usa tu empresa y cómo recibe ventas las solicitudes. Acordamos dónde conviene empezar y qué datos servirán para evaluar el trabajo.
              </p>
            </div>
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-[2px] text-left hover:border-cyan-400/45 hover:bg-white/[0.03] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(34,211,238,0.12)] transition-all duration-500 cursor-default">
              <span className="font-mono text-2xl text-cyan-400 font-bold">02</span>
              <h3 className="text-xl font-black uppercase text-white mt-4 mb-2 font-sans">Implementamos y verificamos lo acordado</h3>
              <p className="text-sm text-starlight/75 leading-relaxed font-light font-sans">
                Configuramos las campañas, páginas o conexiones incluidas en la propuesta. Según el alcance, comprobamos que se registren las acciones acordadas y que las consultas lleguen al canal correspondiente.
              </p>
            </div>
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-[2px] text-left hover:border-green-400/45 hover:bg-white/[0.03] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(34,197,94,0.12)] transition-all duration-500 cursor-default">
              <span className="font-mono text-2xl text-green-400 font-bold">03</span>
              <h3 className="text-xl font-black uppercase text-white mt-4 mb-2 font-sans">Revisamos los datos con tu equipo</h3>
              <p className="text-sm text-starlight/75 leading-relaxed font-light font-sans">
                Contrastamos las consultas registradas con la retroalimentación de ventas. Con esa información priorizamos ajustes de anuncios, páginas o seguimiento según el alcance del servicio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 CONTACT / CRM FORM SECTION */}
      <section id="contacto" className="relative z-10 px-4 md:px-8 py-20 bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <Hud>CONTACTO EN MONTERREY</Hud>
          <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white tracking-tight mb-4">
            Cuéntanos cómo llegan hoy tus prospectos
          </h2>
          <p className="text-sm md:text-base text-starlight/85 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Si quieres empezar a captar consultas, mejorar campañas activas u organizar el seguimiento comercial, déjanos tus datos o escríbenos por WhatsApp. Revisaremos contigo qué herramientas ya usas y por dónde conviene empezar.
          </p>

          <div className="glass-liquid rounded-[40px] border border-white/10 p-6 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(235,63,27,0.1)] backdrop-blur-md">
            <LeadForm servicioInteres="Growth Marketing Monterrey Paquetes" submitLabel="Solicitar información" />
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider text-starlight/70">
            <Link
              href="/monterrey/diseno-de-paginas-web/"
              className="text-white/80 hover:text-orangeleader transition-colors inline-flex items-center gap-2"
            >
              Diseño de páginas web en Monterrey →
            </Link>
            <span className="hidden sm:inline text-white/20">·</span>
            <Link
              href="/monterrey/"
              className="text-white/80 hover:text-orangeleader transition-colors inline-flex items-center gap-2"
            >
              Ver servicios de marketing digital en Monterrey →
            </Link>
          </div>
        </div>
      </section>

      {/* 🚀 FAQ SECTION */}
      <section className="relative z-10 px-4 md:px-8 py-20 bg-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Hud>PREGUNTAS FRECUENTES</Hud>
            <h2 className="mt-4 text-3xl md:text-5xl font-black uppercase text-white tracking-tight">
              Qué saber antes de iniciar
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, fidx) => {
              const isOpen = activeFaq === fidx;
              return (
                <div key={fidx} className="rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-[2px] overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : fidx)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <span className="font-bold text-sm md:text-base text-white pr-4 font-sans">{faq.q}</span>
                    <span className="text-orangeleader text-xl leading-none">{isOpen ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm text-starlight/75 leading-relaxed font-light border-t border-white/5 bg-white/[0.01] font-sans">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WhatsApp widget with package references */}
      <WhatsAppChat
        services={[
          "Cápsula de Despegue (Órbita Inicial)",
          "Transbordador de Velocidad de Escape (Recomendado)",
          "Crucero de Conquista Interestelar (Premium 360°)"
        ]}
      />
    </div>
  );
}
