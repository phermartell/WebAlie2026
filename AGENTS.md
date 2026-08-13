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
<!-- END:project-rules -->
