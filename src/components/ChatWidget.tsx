"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SocialVariant = "facebook" | "instagram";

interface ChatWidgetProps {
  onOpenSocial: (variant: SocialVariant) => void;
}

const PLATFORM = {
  facebook: {
    buttonBg: "bg-[#1877F2] hover:bg-[#0e5fd0]",
  },
  instagram: {
    buttonBg:
      "bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F58529] hover:opacity-90",
  },
} as const;

const ChatIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const MessengerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.24 0 0 4.952 0 11.64c0 3.499 1.434 6.521 3.769 8.61a.96.96 0 0 1 .322.684l.066 2.136a.96.96 0 0 0 1.346.849l2.382-1.05a.96.96 0 0 1 .64-.047c1.132.308 2.3.462 3.475.462 6.76 0 12-4.952 12-11.64S18.76 0 12 0Zm7.206 8.956-3.525 5.594a1.8 1.8 0 0 1-2.603.48l-2.803-2.103a.72.72 0 0 0-.868.002l-3.786 2.874c-.505.384-1.165-.221-.827-.758l3.525-5.593a1.8 1.8 0 0 1 2.603-.48l2.803 2.103a.72.72 0 0 0 .868-.002l3.786-2.874c.505-.384 1.165.221.827.758Z" />
  </svg>
);

export default function ChatWidget({ onOpenSocial }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"welcome" | "exit">("welcome");
  const rootRef = useRef<HTMLDivElement>(null);

  // Primer intento de cierre → muestra "¡Esperaaaa! ⚡"; el segundo sí cierra.
  const requestClose = useCallback(() => {
    if (view === "welcome") {
      setView("exit");
    } else {
      setOpen(false);
      setView("welcome");
    }
  }, [view]);

  // Cerrar con Escape (con retención)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, requestClose]);

  // Cerrar al hacer clic fuera (con retención)
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        requestClose();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open, requestClose]);

  const handleOpenSocial = (variant: SocialVariant) => {
    setOpen(false);
    setView("welcome");
    onOpenSocial(variant);
  };

  return (
    <div
      ref={rootRef}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[90] flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-[320px] max-w-[calc(100vw-2rem)] origin-bottom-right overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0f1e]/85 backdrop-blur-[60px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85)]"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 bg-gradient-to-r from-[#101b39] to-[#16264f] px-5 py-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orangeleader opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orangeleader" />
              </span>
              <span className="flex-1 font-mono text-xs uppercase tracking-[0.3em] text-white/80">
                Chat Alié
              </span>
              <button
                onClick={requestClose}
                aria-label="Cerrar chat"
                className="text-white/60 transition-colors hover:text-white text-2xl leading-none cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-5">
              {view === "welcome" ? (
                <>
                  <p className="text-base font-black uppercase text-white leading-snug">
                    ¿Llegaste hasta aquí? Es una señal. 📡
                  </p>
                  <p className="mt-2 text-sm text-starlight/70 leading-relaxed font-light">
                    Pongamos a girar la maquinaria digital de tu negocio.
                    Mándanos un mensaje — tiempo de respuesta récord (&lt; 1 min).
                  </p>

                  <div className="mt-5 flex flex-col gap-2.5">
                    <button
                      onClick={() => handleOpenSocial("facebook")}
                      className={`flex items-center justify-between gap-3 rounded-full ${PLATFORM.facebook.buttonBg} px-5 py-3 text-white transition-all cursor-pointer`}
                    >
                      <span className="flex items-center gap-3">
                        <FacebookIcon className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-black uppercase tracking-wide leading-tight text-left">
                          Iniciar conversación en Facebook
                        </span>
                      </span>
                      <span aria-hidden className="text-lg leading-none shrink-0">
                        →
                      </span>
                    </button>

                    <button
                      onClick={() => handleOpenSocial("instagram")}
                      className={`flex items-center justify-between gap-3 rounded-full ${PLATFORM.instagram.buttonBg} px-5 py-3 text-white transition-all cursor-pointer`}
                    >
                      <span className="flex items-center gap-3">
                        <InstagramIcon className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-black uppercase tracking-wide leading-tight text-left">
                          Iniciar conversación en Instagram
                        </span>
                      </span>
                      <span aria-hidden className="text-lg leading-none shrink-0">
                        →
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-base font-black uppercase text-white leading-snug">
                    ¡Esperaaaa! ⚡
                  </p>
                  <p className="mt-2 text-sm text-white/85 font-semibold leading-relaxed">
                    Parece que ibas a cerrar la ventana...
                  </p>
                  <p className="mt-2 text-sm text-starlight/70 leading-relaxed font-light">
                    Así que aquí estamos de nuevo. Por favor, solo haznos una
                    llamada o escríbenos. Te prometemos que valdrá la pena.
                  </p>

                  <div className="mt-5 flex flex-col gap-2.5">
                    <button
                      onClick={() => handleOpenSocial("facebook")}
                      className={`flex items-center justify-between gap-3 rounded-full ${PLATFORM.facebook.buttonBg} px-5 py-3 text-white transition-all cursor-pointer`}
                    >
                      <span className="flex items-center gap-3">
                        <MessengerIcon className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-black uppercase tracking-wide leading-tight text-left">
                          Escribir por Messenger
                        </span>
                      </span>
                      <span aria-hidden className="text-lg leading-none shrink-0">
                        →
                      </span>
                    </button>

                    <button
                      onClick={() => handleOpenSocial("instagram")}
                      className={`flex items-center justify-between gap-3 rounded-full ${PLATFORM.instagram.buttonBg} px-5 py-3 text-white transition-all cursor-pointer`}
                    >
                      <span className="flex items-center gap-3">
                        <InstagramIcon className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-black uppercase tracking-wide leading-tight text-left">
                          Escribir por Instagram
                        </span>
                      </span>
                      <span aria-hidden className="text-lg leading-none shrink-0">
                        →
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Chat */}
      <motion.button
        onClick={() => {
          if (!open) {
            setView("welcome");
            setOpen(true);
          } else {
            requestClose();
          }
        }}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        aria-expanded={open}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orangeleader to-tangerine pl-5 pr-6 py-3.5 text-white shadow-[0_10px_30px_rgba(235,63,27,0.5)] transition-shadow hover:shadow-[0_14px_40px_rgba(235,63,27,0.65)] cursor-pointer"
      >
        {open ? (
          <span className="text-2xl leading-none">×</span>
        ) : (
          <ChatIcon className="w-6 h-6" />
        )}
        <span className="font-black uppercase tracking-widest text-base">
          {open ? "Cerrar" : "Chat"}
        </span>
      </motion.button>
    </div>
  );
}
