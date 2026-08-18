"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// Estrellas con parallax de scroll
const StarfieldController = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const scrollY = window.scrollY;
      groupRef.current.position.y = Math.sin(scrollY * 0.0006) * 12;
      groupRef.current.rotation.y = scrollY * 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1.5} />
    </group>
  );
};

export default function SpaceScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <StarfieldController />
      </Canvas>
    </div>
  );
}
