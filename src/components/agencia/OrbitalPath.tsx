"use client";

import { useSyncExternalStore } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  useVelocity,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { ShipMark } from "./hud";

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

interface OrbitalPathProps {
  planetSrc?: string;
  planetColor?: string; // fallback colored glow if no image is passed
}

export default function OrbitalPath({ planetSrc, planetColor = "#38bdf8" }: OrbitalPathProps) {
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isDesktop) return null;
  return <OrbitalPathInner planetSrc={planetSrc} planetColor={planetColor} />;
}

function OrbitalPathInner({ planetSrc, planetColor }: OrbitalPathProps) {
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
    <div
      className="fixed left-4 md:left-8 top-0 bottom-0 w-8 z-30 pointer-events-none"
      aria-hidden="true"
    >
      {/* Base line */}
      <div className="absolute left-1/2 top-[10%] bottom-[10%] w-px -translate-x-1/2 bg-gradient-to-b from-yellow-400/20 via-white/10 to-transparent" />

      {/* Dotted scrolling line */}
      <div
        className="absolute left-1/2 top-[10%] bottom-[10%] w-px -translate-x-1/2 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(235,63,27,0.5) 0 6px, transparent 6px 16px)",
          backgroundSize: "100% 100px",
          animation: shouldReduce ? "none" : "orbit-flow 6s linear infinite",
        }}
      />

      {/* Sun at the top (10% depth) */}
      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-400/20 border border-yellow-400/60 shadow-[0_0_15px_rgba(250,204,21,0.6)] flex items-center justify-center text-sm z-30" style={{ top: "10%" }}>
        ☀️
      </div>

      {/* Customizable Planet at the bottom (90% depth) */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border overflow-hidden z-30" 
        style={{ 
          top: "90%",
          borderColor: `${planetColor}60`,
          boxShadow: `0 0 15px ${planetColor}50`
        }}
      >
        {planetSrc ? (
          <img src={planetSrc} className="w-full h-full object-cover" alt="Planeta Orbital" />
        ) : (
          <div 
            className="w-full h-full" 
            style={{ 
              background: `radial-gradient(circle at 30% 30%, ${planetColor}, #050b14 80%)` 
            }} 
          />
        )}
      </div>

      {/* Spacecraft following scroll */}
      <motion.div style={{ top }} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
        <motion.span style={{ rotate: shouldReduce ? 0 : rotate }} className="block relative">
          <ShipMark size={32} floating={false} />
        </motion.span>
      </motion.div>
    </div>
  );
}
