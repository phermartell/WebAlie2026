export interface Metrica {
  valor: string;
  count: number;
  prefix: string;
  suffix: string;
  titulo: string;
  desc: string;
}

export interface Caso {
  valor: string;
  titulo: string;
  desc: string;
}

export interface Grupo {
  titulo: string;
  giros: string[];
}

export interface Servicio {
  titulo: string;
  desc: string;
}

export interface Pilar {
  num: string;
  titulo: string;
  desc: string;
}

export const METRICAS: Metrica[] = [
  {
    valor: "+50",
    count: 50,
    prefix: "+",
    suffix: "",
    titulo: "Empresas Impulsadas",
    desc: "Marcas e industrias en México y Latinoamérica que han transformado su infraestructura comercial y presencia en línea con nosotros.",
  },
  {
    valor: "320%",
    count: 320,
    prefix: "",
    suffix: "%",
    titulo: "de Retorno de Inversión Promedio",
    desc: "Incremento real en el retorno de inversión comercial, medido directamente en las oportunidades de negocio y ventas cerradas de nuestros clientes.",
  },
  {
    valor: "5x",
    count: 5,
    prefix: "",
    suffix: "x",
    titulo: "Más Rápidos",
    desc: "Reducción del 80% en tiempos de producción e implementación gracias a nuestra arquitectura avanzada de Inteligencia Artificial.",
  },
  {
    valor: "7+",
    count: 7,
    prefix: "",
    suffix: "+",
    titulo: "Años de Trayectoria Combinada",
    desc: "Más de siete años erradicando malas prácticas tecnológicas en el mercado corporativo y operando como Alié Digital desde 2021.",
  },
];

export const CASOS: Caso[] = [
  {
    valor: "+2,190",
    titulo: "Prospectos Calificados",
    desc: "Generados para una empresa de bombas de agua sumergibles gracias a nuestro posicionamiento SEO optimizado por inteligencia artificial en el primer lugar de Google para palabras clave de alta competencia, sumado a una automatización multicanal que mantiene 57 prospectos mensuales sostenidos.",
  },
  {
    valor: "+1,900",
    titulo: "Leads de Alto Valor",
    desc: "Creados para una empresa comercializadora de vasos personalizados para café mediante una estrategia integral de campañas de rendimiento y optimización del retorno de inversión publicitaria, alcanzando picos de 105 prospectos calificados al mes.",
  },
  {
    valor: "+$366,000 MXN",
    titulo: "en Ventas Directas",
    desc: "Facturados para una tienda de refacciones de motocicletas únicamente en lo que va del año 2026 mediante la aceleración de su tienda en línea.",
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
  },
  {
    titulo: "Diseño de páginas web",
    desc: "Creamos sitios web y páginas de conversión enfocados en comunicar tu propuesta de valor y captar oportunidades comerciales. Diseños rápidos y optimizados.",
  },
  {
    titulo: "Ecommerce",
    desc: "Desarrollamos tiendas en línea y plataformas transaccionales robustas preparadas para vender de forma eficiente, rápida y optimizada para conversiones.",
  },
  {
    titulo: "Paid media",
    desc: "Gestionamos campañas de pauta digital en Google Ads y Meta Ads para capturar intención de compra y generar leads calificados de alto valor.",
  },
  {
    titulo: "Redes sociales",
    desc: "Gestionamos redes sociales para fortalecer tu presencia digital y atraer audiencia con contenido y anuncios pensados para aumentar la conversión.",
  },
  {
    titulo: "Email marketing",
    desc: "Diseñamos campañas y automatizaciones de email marketing para nutrir contactos, reactivar clientes e impulsar ventas continuas sin esfuerzo manual.",
  },
  {
    titulo: "Asistentes IA & Automatizaciones",
    desc: "Implementamos asistentes virtuales personalizados y flujos de trabajo inteligentes que califican y atienden prospectos 24/7 de forma autónoma con tecnología de IA.",
  },
  {
    titulo: "Identidad Gráfica & Branding",
    desc: "Construimos marcas memorables desde el logotipo, tono de voz y directrices visuales completas. Diseñamos marcas que destacan y transmiten confianza.",
  },
];

export const PILARES: Pilar[] = [
  {
    num: "UNO",
    titulo: "Impulsado por Inteligencia Artificial",
    desc: "La Inteligencia Artificial es nuestro motor central. No es solo una herramienta adicional; la Inteligencia Artificial es el motor subyacente de cada campaña, anuncio y estrategia que construimos en nuestra agencia digital potenciada por inteligencia artificial.",
  },
  {
    num: "DOS",
    titulo: "Operación 24 / 7",
    desc: "Agentes inteligentes que trabajan mientras duermes. Agentes autónomos de Inteligencia Artificial monitorean tus campañas, ajustan ofertas en tiempo real y generan reportes sin interrupciones ni tiempos muertos.",
  },
  {
    num: "TRES",
    titulo: "Hasta 5 Veces Más Rápidos",
    desc: "Entregas aceleradas sin perder calidad. La automatización inteligente reduce el tiempo de producción en un 80%. La misma calidad de nivel corporativo, lanzada al mercado antes de lo que esperas.",
  },
  {
    num: "CUATRO",
    titulo: "320% de Retorno Promedio",
    desc: "Rentabilidad medible en tu cuenta bancaria. Generamos ingresos reales en tu bolsillo, no métricas de vanidad. Resultados cuantitativos que transforman directamente tu estado de resultados.",
  },
];

/* Contraste para el toggle del Sector 7 (modelo tradicional vs. motor Alié) */
export const TRADICIONAL: Pilar[] = [
  {
    num: "UNO",
    titulo: "Dependencia de procesos manuales",
    desc: "Cada campaña depende del esfuerzo manual de un equipo limitado: lenta de escalar, propensa a errores y con resultados inconsistentes.",
  },
  {
    num: "DOS",
    titulo: "Horarios de oficina",
    desc: "Tu campaña duerme cuando el equipo descansa. Sin monitoreo fuera de horario ni ajustes en tiempo real.",
  },
  {
    num: "TRES",
    titulo: "Entregas lentas",
    desc: "Ciclos de producción largos que retrasan tu lanzamiento al mercado y dejan pasar oportunidades comerciales.",
  },
  {
    num: "CUATRO",
    titulo: "Métricas de vanidad",
    desc: "Reportes de impresiones y likes que no se reflejan en tu estado de resultados ni en ventas reales.",
  },
];

