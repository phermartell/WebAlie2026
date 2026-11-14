export interface ResultadoVerificado {
  texto: string;
  fuente?: string;
  periodo?: string;
}

export interface Mision {
  id: string;
  tag: string;
  titulo: string;
  categoria: string;
  cliente: string;
  nombreIndice: string;
  necesidad: string;
  queHicimos: string;
  resultadosVerificados?: ResultadoVerificado[];
}

export const MISIONES: Mision[] = [
  {
    id: "mision-01-bombas-sumergibles",
    tag: "Misión 01",
    titulo: "Equipamiento Industrial B2B & Sector Hogar",
    categoria: "Sector: Comercialización e Industria",
    cliente: "MORECSA",
    nombreIndice: "MORECSA",
    necesidad:
      "Construir una presencia digital sólida para presentar su catálogo de equipos de bombeo industrial y refacciones, captar consultas comerciales en Puebla y la región central, y abrir mercado para productos del sector hogar.",
    queHicimos:
      "Estructuramos la identidad visual de la marca y desarrollamos una arquitectura web con catálogo de productos organizada para la consulta técnica. Implementamos optimización SEO local y contenidos para búsquedas de su oferta en buscadores, y gestionamos campañas en Google Ads y Meta Ads orientadas a personas y empresas interesadas en equipos de bombeo y jardinería. También apoyamos la creación y presencia digital de una marca hermana enfocada en el sector hogar.",
    resultadosVerificados: [
      {
        texto: "Más de 2,190 contactos B2B incorporados a su base de datos en 38 meses.",
        fuente: "Reportado en la ficha original",
        periodo: "38 meses",
      },
    ],
  },
  {
    id: "mision-02-vasos-desechables",
    tag: "Misión 02",
    titulo: "Insumos y Manufactura B2B",
    categoria: "Sector: Empaque y Distribución Mayorista",
    cliente: "Fabricante y Distribuidor de Vasos Desechables de Cartón",
    nombreIndice: "Vasos desechables de cartón",
    necesidad:
      "Dar a conocer su catálogo de vasos desechables de cartón e insumos térmicos ante compradores mayoristas, cafeterías y cadenas comerciales en un mercado dominado por marcas consolidadas.",
    queHicimos:
      "Rediseñamos la identidad gráfica corporativa para proyectar un estándar profesional de fabricante. Desarrollamos un sitio web de carga rápida con catálogo enfocado en solicitudes de cotización mayorista, y gestionamos campañas de búsqueda en Google Ads segmentadas para consultas comerciales de insumos y empaques de cartón.",
    resultadosVerificados: [
      {
        texto: "Más de 1,900 empresas acumuladas en la base de datos activa en 18 meses.",
        fuente: "Reportado en la ficha original",
        periodo: "18 meses",
      },
    ],
  },
  {
    id: "mision-03-cirujano-maxilofacial",
    tag: "Misión 03",
    titulo: "Sector Salud & Medicina de Alta Especialidad",
    categoria: "Sector: Healthcare / Cirugía Especializada",
    cliente: "Cirujano Maxilofacial",
    nombreIndice: "Cirujano maxilofacial",
    necesidad:
      "Proyectar autoridad clínica y experiencia médica en internet para orientar a pacientes que buscan información sobre procedimientos quirúrgicos maxilofaciales de alta especialidad y desean programar una consulta.",
    queHicimos:
      "Diseñamos y desarrollamos un sitio web profesional enfocado en la explicación detallada de los procedimientos quirúrgicos, con lineamientos de diseño UI/UX que transmiten rigor y confianza. Gestionamos campañas de búsqueda en Google Ads orientadas a consultas médicas específicas para facilitar el contacto directo y la solicitud de citas.",
    resultadosVerificados: [],
  },
  {
    id: "mision-04-postes-infraestructura",
    tag: "Misión 04",
    titulo: "Infraestructura y Alumbrado Público",
    categoria: "Sector: Construcción e Ingeniería Civil",
    cliente: "Postes Puebla",
    nombreIndice: "Postes Puebla",
    necesidad:
      "Digitalizar su catálogo técnico de postes metálicos y de concreto para que ingenieros, constructoras y contratistas de obra pública y privada pudieran consultar especificaciones técnicas y solicitar cotizaciones a gran escala.",
    queHicimos:
      "Desarrollamos una plataforma web optimizada con fichas técnicas descargables y catálogo de postes diseñado para la experiencia de compra de ingenieros y responsables de compras. Gestionamos campañas de búsqueda en Google Ads dirigidas a búsquedas técnicas y comerciales de materiales para electrificación y alumbrado.",
    resultadosVerificados: [
      {
        texto: "Más de 1,124 constructoras y contratistas registrados en la base de datos en 24 meses.",
        fuente: "Reportado en la ficha original",
        periodo: "24 meses",
      },
    ],
  },
  {
    id: "mision-05-seo-multisectorial",
    tag: "Misión 05",
    titulo: "Dominio Orgánico y SEO Técnico Multisectorial",
    categoria: "Sector: Multi-Industria (7 Marcas)",
    cliente: "Empresas en Maquinaria, Software, Contenedores y Salud",
    nombreIndice: "SEO multisectorial",
    necesidad:
      "Resolver errores graves de indexabilidad, velocidad y arquitectura web en sitios corporativos de diversos giros que perdían visibilidad ante competidores y requerían mejorar su presencia en Google.",
    queHicimos:
      "Ejecutamos auditorías técnicas on-page y off-page, corregimos errores en Core Web Vitals y datos estructurados, y reestructuramos contenidos técnicos y enlaces internos para optimizar la relevancia de cada sitio en búsquedas comerciales de sus sectores.",
    resultadosVerificados: [],
  },
  {
    id: "mision-06-motopartes-ecommerce",
    tag: "Misión 06",
    titulo: "Escalamiento E-commerce & Retail Motopartes",
    categoria: "Sector: Comercio Electrónico / Automotive",
    cliente: "Argüello Motopartes",
    nombreIndice: "Argüello Motopartes",
    necesidad:
      "Migrar y modernizar una tienda en línea con un catálogo masivo de refacciones para motocicletas, asegurando que los compradores encontraran piezas con rapidez y sin perder transacciones ni historial previo.",
    queHicimos:
      "Construimos una plataforma de comercio electrónico con un buscador interno optimizado para modelos y números de parte, integrando pasarelas de pago automatizadas. Ejecutamos la migración tecnológica sobre servidores de alta disponibilidad preservando el historial de cuentas y pedidos existentes.",
    resultadosVerificados: [],
  },
  {
    id: "mision-07-control-asistencias-saas",
    tag: "Misión 07",
    titulo: "B2B SaaS & Gestión Corporativa",
    categoria: "Sector: Software Corporativo / Recursos Humanos",
    cliente: "Empresa de Software de Control de Asistencias",
    nombreIndice: "Control de asistencias SaaS",
    necesidad:
      "Captar prospectos corporativos calificados (directores y gerentes de recursos humanos) para demostraciones de software de control de asistencia empresarial.",
    queHicimos:
      "Diseñamos landing pages orientadas a tomadores de decisiones corporativos con mensajes claros sobre funcionalidades y ahorro de tiempo. Gestionamos campañas en Google Ads y LinkedIn Ads dirigidas a perfiles de gestión humana, acompañadas de anuncios en redes sociales para reforzar la consideración de marca.",
    resultadosVerificados: [],
  },
];
