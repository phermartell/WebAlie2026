<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-rules -->
# Reglas del Proyecto Alié Digital

## Regla #1: Backup antes de modificar

Antes de realizar cualquier cambio en un archivo del proyecto, se debe crear una copia de seguridad temporal con el sufijo `.bak` en el mismo directorio:

```bash
cp ruta/archivo.tsx ruta/archivo.tsx.bak
```

**Flujo:**
1. Crear `.bak` del archivo original
2. Implementar los cambios
3. Si el usuario da el visto bueno → eliminar el `.bak`
4. Si hay que revertir → `cp archivo.tsx.bak archivo.tsx` y eliminar el `.bak`

Nunca usar `git checkout` para revertir cambios a menos que el archivo esté correctamente commiteado.

## Regla #2: reCAPTCHA obligatorio en todo formulario

Todo formulario del sitio (presente y futuro) debe:
1. Generar un token de reCAPTCHA v3 en el cliente usando el helper compartido `src/lib/recaptcha.ts` (`getRecaptchaToken(siteKey, action)`).
2. Enviarlo a `POST /api/lead` y validarlo server-side (score ≥ 0.5).
3. Incluir un campo honeypot oculto anti-bots.

`RECAPTCHA_SECRET_KEY` nunca se expone al cliente (sin prefijo `NEXT_PUBLIC_`).

## Regla #3: Google Tag Manager controlado desde WordPress

El GTM se inyecta en el layout raíz solo si está habilitado en WordPress (Ajustes → Alié Digital → "Habilitar Google Tag Manager"). Durante el desarrollo se mantiene apagado para no contaminar analytics.
<!-- END:project-rules -->
