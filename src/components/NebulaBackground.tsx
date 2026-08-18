"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAspect;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p = rot * p * 2.0 + 11.3;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = vec2((uv.x - 0.5) * uAspect, uv.y - 0.5) * 2.2;

    // dos velocidades para la deriva
    float t  = uTime * 0.10;
    float t2 = uTime * 0.16;

    // remolino del campo (más perceptible)
    float ang = uTime * 0.12;
    mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
    p = rot * p;

    // desplazamiento global: la nebulosa cambia de posición (deriva)
    p += vec2(t * 0.9, t2 * 0.6);

    vec2 q = vec2(
      fbm(p + vec2(t, t2)),
      fbm(p + vec2(5.2, 1.3) - vec2(t2, t))
    );
    vec2 r = vec2(
      fbm(p + 3.5 * q + vec2(1.7, 9.2) + vec2(0.15 * t, 0.12 * t2)),
      fbm(p + 3.5 * q + vec2(8.3, 2.8) + vec2(0.12 * t2, 0.10 * t))
    );
    float f = fbm(p + 3.0 * r);

    // base de espacio profundo
    vec3 col = vec3(0.010, 0.016, 0.045);

    // nubes azul / violeta
    vec3 deepBlue = vec3(0.10, 0.16, 0.38);
    vec3 purple   = vec3(0.30, 0.14, 0.46);
    vec3 cloud = mix(deepBlue, purple, clamp(0.5 + 0.5 * q.y, 0.0, 1.0));
    col = mix(col, cloud, smoothstep(0.25, 0.78, f) * 0.85);

    // resplandor naranja / tangerine (marca)
    vec3 orange    = vec3(0.92, 0.25, 0.11);
    vec3 tangerine = vec3(1.00, 0.52, 0.26);
    float pulse = 0.85 + 0.15 * sin(uTime * 0.5);
    float glow = pow(clamp(f, 0.0, 1.0), 3.5);
    col = mix(col, orange, glow * 0.9 * pulse);
    col += tangerine * pow(clamp(q.x, 0.0, 1.0), 5.0) * 0.4;

    // viñeta suave para fundir bordes
    float d = length(vec2((uv.x - 0.5) * uAspect, uv.y - 0.5));
    col *= 1.0 - smoothstep(0.55, 1.15, d) * 0.45;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Nebula() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    m.uniforms.uAspect.value = state.viewport.aspect;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uAspect: { value: 1 },
        }}
      />
    </mesh>
  );
}

export default function NebulaBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        flat
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1], fov: 60 }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Nebula />
      </Canvas>
    </div>
  );
}
