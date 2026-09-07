/**
 * Atribución first-party para Alié Digital.
 * Sin PII, sin fingerprinting, sin librerías externas.
 *
 * Persistencia:
 *   Cookie: alie_visitor_id (90d)
 *   localStorage: alie_first_touch (inmutable), alie_last_touch
 *   sessionStorage: alie_session_returning (estado de sesión)
 *
 * NOTA CONSENTIMIENTO FUTURO:
 * Si se añade CMP, respetar la decisión. No usar localStorage como bypass.
 */

const VISITOR_COOKIE = "alie_visitor_id";
const FIRST_TOUCH_KEY = "alie_first_touch";
const LAST_TOUCH_KEY = "alie_last_touch";
const SESSION_RETURNING_KEY = "alie_session_returning";
const COOKIE_DAYS = 90;
const INTERNAL_HOSTNAMES = ["aliedigital.com", "www.aliedigital.com"];
const INTERNAL_UTM_SOURCES = [
  "aliedigital",
  "alie",
  "aliedigital.com",
  "www.aliedigital.com",
];

const LIMITS = {
  source: 100,
  medium: 50,
  campaign: 200,
  content: 200,
  term: 200,
  clickID: 500,
} as const;

export interface Touchpoint {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  referrer: string;
  landing_page: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  fbclid: string;
  msclkid: string;
  timestamp: string;
}

export interface AttributionPayload {
  visitor_id: string;
  returning_visitor: boolean;
  first_touch: Touchpoint | null;
  last_touch: Touchpoint | null;
}

interface RawSignals {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  referrer: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  fbclid: string;
  msclkid: string;
}

function isAttributionAllowed(): boolean {
  return true;
}

function safeGet(key: string, storage: Storage | null): string | null {
  if (!storage) return null;
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string, storage: Storage | null): void {
  if (!storage) return;
  try {
    storage.setItem(key, value);
  } catch {
    /* almacenamiento lleno o bloqueado */
  }
}

function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getSessionStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function truncate(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  try {
    const prefix = name + "=";
    const row = document.cookie.split("; ").find((c) => c.startsWith(prefix));
    return row ? decodeURIComponent(row.slice(prefix.length)) : null;
  } catch {
    return null;
  }
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return;
  try {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    const maxAge = days > 0 ? "; max-age=" + days * 60 * 60 * 24 : "";
    document.cookie =
      name + "=" + encodeURIComponent(value) + "; Path=/; SameSite=Lax" + maxAge + secure;
  } catch {
    /* cookies bloqueadas */
  }
}

function generateVisitorId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    /* fallback */
  }
  return (
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10)
  );
}

export function getVisitorId(): string {
  let id = getCookie(VISITOR_COOKIE);
  if (!id) {
    id = generateVisitorId();
    setCookie(VISITOR_COOKIE, id, COOKIE_DAYS);
  }
  return id;
}

/**
 * returning_visitor = el navegador YA tenía visitor_id ANTES de esta sesión.
 * Se cachea en sessionStorage para que recargas no cambien new->returning.
 */
export function getReturningVisitor(): boolean {
  const cached = safeGet(SESSION_RETURNING_KEY, getSessionStorage());
  if (cached === "true") return true;
  if (cached === "false") return false;
  const existed = getCookie(VISITOR_COOKIE) !== null;
  getVisitorId();
  safeSet(SESSION_RETURNING_KEY, String(existed), getSessionStorage());
  return existed;
}

function getReferrerHostname(): string {
  if (typeof document === "undefined" || !document.referrer) return "";
  try {
    let hostname = new URL(document.referrer).hostname;
    if (hostname.startsWith("www.")) hostname = hostname.slice(4);
    return hostname;
  } catch {
    return "";
  }
}

function isInternalHostname(hostname: string): boolean {
  return INTERNAL_HOSTNAMES.includes(hostname);
}

/**
 * Detecta UTMs internos de Alié Digital. No son adquisición:
 * no deben crear ni sobrescribir First/Last Touch.
 */
function isInternalUtmSource(source: string): boolean {
  return INTERNAL_UTM_SOURCES.includes(source);
}

function parseUTMs(
  params: URLSearchParams
): Pick<RawSignals, "source" | "medium" | "campaign" | "content" | "term"> {
  return {
    source: truncate(params.get("utm_source")?.trim().toLowerCase() ?? "", LIMITS.source),
    medium: truncate(params.get("utm_medium")?.trim().toLowerCase() ?? "", LIMITS.medium),
    campaign: truncate(params.get("utm_campaign")?.trim() ?? "", LIMITS.campaign),
    content: truncate(params.get("utm_content")?.trim() ?? "", LIMITS.content),
    term: truncate(params.get("utm_term")?.trim() ?? "", LIMITS.term),
  };
}

function parseClickIDs(
  params: URLSearchParams
): Pick<RawSignals, "gclid" | "gbraid" | "wbraid" | "fbclid" | "msclkid"> {
  return {
    gclid: truncate(params.get("gclid")?.trim() ?? "", LIMITS.clickID),
    gbraid: truncate(params.get("gbraid")?.trim() ?? "", LIMITS.clickID),
    wbraid: truncate(params.get("wbraid")?.trim() ?? "", LIMITS.clickID),
    fbclid: truncate(params.get("fbclid")?.trim() ?? "", LIMITS.clickID),
    msclkid: truncate(params.get("msclkid")?.trim() ?? "", LIMITS.clickID),
  };
}

/**
 * Clasificación conservadora. NO infiere Paid Search / Paid Social.
 * gclid -> source=google, medium="" (vacío, NO cpc automático).
 * fbclid -> source=facebook, medium="" (vacío, NO paid_social automático).
 */
function classifySourceMedium(
  referrer: string,
  utms: Pick<RawSignals, "source" | "medium">,
  clickIDs: Pick<RawSignals, "gclid" | "gbraid" | "wbraid" | "fbclid" | "msclkid">
): { source: string; medium: string } {
  if (utms.source) return { source: utms.source, medium: utms.medium };
  if (clickIDs.gclid || clickIDs.gbraid || clickIDs.wbraid) return { source: "google", medium: "" };
  if (clickIDs.fbclid) return { source: "facebook", medium: "" };
  if (clickIDs.msclkid) return { source: "bing", medium: "" };
  if (referrer) {
    if (referrer.startsWith("google.")) return { source: "google", medium: "organic" };
    if (
      referrer.startsWith("bing.") ||
      referrer.startsWith("yahoo.") ||
      referrer.startsWith("duckduckgo.")
    ) {
      return { source: referrer.split(".")[0], medium: "organic" };
    }
    if (referrer === "facebook.com" || referrer === "fb.com") {
      return { source: "facebook", medium: "organic" };
    }
    if (referrer === "instagram.com") return { source: "instagram", medium: "organic" };
    if (referrer === "linkedin.com") return { source: "linkedin", medium: "organic" };
    return { source: referrer, medium: "referral" };
  }
  return { source: "direct", medium: "none" };
}

function hasAcquisitionSignal(signals: RawSignals): boolean {
  return !!(
    signals.source ||
    signals.medium ||
    signals.gclid ||
    signals.gbraid ||
    signals.wbraid ||
    signals.fbclid ||
    signals.msclkid
  );
}

function buildTouchpoint(landingPath: string, signals: RawSignals): Touchpoint {
  return {
    source: signals.source,
    medium: signals.medium,
    campaign: signals.campaign,
    content: signals.content,
    term: signals.term,
    referrer: signals.referrer,
    landing_page: landingPath,
    gclid: signals.gclid,
    gbraid: signals.gbraid,
    wbraid: signals.wbraid,
    fbclid: signals.fbclid,
    msclkid: signals.msclkid,
    timestamp: new Date().toISOString(),
  };
}

function readFirstTouch(): Touchpoint | null {
  const raw = safeGet(FIRST_TOUCH_KEY, getLocalStorage());
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Touchpoint;
  } catch {
    return null;
  }
}

function writeFirstTouch(t: Touchpoint): void {
  safeSet(FIRST_TOUCH_KEY, JSON.stringify(t), getLocalStorage());
}

export function ensureFirstTouch(landingPath: string, signals: RawSignals): Touchpoint | null {
  if (!isAttributionAllowed()) return null;
  const existing = readFirstTouch();
  if (existing) return existing;
  const touch = buildTouchpoint(landingPath, signals);
  writeFirstTouch(touch);
  return touch;
}

function readLastTouch(): Touchpoint | null {
  const raw = safeGet(LAST_TOUCH_KEY, getLocalStorage());
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Touchpoint;
  } catch {
    return null;
  }
}

function writeLastTouch(t: Touchpoint): void {
  safeSet(LAST_TOUCH_KEY, JSON.stringify(t), getLocalStorage());
}

/**
 * Last Non-Direct Touch: solo señales relevantes. Direct NO se guarda.
 */
export function maybeUpdateLastTouch(landingPath: string, signals: RawSignals): Touchpoint | null {
  if (!isAttributionAllowed()) return null;
  if (!hasAcquisitionSignal(signals)) return readLastTouch();
  if (signals.source === "direct" && signals.medium === "none") return readLastTouch();
  const touch = buildTouchpoint(landingPath, signals);
  writeLastTouch(touch);
  return touch;
}

export function getAttribution(): AttributionPayload {
  return {
    visitor_id: getVisitorId(),
    returning_visitor: getReturningVisitor(),
    first_touch: readFirstTouch(),
    last_touch: readLastTouch(),
  };
}

/**
 * Procesa señales para una landing.
 * isEntryPoint: true solo en entrada inicial del documento (no navegación SPA).
 */
export function processAttribution(
  landingPath: string,
  searchParams: URLSearchParams,
  isEntryPoint: boolean
): void {
  if (!isAttributionAllowed()) return;
  let utms = parseUTMs(searchParams);
  if (isInternalUtmSource(utms.source)) {
    // UTMs internos no son adquisición: se neutralizan para que la visita
    // conserve su clasificación natural (Direct o referrer externo real).
    utms = { source: "", medium: "", campaign: "", content: "", term: "" };
  }
  const clickIDs = parseClickIDs(searchParams);
  const referrer = isEntryPoint ? getReferrerHostname() : "";
  const refSignal = isEntryPoint && referrer && !isInternalHostname(referrer) ? referrer : "";
  const { source, medium } = classifySourceMedium(refSignal, utms, clickIDs);
  const signals: RawSignals = {
    source,
    medium,
    campaign: utms.campaign,
    content: utms.content,
    term: utms.term,
    referrer: refSignal,
    ...clickIDs,
  };
  ensureFirstTouch(landingPath, signals);
  maybeUpdateLastTouch(landingPath, signals);
}

