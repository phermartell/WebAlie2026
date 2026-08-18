"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import ChatWidget from "@/components/ChatWidget";
import ContactModal from "@/components/ContactModal";
import { SERVICES } from "@/lib/site";
import { ChatModalContext, type SocialVariant } from "./ChatModalContext";

// Rutas regionales: no muestran el botón de chat flotante.
const REGIONAL_PREFIXES = ["/monterrey", "/puebla"];

// Provider del chat global: expone openSocial(variant) para abrir el ContactModal
// desde cualquier parte (p. ej. el módulo Alice) y renderiza el botón flotante + modal.
export default function GlobalChat({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [activeSocial, setActiveSocial] = useState<SocialVariant | null>(null);

  const isRegional = REGIONAL_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  return (
    <ChatModalContext.Provider value={(variant) => setActiveSocial(variant)}>
      {children}
      {!isRegional && (
        <>
          <ChatWidget onOpenSocial={setActiveSocial} />
          <AnimatePresence>
            {activeSocial && (
              <ContactModal
                variant={activeSocial}
                services={SERVICES.map((s) => s.label)}
                onClose={() => setActiveSocial(null)}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </ChatModalContext.Provider>
  );
}

