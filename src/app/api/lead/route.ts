import { NextRequest, NextResponse } from "next/server";

interface LeadPayload {
  nombre: string;
  whatsapp: string;
  servicio: string;
  mensaje: string;
  canal: "facebook" | "instagram" | "web" | "whatsapp";
  recaptchaToken?: string;
  website?: string;
  pagina?: string;
  formulario?: string;
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Payload inválido" }, { status: 400 });
  }

  const nombre = (body.nombre || "").trim();
  const whatsapp = (body.whatsapp || "").trim();
  const servicio = (body.servicio || "").trim();
  const mensaje = (body.mensaje || "").trim();
  const canal =
    body.canal === "instagram" || body.canal === "web" || body.canal === "whatsapp" ? body.canal : "facebook";
  const pagina = (body.pagina || "").trim();
  const formulario = (body.formulario || "").trim();

  // Honeypot anti-bots
  if (body.website && body.website.length > 0) {
    return NextResponse.json({ success: false, error: "Spam detectado" }, { status: 400 });
  }

  if (!nombre || !whatsapp || !servicio) {
    return NextResponse.json({ success: false, error: "Faltan datos obligatorios" }, { status: 400 });
  }

  // 1. Verificar reCAPTCHA v3 (obligatorio para todo formulario)
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (recaptchaSecret) {
    if (!body.recaptchaToken) {
      return NextResponse.json({ success: false, error: "Captcha requerido" }, { status: 400 });
    }
    try {
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: body.recaptchaToken,
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

  // Formatear mensaje para WordPress con información de origen
  let wpMensaje = mensaje;
  if (pagina || formulario) {
    wpMensaje += `\n\n[Detalles de origen]`;
    if (formulario) wpMensaje += `\nFormulario: ${formulario}`;
    if (pagina) wpMensaje += `\nPágina: ${pagina}`;
  }

  // 2. Guardar en WordPress (CPT "lead" vía AlieCore)
  const wpUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  if (wpUrl) {
    try {
      const wpRes = await fetch(`${wpUrl.replace(/\/+$/, "")}/wp-json/alie/v1/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, whatsapp, servicio, mensaje: wpMensaje, canal }),
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
          resumen: `Servicio: ${servicio}. Mensaje: ${mensaje}${formulario ? ` | Formulario: ${formulario}` : ""}${pagina ? ` | Página: ${pagina}` : ""}`,
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
