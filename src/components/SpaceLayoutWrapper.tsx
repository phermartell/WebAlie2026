"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import NebulaBackground from "./NebulaBackground";
import CalmSpaceBackground from "./CalmSpaceBackground";
import SpaceScene from "./SpaceScene";

function LenisPageTrigger() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (lenis) {
      // Forzar que Lenis recalcule el alto de la nueva página montada
      setTimeout(() => {
        lenis.resize();
      }, 100);
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

export default function SpaceLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <ReactLenis root>
      <LenisPageTrigger />
      {/* Fondo: nebulosa WebGL solo en home; fondo calmo estático en el resto */}
      {isHome ? <NebulaBackground /> : <CalmSpaceBackground />}
      {/* Estrellas con parallax de scroll (siempre) */}
      <SpaceScene />
      
      {/* Relative z-indexed wrapper for the actual page markup content */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </ReactLenis>
  );
}
