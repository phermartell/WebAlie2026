"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Variant = "facebook" | "instagram";

interface ContactModalProps {
  variant: Variant;
  services: string[];
  onClose: () => void;
}

const PLATFORM = {
  facebook: {
    label: "Facebook Messenger",
    ring: "focus:border-[#1877F2]",
    buttonBg: "bg-[#1877F2] hover:bg-[#0e5fd0]",
    gradient: "from-[#1877F2] to-[#0a4fa8]",
    icon: "/flotantes/flotante-messenger.webp",
  },
  instagram: {
    label: "Instagram",
    ring: "focus:border-[#E1306C]",
    buttonBg: "bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F58529] hover:opacity-90",
    gradient: "from-[#833AB4] via-[#E1306C] to-[#F58529]",
    icon: "/flotantes/flotante-instagram.webp",
  },
} as const;
export default function ContactModal({ variant, services, onClose }: ContactModalProps) {
  const cfg = PLATFORM[variant];

  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [servicio, setServicio] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [website, setWebsite] = useState(""); // honeypot anti-bots
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const chatUrl =
    variant === "facebook"
      ? `https://m.me/${process.env.NEXT_PUBLIC_FB_PAGE || "aliedigital"}`
      : `https://ig.me/m/${process.env.NEXT_PUBLIC_IG_USERNAME || "aliedigital"}`;

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
  const pueblaUrl = siteUrl ? `${siteUrl}/puebla` : "/puebla";
  const monterreyUrl = siteUrl ? `${siteUrl}/monterrey` : "/monterrey";

  // Bloquear scroll del fondo mientras el modal está abierto
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const loadRecaptcha = () =>
    new Promise<void>((resolve) => {
      if (typeof window === "undefined") return resolve();
      const w = window as unknown as { grecaptcha?: unknown };
      if (w.grecaptcha || !siteKey) return resolve();
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.head.appendChild(script);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (website) return; // el honeypot fue llenado por un bot

    if (!nombre.trim() || !whatsapp.trim() || !servicio) {
      setError("Completa nombre, WhatsApp y servicio de interés.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      await loadRecaptcha();
      let recaptchaToken = "";
      const w = window as unknown as {
        grecaptcha?: { execute: (key: string, opts: { action: string }) => Promise<string> };
      };
      if (w.grecaptcha && siteKey) {
        recaptchaToken = await w.grecaptcha.execute(siteKey, { action: "submit_lead" });
      }

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          whatsapp,
          servicio,
          mensaje,
          canal: variant,
          recaptchaToken,
          website,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "No se pudo enviar tu mensaje.");
      }

      // Componer mensaje y copiarlo al portapapeles
      const message = `Hola, soy ${nombre.trim()}. Me interesa: ${servicio}.${
        mensaje.trim() ? ` ${mensaje.trim()}` : ""
      } Mi WhatsApp: ${whatsapp.trim()}`;
      try {
        await navigator.clipboard.writeText(message);
      } catch {
        /* clipboard no disponible */
      }

      setStatus("success");
      window.open(chatUrl, "_blank", "noopener");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Ocurrió un error, intenta de nuevo.");
    }
  };

  const inputClass =
    "w-full bg-black/50 border border-white/15 rounded-full h-12 px-5 text-base text-white placeholder-white/40 focus:outline-none transition-all cursor-text";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      data-lenis-prevent
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-default" onClick={onClose} />

      {/* Panel */}
      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0f1e]/70 backdrop-blur-[100px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] cursor-default"
      >
        {/* Header */}
        <div className={`relative bg-gradient-to-r ${cfg.gradient} px-6 py-6`}>
          <div className="flex items-center gap-4">
            <img src={cfg.icon} alt={cfg.label} className="w-12 h-12 object-contain drop-shadow-[0_0_16px_rgba(255,255,255,0.4)]" />
            <div className="flex-1">
              <h3 className="text-xl font-black uppercase text-white leading-tight">Escríbenos por {cfg.label}</h3>
              <p className="text-white/70 text-sm font-light">Te respondemos en minutos.</p>
            </div>
            <button onClick={onClose} aria-label="Cerrar" className="text-white/70 hover:text-white text-2xl leading-none cursor-pointer">×</button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 max-h-[65vh] overflow-y-auto overscroll-contain">
          {status === "success" ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">🚀</div>
              <h4 className="text-lg font-black uppercase text-white mb-2">¡Mensaje listo!</h4>
              <p className="text-starlight/60 text-sm mb-4 leading-relaxed">
                Guardamos tus datos y copiamos tu mensaje al portapapeles. Si no se abrió el chat automáticamente, ábrelo
                con el botón y pega el mensaje.
              </p>
              <a
                href={chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block ${cfg.buttonBg} text-white rounded-full px-8 py-3 font-black text-sm uppercase tracking-widest transition-all cursor-pointer`}
              >
                Abrir chat de {cfg.label}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              {/* Honeypot (oculto para humanos) */}
              <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required className={`${inputClass} ${cfg.ring}`} />
              <input type="tel" placeholder="WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required className={`${inputClass} ${cfg.ring}`} />
              <select value={servicio} onChange={(e) => setServicio(e.target.value)} required className={`${inputClass} ${cfg.ring} appearance-none cursor-pointer`} style={{ color: servicio ? "#ffffff" : "rgba(255,255,255,0.4)" }}>
                <option value="" disabled className="text-white bg-[#0a0f1e]">Servicio de interés</option>
                {services.map((s) => (
                  <option key={s} value={s} className="text-white bg-[#0a0f1e]">{s}</option>
                ))}
              </select>
              <textarea placeholder="Mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} rows={3} className={`w-full bg-black/50 border border-white/15 rounded-2xl px-5 py-3 text-base text-white placeholder-white/40 focus:outline-none transition-all resize-none cursor-text ${cfg.ring}`} />

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button type="submit" disabled={status === "submitting"} className={`${cfg.buttonBg} text-white rounded-full py-3.5 font-black text-sm uppercase tracking-widest transition-all cursor-pointer disabled:opacity-60`}>
                {status === "submitting" ? "Enviando…" : `Enviar por ${cfg.label}`}
              </button>

              {/* Ubicación */}
              <div className="mt-2 pt-4 border-t border-white/10">
                <p className="text-center text-xs font-mono uppercase tracking-widest text-white/40 mb-3">
                  ¿Ya eres cliente?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={pueblaUrl}
                    className="text-center text-sm font-bold uppercase tracking-wide text-white/80 hover:text-white border border-white/15 rounded-full py-2.5 transition-all cursor-pointer hover:border-white/30"
                  >
                    Soy cliente de Puebla
                  </a>
                  <a
                    href={monterreyUrl}
                    className="text-center text-sm font-bold uppercase tracking-wide text-white/80 hover:text-white border border-white/15 rounded-full py-2.5 transition-all cursor-pointer hover:border-white/30"
                  >
                    Soy cliente de Monterrey
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
