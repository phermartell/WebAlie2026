import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Alié Digital usa <img> a propósito: assets decorativos ya optimizados
  // (WebP/SVG) con tamaños fluidos dentro de contenedores animados (motion.div),
  // donde next/image añadiría complejidad (fill/dimensiones fijas) sin beneficio
  // proporcional. Decisión documentada.
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

