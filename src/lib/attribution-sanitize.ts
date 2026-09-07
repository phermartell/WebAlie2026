import type { AttributionPayload, Touchpoint } from "@/lib/attribution";

/**
 * Sanitizador server-side de atribución first-party (C5.5).
 * Módulo puro: no accede a window/document/storage/cookies y nunca lanza
 * ante input controlado por el cliente.
 *
 * Regla de negocio: la atribución es metadata. Si es ausente, null, corrupta
 * o inválida, se devuelve null y el lead sigue siendo válido aguas abajo.
 */

const LIMITS = {
  source: 100,
  medium: 50,
  campaign: 200,
  content: 200,
  term: 200,
  referrer: 253,
  landing_page: 2000,
  clickId: 500,
  timestamp: 40,
} as const;

const VISITOR_ID_RE = /^[A-Za-z0-9_-]{8,100}$/;
const CLICK_ID_RE = /^[A-Za-z0-9._-]+$/;
const TIMESTAMP_MIN_MS = Date.parse("2000-01-01T00:00:00.000Z");

function stripControl(value: string): string {
  return value.replace(/[\x00-\x1f\x7f]/g, "");
}

// Nunca coacciona: los no-string se convierten en cadena vacía.
function sanitizeString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return stripControl(value.trim()).slice(0, max);
}

function sanitizeVisitorId(value: unknown): string | null {
  const id = sanitizeString(value, 100);
  return VISITOR_ID_RE.test(id) ? id : null;
}

function sanitizeReturningVisitor(value: unknown): boolean {
  return value === true;
}

function sanitizeClickId(value: unknown): string {
  const clickId = sanitizeString(value, LIMITS.clickId);
  if (clickId === "") return "";
  return CLICK_ID_RE.test(clickId) ? clickId : "";
}

function sanitizeTimestamp(value: unknown): string | null {
  const timestamp = sanitizeString(value, LIMITS.timestamp);
  if (timestamp === "") return null;
  const ms = Date.parse(timestamp);
  if (Number.isNaN(ms)) return null;
  if (ms < TIMESTAMP_MIN_MS) return null;
  if (ms > Date.now() + 24 * 60 * 60 * 1000) return null;
  return timestamp;
}

export function sanitizeTouchpoint(input: unknown): Touchpoint | null {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return null;
  }
  const o = input as Record<string, unknown>;

  const timestamp = sanitizeTimestamp(o.timestamp);
  if (timestamp === null) return null;

  // Whitelist explícita: se construye un objeto nuevo, sin spread del input.
  return {
    source: sanitizeString(o.source, LIMITS.source),
    medium: sanitizeString(o.medium, LIMITS.medium),
    campaign: sanitizeString(o.campaign, LIMITS.campaign),
    content: sanitizeString(o.content, LIMITS.content),
    term: sanitizeString(o.term, LIMITS.term),
    referrer: sanitizeString(o.referrer, LIMITS.referrer),
    landing_page: sanitizeString(o.landing_page, LIMITS.landing_page),
    gclid: sanitizeClickId(o.gclid),
    gbraid: sanitizeClickId(o.gbraid),
    wbraid: sanitizeClickId(o.wbraid),
    fbclid: sanitizeClickId(o.fbclid),
    msclkid: sanitizeClickId(o.msclkid),
    timestamp,
  };
}

export function sanitizeAttribution(input: unknown): AttributionPayload | null {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return null;
  }
  const o = input as Record<string, unknown>;

  const visitor_id = sanitizeVisitorId(o.visitor_id);
  if (visitor_id === null) return null;

  return {
    visitor_id,
    returning_visitor: sanitizeReturningVisitor(o.returning_visitor),
    first_touch: sanitizeTouchpoint(o.first_touch),
    last_touch: sanitizeTouchpoint(o.last_touch),
  };
}

function formatTouchpoint(touch: Touchpoint | null): string {
  if (touch === null) return "Sin datos";
  const parts: string[] = [];
  if (touch.source) {
    parts.push(touch.medium ? `${touch.source}/${touch.medium}` : touch.source);
  }
  if (touch.campaign) parts.push(`Campaña: ${touch.campaign}`);
  if (touch.landing_page) parts.push(`Landing: ${touch.landing_page}`);
  if (touch.referrer) parts.push(`Referrer: ${touch.referrer}`);
  const clicks: string[] = [];
  if (touch.gclid) clicks.push("gclid");
  if (touch.gbraid) clicks.push("gbraid");
  if (touch.wbraid) clicks.push("wbraid");
  if (touch.fbclid) clicks.push("fbclid");
  if (touch.msclkid) clicks.push("msclkid");
  if (clicks.length > 0) parts.push(`Clicks: ${clicks.join(", ")}`);
  if (touch.timestamp) parts.push(`Timestamp: ${touch.timestamp}`);
  return parts.length > 0 ? parts.join(" | ") : "Sin datos";
}

export function formatAttributionSummary(attribution: AttributionPayload): string {
  return [
    "",
    "---",
    "Atribución",
    `Visitor ID: ${attribution.visitor_id}`,
    `Returning visitor: ${attribution.returning_visitor ? "Sí" : "No"}`,
    `First Touch: ${formatTouchpoint(attribution.first_touch)}`,
    `Last Touch: ${formatTouchpoint(attribution.last_touch)}`,
  ].join("\n");
}
