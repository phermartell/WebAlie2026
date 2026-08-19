"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRecaptchaToken, loadRecaptcha } from "@/lib/recaptcha";

interface WhatsAppChatProps {
  services: string[];
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export default function WhatsAppChat({ services, isOpen: externalIsOpen, setIsOpen: externalSetIsOpen }: WhatsAppChatProps) {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : localIsOpen;
  const setIsOpen = externalSetIsOpen !== undefined ? externalSetIsOpen : setLocalIsOpen;

  const [nombre, setNombre] = useState("");
  const [tel, setTel] = useState("");
  const [servicio, setServicio] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [website, setWebsite] = useState(""); // honeypot anti-bots
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const whatsappNumber = "522213279555";

  useEffect(() => {
    if (siteKey) {
      loadRecaptcha(siteKey);
    }
  }, [siteKey]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (website) return; // honeypot filled by bot

    if (!nombre.trim() || !tel.trim() || !servicio) {
      setError("Completa tu nombre, teléfono y servicio de interés.");
      return;
    }

    setStatus("submitting");
    setError("");

    // Dynamically tag origin route
    let finalServicio = `${servicio} [WhatsApp Float Modal Puebla]`;

    try {
      const recaptchaToken = await getRecaptchaToken(siteKey, "submit_lead");

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          whatsapp: tel.trim(),
          servicio: finalServicio,
          mensaje: mensaje.trim() || "Contacto rápido vía chat",
          canal: "whatsapp",
          recaptchaToken,
          website,
          pagina: typeof window !== "undefined" ? window.location.href : "",
          formulario: "Chat WhatsApp Puebla",
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "No se pudo registrar la solicitud.");
      }

      // Generate WhatsApp link text
      const text = `Hola, mi nombre es ${nombre.trim()}. Me interesa el servicio de: ${servicio}.${
        mensaje.trim() ? ` Mensaje: ${mensaje.trim()}` : ""
      }`;
      const chatUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

      // Copy text to clipboard
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        // Ignore clipboard errors
      }

      setStatus("success");
      window.open(chatUrl, "_blank", "noopener,noreferrer");
      setIsOpen(false);
      // Reset form
      setNombre("");
      setTel("");
      setServicio("");
      setMensaje("");
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Ocurrió un error. Intenta de nuevo.");
    }
  };

  const inputClass =
    "w-full bg-black/50 border border-white/15 rounded-full h-12 px-5 text-base text-white placeholder-white/40 focus:outline-none focus:border-[#25D366] transition-all cursor-text";

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.6)] flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer active:scale-95 group"
        aria-label="Contactar por WhatsApp"
      >
        <span className="absolute inset-0 bg-[#25D366]/20 blur-xl rounded-full scale-[1.5] animate-pulse pointer-events-none" />
        <svg
          viewBox="0 0 448 512"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            data-lenis-prevent
          >
            {/* Backdrop Close */}
            <div className="absolute inset-0 cursor-default" onClick={() => setIsOpen(false)} />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.93, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 15, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 glass-liquid shadow-[0_45px_130px_-15px_rgba(0,0,0,0.85)] cursor-default"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-6 flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <svg viewBox="0 0 448 512" fill="currentColor" className="w-6 h-6 text-white">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black uppercase text-white leading-tight">Escríbenos por WhatsApp</h3>
                  <p className="text-white/80 text-xs font-light">Cuéntanos qué necesitas y te abrimos el chat.</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/85 hover:text-white text-2xl font-bold leading-none cursor-pointer"
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </div>

              {/* Form Body */}
              <div className="px-6 py-6 max-h-[60vh] overflow-y-auto overscroll-contain text-left">
                <form id="CTAWhatsapp" onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
                  {/* Honeypot */}
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className={inputClass}
                  />

                  <input
                    type="tel"
                    placeholder="WhatsApp"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    required
                    className={inputClass}
                  />

                  <select
                    value={servicio}
                    onChange={(e) => setServicio(e.target.value)}
                    required
                    className={`${inputClass} appearance-none cursor-pointer`}
                    style={{ color: servicio ? "#ffffff" : "rgba(255,255,255,0.4)" }}
                  >
                    <option value="" disabled className="text-white bg-[#0a0f1e]">Servicio de interés</option>
                    {services.map((s) => (
                      <option key={s} value={s} className="text-white bg-[#0a0f1e]">{s}</option>
                    ))}
                  </select>

                  <textarea
                    placeholder="Mensaje o detalles"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    rows={3}
                    className="w-full bg-black/50 border border-white/15 rounded-2xl px-5 py-3 text-base text-white placeholder-white/40 focus:outline-none focus:border-[#25D366] transition-all resize-none cursor-text"
                  />

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-90 text-white rounded-full py-3.5 font-black text-sm uppercase tracking-widest transition-all cursor-pointer disabled:opacity-60"
                  >
                    {status === "submitting" ? "Conectando…" : "Iniciar Chat de WhatsApp"}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
