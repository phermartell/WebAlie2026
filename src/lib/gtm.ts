// Configuración de Google Tag Manager leída desde WordPress (AlieCore).
// El toggle vive en WP: Ajustes → Alié Digital → "Habilitar Google Tag Manager".

export interface GtmConfig {
  enabled: boolean;
  id: string;
}

const DEFAULT_GTM_ID = "GTM-N685Q2H";

export async function getGtmConfig(): Promise<GtmConfig> {
  const wpUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!wpUrl) return { enabled: false, id: DEFAULT_GTM_ID };
  try {
    const res = await fetch(
      `${wpUrl.replace(/\/+$/, "")}/wp-json/alie/v1/settings`,
      { cache: "no-store" }
    );
    if (!res.ok) return { enabled: false, id: DEFAULT_GTM_ID };
    const data = (await res.json()) as { gtmEnabled?: unknown; gtmId?: unknown };
    return {
      enabled: Boolean(data.gtmEnabled),
      id:
        typeof data.gtmId === "string" && data.gtmId.trim()
          ? data.gtmId.trim()
          : DEFAULT_GTM_ID,
    };
  } catch {
    return { enabled: false, id: DEFAULT_GTM_ID };
  }
}
