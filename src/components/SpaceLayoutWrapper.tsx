"use client";

import React, { Suspense, useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import CalmSpaceBackground from "./CalmSpaceBackground";
import AttributionTracker from "./AttributionTracker";

const SpaceScene = dynamic(() => import("./SpaceScene"), { ssr: false });

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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return (
    <ReactLenis root>
      <Suspense fallback={null}>
        <AttributionTracker />
      </Suspense>
      <LenisPageTrigger />
      {/* Fondo: CalmSpaceBackground en todo el sitio, eliminando la sobrecarga de la nebulosa WebGL en Inicio */}
      <CalmSpaceBackground />
      {/* Estrellas con parallax de scroll (solo en desktop) */}
      {isDesktop && <SpaceScene />}
      
      {/* Relative z-indexed wrapper for the actual page markup content */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </ReactLenis>
  );
}
