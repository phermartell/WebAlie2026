# Changelog

## [1.0.0] - 2026-09-07

### Added

- Evento `post published` de WordPress → webhook → n8n.
- Payload compatible con el webhook histórico de AlieCore.
- `event_id` determinista (`wp-post-published:{post_id}:{post_date_gmt}`).
- Endpoint configurable (constante `ALIE_AUTOMATIONS_WEBHOOK_URL` u opción `alie_automations_webhook_url`).
- Header de secreto compartido `X-Alie-Automation-Key` (constante `ALIE_AUTOMATIONS_WEBHOOK_SECRET`).

### Security

- Eliminar la dependencia futura de un webhook sin autenticación (`Authentication: None`).
- Fail closed: no se emite el webhook sin URL ni secreto configurados.
