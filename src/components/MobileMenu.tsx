"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MAIN_NAV } from "@/lib/site";
import { ShipMark } from "@/components/agencia/hud";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/* Cabina de mando orbital: menú móvil a pantalla completa con lenguaje
   HUD (anillos orbitales, nodos, nave "A" y telemetría). Todo CSS/SVG
   para no costar rendimiento en móvil. */

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const shouldReduce = useReducedMotion();
  const [expanded, setExpanded] = useState<number | null>(null);

  // Bloquear scroll y cerrar con Escape mientras esté abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(null);
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleClose = () => {
    setExpanded(null);
    onClose();
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const isItemActive = (item: typeof MAIN_NAV[0]): boolean => {
    if (isActive(item.href)) {
      return true;
    }
    if (item.children) {
      return item.children.some((child) => isActive(child.href));
    }
    return false;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[95] lg:hidden flex flex-col bg-[#02040a]/95 backdrop-blur-2xl overflow-hidden"
          data-lenis-prevent
        >
          {/* ── Fondo espacial ─────────────────────────────────────────── */}
          {/* Estrellas con efecto "warp" al entrar */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scaleY: 4 }}
            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="absolute inset-0 starfield" />
          </motion.div>

          {/* Nebulosa */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(235,63,27,0.18),transparent_55%)]" />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,rgba(22,38,79,0.65),transparent_60%)]" />

          {/* Anillos orbitales + nave "A" (centro del sistema) */}
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-24 z-0 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] opacity-40">
            <motion.div
              className="absolute inset-0"
              animate={shouldReduce ? undefined : { rotate: 360 }}
              transition={shouldReduce ? undefined : { duration: 80, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.4" strokeDasharray="2 7" />
                <circle cx="100" cy="100" r="74" fill="none" stroke="rgba(235,63,27,0.3)" strokeWidth="0.5" strokeDasharray="12 10" />
                <circle cx="100" cy="100" r="52" fill="none" stroke="rgba(255,134,67,0.24)" strokeWidth="0.4" strokeDasharray="1 5" />
              </svg>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ShipMark size={44} floating={!shouldReduce} />
            </div>
          </div>

          {/* Planeta (decorativo) */}
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 opacity-70">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 32% 28%, rgba(255,134,67,0.85) 0%, rgba(235,63,27,0.7) 30%, rgba(22,38,79,0.95) 62%, rgba(2,4,10,0) 72%)",
                boxShadow: "0 0 90px rgba(235,63,27,0.35), inset -24px -24px 70px rgba(2,4,10,0.8)",
              }}
            />
            <div className="absolute left-1/2 top-1/2 h-[190px] w-[340px] -translate-x-1/2 -translate-y-1/2 -rotate-[20deg] rounded-[50%] border border-white/10" />
          </div>

          {/* Asteroide (decorativo) */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 -left-8 h-24 w-24 opacity-40"
            animate={shouldReduce ? undefined : { y: [0, 14, 0], rotate: [0, 8, 0] }}
            transition={shouldReduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="h-full w-full rounded-[42%_58%_55%_45%/55%_45%_60%_40%] border border-white/10 bg-gradient-to-br from-[#16264f] to-[#02040a]"
              style={{ boxShadow: "inset -8px -10px 18px rgba(0,0,0,0.8), inset 6px 8px 14px rgba(255,255,255,0.06)" }}
            />
          </motion.div>

          {/* Marco HUD (esquinas) */}
          {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map(
            (pos) => (
              <span key={pos} aria-hidden="true" className={`pointer-events-none absolute z-0 h-6 w-6 border-white/20 ${pos}`} />
            )
          )}

          {/* ── Cabecera ───────────────────────────────────────────────── */}
          <div className="relative z-10 flex items-center justify-between px-6 py-6">
            <motion.img
              src="/isotipo_GRADIENT.svg"
              alt="Alié"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 drop-shadow-[0_0_24px_rgba(235,63,27,0.7)]"
            />
            <button
              onClick={handleClose}
              aria-label="Cerrar menú"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:border-orangeleader/60 hover:shadow-[0_0_20px_rgba(235,63,27,0.4)] hover:rotate-90 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* ── Navegación: destinos orbitales ─────────────────────────── */}
          <nav className="relative z-10 flex-1 overflow-y-auto scrollbar-none px-8">
            <ul className="relative flex flex-col gap-1 py-4">
              {/* Riel orbital (línea de trayectoria) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[5px] top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-orangeleader/25 to-transparent"
              />
              {MAIN_NAV.map((item, i) => {
                const hasChildren = Boolean(item.children?.length);
                const active = isItemActive(item);
                const isExpanded = expanded === i;
                return (
                  <motion.li
                    key={item.href}
                    initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
                    animate={shouldReduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="flex items-center gap-4 py-2">
                      {/* Nodo orbital */}
                      <span className="relative flex h-3 w-3 shrink-0 items-center justify-center" aria-hidden="true">
                        <span className={`absolute -inset-1.5 rounded-full blur-[6px] ${active ? "bg-orangeleader/60" : "bg-white/10"}`} />
                        <span className={`relative h-3 w-3 rounded-full border ${active ? "border-orangeleader bg-orangeleader" : "border-white/30 bg-oled"}`} />
                        {active && !shouldReduce && (
                          <motion.span
                            className="absolute inset-0 rounded-full bg-orangeleader"
                            animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                      </span>

                      <Link href={item.href} onClick={handleClose} className="group flex flex-1 items-baseline gap-3">
                        <span className="font-mono text-sm text-orangeleader/70">{String(i + 1).padStart(2, "0")}</span>
                        <span
                          className={`text-2xl font-black uppercase tracking-wide transition-all duration-300 ${
                            active ? "text-orangeleader" : "text-starlight/80 group-hover:text-white group-hover:translate-x-1"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>

                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => setExpanded(isExpanded ? null : i)}
                          aria-expanded={isExpanded}
                          aria-label={isExpanded ? `Contraer ${item.label}` : `Expandir ${item.label}`}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-orangeleader hover:border-orangeleader/50 transition-colors cursor-pointer"
                        >
                          <motion.svg
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </button>
                      )}
                    </div>

                    {/* Sub-órbitas */}
                    {hasChildren && (
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.ul
                            key="sub"
                            initial={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            animate={shouldReduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                            exit={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="ml-6 mt-1 flex flex-col gap-1 pb-2">
                              {item.children!.map((c) => (
                                <li key={c.href}>
                                  <Link
                                    href={c.href}
                                    onClick={handleClose}
                                    className={`flex items-center gap-2 py-1.5 text-base font-semibold uppercase tracking-wide transition-colors ${
                                      isActive(c.href) ? "text-orangeleader" : "text-starlight/60 hover:text-orangeleader"
                                    }`}
                                  >
                                    <span className="h-1 w-1 rounded-full bg-orangeleader/60" aria-hidden="true" />
                                    {c.label}
                                  </Link>
                                </li>
                              ))}
                            </div>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* ── Pie: telemetría + CTA de lanzamiento ───────────────────── */}
          <div className="relative z-10 px-8 pb-8 pt-2 flex flex-col gap-4">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
              <span>MTY · 25.68 N</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orangeleader animate-pulse" />
                Sistema en línea
              </span>
              <span>PUE · 19.04 N</span>
            </div>
            <Link
              href="/contacto"
              onClick={handleClose}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-orangeleader hover:bg-tangerine text-white px-6 py-4 font-black text-sm uppercase tracking-widest shadow-[0_10px_32px_rgba(235,63,27,0.45)] transition-all cursor-pointer"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 22l10-4 10 4L12 2z" />
              </svg>
              Agendar llamada de estrategia
            </Link>
            <p className="text-center font-mono text-xs uppercase tracking-[0.35em] text-white/30">Sueña grande · Llega lejos</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
