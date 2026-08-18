"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* Etiqueta HUD de cabecera */
export function Hud({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block font-mono text-xs md:text-sm tracking-[0.3em] text-orangeleader uppercase">
      {children}
    </span>
  );
}

/* Nave "A" de Alié (cohete con glow y estela). Reutilizable con tamaño y flotado opcionales. */
export function ShipMark({
  size = 112,
  floating = true,
}: {
  size?: number;
  floating?: boolean;
}) {
  const shouldReduce = useReducedMotion();
  const flameW = Math.max(2, Math.round(size * 0.07));
  const flameH = Math.round(size * 0.36);

  return (
    <div className="pointer-events-none flex flex-col items-center" aria-hidden="true">
      <motion.div
        animate={floating && !shouldReduce ? { y: [0, 12, 0], rotate: [0, 4, 0] } : undefined}
        transition={floating && !shouldReduce ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : undefined}
        className="relative"
      >
        <div className="absolute inset-0 bg-orangeleader/25 blur-2xl rounded-full scale-[2]" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#eb3f1b"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: size, height: size }}
          className="relative z-10 drop-shadow-[0_0_24px_rgba(235,63,27,0.9)]"
        >
          <path d="M12 2L2 22l10-4 10 4L12 2z" fill="rgba(235,63,27,0.3)" strokeWidth="1.5" />
          <path d="M12 2v16" strokeWidth="1.5" />
          <path d="M7 16l5-4 5 4" strokeWidth="1.5" />
          <path d="M4 17l-2 3 M20 17l2 3" stroke="#ff8643" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2" fill="#fff" opacity="0.8" />
        </svg>
      </motion.div>
      <motion.div
        animate={floating && !shouldReduce ? { opacity: [0.5, 1, 0.5], scaleY: [0.7, 1.3, 0.7] } : { opacity: 1, scaleY: 1 }}
        transition={floating && !shouldReduce ? { duration: 0.3, repeat: Infinity, ease: "linear" } : { duration: 0 }}
        style={{ width: flameW, height: flameH }}
        className="bg-gradient-to-t from-transparent via-orangeleader to-tangerine blur-[3px] rounded-full origin-top"
      />
    </div>
  );
}

/* Íconos de cristal para los servicios (Sector 6) */
export function ServiceIcon({ i }: { i: number }) {
  const paths: ReactNode[] = [
    // 0 · Diseño Web / UX
    <g key="0">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8l3 3 2-2 3 3" />
    </g>,
    // 1 · Redes sociales
    <g key="1">
      <path d="M3 11l14-6v14L3 13v-2z" />
      <path d="M11 15a4 4 0 0 0 4-4" />
      <path d="M17 9a8 8 0 0 1 0 6" />
    </g>,
    // 2 · Publicidad
    <g key="2">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </g>,
    // 3 · SEO
    <g key="3">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
      <path d="M8 11h6M11 8v6" />
    </g>,
    // 4 · Asistentes de IA
    <g key="4">
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-2.9-.4-4.1-1L3 20l1-4.4A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M9 11h6M12 8v6" />
    </g>,
    // 5 · Ecommerce
    <g key="5">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </g>,
    // 6 · Email Marketing
    <g key="6">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </g>,
    // 7 · Identidad Gráfica
    <g key="7">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
      <path d="M12 6V12L16 14" />
    </g>,
  ];
  const indexMap = [3, 0, 5, 2, 1, 6, 4, 7];
  const targetIndex = indexMap[i] ?? i;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7"
    >
      {paths[targetIndex]}
    </svg>
  );
}
