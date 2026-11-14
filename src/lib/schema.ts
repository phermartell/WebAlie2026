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
    "Alié Digital ofrece diseño y desarrollo web, posicionamiento en buscadores y gestión de campañas digitales para empresas.",
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
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+528115545351",
      email: "monterrey@aliedigital.com",
      contactType: "atención comercial",
      areaServed: "Monterrey",
    },
    {
      "@type": "ContactPoint",
      telephone: "+522213279555",
      email: "puebla@aliedigital.com",
      contactType: "atención comercial",
      areaServed: "Puebla",
    },
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
      name: "Agencia de marketing digital y desarrollo web | Alié Digital",
      description:
        "Conoce cómo trabaja Alié Digital en proyectos de diseño web, posicionamiento en buscadores y campañas digitales. Explora nuestros servicios y proyectos realizados.",
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
      name: "Casos de éxito en marketing digital y desarrollo web | Alié Digital",
      description:
        "Explora proyectos de campañas, sitios web y tiendas en línea de Alié Digital. Conoce qué necesitaba cada cliente y qué trabajo realizamos.",
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
              about: "MORECSA",
              url: "https://aliedigital.com/casos-de-exito/#mision-01-bombas-sumergibles",
              description:
                "Catálogo web técnico, optimización SEO local y campañas en Google Ads y Meta Ads. Resultado documentado: más de 2,190 contactos B2B incorporados a su base de datos en 38 meses (reportado en la ficha original).",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "CreativeWork",
              name: "Insumos y Manufactura B2B",
              about: "Fabricante y Distribuidor de Vasos Desechables de Cartón",
              url: "https://aliedigital.com/casos-de-exito/#mision-02-vasos-desechables",
              description:
                "Rediseño de identidad gráfica, sitio web de cotización mayorista y campañas en Google Ads. Resultado documentado: más de 1,900 empresas acumuladas en la base de datos activa en 18 meses (reportado en la ficha original).",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "CreativeWork",
              name: "Sector Salud & Medicina de Alta Especialidad",
              about: "Cirujano Maxilofacial",
              url: "https://aliedigital.com/casos-de-exito/#mision-03-cirujano-maxilofacial",
              description:
                "Sitio web médico profesional con lineamientos UI/UX para autoridad clínica y campañas en Google Ads para consultas de cirugía maxilofacial.",
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "CreativeWork",
              name: "Infraestructura y Alumbrado Público",
              about: "Postes Puebla",
              url: "https://aliedigital.com/casos-de-exito/#mision-04-postes-infraestructura",
              description:
                "Plataforma web con catálogo técnico y fichas descargables de postes, junto con campañas en Google Ads. Resultado documentado: más de 1,124 constructoras y contratistas registrados en la base de datos en 24 meses (reportado en la ficha original).",
            },
          },
          {
            "@type": "ListItem",
            position: 5,
            item: {
              "@type": "CreativeWork",
              name: "Dominio Orgánico y SEO Técnico Multisectorial",
              about: "Empresas en Maquinaria, Software, Contenedores y Salud",
              url: "https://aliedigital.com/casos-de-exito/#mision-05-seo-multisectorial",
              description:
                "Auditorías técnicas on-page y off-page, optimización de Core Web Vitals, datos estructurados y reestructuración de contenidos técnicos para relevancia en buscadores.",
            },
          },
          {
            "@type": "ListItem",
            position: 6,
            item: {
              "@type": "CreativeWork",
              name: "Escalamiento E-commerce & Retail Motopartes",
              about: "Argüello Motopartes",
              url: "https://aliedigital.com/casos-de-exito/#mision-06-motopartes-ecommerce",
              description:
                "Plataforma de comercio electrónico con buscador interno optimizado para refacciones, pasarelas de pago automatizadas y migración técnica en servidores de alta disponibilidad.",
            },
          },
          {
            "@type": "ListItem",
            position: 7,
            item: {
              "@type": "CreativeWork",
              name: "B2B SaaS & Gestión Corporativa",
              about: "Empresa de Software de Control de Asistencias",
              url: "https://aliedigital.com/casos-de-exito/#mision-07-control-asistencias-saas",
              description:
                "Landing pages orientadas a directivos de recursos humanos y campañas de publicidad en Google Ads y LinkedIn Ads para demostraciones de software corporativo.",
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
        "Cuéntanos sobre tu proyecto mediante el formulario o escríbenos por WhatsApp o correo a nuestros equipos de atención en Monterrey y Puebla.",
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

