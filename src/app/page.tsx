"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Spaceship from "@/components/Spaceship";
import LeadForm from "@/components/LeadForm";
import { HOME_SCHEMA } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
/* ── Preloader ── */
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onComplete, 600); return 100; }
        return Math.min(100, p + Math.floor(Math.random() * 15) + 5);
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#02040a] cursor-none">
      <div className="flex flex-col items-center gap-6">
        <motion.img src="/isotipo_GRADIENT.svg" animate={{ scale: [0.9, 1.1, 0.9] }} transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 drop-shadow-[0_0_30px_rgba(235,63,27,0.8)]" alt="Alié" />
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-orangeleader to-tangerine shadow-[0_0_15px_rgba(235,63,27,0.8)]"
            initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "linear", duration: 0.2 }} />
        </div>
        <div className="font-mono text-base text-white/50 tracking-[0.4em] uppercase">
          CENTRAL DE MANDO <span className="text-orangeleader ml-2">[{progress}%]</span>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Explosion Particles ── */
// Pseudo-random determinista (función pura) para evitar Math.random() durante el render.
const pseudoRandom = (seed: number) => {
  const s = Math.sin(seed) * 10000;
  return s - Math.floor(s);
};

const ExplosionParticles = ({ x, y }: { x: number; y: number }) => {
  const particles = [...Array(16)].map((_, i) => {
    const seed = i * 997 + x * 131 + y * 71;
    const angle = (i / 16) * Math.PI * 2;
    const dist = 60 + pseudoRandom(seed) * 140;
    const duration = 0.4 + pseudoRandom(seed + 1000) * 0.4;
    const size = 2 + pseudoRandom(seed + 2000) * 4;
    return { angle, dist, duration, size };
  });

  return (
    <div className="fixed pointer-events-none z-[70]" style={{ left: x, top: y }}>
      <motion.div
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-orange-500 blur-lg"
      />
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: Math.cos(p.angle) * p.dist, y: Math.sin(p.angle) * p.dist, opacity: 0, scale: 0 }}
          transition={{ duration: p.duration, ease: "easeOut" }}
          className="absolute rounded-full"
          style={{
            backgroundColor: ["#eb3f1b", "#ff8643", "#fbbf24", "#ef4444", "#fff"][i % 5],
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
};
/* ── Main Home Component ── */
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isWarpSpeed, setIsWarpSpeed] = useState(false);
  const [isLanded, setIsLanded] = useState(false);

  const [explosions, setExplosions] = useState<{ id: number; x: number; y: number }[]>([]);
  const [asteroidsDestroyed, setAsteroidsDestroyed] = useState([false, false, false]);
  const asteroidRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: horizontalProgress } = useScroll({ target: horizontalScrollRef, offset: ["start end", "end start"] });
  const xTransform = useTransform(horizontalProgress, [0.25, 0.75], ["0%", "-87.5%"]);

  useMotionValueEvent(horizontalProgress, "change", (v) => setIsWarpSpeed(v > 0.22 && v < 0.72));
  useMotionValueEvent(scrollYProgress, "change", (v) => setIsLanded(v > 0.95));

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

    // Asteroid respawn timers
  const respawnTimers = useRef<(NodeJS.Timeout | null)[]>([null, null, null]);

  const destroyAsteroid = useCallback((i: number, centerX: number, centerY: number) => {
    const id = Date.now() + i;
    setExplosions(prev => [...prev, { id, x: centerX, y: centerY }]);
    setTimeout(() => setExplosions(prev => prev.filter(ex => ex.id !== id)), 1200);
    setAsteroidsDestroyed(prev => { const n = [...prev]; n[i] = true; return n; });
    if (respawnTimers.current[i]) clearTimeout(respawnTimers.current[i]!);
    const delay = 3000 + Math.random() * 2000;
    respawnTimers.current[i] = setTimeout(() => {
      setAsteroidsDestroyed(prev => { const n = [...prev]; n[i] = false; return n; });
    }, delay);
  }, []);

  useEffect(() => {
    const timers = respawnTimers.current;
    return () => {
      timers.forEach(t => { if (t) clearTimeout(t); });
    };
  }, []);

  // Keyboard navigation for project showcase
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setActiveProject(prev => prev === 0 ? 3 : prev - 1);
      if (e.key === 'ArrowRight') setActiveProject(prev => prev === 3 ? 0 : prev + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

const handleLaserPosition = useCallback((bolts: { x: number; y: number }[]) => {
    asteroidRefs.current.forEach((ref, i) => {
      if (!ref || asteroidsDestroyed[i]) return;
      const rect = ref.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const hitRadius = rect.width / 2;
      for (const bolt of bolts) {
        const dx = bolt.x - centerX;
        const dy = bolt.y - centerY;
        if (Math.sqrt(dx * dx + dy * dy) < hitRadius + 20) {
          destroyAsteroid(i, centerX, centerY);
          break;
        }
      }
    });
  }, [asteroidsDestroyed, destroyAsteroid]);
  useEffect(() => {
    const interval = setInterval(() => {
      const { x: shipX, y: shipY } = mousePosRef.current;
      asteroidRefs.current.forEach((ref, i) => {
        if (!ref || asteroidsDestroyed[i]) return;
        const rect = ref.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const hitRadius = rect.width * 0.55;
        const dx = shipX - centerX;
        const dy = shipY - centerY;
        if (Math.sqrt(dx * dx + dy * dy) < hitRadius) {
          destroyAsteroid(i, centerX, centerY);
        }
      });
    }, 50);
    return () => clearInterval(interval);
  }, [asteroidsDestroyed, destroyAsteroid]);

  const services = [
    { name: "SEO Técnico & AI", alias: "Radar Estelar", desc: "Rankea en Google y motores de IA como ChatGPT y Perplexity. Optimizamos tu código, Schema y contenidos para que los LLMs recomienden tu marca.", icon: "/iconos/radar.webp", href: "/seo" },
    { name: "Diseño de páginas web", alias: "Órbita", desc: "Creamos sitios web y páginas de conversión enfocados en comunicar tu propuesta de valor y captar oportunidades comerciales. Diseños rápidos y optimizados.", icon: "/iconos/orbita.webp", href: "/diseno-paginas-web" },
    { name: "Ecommerce", alias: "Galaxia", desc: "Desarrollamos tiendas en línea y plataformas transaccionales robustas preparadas para vender de forma eficiente, rápida y optimizada para conversiones.", icon: "/iconos/galaxia.webp", href: "/ecommerce" },
    { name: "Paid media", alias: "Propulsión", desc: "Gestionamos campañas de pauta digital en Google Ads y Meta Ads para capturar intención de compra y generar leads calificados de alto valor.", icon: "/iconos/propulsion.webp", href: "/paid-media" },
    { name: "Redes sociales", alias: "Conquista Social", desc: "Gestionamos redes sociales para fortalecer tu presencia digital y atraer audiencia con contenido y anuncios pensados para aumentar la conversión.", icon: "/iconos/senal.webp", href: "/redes-sociales" },
    { name: "Email marketing", alias: "Pulso", desc: "Diseñamos campañas y automatizaciones de email marketing para nutrir contactos, reactivar clientes e impulsar ventas continuas sin esfuerzo manual.", icon: "/iconos/pulso.webp", href: "/email-marketing" },
    { name: "Asistentes IA & Automatizaciones", alias: "Copiloto IA", desc: "Implementamos asistentes virtuales personalizados y flujos de trabajo inteligentes que califican y atienden prospectos 24/7 de forma autónoma con tecnología de IA.", icon: "/iconos/ia.webp", href: "/ia" },
    { name: "Identidad Gráfica & Branding", alias: "Constelación", desc: "Construimos marcas memorables desde el logotipo, tono de voz y directrices visuales completas. Diseñamos marcas que destacan y transmiten confianza.", icon: "/iconos/constelacion.webp", href: "/identidad-grafica" },
  ];
  const projects = [
    {
      name: "Alianza Francesa Puebla",
      category: "Plataforma Institucional & Difusión Cultural",
      desc: "Portal web enfocado en la difusión cultural y la conversión de prospectos académicos, facilitando la consulta de programas de francés, certificaciones oficiales y la inscripción de la comunidad.",
      logo: "/logos/afpuebla.webp",
      video: "/videos/afpuebla.mp4",
      url: "afpuebla.mx",
    },
    {
      name: "Grupo Sedesil",
      category: "Sitio Corporativo B2B / Grupo Industrial",
      desc: "Plataforma institucional B2B orientada a proyectar la solidez del grupo, presentar su catálogo de soluciones comerciales e industriales y habilitar un canal directo de contacto para clientes corporativos.",
      logo: "/logos/sedesil.webp",
      video: "/videos/sedesil.mp4",
      url: "gruposedesil.com",
    },
    {
      name: "Argüello Motopartes",
      category: "E-commerce B2B / Catálogo Masivo",
      desc: "Plataforma transaccional B2B estructurada para gestionar un inventario masivo de refacciones, agilizar la búsqueda de productos especializados y hacer más eficientes los procesos de cotización y venta.",
      logo: "/logos/arguello.webp",
      video: "/videos/arguello.mp4",
      url: "arguellomotopartes.com",
    },
    {
      name: "Universidad de Oriente",
      category: "Portal Educativo Multicampus / Captación Institucional",
      desc: "Ecosistema digital de alta concurrencia diseñado para estructurar la oferta académica de múltiples campus, optimizar la experiencia de navegación y acelerar la captación de nuevos alumnos en procesos de admisión.",
      logo: "/logos/uo.webp",
      video: "/videos/uo.mp4",
      url: "uo.edu.mx",
    },
  ];

  const asteroidLabels = [
    "Sitios lentos sin ventas",
    "Agencias que desaparecen",
    "Presupuesto desperdiciado en anuncios",
  ];

  return (
    <div ref={containerRef}>
      <JsonLd data={HOME_SCHEMA} />
      {explosions.map(ex => (
        <ExplosionParticles key={ex.id} x={ex.x} y={ex.y} />
      ))}

      <Spaceship isWarpSpeed={isWarpSpeed} isLanded={isLanded} onLaserPosition={handleLaserPosition} />

      {/* ─── SECTOR 1: LA IGNICIÓN ─── */}
      <section id="ignicion" className="relative min-h-[110vh] flex flex-col justify-center items-center text-center px-4 z-10 pt-24">
        <div className="relative z-20 mt-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="text-base font-mono tracking-[0.4em] text-orangeleader uppercase block mb-10">
              AGENCIA DE MARKETING DIGITAL B2B // MONTERREY Y PUEBLA
            </span>
            <h1 className="text-3xl md:text-6xl font-black uppercase text-white leading-[0.95] tracking-tighter mb-10">
              AGENCIA DE MARKETING DIGITAL B2B PARA EMPRESAS QUE QUIEREN GENERAR MÁS DEMANDA Y VENTAS
            </h1>
            <p className="text-base md:text-base text-starlight/70 max-w-2xl mx-auto leading-relaxed font-light mb-12">
              Ayudamos a empresas B2B a posicionarse en buscadores, atraer prospectos calificados y convertir más oportunidades comerciales. Combinamos marketing digital, diseño web, automatización e inteligencia artificial para construir una presencia online que impulse resultados reales.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="#puerto-de-enlace" className="bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full h-14 px-10 font-black text-base uppercase tracking-widest shadow-[0_10px_30px_rgba(235,63,27,0.5)] transition-all flex items-center justify-center cursor-none">
                Agendar sesión de estrategia
              </a>
              <a href="#mapa-estelar" className="glass-l2 rounded-full h-14 px-10 font-black text-base uppercase tracking-widest text-white flex items-center justify-center cursor-none">
                Ver servicios B2B
              </a>
            </div>
            {/* Decorative planet */}
            <motion.img
              src="/ilustraciones/planeta1.webp"
              alt="Planeta Alié"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-[17.25rem] top-0 w-56 h-56 object-contain opacity-40 hidden lg:block"
            />
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-base font-mono tracking-[0.2em] uppercase">Scroll para iniciar misión</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full" />
        </motion.div>
      </section>
      {/* ─── SECTOR 2: COMBATE ESPACIAL ─── */}
      <section id="combate" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 z-10">
        <span className="text-base font-mono tracking-[0.3em] text-orangeleader uppercase mb-10">Sector 2 · El Motor</span>
        <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-6 text-center">
          INTELIGENCIA ARTIFICIAL Y GROWTH MARKETING B2B PARA GENERAR MÁS OPORTUNIDADES DE NEGOCIO
        </h2>
        <p className="text-base text-starlight/60 mb-20 text-center max-w-md">
          Dispara a los asteroides para eliminar los obstáculos del mercado y conoce nuestros motores de crecimiento.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-16 md:gap-24 mb-20">
          {[0, 1, 2].map(i => {
            const asteroidImages = ["/asteroides/asteroide-1.webp", "/asteroides/asteroide-2.webp", "/asteroides/asteroide-3.webp"];
            return !asteroidsDestroyed[i] && (
              <div key={i} className="relative flex flex-col items-center gap-3 cursor-none">
                <motion.div
                  ref={el => { asteroidRefs.current[i] = el; }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8 + i * 3, repeat: Infinity, ease: "linear" }}
                  className="w-40 h-40 md:w-60 md:h-60"
                >
                  <img
                    src={asteroidImages[i]}
                    alt={`Asteroide ${asteroidLabels[i]}`}
                    className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,80,30,0.5)]"
                  />
                </motion.div>
                <span className="text-base font-mono text-red-400 font-semibold uppercase tracking-wider text-center leading-tight w-40 md:w-60">
                  {asteroidLabels[i]}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-liquid rounded-[30px] p-10 flex flex-col gap-5 cursor-none"
          >
            <img src="/iconos/ia.webp" alt="IA" className="w-14 h-14 object-contain" />
            <span className="text-base font-mono text-cyan-400 uppercase tracking-widest">Propulsor A</span>
            <h3 className="text-xl font-black uppercase text-white">INTELIGENCIA ARTIFICIAL Y VELOCIDAD DE EJECUCIÓN</h3>
            <p className="text-base text-starlight/60 leading-relaxed">
              Aplicamos inteligencia artificial para empresas B2B que necesitan agilizar procesos, analizar mejor a sus compradores y mejorar su comunicación comercial. Con IA puedes acelerar la creación de mensajes, detectar patrones de interés y tomar decisiones con más contexto y menos fricción.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-liquid rounded-[30px] p-10 flex flex-col gap-5 cursor-none"
          >
            <img src="/iconos/growth.webp" alt="Growth" className="w-14 h-14 object-contain" />
            <span className="text-base font-mono text-tangerine uppercase tracking-widest">Propulsor B</span>
            <h3 className="text-xl font-black uppercase text-white">GROWTH MARKETING Y CAPTACIÓN CONSTANTE</h3>
            <p className="text-base text-starlight/60 leading-relaxed">
              Implementamos growth marketing B2B para atraer prospectos con intención real de compra y convertir más visitas en oportunidades comerciales. Diseñamos sistemas de posicionamiento, contenido y automatización enfocados en generar demanda de forma constante y escalable.
            </p>
          </motion.div>
        </div>
      </section>
      {/* ─── SECTOR 3: MAPA ESTELAR ─── */}
      <section id="mapa-estelar" ref={horizontalScrollRef} className="relative h-[300vh] z-10">
        <div className="sticky top-0 left-0 h-screen w-screen flex items-center overflow-hidden">
          <motion.div 
            style={{ x: xTransform }} 
            className="flex items-center gap-[4vw] pl-[10vw] pr-[30vw]"
          >
            <div className="w-[300px] md:w-[360px] shrink-0 flex flex-col gap-2">
              <span className="text-base font-mono tracking-[0.3em] text-tangerine uppercase">Sector 3 · Mapa Estelar</span>
              <h2 className="text-3xl font-black uppercase text-white leading-tight">SELECCIONA TU<br/>DESTINO DE CRECIMIENTO</h2>
              <p className="text-base text-starlight/50 mt-2">8 sistemas de crecimiento para tu empresa B2B.</p>
            </div>

            {services.map((svc, i) => (
              <Link
                key={i}
                href={svc.href}
                className="w-[300px] md:w-[360px] shrink-0 glass-liquid rounded-[40px] p-7 md:p-10 flex flex-col gap-6 group cursor-none hover:border-orangeleader/40 transition-colors"
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <img src={svc.icon} alt={svc.name} className="w-14 h-14 object-contain" />
                </div>
                <div>
                  <span className="text-base font-mono text-tangerine/70 uppercase tracking-widest">{svc.alias}</span>
                  <h3 className="text-lg font-black uppercase text-white mt-1 leading-tight">{svc.name}</h3>
                </div>
                <p className="text-base text-starlight/50 leading-relaxed">{svc.desc}</p>
                <div className="mt-auto h-0.5 w-8 bg-gradient-to-r from-orangeleader to-transparent rounded-full group-hover:w-16 transition-all" />
              </Link>
            ))}

            <div className="w-[300px] md:w-[360px] shrink-0 glass-liquid rounded-[40px] p-7 md:p-10 flex flex-col items-center justify-center gap-5 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-orangeleader/40 flex items-center justify-center">
                <span className="text-orangeleader text-2xl font-black">+</span>
              </div>
              <p className="text-base text-starlight/50 font-light">¿No encuentras tu solución?<br/>Hablemos.</p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ─── SECTOR 4: BITÁCORA DE MISIÓN ─── */}
      <section id="bitacora" className="relative min-h-screen flex flex-col items-center justify-center z-10 py-24 px-4">
        <span className="text-base font-mono tracking-[0.3em] text-orangeleader uppercase mb-10">Sector 4 · Bitácora de Misión</span>
        <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-6 text-center">
          MARCAS EN ÓRBITA Y<br/>RESULTADOS REALES.
        </h2>
        <p className="text-base text-starlight/60 mb-12 text-center max-w-md">
          Proyectos que han despegado con nuestra ingeniería. Resultados comprobables, no promesas vacías.
        </p>

        {/* Full‑screen project showcase — one video at a time */}
        <div className="w-full max-w-5xl mx-auto flex items-center gap-4 md:gap-6">
          {/* Left arrow */}
          <button
            onClick={() => setActiveProject(prev => prev === 0 ? 3 : prev - 1)}
            className="shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full glass-liquid hidden md:flex items-center justify-center
                       text-white/60 hover:text-white hover:border-white/30 transition-all cursor-none group"
            aria-label="Proyecto anterior"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Active project card */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glass-liquid rounded-[40px] overflow-hidden flex flex-col"
              >
                {/* Browser header */}
                <div className="flex items-center gap-1.5 px-5 py-3.5 bg-white/[0.02] border-b border-white/5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  <span className="ml-3 text-sm text-white/20 font-mono truncate">
                    {projects[activeProject].url}
                  </span>
                </div>
                {/* Video player — only one mounted at a time */}
                <div className="aspect-[16/9] bg-[#060a14] flex items-center justify-center relative overflow-hidden">
                  <video
                    key={projects[activeProject].video}
                    preload="none"
                    muted
                    loop
                    playsInline
                    disableRemotePlayback
                    autoPlay
                    poster={projects[activeProject].logo}
                    className="absolute inset-0 w-full h-full object-contain"
                  >
                    <source src={projects[activeProject].video} type="video/mp4" />
                  </video>
                </div>
                {/* Info footer */}
                <div className="px-6 md:px-10 py-6 shrink-0">
                  <span className="text-sm font-mono text-tangerine/60 uppercase tracking-widest">
                    {projects[activeProject].category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black uppercase text-white mt-1.5">
                    {projects[activeProject].name}
                  </h3>
                  <p className="text-base text-starlight/50 leading-relaxed mt-2">
                    {projects[activeProject].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => setActiveProject(prev => prev === 3 ? 0 : prev + 1)}
            className="shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full glass-liquid hidden md:flex items-center justify-center
                       text-white/60 hover:text-white hover:border-white/30 transition-all cursor-none group"
            aria-label="Siguiente proyecto"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-3 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveProject(i)}
              className={`rounded-full transition-all duration-500 cursor-none ${
                i === activeProject
                  ? 'w-8 h-2.5 bg-orangeleader shadow-[0_0_10px_rgba(235,63,27,0.6)]'
                  : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Proyecto ${i + 1}`}
            />
          ))}
        </div>
      </section>
      {/* ─── SECTOR 5: PUERTO DE ENLACE QUANTUM ─── */}
      <section id="puerto-de-enlace" className="relative min-h-screen flex items-center justify-center px-4 pb-36 pt-16 z-10">
        <div className="max-w-3xl w-full mx-auto pointer-events-auto">
          <div className="bg-[#101b39]/60 backdrop-blur-3xl border border-white/10 rounded-[50px] p-7 md:p-20 text-center shadow-[0_0_100px_rgba(16,27,57,0.8)] cursor-none">
            <span className="text-base font-mono tracking-[0.3em] text-orangeleader uppercase block mb-4">ATERRIZAJE 100% REMOTO</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-6">CONEXIÓN DIRECTA VÍA VIDEOLLAMADA.</h2>
            <p className="text-base md:text-base text-starlight/80 mb-10 leading-relaxed font-light">
              Atendemos a empresas en Monterrey, Puebla, CDMX y toda Latinoamérica mediante Google Meet, sin procesos burocráticos ni visitas innecesarias a oficina. Esta forma de trabajo nos permite avanzar más rápido, coordinar mejor cada proyecto y dar una atención cercana, eficiente y enfocada en resultados.
              <br/><br/>
              <span className="font-bold text-white">¿Quieres hablar con nosotros?</span> Escríbenos por Facebook o Instagram, o agenda una llamada de estrategia con el formulario de abajo.
            </p>
            <LeadForm />
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col items-center gap-1 opacity-50">
              <span className="text-base font-bold text-white uppercase">&quot;SUEÑA GRANDE, LLEGA LEJOS&quot;</span>
              <span className="text-base font-mono tracking-widest uppercase">Por un mundo lleno de marcas increíbles</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
