"use client";

import { useEffect, useState } from "react";
import { getRecaptchaToken, loadRecaptcha } from "@/lib/recaptcha";

// Consola de selección de servicios (píldoras Bento Switches).
const SERVICES = [
  "Página One Page 🚀",
  "Sitio Web Corporativo 🌍",
  "Tienda en Línea (E-commerce) 🌌",
  "Catálogo / Portafolio Online ✨",
  "Blog / Plataforma de Noticias 📡",
  "Plataforma de Cursos (LMS) 🛰️",
  "Identidad Gráfica 🎨",
  "Publicidad en Google Ads 🔥",
  "Manejo de Redes Sociales 🪐",
];

const inputClass =
  "w-full bg-black/20 border border-white/5 rounded-full h-12 px-6 text-base text-white placeholder-white/40 focus:outline-none focus:border-orangeleader transition-all cursor-text";

const labelClass =
  "block text-xs font-mono uppercase tracking-[0.2em] text-starlight/60 mb-2";

export default function ContactoForm() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [servicios, setServicios] = useState<string[]>([]);
  const [website, setWebsite] = useState(""); // honeypot anti-bots
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  useEffect(() => {
    if (siteKey) {
      loadRecaptcha(siteKey);
    }
  }, [siteKey]);

  const toggleServicio = (s: string) => {
    setServicios((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (website) return; // honeypot llenado por un bot

    if (!nombre.trim() || !whatsapp.trim() || servicios.length === 0) {
      setError("Completa tu nombre, WhatsApp y al menos un servicio para calibrar tu cotización.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const recaptchaToken = await getRecaptchaToken(siteKey, "submit_lead");
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          whatsapp: whatsapp.trim(),
          servicio: servicios.join(", "),
          mensaje: [
            correo.trim() && `Correo: ${correo.trim()}`,
            empresa.trim() && `Empresa: ${empresa.trim()}`,
            mensaje.trim(),
          ]
            .filter(Boolean)
            .join(" | "),
          canal: "web",
          recaptchaToken,
          website,
          pagina: typeof window !== "undefined" ? window.location.href : "",
          formulario: "Formulario de Cotización (Contacto)",
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "No se pudo enviar tu solicitud.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Ocurrió un error, intenta de nuevo.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">🚀</div>
        <h3 className="text-xl font-black uppercase text-white mb-3">
          ¡Secuencia de despegue iniciada!
        </h3>
        <p className="text-starlight/60 text-base leading-relaxed">
          Tu señal fue recibida en el Centro de Control de Misiones. Nuestro equipo
          revisará tu bitácora de vuelo y te contactará muy pronto para calibrar tu cotización.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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

      {/* Identificación de la tripulación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nombre" className={labelClass}>Nombre completo</label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej. Comandante Shepard"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="correo" className={labelClass}>Correo corporativo</label>
          <input
            id="correo"
            type="email"
            placeholder="hola@tuempresa.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="whatsapp" className={labelClass}>WhatsApp</label>
          <input
            id="whatsapp"
            type="tel"
            placeholder="+52 811 554 5351"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="empresa" className={labelClass}>Empresa / Marca</label>
          <input
            id="empresa"
            type="text"
            placeholder="Nombre de tu proyecto"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Consola de selección de servicios */}
      <div>
        <label className={labelClass}>¿Qué servicios o sistemas requiere tu nave?</label>
        <p className="text-sm text-starlight/40 -mt-1 mb-3">
          (Selecciona una o varias opciones para calibrar tu cotización)
        </p>
        <div className="flex flex-wrap gap-2.5">
          {SERVICES.map((s) => {
            const active = servicios.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleServicio(s)}
                aria-pressed={active}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  active
                    ? "bg-orangeleader border-white/30 text-white shadow-[0_0_20px_rgba(235,63,27,0.4)]"
                    : "bg-deepspace/40 border-white/10 text-starlight/80 hover:border-white/35 hover:text-white"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bitácora de vuelo */}
      <div>
        <label htmlFor="mensaje" className={labelClass}>Cuéntanos más de tu proyecto</label>
        <textarea
          id="mensaje"
          rows={4}
          placeholder="Describe los objetivos de tu empresa, referencias visuales que te gusten o cualquier detalle clave para preparar la misión..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="w-full bg-black/20 border border-white/5 rounded-[2rem] px-6 py-4 text-base text-white placeholder-white/40 focus:outline-none focus:border-orangeleader transition-all resize-none cursor-text"
        />
      </div>

      {/* Nota informativa */}
      <div className="flex items-center gap-3 p-4 bg-orangeleader/10 border border-orangeleader/20 rounded-2xl text-starlight/80 text-sm">
        <span className="text-orangeleader text-lg leading-none shrink-0">ℹ</span>
        <p>Al enviar, un arquitecto digital revisará tu caso en menos de 24h hábiles.</p>
      </div>

      {error && <p className="text-red-400 text-sm -mt-1">{error}</p>}

      {/* Botón de despegue */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 rounded-full bg-orangeleader hover:bg-tangerine text-white min-h-14 px-6 py-3 font-black text-sm md:text-base uppercase tracking-widest shadow-[0_10px_30px_rgba(235,63,27,0.5)] hover:shadow-[0_15px_40px_rgba(235,63,27,0.7)] hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-60 inline-flex items-center justify-center gap-2 whitespace-normal leading-tight text-center"
      >
        {status === "submitting" ? "Calibrando trayectoria…" : "Iniciar secuencia de despegue"} 🚀
      </button>
    </form>
  );
}
