"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Planeta({
  tint,
  size = 180,
  tag,
}: {
  tint: string;
  size?: number;
  tag: string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <div className="relative flex flex-col items-center gap-6" aria-hidden="true">
      <div className="relative flex items-center justify-center scale-[0.8] sm:scale-100" style={{ width: size, height: size }}>
        {/* Glow */}
        <div
          className="absolute rounded-full blur-2xl"
          style={{ width: size * 1.15, height: size * 1.15, background: `${tint}30` }}
        />
        {/* Anillo orbital elíptico (inclinado) */}
        <div
          className="absolute rounded-[50%] border"
          style={{
            width: size * 1.7,
            height: size * 0.55,
            borderColor: `${tint}55`,
            transform: "rotate(-18deg)",
          }}
        />
        {/* Anillo punteado giratorio */}
        <motion.div
          className="absolute rounded-full border border-dashed"
          style={{ width: size * 1.3, height: size * 1.3, borderColor: `${tint}40` }}
          animate={shouldReduce ? undefined : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        {/* Esfera */}
        <div
          className="relative rounded-full"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at 32% 28%, ${tint}, #0b1020 72%)`,
            boxShadow: `inset -20px -20px 44px rgba(0,0,0,0.65), 0 0 60px ${tint}55`,
          }}
        />
        {/* Luna orbitando */}
        <motion.div
          className="absolute"
          style={{ width: size * 1.6, height: size * 1.6 }}
          animate={shouldReduce ? undefined : { rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
            style={{ width: size * 0.11, height: size * 0.11, background: "#e0e0e0", boxShadow: `0 0 12px ${tint}` }}
          />
        </motion.div>
      </div>
      <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/60">{tag}</span>
    </div>
  );
}
