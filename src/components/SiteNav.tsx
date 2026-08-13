"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MAIN_NAV } from "@/lib/site";

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-6">
        <Link href="/" aria-label="Alié Digital — Home">
          <img src="/isotipo_GRADIENT.svg" alt="Alié" className="w-20 h-20 md:w-28 md:h-28 drop-shadow-[0_0_20px_rgba(235,63,27,0.6)]" />
        </Link>

        <ul className="hidden lg:flex items-center gap-6">
          {MAIN_NAV.map((item) =>
            item.children ? (
              <li key={item.href} className="relative group">
                <Link href={item.href} className="flex items-center gap-1 text-base font-bold uppercase tracking-widest text-starlight/70 hover:text-white transition-colors">
                  {item.label}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </Link>
                <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                  <div className="glass-l2 rounded-2xl p-3 min-w-[260px] flex flex-col gap-1">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} className="block rounded-xl px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-starlight/80 hover:text-white hover:bg-white/10 transition-colors">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} className="text-base font-bold uppercase tracking-widest text-starlight/70 hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          className="lg:hidden relative w-12 h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_20px_rgba(235,63,27,0.25)] hover:border-orangeleader/60 hover:shadow-[0_0_28px_rgba(235,63,27,0.5)] transition-all duration-300 cursor-pointer"
        >
          <span className="relative block w-6 h-4">
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="absolute left-0 top-0 block h-0.5 w-6 rounded-full bg-current shadow-[0_0_6px_rgba(235,63,27,0.8)]" />
            <motion.span animate={menuOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="absolute left-0 top-1.5 block h-0.5 w-6 rounded-full bg-current" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="absolute left-0 top-3 block h-0.5 w-6 rounded-full bg-current shadow-[0_0_6px_rgba(235,63,27,0.8)]" />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[95] lg:hidden flex flex-col bg-[#02040a]/95 backdrop-blur-2xl overflow-hidden"
            data-lenis-prevent
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(235,63,27,0.18),transparent_55%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,rgba(22,38,79,0.65),transparent_60%)]" />
            <div className="absolute inset-0 pointer-events-none starfield opacity-70" />
            <div className="relative z-10 flex items-center justify-between px-6 py-6">
              <motion.img src="/isotipo_GRADIENT.svg" alt="Alié" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="w-16 h-16 drop-shadow-[0_0_24px_rgba(235,63,27,0.7)]" />
              <button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:border-white/40 hover:rotate-90 transition-all duration-300 cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            <nav className="relative z-10 flex-1 flex flex-col justify-center px-8 gap-1 overflow-y-auto scrollbar-none">
              {MAIN_NAV.map((item, i) => (
                <div key={item.href}>
                  <motion.div initial={{ opacity: 0, x: 48 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: "easeOut" }}>
                    <Link href={item.href} onClick={() => setMenuOpen(false)} className="group flex items-baseline gap-4 py-3 border-b border-white/5">
                      <span className="font-mono text-sm text-orangeleader/70">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-3xl font-black uppercase tracking-wide text-starlight/80 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">{item.label}</span>
                    </Link>
                  </motion.div>
                  {item.children && (
                    <div className="pl-8 pb-3 flex flex-col gap-1">
                      {item.children.map((c) => (
                        <motion.div key={c.href} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}>
                          <Link href={c.href} onClick={() => setMenuOpen(false)} className="text-base font-semibold uppercase tracking-wide text-starlight/60 hover:text-orangeleader transition-colors py-1 block">
                            {c.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.45 }} className="relative z-10 px-8 pb-10 pt-4 flex flex-col gap-5">
              <Link href="/contacto" onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center rounded-full bg-orangeleader hover:bg-tangerine text-white px-6 py-4 font-black text-sm uppercase tracking-widest shadow-[0_10px_32px_rgba(235,63,27,0.45)] transition-all cursor-pointer">
                Agendar llamada de estrategia
              </Link>
              <p className="text-center font-mono text-[11px] uppercase tracking-[0.35em] text-white/30">Sueña grande · Llega lejos</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
