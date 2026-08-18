"use client";

import React, { useState, useEffect, useRef } from "react";
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
      id: "capsula",
      name: "Cápsula de Despegue",
      eyebrow: "ÓRBITA INICIAL · STARTUP & LOCAL",
      desc: "Perfecta para validar canales y traccionar rápido sin sordearse con agencias lentas.",
      price: "Scoping personalizado",
      features: [
        "Campañas básicas en Meta Ads (Facebook & Instagram)",
        "1 Landing Page premium de alta velocidad (Next.js)",
        "Configuración básica de analítica de conversión",
        "CRM Sync para registrar leads al instante",
        "Soporte técnico por chat y reportes mensuales",
      ],
      cta: "Iniciar Despegue",
      gradient: "from-yellow-500/5 via-transparent to-transparent",
      borderColor: "border-white/10 hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]",
      pillBg: "bg-yellow-500/10 text-yellow-400 border-yellow-400/30",
    },
    {
      id: "transbordador",
      name: "Transbordador de Velocidad de Escape",
      eyebrow: "MISIONES DE CRECIMIENTO · RECOMENDADO",
      desc: "Para empresas medianas listas para subir como la espuma del Cerro de la Silla y dominar su sector.",
      price: "Scoping por metas",
      features: [
        "Paid Media multi-canal (Meta Ads + Google Ads)",
        "Embudo de conversión multi-paso (Lead Nurturing)",
        "Email Marketing automatizado y flujos de retención",
        "Optimización SEO local (Monterrey, San Pedro y Nacional)",
        "Dashboard interactivo en tiempo real con Looker Studio",
        "Integración de reCAPTCHA v3 & honeypot anti-bots",
      ],
      cta: "Activar Velocidad de Escape",
      gradient: "from-orangeleader/10 via-transparent to-transparent",
      borderColor: "border-[#eb3f1b]/40 hover:border-orangeleader hover:shadow-[0_0_40px_rgba(235,63,27,0.2)]",
      pillBg: "bg-[#eb3f1b]/20 text-orangeleader border-[#eb3f1b]/40",
      featured: true,
    },
    {
      id: "crucero",
      name: "Crucero de Conquista Interestelar",
      eyebrow: "SISTEMA INTEGRAL 360° · PREMIUM",
      desc: "El motor de growth más robusto, chulo y seguro. La joya de la corona tecnológica.",
      price: "Scoping por presupuesto",
      features: [
        "Estrategia de Growth 360° y Paid Media ilimitado",
        "Desarrollo Headless Web a la medida con Next.js",
        "Asistente de IA conversacional 24/7 para atención local",
        "Data Engine para atribuir y reconciliar ingresos al centavo",
        "Optimización de Búsquedas por IA (AEO / GEO / SEO)",
        "Soporte prioritario 24/7 y consultoría estratégica",
      ],
      cta: "Conquistar la Galaxia",
      gradient: "from-cyan-500/5 via-transparent to-transparent",
      borderColor: "border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
      pillBg: "bg-cyan-500/10 text-cyan-400 border-cyan-400/30",
    },
  ];

  const coreCapabilities = [
    {
      num: "01",
      title: "Paid Media Inteligente",
      desc: "Anuncios en Google y Meta Ads operados bajo una sola estrategia de adquisición orientada a tus metas de ingresos.",
    },
    {
      num: "02",
      title: "Data & Analítica",
      desc: "Ingeniería de medición para que sepas qué campaña atrae clientes de verdad y no te quedes atrás en el mercado regio.",
    },
    {
      num: "03",
      title: "Asistentes de IA",
      desc: "Agentes autónomos configurados para calificar leads y agendar citas comerciales por ti mientras descansas en Chipinque.",
    },
    {
      num: "04",
      title: "Optimización AI Search",
      desc: "Preparamos tu sitio para aparecer en respuestas directas de ChatGPT, Gemini y Perplexity, no solo en la lista azul de Google.",
    },
    {
      num: "05",
      title: "Headless Web Dev",
      desc: "Sitios de Next.js ultrarrápidos con velocidad de escape. Cero plantillas pesadas, puro diseño premium personalizado.",
    },
    {
      num: "06",
      title: "Email & Lifecycle",
      desc: "Nutrición automática de prospectos vía Email y WhatsApp para cerrar contratos sin gastar de más en publicidad.",
    },
  ];

  const faqs = [
    {
      q: "¿Por qué venden paquetes todo en uno y no servicios por separado?",
      a: "Porque comprar solo una campaña de Ads sin una landing rápida o sin analítica es como querer volar al espacio en una combi a medio gas. Un sistema de growth de verdad funciona cuando todas las piezas están unidas: los anuncios atraen demanda, el diseño web convierte, y los datos nos dicen qué optimizar. Al empaquetarlo todo a la medida de tu presupuesto, eliminamos la fricción y aseguramos resultados reales.",
    },
    {
      q: "¿Tienen oficina física en Monterrey o San Pedro?",
      a: "Operamos como un equipo senior distribuido y remoto. No gastamos en rentas lujosas en San Pedro Garza García para no inflar tus costos; preferimos invertir todo tu presupuesto en ingeniería de datos, optimización de pauta y desarrollo. Nos reunimos por Google Meet para mantener la nave alineada y viajamos a tu corporativo si la misión lo amerita.",
    },
    {
      q: "¿Cómo se conectan los formularios a mi CRM?",
      a: "Toda la telemetría del sitio (formularios y clics) se conecta de forma directa a tu CRM mediante integraciones limpias de API. Además, cada formulario pasa por una validación de reCAPTCHA v3 y posee un honeypot oculto anti-bots, asegurando que solo te lleguen prospectos reales y calificados.",
    },
    {
      q: "¿Cómo calculan el costo de los paquetes?",
      a: "En lugar de cobrarte un porcentaje fijo del gasto en pauta (como hacen las agencias del siglo pasado), estructuramos el alcance según las metas de tu negocio y la fase en la que se encuentra tu marca. Diseñamos un alcance que se ajuste al presupuesto disponible para que cada peso genere retorno verificable.",
    },
    {
      q: "¿Qué pasa si mi presupuesto es pequeño? ¿Me quedo sin despegue?",
      a: "Para nada. Si vas arrancando, iniciamos con la Cápsula de Despegue. Nos enfocamos en validar tus canales principales con pautas eficientes y una landing ultra rápida. Conforme se vayan captando leads y cierres ventas en Monterrey o nivel nacional, escalamos tu presupuesto y tus sistemas al siguiente nivel sin sordearnos.",
    },
    {
      q: "¿En cuánto tiempo veré los resultados de mi sistema de growth?",
      a: "Las campañas de pauta en Google y Meta Ads comienzan a generar prospectos en las primeras 2 a 3 semanas. La automatización del CRM y los asistentes de IA quedan listos en el primer mes. Las estrategias de SEO técnico local e indexación en IAs conversacionales toman entre 3 y 6 meses, constituyendo la base para un crecimiento sostenible sin depender eternamente de pauta pagada.",
    },
    {
      q: "¿Tengo control y propiedad absoluta de mis activos digitales?",
      a: "Por supuesto. Nosotros programamos, integramos y optimizamos tu nave comercial, pero tú eres el comandante absoluto. Todo el código Next.js, las cuentas publicitarias de Google/Meta, Google Analytics y las integraciones del CRM son de tu propiedad. Si la misión termina en algún momento, te llevas todo contigo sin penalizaciones ni letras chiquitas.",
    }
  ];

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

  return (
    <div className="relative text-white font-sans selection:bg-orangeleader/30 selection:text-white bg-transparent overflow-x-hidden w-full">
      <style jsx global>{`
        @keyframes orbit-flow {
          0% { background-position: 0 0; }
          100% { background-position: 0 1000px; }
        }
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
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
              SISTEMAS DE CRECIMIENTO TODO EN UNO // MONTERREY & SAN PEDRO
            </span>

            <h1 className="text-4xl md:text-7xl font-black uppercase leading-[1.02] tracking-tighter mb-8 max-w-4xl px-2">
              Growth Marketing <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orangeleader to-tangerine">
                Todo En Uno en Monterrey
              </span>
            </h1>

            <p className="text-base md:text-lg text-starlight/85 max-w-2xl mx-auto leading-relaxed font-light mb-10 px-4">
              Dejemos de sordearnos con servicios sueltos. Construimos motores de crecimiento personalizados según tu presupuesto y metas de ventas: pauta digital, analítica robusta, automatización e IA operando bajo un solo sistema inteligente.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-4 px-4">
            <a
              href="#contacto"
              className="w-full sm:w-auto bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(235,63,27,0.4)] transition-all flex items-center justify-center cursor-pointer"
            >
              Agendar Conversación
            </a>
            <a
              href="#paquetes"
              className="w-full sm:w-auto glass-l2 rounded-full h-14 px-8 font-black text-sm uppercase tracking-widest text-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all"
            >
              Ver Paquetes
            </a>
          </div>
        </div>
      </section>

      {/* 🚀 THE APPROACH SECTION (UN SOLO EQUIPO & MONTERREY VISUAL REFERENCE) */}
      <section className="relative z-10 px-4 md:px-8 py-20 bg-transparent">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="flex flex-col justify-center">
            <Hud>Bitácora del Capitán // Monterrey Digital</Hud>
            <h2 className="mt-8 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05] tracking-tight">
              Un solo motor de growth en Monterrey, no cinco agencias separadas
            </h2>
            <p className="mt-8 text-base text-starlight/75 leading-relaxed font-light font-sans">
              Muchas empresas contratan a una agencia para diseño web, a otra para Google Ads, a un freelance para redes sociales y a un consultor de SEO. ¿El resultado? Una nave desarticulada que gasta gasolina y se queda estancada sin saber de dónde vienen las ventas.
            </p>
            <p className="mt-4 text-base text-starlight/75 leading-relaxed font-light font-sans">
              En Alié Digital unimos todas las especialidades en un solo sistema de adquisición. Tu presupuesto se canaliza a lo que de verdad impulsa tu rentabilidad, monitoreando el embudo desde el primer clic en Google hasta el cierre en tu CRM.
            </p>
          </div>

          <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(235,63,27,0.15)] w-full min-h-[300px] md:min-h-[450px] lg:min-h-full flex items-center justify-center bg-black">
            <Image
              src="/monterrey-silla.webp"
              alt="El Cerro de la Silla en el espacio cósmico"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            {/* Visual reference representation of Monterrey */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 text-center z-10">
              <h3 className="text-xl font-bold uppercase tracking-widest text-orangeleader">Órbita Monterrey</h3>
              <p className="text-xs text-starlight/80 max-w-xs mx-auto mt-1 font-sans">
                Elevamos tu marca como la cima del Cerro de la Silla sobre el horizonte del norte, con cimientos tecnológicos inquebrantables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 CERRO DE LA SILLA / PROPULSION REGIA SECTION */}
      <section className="relative z-10 px-4 md:px-8 py-20 bg-transparent">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(235,63,27,0.15)] w-full min-h-[300px] md:min-h-[450px] lg:min-h-full flex items-center justify-center bg-black lg:order-1 order-2">
            <Image
              src="/monterrey-silla.webp"
              alt="Cerro de la Silla cósmico"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-[#02040a]/20 pointer-events-none" />
          </div>

          <div className="flex flex-col justify-center lg:order-2 order-1">
            <Hud>Propulsión Regia // Generación de Prospectos</Hud>
            <h2 className="mt-8 text-3xl md:text-5xl font-black uppercase text-white leading-[1.05] tracking-tight">
              Estrategias con la fuerza y empuje del norte
            </h2>
            <p className="mt-8 text-base text-starlight/75 leading-relaxed font-light font-sans">
              Nuestras campañas no van a medio gas. Inyectamos la energía del sector empresarial líder del norte en cada canal de adquisición digital. Configuramos flujos inteligentes automatizados que reaccionan al comportamiento del prospecto al instante, detonando una generación constante de leads calificados directos a tu fuerza de ventas.
            </p>
          </div>
        </div>
      </section>

      {/* 🚀 THE PACKAGES SECTION */}
      <section id="paquetes" className="relative z-10 px-4 md:px-8 py-20 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>Paquetes Estratégicos // Scoping Todo en Uno</Hud>
            <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
              Paquetes de Growth a tu Medida en Monterrey
            </h2>
            <p className="mt-6 text-starlight/70 max-w-lg mx-auto text-sm leading-relaxed font-light font-sans">
              Selecciona el paquete que mejor se alinee con el presupuesto y fase de vuelo de tu empresa. Cero letras chiquitas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`relative rounded-[32px] border ${pkg.borderColor} bg-white/[0.03] backdrop-blur-md p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 ${
                  pkg.featured ? "scale-100 lg:scale-[1.03] z-10" : ""
                }`}
              >
                {/* Background Gradient glow */}
                <div className={`absolute inset-0 bg-gradient-to-b ${pkg.gradient} pointer-events-none z-0`} />

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-[10px] font-mono tracking-widest border rounded-full px-3 py-1 uppercase ${pkg.pillBg}`}>
                      {pkg.eyebrow}
                    </span>
                    {pkg.featured && (
                      <span className="text-[10px] font-mono tracking-widest bg-[#eb3f1b] text-white rounded-full px-3 py-1 uppercase font-bold">
                        Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3 font-sans">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-starlight/70 leading-relaxed mb-6 font-light font-sans">
                    {pkg.desc}
                  </p>

                  <div className="border-t border-b border-white/10 py-4 mb-6">
                    <div className="text-xs font-mono text-starlight/45 uppercase tracking-widest">Inversión Estimada</div>
                    <div className="text-2xl font-black text-white mt-1 font-sans">{pkg.price}</div>
                  </div>

                  <ul className="flex flex-col gap-3.5 mb-8">
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
                    className={`w-full h-12 rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center transition-all cursor-pointer ${
                      pkg.featured
                        ? "bg-[#eb3f1b] hover:bg-[#ff8643] text-white shadow-[0_5px_15px_rgba(235,63,27,0.3)]"
                        : "glass-l2 text-white hover:bg-white/5"
                    }`}
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
            <Hud>Componentes del Sistema // The Engine</Hud>
            <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-tight tracking-tight">
              ¿Qué incluye el Sistema de Growth en Monterrey?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreCapabilities.map((cap, cidx) => (
              <div key={cidx} className="glass-liquid rounded-3xl p-8 border border-white/5 hover:border-orangeleader/30 hover:shadow-[0_0_25px_rgba(235,63,27,0.05)] transition-all duration-500">
                <span className="font-mono text-xs text-orangeleader block mb-3">{cap.num} // SISTEMA</span>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2 font-sans">{cap.title}</h3>
                <p className="text-sm text-starlight/70 leading-relaxed font-light font-sans">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 CLIENTS SECTION */}
      <section className="relative z-10 py-16 md:py-24 border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
          <Hud>Aliados Locales // Casos de Éxito</Hud>
          <h2 className="mt-6 text-3xl md:text-6xl font-black uppercase text-white leading-none tracking-tighter">
            PROYECTOS LANZADOS EN MONTERREY
          </h2>
        </div>

        {/* Logos Marquee */}
        <div className="flex overflow-hidden w-full relative py-4">
          <div className="flex gap-12 animate-marquee-left items-center min-w-full">
            {[...clientLogos, ...clientLogos].map((src, idx) => (
              <div key={idx} className="w-24 md:w-32 shrink-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <Image
                  src={src}
                  width={128}
                  height={64}
                  unoptimized
                  className="w-full h-auto object-contain filter brightness-0 invert"
                  alt="Cliente Alié Digital Monterrey"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 HOW WE WORK (WITH HOVER & TRANSLATE ANIMATION) */}
      <section className="relative z-10 px-4 md:px-8 py-20 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Hud>Fases de Vuelo // Ruta de Colisión</Hud>
            <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white leading-tight tracking-tight">
              Fases de Lanzamiento en el Norte
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-[2px] text-left hover:border-orangeleader/45 hover:bg-white/[0.03] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(235,63,27,0.12)] transition-all duration-500 cursor-default">
              <span className="font-mono text-2xl text-orangeleader font-bold">01</span>
              <h3 className="text-xl font-black uppercase text-white mt-4 mb-2 font-sans">Auditoría & Telemetría</h3>
              <p className="text-sm text-starlight/75 leading-relaxed font-light font-sans">
                Escaneamos tu funnel actual, analizamos a los competidores regios y modelamos la economía unitaria de tus prospectos antes de invertir el primer peso.
              </p>
            </div>
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-[2px] text-left hover:border-cyan-400/45 hover:bg-white/[0.03] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(34,211,238,0.12)] transition-all duration-500 cursor-default">
              <span className="font-mono text-2xl text-cyan-400 font-bold">02</span>
              <h3 className="text-xl font-black uppercase text-white mt-4 mb-2 font-sans">Ingeniería del Stack</h3>
              <p className="text-sm text-starlight/75 leading-relaxed font-light font-sans">
                Instalamos la analítica, creamos las landing pages headless ultra veloces e integramos los canales de pauta y CRM para que no se escape ningún lead.
              </p>
            </div>
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-[2px] text-left hover:border-green-400/45 hover:bg-white/[0.03] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(34,197,94,0.12)] transition-all duration-500 cursor-default">
              <span className="font-mono text-2xl text-green-400 font-bold">03</span>
              <h3 className="text-xl font-black uppercase text-white mt-4 mb-2 font-sans">Escalamiento Constante</h3>
              <p className="text-sm text-starlight/75 leading-relaxed font-light font-sans">
                Optimizamos audiencias con IA, escalamos los anuncios ganadores, y te reportamos retornos claros que hasta el área de finanzas aplaudirá.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 CONTACT / CRM FORM SECTION */}
      <section id="contacto" className="relative z-10 px-4 md:px-8 py-20 bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <Hud>Mesa de Control // Lanzar Misión</Hud>
          <h2 className="mt-6 text-3xl md:text-5xl font-black uppercase text-white tracking-tight mb-4">
            ¿Listo para Despegar en Monterrey?
          </h2>
          <p className="text-sm text-starlight/70 max-w-lg mx-auto mb-12 font-light font-sans">
            Escríbenos y nuestro equipo analizará tu caso para sugerirte el paquete idóneo para tus objetivos y presupuesto.
          </p>

          <div className="glass-liquid rounded-[40px] border border-white/10 p-6 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(235,63,27,0.1)] backdrop-blur-md">
            <LeadForm servicioInteres="Growth Marketing Monterrey Paquetes" />
          </div>
        </div>
      </section>

      {/* 🚀 FAQ SECTION */}
      <section className="relative z-10 px-4 md:px-8 py-20 bg-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Hud>Bitácora de Soporte // Preguntas Frecuentes sobre Growth en Monterrey</Hud>
            <h2 className="mt-4 text-3xl md:text-5xl font-black uppercase text-white tracking-tight">
              Preguntas Frecuentes sobre Growth en Monterrey
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
