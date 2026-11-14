"use client";

import { useState } from "react";
import { getRecaptchaToken, loadRecaptcha } from "@/lib/recaptcha";
import { getAttribution, type AttributionPayload } from "@/lib/attribution";

const inputClass =
  "w-full bg-black/50 border border-white/20 rounded-full h-12 px-6 text-base text-white placeholder-white/40 focus:outline-none focus:border-orangeleader transition-all cursor-text";

export default function LeadForm({
  servicioInteres,
  submitLabel = "Solicitar información",
}: {
  servicioInteres?: string;
  submitLabel?: string;
}) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [website, setWebsite] = useState(""); // honeypot anti-bots
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  // Carga lazy: el SDK de reCAPTCHA se carga solo al primer focus del formulario.
  // getRecaptchaToken al submit sigue siendo el fallback absoluto: nunca se omite la validación.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (website) return; // honeypot llenado por un bot

    if (!nombre.trim() || !telefono.trim()) {
      setError("Nombre y teléfono son obligatorios.");
      return;
    }

    setStatus("submitting");
    setError("");

    // Detectar origen dinámicamente
    let finalServicio = servicioInteres || "Llamada de estrategia general";
    if (typeof window !== "undefined") {
      finalServicio += ` [Ruta: ${window.location.pathname}]`;
    }

    try {
      const recaptchaToken = await getRecaptchaToken(siteKey, "submit_lead");

      // C5.4: atribución first-party en el momento de conversión. Nunca bloquea el envío.
      let attribution: AttributionPayload | null = null;
      try {
        attribution = getAttribution();
      } catch {
        attribution = null;
      }

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          whatsapp: telefono.trim(), // /api/lead usa "whatsapp"; el CRM lo guarda como teléfono
          servicio: finalServicio,
          mensaje: [
            correo.trim() && `Correo: ${correo.trim()}`,
            empresa.trim() && `Empresa: ${empresa.trim()}`,
          ]
            .filter(Boolean)
            .join(" | "),
          canal: "web",
          recaptchaToken,
          website,
          pagina: typeof window !== "undefined" ? window.location.href : "",
          formulario: "Formulario de Landing (Estrategia)",
          attribution,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "No se pudo enviar tu solicitud.");
      }
      setStatus("success");
      // Emitir evento de conversión únicamente tras confirmación del servidor.
      // GTM escuchará "lead_success" para disparar la etiqueta GA4 CTAContacto.
      const dataLayerWindow = window as Window & { dataLayer?: unknown[] };
      dataLayerWindow.dataLayer = dataLayerWindow.dataLayer || [];
      dataLayerWindow.dataLayer.push({ event: "lead_success", form_id: "CTAContacto" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Ocurrió un error, intenta de nuevo.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-3">🚀</div>
        <h3 className="text-lg font-black uppercase text-white mb-2">¡Solicitud recibida!</h3>
        <p className="text-starlight/60 text-sm leading-relaxed">
          Gracias por contactarnos. Revisaremos los datos que compartiste y nos pondremos en contacto contigo para conocer mejor tu proyecto.
        </p>
      </div>
    );
  }

  return (
    <form id="CTAContacto" onSubmit={handleSubmit} noValidate onFocusCapture={() => { if (siteKey) loadRecaptcha(siteKey); }} className="flex flex-col gap-4 max-w-xl mx-auto">
      {/* Honeypot (oculto para humanos) */}
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <input type="text" placeholder="Nombre *" value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputClass} />
      <input type="tel" placeholder="Teléfono *" value={telefono} onChange={(e) => setTelefono(e.target.value)} className={inputClass} />
      <input type="email" placeholder="Correo corporativo" value={correo} onChange={(e) => setCorreo(e.target.value)} className={inputClass} />
      <input type="text" placeholder="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} className={inputClass} />

      {error && <p className="text-red-400 text-sm text-left">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 bg-[#eb3f1b] hover:bg-[#ff8643] text-white rounded-full h-auto min-h-14 px-6 py-3 font-black text-sm md:text-base uppercase tracking-widest shadow-[0_10px_30px_rgba(235,63,27,0.4)] transition-all cursor-pointer disabled:opacity-60 whitespace-normal leading-tight"
      >
        {status === "submitting" ? "Enviando…" : submitLabel}
      </button>
    </form>
  );
}
