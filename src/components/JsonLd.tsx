// Componente compartido para inyectar JSON-LD en el HTML.
// Se usa tanto en Server Components (/agencia) como en Client Components (home).
// Escapa "<" para evitar la inyección de "</script>".
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
