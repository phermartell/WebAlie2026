"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MAIN_NAV } from "@/lib/site";
import MobileMenu from "@/components/MobileMenu";

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

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
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-6">
        <Link href="/" aria-label="Alié Digital — Home">
          <Image src="/isotipo_GRADIENT.svg" alt="Alié" width={112} height={112} priority className="w-20 h-20 md:w-28 md:h-28 drop-shadow-[0_0_20px_rgba(235,63,27,0.6)]" />
        </Link>

        <ul className="hidden lg:flex items-center gap-6">
          {MAIN_NAV.map((item) =>
            item.children ? (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-base font-bold uppercase tracking-widest transition-colors ${
                    isItemActive(item) ? "text-orangeleader" : "text-starlight/70 hover:text-white"
                  }`}
                >
                  {item.label}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                  <div className="glass-l2 rounded-2xl p-3 min-w-[260px] flex flex-col gap-1">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`block rounded-xl px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                          isActive(c.href)
                            ? "text-orangeleader bg-white/5"
                            : "text-starlight/80 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-base font-bold uppercase tracking-widest transition-colors ${
                    isItemActive(item) ? "text-orangeleader" : "text-starlight/70 hover:text-white"
                  }`}
                >
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
          aria-controls="mobile-menu"
          className="lg:hidden relative w-12 h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_20px_rgba(235,63,27,0.25)] hover:border-orangeleader/60 hover:shadow-[0_0_28px_rgba(235,63,27,0.5)] transition-all duration-300 cursor-pointer"
        >
          <span className="relative block w-6 h-4">
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="absolute left-0 top-0 block h-0.5 w-6 rounded-full bg-current shadow-[0_0_6px_rgba(235,63,27,0.8)]" />
            <motion.span animate={menuOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="absolute left-0 top-1.5 block h-0.5 w-6 rounded-full bg-current" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="absolute left-0 top-3 block h-0.5 w-6 rounded-full bg-current shadow-[0_0_6px_rgba(235,63,27,0.8)]" />
          </span>
        </button>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

