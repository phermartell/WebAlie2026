import { NextRequest, NextResponse } from "next/server";
import {
  sanitizeAttribution,
  formatAttributionSummary,
} from "@/lib/attribution-sanitize";

const MAX_BODY_BYTES = 102400; // 100 KB

interface LeadPayload {
  nombre?: unknown;
  whatsapp?: unknown;
  servicio?: unknown;
  mensaje?: unknown;
  canal?: unknown;
  recaptchaToken?: unknown;
  website?: unknown;
  pagina?: unknown;
  formulario?: unknown;
  attribution?: unknown;
}

// Convierte a string solo si ya es string; nunca coacciona otros tipos.
function toStr(value: unknown): string {
  return typeof value === "string" ? value : "";
}

// Lee el body de forma controlada y limita su tamaño real en bytes.
async function readBodyText(req: NextRequest): Promise<string | null> {
  const contentLength = req.headers.get("content-length");
  if (contentLength) {
    const n = Number(contentLength);
    if (Number.isFinite(n) && n > MAX_BODY_BYTES) return null;
  }
  const reader = req.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let received = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value && value.byteLength > 0) {
        received += value.byteLength;
        if (received > MAX_BODY_BYTES) return null;
        chunks.push(value);
      }
    }
  } catch {
    return null;
  }
  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

export async function POST(req: NextRequest) {
  const rawText = await readBodyText(req);
  if (rawText === null) {
    return NextResponse.json(
      { success: false, error: "Payload demasiado grande" },
      { status: 413 }
    );
  }

  let body: LeadPayload;
  try {
    body = JSON.parse(rawText) as LeadPayload;
  } catch {
    return NextResponse.json({ success: false, error: "Payload inválido" }, { status: 400 });
  }

  const nombre = toStr(body.nombre).trim();
  const whatsapp = toStr(body.whatsapp).trim();
  const servicio = toStr(body.servicio).trim();
  const mensaje = toStr(body.mensaje).trim();
  const rawCanal = toStr(body.canal);
  const canal: "facebook" | "instagram" | "web" | "whatsapp" =
    rawCanal === "instagram" || rawCanal === "web" || rawCanal === "whatsapp"
      ? (rawCanal as "instagram" | "web" | "whatsapp")
      : "facebook";
  const pagina = toStr(body.pagina).trim();
  const formulario = toStr(body.formulario).trim();
  const website = toStr(body.website);
  const recaptchaToken = toStr(body.recaptchaToken);

  // Atribución: metadata opcional. Nunca invalida un lead por sí sola.
  const attribution = sanitizeAttribution(body.attribution);

  // Honeypot anti-bots
  if (website.length > 0) {
    return NextResponse.json({ success: false, error: "Spam detectado" }, { status: 400 });
  }

  if (!nombre || !whatsapp || !servicio) {
    return NextResponse.json({ success: false, error: "Faltan datos obligatorios" }, { status: 400 });
  }

  // 1. Verificar reCAPTCHA v3 (obligatorio para todo formulario)
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (recaptchaSecret) {
    if (!recaptchaToken) {
      return NextResponse.json({ success: false, error: "Captcha requerido" }, { status: 400 });
    }
    try {
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: recaptchaToken,
        }).toString(),
      });
      const verify = await verifyRes.json();
      if (!verify.success || (typeof verify.score === "number" && verify.score < 0.5)) {
        return NextResponse.json({ success: false, error: "Captcha no válido" }, { status: 400 });
      }
    } catch {
      return NextResponse.json(
        { success: false, error: "No se pudo verificar el captcha. Intenta de nuevo." },
        { status: 503 }
      );
    }
  }

  const savedTo: string[] = [];
  const errors: string[] = [];

  // Formatear fecha y hora en la zona de CDMX
  const now = new Date();
  const dateStr = now.toLocaleDateString("es-MX", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("es-MX", {
    timeZone: "America/Mexico_City",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Obtener IP y User Agent
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "";
  const userAgent = req.headers.get("user-agent") || "";

  // Formatear mensaje para WordPress con información detallada de origen y metadatos de red (estilo Elementor)
  let wpMensaje = mensaje;
  wpMensaje += `\n\n---`;
  wpMensaje += `\nFecha: ${dateStr}`;
  wpMensaje += `\nHora: ${timeStr}`;
  if (formulario) wpMensaje += `\nFormulario: ${formulario}`;
  if (pagina) wpMensaje += `\nURL de la página: ${pagina}`;
  if (userAgent) wpMensaje += `\nAgente de usuario: ${userAgent}`;
  if (ip) wpMensaje += `\nIP remota: ${ip}`;

  // Atribución sanitizada: solo se añade si existe (metadata opcional).
  if (attribution) {
    wpMensaje += formatAttributionSummary(attribution);
  }

  // 2. Guardar en WordPress (CPT "lead" vía AlieCore)
  const wpUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  if (wpUrl) {
    try {
      const wpRes = await fetch(`${wpUrl.replace(/\/+$/, "")}/wp-json/alie/v1/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, whatsapp, servicio, mensaje: wpMensaje, canal, pagina, formulario }),
      });
      if (wpRes.ok) savedTo.push("wordpress");
      else errors.push(`wordpress:${wpRes.status}`);
    } catch {
      errors.push("wordpress:unreachable");
    }
  }

  // 3. Insertar en el CRM (Alié OS / webhook "Web Alié")
  const crmUrl = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL;
  const crmSecret = process.env.CRM_WEBHOOK_SECRET;
  if (crmUrl && crmSecret) {
    try {
      const sourceLabel = formulario || (canal === "facebook" ? "Facebook" : canal === "instagram" ? "Instagram" : "Landing");
      const crmRes = await fetch(crmUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${crmSecret}`,
        },
        body: JSON.stringify({
          nombre,
          telefono: whatsapp,
          fuente: `Formulario Web Alié - ${sourceLabel}`,
          estadoLead: "Nuevo",
          origenCampana: canal,
          resumen: `Servicio: ${servicio}. Mensaje: ${mensaje}${formulario ? ` | Formulario: ${formulario}` : ""}${pagina ? ` | Página: ${pagina}` : ""}${ip ? ` | IP: ${ip}` : ""}${attribution ? formatAttributionSummary(attribution) : ""}`,
          zonaHoraria: "America/Mexico_City",
        }),
      });
      if (crmRes.ok) savedTo.push("crm");
      else errors.push(`crm:${crmRes.status}`);
    } catch {
      errors.push("crm:unreachable");
    }
  }

  return NextResponse.json({ success: true, savedTo, errors });
}
