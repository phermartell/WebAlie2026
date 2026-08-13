"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import SpaceScene from "./SpaceScene";

export default function SpaceLayoutWrapper({ children }: { children: React.ReactNode }) {

  return (
    <ReactLenis root>
      {/* WebGL 3D Background */}
      <SpaceScene />
      
      {/* Relative z-indexed wrapper for the actual page markup content */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </ReactLenis>
  );
}
