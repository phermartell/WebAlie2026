// Helper compartido de reCAPTCHA v3 (cliente).
// Regla #2 del proyecto: todo formulario debe usarlo.

type Grecaptcha = {
  execute: (key: string, opts: { action: string }) => Promise<string>;
};

export async function loadRecaptcha(siteKey: string): Promise<void> {
  if (typeof window === "undefined" || !siteKey) return;
  const w = window as unknown as { grecaptcha?: unknown };
  if (w.grecaptcha) return;
  await new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

export async function getRecaptchaToken(
  siteKey: string,
  action: string
): Promise<string> {
  if (!siteKey) return "";
  await loadRecaptcha(siteKey);
  const w = window as unknown as { grecaptcha?: Grecaptcha };
  if (!w.grecaptcha) return "";
  try {
    return await w.grecaptcha.execute(siteKey, { action });
  } catch {
    return "";
  }
}
