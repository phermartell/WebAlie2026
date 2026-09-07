"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { processAttribution } from "@/lib/attribution";

/**
 * Componente invisible que inicializa la atribución first-party.
 * Se monta una vez dentro de SpaceLayoutWrapper y persiste durante
 * toda la sesión. No renderiza UI.
 *
 * Manejo SPA:
 *   - El referrer solo se procesa en la entrada inicial (isEntryPoint=true).
 *   - Navegaciones internas (pathname change) no reutilizan document.referrer.
 *   - Solo UTMs/click-IDs nuevos actualizan Last Non-Direct Touch.
 */
export default function AttributionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isEntryPoint = useRef(true);

  useEffect(() => {
    // Primera ejecución = entrada inicial del documento.
    processAttribution(pathname, searchParams, isEntryPoint.current);
    // Ya no volveremos a tratar el referrer como señal inicial.
    isEntryPoint.current = false;
  }, [pathname, searchParams]);

  return null;
}
