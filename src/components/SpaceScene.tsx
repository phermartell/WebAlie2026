"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Group } from "three";

// Simple starfield that moves based on scroll
const StarfieldController = () => {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Oscilación acotada: las estrellas flotan suavemente sin salir de cámara
      const scrollY = window.scrollY;
      groupRef.current.position.y = Math.sin(scrollY * 0.0006) * 12;
      
      // Add a slight rotation for dynamism
      groupRef.current.rotation.y = scrollY * 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1.5} />
      {/* Distant Nebulas or faint glow could go here */}
      <mesh position={[0, -50, -50]}>
        <sphereGeometry args={[30, 32, 32]} />
        <meshBasicMaterial color="#16264f" transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

export default function SpaceScene() {
  return (
    <div className="fixed inset-0 z-0 bg-[#050814] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <StarfieldController />
      </Canvas>
      {/* Subtle vignette - soft enough to never fully block the starfield */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(5,8,20,0.4)_100%)] pointer-events-none" />
    </div>
  );
}
