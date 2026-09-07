// Helper compartido de reCAPTCHA v3 (cliente).
// Regla #2 del proyecto: todo formulario debe usarlo.

type Grecaptcha = {
  execute: (key: string, opts: { action: string }) => Promise<string>;
};

// Promesa singleton a nivel de módulo: garantiza UN solo <script> de Google reCAPTCHA por sesión.
let recaptchaPromise: Promise<void> | null = null;

export async function loadRecaptcha(siteKey: string): Promise<void> {
  if (typeof window === "undefined" || !siteKey) return;
  const w = window as unknown as { grecaptcha?: unknown };
  if (w.grecaptcha) return; // ya cargado (o cargado por otra vía
  if (recaptchaPromise) return recaptchaPromise; // reutilizar carga en curso
  recaptchaPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      // Falla: propagar error controlado (NO resolver como éxito) y permitir reintento futuro.

      recaptchaPromise = null;
      reject(new Error("No se pudo cargar reCAPTCHA. Intenta de nuevo."));
    };
    document.head.appendChild(script);
  });
  return recaptchaPromise;
}

export async function getRecaptchaToken(
  siteKey: string,
  action: string
): Promise<string> {
  if (!siteKey) return "";
  try {
    await loadRecaptcha(siteKey);
  } catch {
    // Si el SDK no cargó, no se genera token: el backend rechazará el envío
    // (la validación server-side nunca se omite).
    return "";
  }
  const w = window as unknown as { grecaptcha?: Grecaptcha };
  if (!w.grecaptcha) return "";
  try {
    const token = await w.grecaptcha.execute(siteKey, { action });
    return token;
  } catch {
    return "";
  }
}
