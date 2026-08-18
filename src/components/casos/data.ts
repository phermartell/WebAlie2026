export interface Resultado {
  /** Parte resaltada en negrita al inicio de la frase */
  destacado: string;
  /** Resto de la frase (sin negrita) */
  resto?: string;
}

export interface Metrica {
  count: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface Mision {
  id: string;
  tag: string;
  titulo: string;
  categoria: string;
  cliente: string;
  reto: string;
  resultados: Resultado[];
  despliegue: string;
  /** Métrica principal animada con contador */
  metrica: Metrica;
}

export const MISIONES: Mision[] = [
  {
    id: "mision-01-bombas-sumergibles",
    tag: "Misión 01",
    titulo: "Equipamiento Industrial B2B & Sector Hogar",
    categoria: "Sector: Comercialización e Industria",
    cliente: "Comercializadora de Bombas Sumergibles",
    reto:
      "Construir una infraestructura digital sólida desde cero para captar prospectos corporativos e ingresar al mercado de consumo masivo en Puebla y la región central.",
    resultados: [
      { destacado: "57 prospectos calificados", resto: " en promedio cada mes." },
      { destacado: "+2,190 contactos B2B", resto: " integrados a base de datos propia en 38 meses." },
      { destacado: "Posicionamiento SEO Top 1 en Google:", resto: " \"bomba sumergible en puebla\"." },
      { destacado: "Posicionamiento SEO Top 6 en Google:", resto: " \"podadora de pasto\"." },
      { destacado: "Creación y escalamiento de marca hermana", resto: " dedicada al sector Hogar." },
    ],
    despliegue:
      "Para este proyecto, no construimos solo una página web; desplegamos un ecosistema digital completo diseñado para la conversión. Comenzamos definiendo una Identidad Gráfica sólida que se integró en una arquitectura web (multipágina con catálogo de productos). Para asegurar la tracción inmediata y a largo plazo, blindamos su presencia orgánica con SEO Técnico Local y una estrategia de blogs de autoridad. Finalmente, abrimos las llaves del tráfico comercial activando nuestro ecosistema Conquista Social en Meta Ads, respaldado por campañas en Google Ads, capturando directamente las intenciones de búsqueda B2C de su mercado.",
    metrica: { count: 57, suffix: " prospectos/mes", label: "Prospectos calificados en promedio" },
  },
  {
    id: "mision-02-vasos-desechables",
    tag: "Misión 02",
    titulo: "Insumos y Manufactura B2B",
    categoria: "Sector: Empaque y Distribución Mayorista",
    cliente: "Fabricante y Distribuidor de Vasos Desechables de Cartón",
    reto:
      "Posicionar la marca ante compradores mayoristas y cadenas comerciales dentro de un mercado altamente monopolizado.",
    resultados: [
      { destacado: "105 prospectos mayoristas", resto: " en promedio cada mes." },
      { destacado: "+1,900 empresas en base de datos", resto: " activa acumuladas en 18 meses." },
      { destacado: "Posicionamiento SEO Top 20 en Google:", resto: " \"vasos para café personalizados\"." },
    ],
    despliegue:
      "Rediseñamos la Identidad Gráfica del cliente para alinear su imagen con un estándar corporativo de alto nivel. Sobre esta nueva base visual, construimos una plataforma web optimizada para velocidad extrema y conversión, convirtiendo el sitio en un embudo continuo de solicitudes de cotización. Para activar el flujo de clientes calificados de forma inmediata, integramos Google Ads, desplegando campañas de pauta hiper-segmentadas para dominar las búsquedas comerciales clave de su sector.",
    metrica: { count: 105, suffix: " prospectos/mes", label: "Prospectos mayoristas en promedio" },
  },
  {
    id: "mision-03-cirujano-maxilofacial",
    tag: "Misión 03",
    titulo: "Sector Salud & Medicina de Alta Especialidad",
    categoria: "Sector: Healthcare / Cirugía Especializada",
    cliente: "Cirujano Maxilofacial",
    reto:
      "Establecer autoridad médica digital y generar un flujo constante de pacientes para procedimientos quirúrgicos de alto valor.",
    resultados: [
      { destacado: "48 prospectos/pacientes calificados", resto: " en promedio cada mes." },
      { destacado: "+1,155 expedientes y contactos", resto: " generados en 24 meses." },
    ],
    despliegue:
      "Para este cliente médico, la confianza desde el primer clic era innegociable. Desplegamos una arquitectura web corporativa profesional orientada a los servicios que ofrece el doctor. Su interfaz fue diseñada bajo estrictos lineamientos de UI/UX para proyectar autoridad clínica, empatía y profesionalismo de forma inmediata. Una vez establecida esta base de conversión activamos campañas de búsqueda en Google Ads milimétricamente segmentadas para interceptar a usuarios con intenciones reales de agendar una consulta, transformando la plataforma web en una máquina predecible de adquisición de pacientes calificados.",
    metrica: { count: 48, suffix: " pacientes/mes", label: "Pacientes calificados en promedio" },
  },
  {
    id: "mision-04-postes-infraestructura",
    tag: "Misión 04",
    titulo: "Infraestructura y Alumbrado Público",
    categoria: "Sector: Construcción e Ingeniería Civil",
    cliente: "Venta de Postes Metálicos y de Concreto",
    reto:
      "Captar licitaciones, constructoras y proyectos de ingeniería civil a nivel regional y nacional.",
    resultados: [
      { destacado: "46 cotizaciones B2B de gran escala", resto: " en promedio cada mes." },
      { destacado: "+1,124 constructoras y contratistas", resto: " registrados en base de datos en 24 meses." },
    ],
    despliegue:
      "Para este líder del sector industrial, tener una página web básica no era suficiente; necesitaban digitalizar su proceso de venta técnico. Construimos una plataforma web robusta y ultra-rápida equipada con un catálogo de productos detallado, pensado en la experiencia de usuario (UI/UX) de compradores e ingenieros. Una vez cimentada la infraestructura, encendimos nuestro ecosistema en Google Ads. En lugar de generar tráfico genérico, calibramos campañas hiper-segmentadas para interceptar exclusivamente a tomadores de decisiones activos en obras de construcción, transformando la plataforma en un activo digital que genera un retorno de inversión (ROI) medible y constante.",
    metrica: { count: 46, suffix: " cotizaciones/mes", label: "Cotizaciones B2B en promedio" },
  },
  {
    id: "mision-05-seo-multisectorial",
    tag: "Misión 05",
    titulo: "Dominio Orgánico y SEO Técnico Multisectorial",
    categoria: "Sector: Multi-Industria (7 Marcas)",
    cliente:
      "Empresas en Maquinaria Pesada/Ligera, Suplementos, Software Contable, Cursos Clínicos, Contenedores Industriales y Dermocosmética.",
    reto:
      "Superar a competidores consolidados en motores de búsqueda, solucionar problemas graves de arquitectura web y restaurar la reputación digital.",
    resultados: [
      { destacado: "Top 5 en Google", resto: " en palabras clave comerciales clave para 7 industrias de alta rentabilidad." },
      { destacado: "+500 errores técnicos corregidos", resto: " en rendimiento, indexabilidad, Core Web Vitals y arquitectura de datos." },
      { destacado: "Reparación y blindaje de reputación digital", resto: " para marcas afectadas por contenido adverso o SEO negativo." },
    ],
    despliegue:
      "Auditoría On-Page y Off-Page profunda, optimización de código fuente, estrategia de Linkbuilding de alta autoridad e ingesta de contenido SEO estratégico.",
    metrica: { count: 500, prefix: "+", suffix: " errores", label: "Errores técnicos corregidos" },
  },
  {
    id: "mision-06-motopartes-ecommerce",
    tag: "Misión 06",
    titulo: "Escalamiento E-commerce & Retail Motopartes",
    categoria: "Sector: Comercio Electrónico / Automotive",
    cliente: "Tienda en Línea de Motopartes",
    reto:
      "Migrar, estabilizar técnicamente y escalar el volumen de ventas de un catálogo masivo de refacciones sin perder historial transaccional ni posicionamiento.",
    resultados: [
      { destacado: "+$366,000 MXN en ventas", resto: " generados únicamente en el periodo transcurrido de 2026." },
      { destacado: "+115% de crecimiento interanual acelerado", resto: " al comparar el periodo 2025 contra 2026." },
      { destacado: "100% de integridad de datos retenida", resto: ", sin pérdida de historial de clientes o transacciones durante la migración tecnológica." },
    ],
    despliegue:
      "Para este proyecto, un e-commerce tradicional no iba a soportar el volumen de transacciones del cliente. Construimos una infraestructura de comercio electrónico totalmente optimizada. Rediseñamos la experiencia de usuario (UX) enfocándonos en un buscador interno hiper-optimizado, permitiendo a los compradores encontrar y pagar productos en segundos mediante pasarelas de pago 100% automatizadas. Para blindar el negocio, alojamos todo el ecosistema web en una arquitectura de servidores de alta disponibilidad, diseñada expresamente para absorber picos masivos de tráfico sin caídas de rendimiento, garantizando que el motor de ventas nunca se detenga.",
    metrica: { count: 366000, prefix: "$", suffix: " MXN", label: "Ventas generadas en 2026" },
  },
  {
    id: "mision-07-control-asistencias-saas",
    tag: "Misión 07",
    titulo: "B2B SaaS & Gestión Corporativa",
    categoria: "Sector: Software Corporativo / Recursos Humanos",
    cliente: "Empresa de Control de Asistencias",
    reto:
      "Captar cuentas corporativas optimizando de manera agresiva el Costo por Adquisición (CPA).",
    resultados: [
      { destacado: "+450 prospectos B2B corporativos", resto: " calificados en menos de 12 meses." },
      { destacado: "Optimización continua del CPA", resto: " mediante la diversificación estratégica de canales de adquisición." },
    ],
    despliegue:
      "Para dominar el mercado en múltiples frentes, sabíamos que lanzar anuncios aislados no sería suficiente; necesitábamos un motor de adquisición de clientes blindado. Comenzamos construyendo la base de conversión: Landing pages de alta velocidad diseñadas bajo estrictos principios de persuasión B2B/B2C para exprimir cada clic. Para alimentar este motor con tráfico de ultra-alta calidad, activamos un ecosistema publicitario omnicanal. Desplegamos campañas en Google Ads y LinkedIn Ads para interceptar la demanda comercial e interactuar con perfiles directivos. En paralelo, encendimos nuestra maquinaria de Conquista Social, utilizando el poder visual de Meta y TikTok Ads para capturar la atención masiva. El resultado: un sistema de captación escalable, medible y enfocado 100% en la rentabilidad.",
    metrica: { count: 450, prefix: "+", suffix: " prospectos", label: "Prospectos B2B corporativos" },
  },
];
