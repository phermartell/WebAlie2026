# Alié Automations

Bridge de eventos de WordPress hacia las automatizaciones externas de Alié Digital (n8n).

## Propósito

Alié Automations es el puente entre eventos de WordPress y n8n. En su versión 1.0.0,
su única responsabilidad es detectar la publicación de un post y emitir un webhook hacia n8n.

## Responsabilidad inicial

`post publicado` → `webhook` → `n8n` (workflow "Contenido Paso 2").

## Qué NO hace

- No gestiona leads.
- No contiene attribution.
- No configura SMTP.
- No publica directamente en redes sociales.
- No usa Meta API.
- No usa LinkedIn API.
- No ejecuta IA.
- No contiene workflows de n8n.

## Arquitectura

```
WordPress (post publish)
  → Alié Automations (webhook)
    → n8n
      → Facebook / Instagram / LinkedIn (futuro)
```

## Configuración

- `ALIE_AUTOMATIONS_WEBHOOK_URL` (constante) o `alie_automations_webhook_url` (opción WordPress).
- `ALIE_AUTOMATIONS_WEBHOOK_SECRET` (constante; **obligatorio**).

Sin valores reales en este documento.

## Seguridad

- Header de autenticación: `X-Alie-Automation-Key: <secret>`.
- **Fail closed**: sin URL o sin secret configurados, el webhook no se envía.
- El secret no se hardcodea y nunca se registra en logs.

## Idempotencia

- El plugin genera `event_id` determinista: `wp-post-published:{post_id}:{post_date_gmt}`.
- El plugin **no** guarda eventos procesados; la deduplicación es responsabilidad de n8n.

## Desarrollo / validación

- Entorno WordPress vigente: **Hostinger** (`wp.aliedigital.com`).
- LocalWP puede existir como instalación histórica, pero **no** es fuente de verdad ni entorno de validación actual.

## Versionado

SemVer (MAJOR.MINOR.PATCH). Tag futuro: `alie-automations-v1.0.0`.

## Deployment

Pendiente del pipeline SSH/SCP (se desplegará de forma intencional, no automática por push a `main`).
