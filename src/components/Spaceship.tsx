"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";

interface LaserBolt {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  color: string;
  offsetX: number;
  createdAt: number;
  dir: "up" | "down" | "right";
}

interface SpaceshipProps {
  isWarpSpeed: boolean;
  isLanded: boolean;
  onLaserPosition?: (bolts: { x: number; y: number }[]) => void;
}

const LASER_COLORS = [
  "bg-emerald-400 shadow-[0_0_15px_#34d399]",
  "bg-cyan-400 shadow-[0_0_15px_#22d3ee]",
  "bg-green-300 shadow-[0_0_15px_#86efac]",
  "bg-teal-400 shadow-[0_0_15px_#2dd4bf]",
];

export default function Spaceship({ isWarpSpeed, isLanded, onLaserPosition }: SpaceshipProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("down");
  const [lasers, setLasers] = useState<LaserBolt[]>([]);
  const shootIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const laserIdRef = useRef(0);

  useEffect(() => {
    setMousePos({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) setIsMouseDown(true);
    };
    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        setIsMouseDown(false);
        setLasers([]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Dirección del scroll: hacia arriba la nave apunta hacia arriba
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrollDir(y < lastY ? "up" : "down");
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fire lasers at variable intervals while mouse is held
  useEffect(() => {
    if (isMouseDown && !isLanded) {
      const fire = () => {
        const id = laserIdRef.current++;
        // Randomize each bolt
        const isDouble = Math.random() > 0.4;
        const color = LASER_COLORS[Math.floor(Math.random() * LASER_COLORS.length)];
        const w = isWarpSpeed ? (Math.random() * 20 + 16) : (Math.random() * 1.5 + 1);
        const h = isWarpSpeed ? (Math.random() * 1.5 + 1) : (Math.random() * 20 + 16);
        const speed = Math.random() * 0.15 + 0.2;
        const dir = isWarpSpeed ? "right" : scrollDir === "up" ? "up" : "down";
        const offsets = isDouble
          ? [-(Math.random() * 8 + 8), Math.random() * 8 + 8]
          : [Math.random() * 10 - 5];

        offsets.forEach((offsetX, idx) => {
          setLasers(prev => [...prev, {
            id: id * 10 + idx,
            x: mousePos.x,
            y: mousePos.y,
            width: w,
            height: h,
            speed,
            color,
            offsetX,
            createdAt: Date.now(),
            dir,
          }]);
        });

        // Auto-remove after animation
        setTimeout(() => {
          setLasers(prev => prev.filter(l => Math.floor(l.id / 10) !== id));
        }, 600);
      };

      fire(); // Immediate first shot
      shootIntervalRef.current = setInterval(fire, 80 + Math.random() * 60);

      return () => {
        if (shootIntervalRef.current) clearInterval(shootIntervalRef.current);
      };
    } else {
      if (shootIntervalRef.current) clearInterval(shootIntervalRef.current);
    }
  }, [isMouseDown, isLanded, isWarpSpeed, scrollDir, mousePos.x, mousePos.y]);

  // Smooth springs for mouse follow
  const springX = useSpring(mousePos.x, { stiffness: 400, damping: 30 });

  // Continuously report current laser positions (interpolated during animation)
  useEffect(() => {
    if (!onLaserPosition) return;
    let raf: number;
    const loop = () => {
      const now = Date.now();
      const currentPositions = lasers.map(l => {
        const elapsed = (now - l.createdAt) / 1000;
        const duration = l.speed + 0.3;
        const progress = Math.min(elapsed / duration, 1);
        if (l.dir === "right") {
          return { x: l.x + 20 + progress * 1180, y: l.y + l.offsetX };
        }
        const currentY = l.dir === "up"
          ? l.y - 20 - progress * 1180
          : l.y + 20 + progress * 1180;
        return { x: l.x + l.offsetX, y: currentY };
      });
      if (currentPositions.length > 0) {
        onLaserPosition(currentPositions);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [lasers, onLaserPosition]);
  const springY = useSpring(mousePos.y, { stiffness: 400, damping: 30 });

  useEffect(() => {
    springX.set(mousePos.x);
    springY.set(mousePos.y);
  }, [mousePos, springX, springY]);

  const x = useTransform(springX, (val) => val - 64);
  const y = useTransform(springY, (val) => val - 64);

  return (
    <>
      {/* Laser Bolts Layer (rendered globally, not inside the rotating ship) */}
      <div className="fixed inset-0 z-[55] pointer-events-none overflow-hidden">
        <AnimatePresence>
          {lasers.map(laser => (
            <motion.div
              key={laser.id}
              initial={laser.dir === "right"
                ? { left: laser.x + 20, top: laser.y + laser.offsetX, opacity: 1 }
                : laser.dir === "up"
                  ? { left: laser.x + laser.offsetX, top: laser.y - 20, opacity: 1 }
                  : { left: laser.x + laser.offsetX, top: laser.y + 20, opacity: 1 }
              }
              animate={laser.dir === "right"
                ? { left: laser.x + 1200, opacity: [1, 1, 0] }
                : laser.dir === "up"
                  ? { top: laser.y - 1200, opacity: [1, 1, 0] }
                  : { top: laser.y + 1200, opacity: [1, 1, 0] }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: laser.speed + 0.3, ease: "linear" }}
              className={`absolute rounded-full blur-[1px] ${laser.color}`}
              style={{ 
                width: laser.width, 
                height: laser.height,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Ship Container */}
      <motion.div
        className="fixed top-0 left-0 z-[60] pointer-events-none w-32 h-32 flex justify-center items-center"
        style={{ x, y }}
      >
        <motion.div
          animate={{
            rotate: isWarpSpeed 
              ? (scrollDir === "up" ? 270 : 90)
              : (scrollDir === "up" ? 0 : 180),
            scale: isLanded ? 0.8 : 1
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative flex justify-center items-center w-full h-full"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-orangeleader/20 blur-2xl rounded-full scale-[2]" />

          {/* Muzzle flash when shooting */}
          {isMouseDown && !isLanded && (
            <motion.div
              animate={{ opacity: [0.8, 0.2, 0.8], scale: [1, 1.3, 1] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className={`absolute ${isWarpSpeed ? '-left-3 w-6 h-6' : '-top-3 w-6 h-6'} bg-emerald-400/60 blur-md rounded-full`}
            />
          )}

          {/* The Ship SVG (Galaga Style) */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#eb3f1b"
            strokeWidth="1"
            className="w-20 h-20 relative z-10 drop-shadow-[0_0_20px_rgba(235,63,27,1)]"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 22l10-4 10 4L12 2z" fill="rgba(235,63,27,0.3)" strokeWidth="1.5" />
            <path d="M12 2v16" strokeWidth="1.5" />
            <path d="M7 16l5-4 5 4" strokeWidth="1.5" />
            <path d="M4 17l-2 3 M20 17l2 3" stroke="#ff8643" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="2" fill="#fff" opacity="0.8" />
          </svg>

          {/* Thrusters */}
          {!isLanded && (
            <>
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6], scaleY: [0.8, 1.3, 0.8] }}
                transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 w-4 h-16 bg-gradient-to-t from-transparent via-orangeleader to-tangerine blur-[4px] rounded-full origin-top"
              />
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4], scaleY: [0.9, 1.4, 0.9] }}
                transition={{ duration: 0.2, repeat: Infinity, ease: "linear", delay: 0.05 }}
                className="absolute -bottom-8 w-1.5 h-12 bg-white blur-[2px] rounded-full origin-top"
              />
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
