"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

/* Contador que anima de 0 al valor real al entrar en viewport */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView || shouldReduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, shouldReduce]);

  const display = shouldReduce ? to : val;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("es-MX")}
      {suffix}
    </span>
  );
}

/* Tarjeta con tilt 3D y spotlight que sigue al cursor.
   Usa motion values (sin setState) para no re-renderizar en cada mousemove. */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const shouldReduce = useReducedMotion();

  const spotX = useTransform(px, (v) => v * 100);
  const spotY = useTransform(py, (v) => v * 100);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotX}% ${spotY}%, rgba(235,63,27,0.14), transparent 45%)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (shouldReduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    px.set(nx);
    py.set(ny);
    ry.set((nx - 0.5) * 8);
    rx.set(-(ny - 0.5) * 8);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: spotlight }}
      />
      {children}
    </motion.div>
  );
}

/* Tarjeta con halo magnético que sigue al cursor + elevación al hover */
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);
  const shouldReduce = useReducedMotion();

  const spotX = useTransform(px, (v) => v * 100);
  const spotY = useTransform(py, (v) => v * 100);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotX}% ${spotY}%, rgba(255,134,67,0.18), transparent 50%)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (shouldReduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => hover.set(1)}
      onMouseLeave={() => hover.set(0)}
      whileHover={shouldReduce ? undefined : { y: -8 }}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ opacity: hover, background: spotlight }}
      />
      {children}
    </motion.div>
  );
}
