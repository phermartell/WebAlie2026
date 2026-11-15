export interface ProyectoAgencia {
  titulo: string;
  desc: string;
  href: string;
}

export interface Grupo {
  titulo: string;
  giros: string[];
}

export interface Servicio {
  titulo: string;
  desc: string;
  href: string;
}

export interface PasoProceso {
  paso: string;
  titulo: string;
  desc: string;
}

export const PROYECTOS_AGENCIA: ProyectoAgencia[] = [
  {
    titulo: "MORECSA",
    desc: "Desarrollamos un catálogo web de equipos de bombeo y trabajamos el SEO local y las campañas en Google Ads y Meta Ads.",
    href: "/casos-de-exito#mision-01-bombas-sumergibles",
  },
  {
    titulo: "Vasos desechables de cartón",
    desc: "Desarrollamos un sitio con catálogo para solicitudes de cotización mayorista y gestionamos campañas de búsqueda en Google Ads.",
    href: "/casos-de-exito#mision-02-vasos-desechables",
  },
  {
    titulo: "Argüello Motopartes",
    desc: "Desarrollamos una tienda en línea de refacciones con búsqueda interna y opciones de pago.",
    href: "/casos-de-exito#mision-06-motopartes-ecommerce",
  },
];

export const GRUPOS: Grupo[] = [
  {
    titulo: "Educación y Formación",
    giros: [
      "Jardines de niños",
      "Primarias",
      "Secundarias",
      "Preparatorias",
      "Universidades",
      "Escuelas de inglés en línea",
      "Escuelas de francés en línea",
      "Academias de capacitación profesional",
    ],
  },
  {
    titulo: "Industria Pesada e Infraestructura",
    giros: [
      "Control de accesos",
      "Torniquetes para transporte masivo",
      "Mantenimientos industriales",
      "Aire acondicionado residencial e industrial",
      "Mantenimiento de calderas",
      "Renta de montacargas",
      "Venta de montacargas",
      "Venta de postes",
      "Venta de bases de concreto",
      "Lámparas y luminarias",
    ],
  },
  {
    titulo: "Servicios Corporativos B2B y Gobierno",
    giros: [
      "Ayuntamiento de Xicotepec",
      "Uniformes industriales",
      "Reclutamiento LATAM hacia el mercado norteamericano",
      "Firmas de abogados",
      "Laboratorios de pruebas",
      "Consultoría ambiental",
      "Consultoría de desarrollo de perfiles",
      "Agencias de marketing digital",
      "Imprentas de cajas y empaques de cartón",
    ],
  },
  {
    titulo: "Salud y Bienestar",
    giros: [
      "Salud Digna (laboratorios clínicos)",
      "Empresas médicas",
      "Psicólogos",
      "Plataformas de acondicionamiento físico",
      "Salones de estética de uñas",
    ],
  },
  {
    titulo: "Comercio y Consumo",
    giros: [
      "Comercializadoras de granos",
      "Comercializadoras de botanas",
      "Joyerías en México",
      "Joyerías en Estados Unidos",
      "Productos ecológicos",
      "Vasos personalizados para café",
      "Señalización digital",
      "Comida a domicilio",
    ],
  },
  {
    titulo: "Eventos y Filantropía",
    giros: [
      "Fundaciones de ayuda a niños",
      "Organizadores de eventos",
      "Consultoras de integración empresarial",
      "Constructoras",
      "Despachos de arquitectos",
    ],
  },
  {
    titulo: "Servicios Internacionales",
    giros: [
      "Limpieza a domicilio en Estados Unidos",
      "Reclutamiento transfronterizo",
      "Comercialización corporativa",
    ],
  },
];

export const SERVICIOS: Servicio[] = [
  {
    titulo: "SEO Técnico & AI",
    desc: "Rankea en Google y motores de IA como ChatGPT y Perplexity. Optimizamos tu código, Schema y contenidos para que los LLMs recomienden tu marca.",
    href: "/seo",
  },
  {
    titulo: "Diseño de páginas web",
    desc: "Creamos sitios web y páginas de conversión enfocados en comunicar tu propuesta de valor y captar oportunidades comerciales. Diseños rápidos y optimizados.",
    href: "/diseno-paginas-web",
  },
  {
    titulo: "Ecommerce",
    desc: "Desarrollamos tiendas en línea y plataformas transaccionales robustas preparadas para vender de forma eficiente, rápida y optimizada para conversiones.",
    href: "/ecommerce",
  },
  {
    titulo: "Paid media",
    desc: "Gestionamos campañas de pauta digital en Google Ads y Meta Ads para capturar intención de compra y generar leads calificados de alto valor.",
    href: "/paid-media",
  },
  {
    titulo: "Redes sociales",
    desc: "Gestionamos redes sociales para fortalecer tu presencia digital y atraer audiencia con contenido y anuncios pensados para aumentar la conversión.",
    href: "/redes-sociales",
  },
  {
    titulo: "Email marketing",
    desc: "Diseñamos campañas y automatizaciones de email marketing para nutrir contactos, reactivar clientes e impulsar ventas continuas sin esfuerzo manual.",
    href: "/email-marketing",
  },
  {
    titulo: "Asistentes IA & Automatizaciones",
    desc: "Implementamos asistentes virtuales personalizados y flujos de trabajo inteligentes que califican y atienden prospectos 24/7 de forma autónoma con tecnología de IA.",
    href: "/ia",
  },
  {
    titulo: "Identidad Gráfica & Branding",
    desc: "Construimos marcas memorables desde el logotipo, tono de voz y directrices visuales completas. Diseñamos marcas que destacan y transmiten confianza.",
    href: "/identidad-grafica",
  },
];

export const PROCESO_TRABAJO: PasoProceso[] = [
  {
    paso: "PASO 01",
    titulo: "Revisamos el punto de partida",
    desc: "Conversamos con tu equipo para entender qué vendes, cómo llegan las consultas y qué quieres mejorar. Revisamos los materiales y datos disponibles.",
  },
  {
    paso: "PASO 02",
    titulo: "Acordamos el alcance",
    desc: "Definimos las prioridades, los entregables y las responsabilidades. También acordamos qué revisará tu equipo antes de publicar el sitio o activar las campañas.",
  },
  {
    paso: "PASO 03",
    titulo: "Implementamos y revisamos",
    desc: "Desarrollamos o configuramos lo acordado. Según el proyecto, comprobamos los puntos de contacto y revisamos los primeros datos disponibles para decidir qué ajustar.",
  },
];

