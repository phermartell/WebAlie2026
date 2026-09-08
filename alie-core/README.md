# AlieCore

Plugin interno de WordPress de Alié Digital, responsable del **dominio de leads** de
[aliedigital.com](https://aliedigital.com). Este plugin **no** es el frontend público ni un CMS de blog:
es el almacén operativo de leads y su administración.

---

## 1. Propósito

Registrar, recibir, persistir y administrar los leads captados por el sitio Next.js de Alié Digital,
incluyendo atribución first-party estructurada (C5.6A) y protección de la superficie REST del CPT (C5.7A).

## 2. Responsabilidades

- CPT `lead`.
- Endpoint público `POST /wp-json/alie/v1/lead`.
- Persistencia de leads (post + `post_meta`).
- Atribución estructurada (`alie_attribution` + metas promovidos).
- UI administrativa de Leads (metaboxes, columnas, filtros, búsqueda, exportación CSV, borrado).
- Configuración del correo de notificación (`alie_notification_email`).
- Envío de `wp_mail()` por cada lead nuevo.

## 3. Lo que NO hace

- No renderiza el blog headless.
- No crea posts.
- No ejecuta workflows de n8n.
- No publica en Facebook / Instagram / LinkedIn.
- No configura SMTP.
- No contiene credenciales SMTP.
- No contiene Application Passwords.
- No contiene secretos de Google / Meta / CRM.
- No debe incluir webhooks de automatización editorial/social (fuera de alcance del plugin).

## 4. Arquitectura

```
Next.js (aliedigital.com)
  └─ POST /wp-json/alie/v1/lead  →  AlieCore  →  CPT lead + post_meta  →  wp_mail()  →  Easy WP SMTP  →  SMTP Hostinger
```

El blog headless usa WordPress Core (NO AlieCore):

```
Next.js  →  /wp-json/wp/v2/posts  y  /wp-json/wp/v2/categories
```

## 5. Endpoint

### `POST /wp-json/alie/v1/lead`

Body soportado según la implementación real:

| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | string | Nombre del contacto (o identificador). |
| `whatsapp` | string | WhatsApp / teléfono (o identificador). |
| `servicio` | string | Servicio de interés. |
| `mensaje` | string | Mensaje / datos adicionales. |
| `canal` | string | `web` \| `facebook` \| `instagram` \| `whatsapp`. |
| `pagina` | string | Página de origen. |
| `formulario` | string | Identificador/formulario de origen. |
| `website` | string | Honeypot anti-bots (debe ir vacío). |
| `attribution` | object | Opcional. Atribución sanitizada (ver sección 6). |

Respuesta: `{ "success": true, "id": <post_id> }`.

No usar datos reales, teléfonos reales, gclid reales ni secretos en pruebas o ejemplos.

## 6. Attribution

Cuando el cliente envía `attribution` válida, AlieCore persiste:

- **`alie_attribution`** — snapshot JSON versionado:
  `{ "attribution_version": 1, "visitor_id": "...", "returning_visitor": bool, "first_touch": {...} | null, "last_touch": {...} | null }`.
  Cada touchpoint contiene `source`, `medium`, `campaign`, `content`, `term`, `referrer`,
  `landing_page`, click IDs (`gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`) y `timestamp`.
- **Metas promovidos** (copias consultables del touchpoint elegido):
  `alie_gclid`, `alie_gbraid`, `alie_wbraid`, `alie_source`, `alie_medium`, `alie_campaign`.
- **Regla de promoción**: se usa **last_touch** si existe; si es `null`, **first_touch**;
  si ambos son `null`, los metas promovidos quedan vacíos.

La atribución es metadata opcional: ausente o inválida, el lead siempre se crea.

## 7. Seguridad

- CPT `lead` no público.
- `show_in_rest = false` (REST genérico del CPT cerrado; C5.7A).
- `auth_callback` de los meta de leads restringido a `edit_posts`.
- Honeypot (`website`).
- Rate-limit por IP en el endpoint (5 solicitudes / 10 min).
- reCAPTCHA se valida actualmente en **Next.js**, no directamente en WordPress.
- `POST /wp-json/alie/v1/lead` es **público por diseño**.
- **Riesgo conocido**: spam directo al endpoint de WordPress (que no valida reCAPTCHA).
- Nunca exponer PII por REST genérico.

## 8. Email

AlieCore usa `wp_mail()`. El transporte SMTP es responsabilidad de **Easy WP SMTP**
(infraestructura de producción de Hostinger). Las credenciales SMTP **no** pertenecen al plugin.

## 9. Desarrollo local

Procedimiento actual verificable:

- Sitio **LocalWP** (`alie2026`) con el plugin **symlinkeado** al repo (`wp-content/plugins/alie-core`).
- Validación de sintaxis por archivo:
  `php -l alie-core.php` y `php -l includes/class-alie-*.php`.
- Pruebas REST contra el sitio local:
  `POST /wp-json/alie/v1/lead` y verificación directa en BD de `post_meta`.
- No inventar ni asumir herramientas que no existan en el entorno.

## 10. Releases

SemVer:

- **MAJOR**: cambios incompatibles (renombrar/quitar endpoint, CPT, meta o forma del snapshot de attribution).
- **MINOR**: funcionalidades nuevas compatibles.
- **PATCH**: correcciones compatibles.

Convención de tag: **`alie-core-vX.Y.Z`**.

Una release debe construirse **desde Git/tag**, nunca desde un working tree con cambios locales.

## 11. Deployment

El deployment automatizado se implementará en **C5.7E**. No documentar aún comandos falsos ni
secretos que no estén configurados.

## 12. Rollback

Conceptualmente: para regresar a una versión anterior se **re-despliega** el release/tag previo
(p. ej. `alie-core-v1.0.0`). El rollback **no** debe depender del working tree local.
