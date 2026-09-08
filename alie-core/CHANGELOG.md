# Changelog

Todos los cambios notables de AlieCore se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.1.0/) y el versionado es [SemVer](https://semver.org/lang/es/).

## [1.1.0] - 2026-09-07

### Added

- Persistencia estructurada de attribution para leads.
- Snapshot versionado `alie_attribution` con `attribution_version = 1`.
- Metas promovidos:
  - `alie_gclid`
  - `alie_gbraid`
  - `alie_wbraid`
  - `alie_source`
  - `alie_medium`
  - `alie_campaign`
- Regla de promoción last-touch → first-touch para los metas promovidos.

### Security

- Cierre del REST genérico público del CPT `lead` mediante `show_in_rest = false`.
- `auth_callback` de los meta de leads restringido a usuarios con capacidad `edit_posts`.

## [1.0.0]

Capacidades históricas verificables por código:

- Registro del CPT `lead`.
- Endpoint público `POST /wp-json/alie/v1/lead` con rate-limit por IP y honeypot.
- Persistencia de leads (título + post_meta base: `nombre`, `whatsapp`, `servicio`, `mensaje`, `canal`, `pagina`, `formulario`).
- Administración de Leads en wp-admin: metaboxes, columnas, filtros (formulario/página/fecha), búsqueda extendida y exportación CSV.
- Notificación por correo configurable (`alie_notification_email`) vía `wp_mail()`.
- UI de confirmación para borrado de leads.
