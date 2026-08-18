// Schema JSON-LD centralizado de Alié Digital.
// Se inyecta en las páginas mediante el componente <JsonLd data={...} />.

// Entidad única Organization + ProfessionalService compartida por toda la web.
const ORGANIZATION_SCHEMA = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://aliedigital.com/#organization",
  name: "Alié Digital",
  url: "https://aliedigital.com/",
  logo: "https://aliedigital.com/logo.svg",
  image: "https://aliedigital.com/og-home.webp",
  slogan: "SUEÑA GRANDE, LLEGA LEJOS",
  description:
    "Agencia de marketing digital B2B potenciada por inteligencia artificial, especializada en diseño y desarrollo web, growth marketing, SEO, paid media y automatizaciones en Monterrey, Puebla y Latinoamérica.",
  foundingDate: "2021",
  telephone: "+528115545351",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Monterrey",
    addressRegion: "Nuevo León",
    addressCountry: "MX",
  },
  areaServed: [
    { "@type": "City", name: "Monterrey" },
    { "@type": "City", name: "Puebla" },
    { "@type": "City", name: "Ciudad de México" },
    { "@type": "AdministrativeArea", name: "Latinoamérica" },
  ],
  knowsAbout: [
    "Diseño Web UI/UX",
    "Marketing Digital B2B",
    "Inteligencia Artificial",
    "Posicionamiento SEO",
    "Google Ads",
    "Meta Ads",
    "Automatización de Procesos",
    "Desarrollo E-commerce",
  ],
};

export const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    ORGANIZATION_SCHEMA,
    {
      "@type": "WebSite",
      "@id": "https://aliedigital.com/#website",
      url: "https://aliedigital.com/",
      name: "Alié Digital",
      description:
        "Agencia de marketing digital B2B en Monterrey y Puebla. Páginas web, growth marketing, ecommerce y soluciones digitales para generar demanda y ventas.",
      inLanguage: "es-MX",
      publisher: { "@id": "https://aliedigital.com/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://aliedigital.com/#webpage",
      url: "https://aliedigital.com/",
      name: "Agencia de Marketing Digital B2B en Monterrey y Puebla | Alié Digital",
      description:
        "Alié Digital es una agencia de marketing digital B2B en Monterrey y Puebla. Creamos páginas web, growth marketing, ecommerce y soluciones digitales para generar demanda y ventas.",
      inLanguage: "es-MX",
      isPartOf: { "@id": "https://aliedigital.com/#website" },
      about: { "@id": "https://aliedigital.com/#organization" },
    },
  ],
};

export const AGENCIA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://aliedigital.com/agencia/#webpage",
      url: "https://aliedigital.com/agencia/",
      name: "Sobre Alié Digital | Agencia Digital Potenciada por Inteligencia Artificial",
      description:
        "Bitácora de trayectoria y filosofía de Alié Digital. Agencia de diseño web y marketing digital B2B impulsada por inteligencia artificial con más de 7 años digitalizando empresas.",
      inLanguage: "es-MX",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://aliedigital.com/#website",
        url: "https://aliedigital.com/",
        name: "Alié Digital",
      },
      about: {
        "@id": "https://aliedigital.com/#organization",
      },
    },
    ORGANIZATION_SCHEMA,
  ],
};

export const CASOS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://aliedigital.com/casos-de-exito/#webpage",
      url: "https://aliedigital.com/casos-de-exito/",
      name: "Casos de éxito | Alié Digital",
      description:
        "Casos de estudio de Alié Digital: campañas reales, resultados medibles y ROI sin excusas en sectores de alta competencia, nichos restringidos y mercados B2B complejos.",
      inLanguage: "es-MX",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://aliedigital.com/#website",
        url: "https://aliedigital.com/",
        name: "Alié Digital",
      },
      about: {
        "@id": "https://aliedigital.com/#organization",
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: 7,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "CreativeWork",
              name: "Equipamiento Industrial B2B & Sector Hogar",
              about: "Comercializadora de Bombas Sumergibles",
              description:
                "57 prospectos calificados al mes, +2,190 contactos B2B en 38 meses y posicionamiento SEO Top 1 en Google.",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "CreativeWork",
              name: "Insumos y Manufactura B2B",
              about: "Fabricante y Distribuidor de Vasos Desechables de Cartón",
              description:
                "105 prospectos mayoristas al mes y +1,900 empresas en base de datos activa en 18 meses.",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "CreativeWork",
              name: "Sector Salud & Medicina de Alta Especialidad",
              about: "Cirujano Maxilofacial",
              description:
                "48 pacientes calificados al mes y +1,155 expedientes y contactos generados en 24 meses.",
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "CreativeWork",
              name: "Infraestructura y Alumbrado Público",
              about: "Venta de Postes Metálicos y de Concreto",
              description:
                "46 cotizaciones B2B de gran escala al mes y +1,124 constructoras y contratistas registrados en 24 meses.",
            },
          },
          {
            "@type": "ListItem",
            position: 5,
            item: {
              "@type": "CreativeWork",
              name: "Dominio Orgánico y SEO Técnico Multisectorial",
              about: "Multi-Industria (7 Marcas)",
              description:
                "Top 5 en Google en palabras clave comerciales para 7 industrias y +500 errores técnicos corregidos.",
            },
          },
          {
            "@type": "ListItem",
            position: 6,
            item: {
              "@type": "CreativeWork",
              name: "Escalamiento E-commerce & Retail Motopartes",
              about: "Tienda en Línea de Motopartes",
              description:
                "+$366,000 MXN en ventas en 2026 y +115% de crecimiento interanual acelerado.",
            },
          },
          {
            "@type": "ListItem",
            position: 7,
            item: {
              "@type": "CreativeWork",
              name: "B2B SaaS & Gestión Corporativa",
              about: "Empresa de Control de Asistencias",
              description:
                "+450 prospectos B2B corporativos calificados en menos de 12 meses y optimización continua del CPA.",
            },
          },
        ],
      },
    },
    ORGANIZATION_SCHEMA,
  ],
};

export const CONTACTO_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://aliedigital.com/contacto/#webpage",
      url: "https://aliedigital.com/contacto/",
      name: "Contacto | Alié Digital",
      description:
        "Inicia tu misión digital con Alié Digital. Cuéntanos sobre tu proyecto y agenda una llamada de estrategia. Tu dominio siempre será tuyo gracias a nuestra Garantía Anti-Secuestro.",
      inLanguage: "es-MX",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://aliedigital.com/#website",
        url: "https://aliedigital.com/",
        name: "Alié Digital",
      },
      about: {
        "@id": "https://aliedigital.com/#organization",
      },
    },
    ORGANIZATION_SCHEMA,
  ],
};

export const createServiceSchema = (path: string, name: string, description: string) => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "Service"],
        "@id": `https://aliedigital.com${path}#webpage`,
        url: `https://aliedigital.com${path}`,
        name,
        description,
        inLanguage: "es-MX",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://aliedigital.com/#website",
          url: "https://aliedigital.com/",
          name: "Alié Digital",
        },
        provider: {
          "@id": "https://aliedigital.com/#organization",
        },
      },
      ORGANIZATION_SCHEMA,
    ],
  };
};

