export interface BlogPost {
  id: number | string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: number;
  featuredImage?: string;
  authorName: string;
  authorAvatar?: string;
  aiSummary?: string;
  aiFaqs?: Array<{ question: string; answer: string }>;
  fuentes?: Array<{ name: string; url: string }>;
  herramientas?: Array<{ name: string; url: string }>;
}

export interface BlogCategory {
  id: number | string;
  name: string;
  slug: string;
}

// Artículos espaciales premium de fallback (en español para alinearse con Alié Digital)
const MOCK_POSTS: BlogPost[] = [
  {
    id: "mock-governance",
    slug: "agentic-ai-workflow-governance-operating-model",
    title: "Modelo Operativo de Gobernanza de Agentes de IA: Cómo Permitir Misiones Autónomas de Marketing",
    excerpt: "Un marco de gobernanza listo para producción en flujos de trabajo de IA: la matriz RACI de tripulación, niveles de autorización orbital, bitácoras de telemetría inmutables y políticas de escalación.",
    content: `
      <p>Todos los equipos de marketing digital que ejecutan pilotos con agentes de inteligencia artificial chocan contra el mismo asteroide, usualmente alrededor del cuarto mes. El agente redactor funciona. El agente de ajuste de pujas funciona. El agente de reportes funciona. Y, sin embargo, nada se lanza sin que un humano haga clic en aprobar, porque nadie ha definido por escrito quién tiene autorización para dejar que la máquina actúe sola, bajo qué límites y quién responde cuando el sistema se desvía de la órbita. El cuello de botella nunca fue el modelo de lenguaje; era el modelo operativo ausente.</p>
      
      <p>Esto importa más hoy que hace un año debido al avance de los proveedores de infraestructura. Palo Alto Networks define la gobernanza de IA agente como la gestión estructurada de la <em>autoridad delegada</em> en sistemas autónomos que ejecutan acciones para una organización. En términos de ingeniería espacial de software, la pregunta interesante ya no es qué pueden hacer tus agentes, sino qué les permites hacer. Compañías como Kyndryl anunciaron recientemente capas dedicadas de control de gobernanza que ejecutan, interactúan y operan de forma dinámica a través de sistemas en tiempo real. Cuando los proveedores de infraestructura comienzan a comercializar el plano de control y cumplimiento de políticas, el modelo operativo por encima de este se convierte en tu responsabilidad directa.</p>
      
      <p>A continuación se detalla ese modelo operativo de gobernanza adaptado para una tripulación de marketing y automatización: la matriz RACI, los rangos de autorización, el registro de telemetría y la política de escalación estelar.</p>

      <h2>1. ¿Por qué la gobernanza es el propulsor y no el freno?</h2>
      <p>El instinto natural de un equipo es tratar a la gobernanza como fricción o burocracia espacial creada por el departamento legal antes de la fase divertida del despegue. Esa perspectiva es incorrecta. La gobernanza de agentes de IA representa los procesos, estándares y escudos térmicos que hacen que las operaciones automatizadas sean seguras para el vuelo. La confianza es la restricción principal para escalar: un equipo que confía en sus agentes bajo reglas claras ejecuta cientos de acciones autónomas al día. Un equipo que no confía en ellos aprueba cada borrador a mano, operando esencialmente un motor de sugerencias muy costoso.</p>
      
      <p>La comunidad de ciberseguridad observa la misma dinámica desde el ángulo del riesgo: los agentes no fallan como el software tradicional. Fallan a través del <em>abuso de autoridad delegada</em>, credenciales con permisos demasiado amplios, instrucciones ambiguas o falta de registros. Todos estos modos de falla son brechas en el modelo operativo, no en las capacidades del modelo.</p>

      <blockquote>La gobernanza es lo que te permite dar luz verde al lanzamiento. Los equipos que documentan y siguen estas reglas llevan sus agentes de piloto a producción; los que las omiten permanecen orbitando indefinidamente.</blockquote>

      <h2>2. Matriz RACI para la tripulación autónoma</h2>
      <p>El error clásico es diseñar un RACI genérico para el programa de IA global. En su lugar, se debe trazar una matriz por flujo de misión. Un agente de ajuste de pauta publicitaria y uno de redacción de emails tienen riesgos muy diferentes y requieren responsables distintos. He aquí un mapa de navegación sugerido para los flujos de marketing digital B2B:</p>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Flujo de Misión</th>
              <th>Responsable (R)</th>
              <th>Responsable Final (A)</th>
              <th>Consultado (C)</th>
              <th>Informado (I)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ajustes de pujas y presupuesto (Paid Media)</td>
              <td>Agente de Pujas</td>
              <td>Líder de Paid Media (Humano)</td>
              <td>Finanzas (Límites de spend)</td>
              <td>CMO, Analistas</td>
            </tr>
            <tr>
              <td>Redacción y envíos de Email Marketing</td>
              <td>Agente de Ciclo de Vida</td>
              <td>Líder de CRM/Lifecycle (Humano)</td>
              <td>Legales (Cumplimiento), Marca</td>
              <td>Ventas, Soporte</td>
            </tr>
            <tr>
              <td>Variaciones de landing pages (CRO)</td>
              <td>Agente de Conversión</td>
              <td>Líder de Growth (Humano)</td>
              <td>Marca, Diseño de UI</td>
              <td>Líder de Paid Media</td>
            </tr>
            <tr>
              <td>Reportes semanales de rendimiento</td>
              <td>Agente Analítico</td>
              <td>Líder de Analytics (Humano)</td>
              <td>Ingeniería de Datos</td>
              <td>Tripulación General</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>Tres reglas espaciales hacen que esta matriz funcione: el agente va en la columna de <strong>Responsable (R)</strong> porque es quien ejecuta la tarea física; solo hay un humano en la columna de <strong>Responsable Final (A)</strong> por fila para evitar diluir la responsabilidad; y las partes consultadas tienen ventanas de revisión definidas para no colapsar la velocidad del flujo de trabajo en aprobaciones infinitas.</p>

      <h2>3. Niveles de autorización orbital</h2>
      <p>Estructuramos la autoridad en cuatro niveles específicos de órbita. Ningún agente empieza con acceso libre; los permisos se ganan con base en rendimiento y telemetría:</p>

      <ul>
        <li><strong>Nivel 0 · Observación (Solo Lectura):</strong> Acceso de lectura únicamente. Análisis, detección de anomalías y sugerencias de vuelo sin capacidad de modificar sistemas.</li>
        <li><strong>Nivel 1 · Redactor (Aprobación Requerida):</strong> Genera borradores, propuestas de audiencias o cambios tácticos que requieren la validación explícita del humano a cargo antes de publicarse.</li>
        <li><strong>Nivel 2 · Operación en Límites:</strong> Capacidad de ejecución autónoma dentro de parámetros estrictos (ej. cambios de puja menores al 15%, redistribución de presupuesto menor a $500 USD diarios).</li>
        <li><strong>Nivel 3 · Piloto Autónomo:</strong> Capacidad de orquestación multicanal y límites ampliados, reservada para agentes con más de 90 días en Nivel 2 sin alertas críticas detectadas.</li>
      </ul>

      <h2>4. Bitácora de telemetría de auditoría inmutable</h2>
      <p>Si ante la pregunta "¿por qué el agente tomó esta decisión?" se requiere un día entero de análisis técnico de logs por parte de un ingeniero, no tienes un registro de auditoría, tienes ruido. Un registro estelar debe capturar de forma inmutable cinco variables clave:</p>
      
      <ol>
        <li><strong>Identidad Estelar:</strong> Una credencial única del agente (evitando compartir tokens de humanos).</li>
        <li><strong>Gatillo/Trigger:</strong> El evento exacto o instrucción que dio inicio a la acción.</li>
        <li><strong>Accesos de Carga:</strong> Qué bases de datos, APIs y herramientas fueron consultadas.</li>
        <li><strong>Acción Registrada:</strong> El estado anterior y posterior del sistema afectado.</li>
        <li><strong>Razonamiento Interno:</strong> La justificación lógica generada por el agente al tomar la decisión.</li>
      </ol>

      <h2>5. Políticas de eyección y escalación a tierra</h2>
      <p>La escalación nunca debe dejarse al criterio subjetivo del agente. Deben programarse límites claros de seguridad (Kill Switches). El agente debe pausar la operation y enviar control a tierra (humano) si: el presupuesto excede los límites diarios, la confianza del modelo cae por debajo del 85%, se detectan instrucciones conflictivas de múltiples bases de mando, o bien si se solicita un cambio de permisos dentro de su propio sistema.</p>

      <p>Establece un SLA de respuesta humana (ej. 4 horas hábiles). Si la ventana expira sin interacción, el agente adopta la posición de seguridad por defecto: pausa la misión y mantiene los escudos activos sin ejecutar cambios adicionales.</p>
    `,
    date: "2026-08-10T12:00:00.000Z",
    category: "Asistentes IA & Automatizaciones",
    readingTime: 8,
    featuredImage: "/asteroide.webp",
    authorName: "Comandante Alie",
    authorAvatar: "/isotipo_GRADIENT.svg",
    aiSummary: "Este análisis detalla un modelo operativo de gobernanza diseñado para permitir el funcionamiento de tripulaciones de agentes autónomos de IA en marketing digital B2B. A través de una matriz RACI adaptada, se establecen los roles donde el agente es Responsable (R) de la ejecución y un humano es el Responsable Final (A). Se definen cuatro niveles de autorización orbital (desde solo lectura hasta piloto autónomo de 90 días), un sistema de telemetría estelar transparente e inmutable de 5 puntos clave para auditoría lógica, y políticas de eyección mediante interruptores de seguridad (Kill Switches) cuando se exceden los umbrales de presupuesto, confianza o permisos.",
    aiFaqs: [
      {
        question: "¿Por qué es crítica la gobernanza en los agentes autónomos de IA?",
        answer: "La gobernanza es el acelerador de la adopción porque establece confianza en la tripulación. Los agentes no fallan como el software tradicional, sino a través del abuso de su autoridad delegada. Definir límites precisos evita que los humanos deban aprobar manualmente cada borrador."
      },
      {
        question: "¿Quién es responsable cuando un agente de marketing digital toma una acción autónoma?",
        answer: "El agente es el Ejecutor de la Tarea (R - Responsable), pero de acuerdo a la matriz RACI propuesta, siempre debe haber un único humano nombrado como Responsable Final (A - Accountable) para evitar la dilución de responsabilidades cuando existan desviaciones orbitales."
      },
      {
        question: "¿Qué es el Nivel 3 de autorización orbital?",
        answer: "Es el nivel de Piloto Autónomo. Se le concede a un agente la orquestación multicanal y límites de gasto ampliados solo después de que ha completado un periodo de prueba de 90 días en el Nivel 2 sin alertas críticas en su registro de telemetría."
      }
    ],
    fuentes: [
      { name: "Palo Alto Networks - AI Governance Framework", url: "https://www.paloaltonetworks.com" },
      { name: "Kyndryl AI Infrastructure Controls Announcement", url: "https://www.kyndryl.com" },
      { name: "Gartner Research on AI Agentic Operations", url: "https://www.gartner.com" }
    ],
    herramientas: [
      { name: "Palo Alto Cortex AI", url: "https://www.paloaltonetworks.com/cortex" },
      { name: "Kyndryl Bridge Integration Platform", url: "https://www.kyndryl.com/us/en/services/bridge" },
      { name: "LangChain & LangGraph Agents Flow", url: "https://www.langchain.com" }
    ]
  },
  {
    id: "mock-1",
    slug: "seo-tecnico-hiperespacio-b2b",
    title: "SEO Técnico en el Hiperespacio: Cómo indexar tu Nave Nodriza en 2026",
    excerpt: "Optimiza la arquitectura web de tu plataforma B2B para que los rastreadores de Google encuentren tu contenido a la velocidad de la luz. Evita agujeros negros de indexación.",
    content: `
      <p>En el vasto universo digital, no basta con tener la mejor tecnología o el servicio de consultoría más avanzado; tu sitio web debe ser visible para los rastreadores que patrullan el cosmos. Para las empresas B2B, la indexación rápida y el SEO técnico son el equivalente a los motores hiperespaciales: te permiten cruzar galaxias de competidores y aparecer directamente en el radar de tus clientes ideales.</p>
      
      <h2>1. El mapa estelar de rastreo: XML Sitemaps y robots.txt</h2>
      <p>Tus sitemaps no son simples listas de enlaces; son el mapa de navegación oficial de tu nave. Asegúrate de incluir únicamente páginas canónicas con códigos de estado 200. Cualquier redirección 301 o error 404 en el sitemap es como un desvío no planificado que consume el combustible de rastreo (Crawl Budget) que los motores de búsqueda te asignan.</p>
      
      <h2>2. Reduciendo la fricción: El Core Web Vitals espacial</h2>
      <p>La latencia destruye conversiones. Un retraso en la carga (LCP) superior a 2.5 segundos ahuyenta a los comandantes de compras. Optimiza el orden de carga de tus scripts, prioriza el renderizado de la sección superior (Above the fold) y utiliza formatos de imagen de última generación como WebP y AVIF.</p>
      
      <blockquote>El Crawl Budget es limitado. No dejes que los bots de los motores de búsqueda pierdan tiempo en órbitas muertas o bucles infinitos de redirecciones.</blockquote>
      
      <h2>3. Estructuras de datos (Schema) para naves exploradoras</h2>
      <p>Utiliza marcado JSON-LD del tipo BlogPosting detallado para indicarle a Google exactamente qué tipo de nave (servicio) estás operando. El uso de schemas como <code>Service</code>, <code>Organization</code> y <code>BlogPosting</code> incrementa de forma notable la tasa de clics (CTR) en los resultados de búsqueda al generar fragmentos enriquecidos (rich snippets) estelares.</p>
    `,
    date: "2026-08-15T10:00:00.000Z",
    category: "SEO Técnico & AI",
    readingTime: 6,
    featuredImage: "/asteroide.webp",
    authorName: "Comandante Alie",
    authorAvatar: "/isotipo_GRADIENT.svg",
    aiSummary: "Este informe de SEO Técnico provee las directrices clave para indexar plataformas B2B a máxima velocidad en 2026. Se enfoca en estructurar sitemaps XML optimizados y canónicos, erradicar redirecciones 301 innecesarias para conservar el Crawl Budget, optimizar los Core Web Vitals (manteniendo el LCP bajo 2.5 segundos) e implementar el marcado de datos estructurados JSON-LD (Service, Organization, BlogPosting) para maximizar la tasa de clics (CTR) en los resultados de búsqueda mediante rich snippets.",
    aiFaqs: [
      {
        question: "¿Cómo afecta el Crawl Budget a las plataformas B2B grandes?",
        answer: "El presupuesto de rastreo (Crawl Budget) determina cuántas páginas de tu sitio visitarán los buscadores. Si tienes páginas con errores 404, redirecciones infinitas o baja velocidad de respuesta, desperdicias este presupuesto e impides que tus contenidos clave se indexen y aparezcan en los resultados de búsqueda."
      },
      {
        question: "¿Por qué el umbral de LCP (Largest Contentful Paint) debe ser menor a 2.5 segundos?",
        answer: "Porque a partir de los 2.5 segundos, la tasa de abandono de los usuarios B2B escala de forma exponencial. Un sitio rápido no solo agrada a los bots de Google, sino que mantiene a los tomadores de decisiones dentro de tu embudo de ventas."
      },
      {
        question: "¿Qué tipo de marcado Schema es el más recomendable para posts?",
        answer: "El schema de tipo BlogPosting usando formato JSON-LD. Debe incluir propiedades detalladas del artículo, la organización editora, el autor del post y las fechas de publicación/modificación para que Google pueda generar fragmentos enriquecidos estelares en el buscador."
      }
    ],
    fuentes: [
      { name: "Google Search Central Documentation", url: "https://developers.google.com/search" },
      { name: "web.dev Core Web Vitals Audit Guidelines", url: "https://web.dev/vitals" }
    ],
    herramientas: [
      { name: "Google Search Console", url: "https://search.google.com/search-console" },
      { name: "Lighthouse Performance Audit Tools", url: "https://pagespeed.web.dev" },
      { name: "Schema.org Markup Validator", url: "https://validator.schema.org" }
    ]
  },
  {
    id: "mock-2",
    slug: "paid-media-interestelar-roas",
    title: "Paid Media Interestelar: Maximizando el ROAS en Órbitas Altamente Competitivas",
    excerpt: "Cómo calibrar tus campañas de Google Ads y Meta Ads bajo presupuestos limitados sin caer en la atracción gravitatoria de la pérdida de presupuesto innecesario.",
    content: `
      <p>Lanzar presupuestos a ciegas en campañas de publicidad digital es como disparar ráfagas de plasma al vacío: espectacular de ver, pero ineficiente. En el ecosistema digital moderno, la telemetría y la calibración fina de tus públicos son las únicas formas de garantizar que tu presupuesto regrese transformado en Leads de alto valor B2B.</p>
      
      <h2>1. Segmentación por cuadrantes estelares</h2>
      <p>Deja de apuntar a toda la galaxia. En marketing B2B, tus clientes ideales son satélites muy específicos (CTOs, directores de finanzas, jefes de operaciones). Utiliza listas de exclusión de audiencias y bases de datos personalizadas para evitar gastar clics en perfiles que no tienen capacidad de decisión o que se encuentran fuera de tu radio de servicio.</p>
      
      <h2>2. Estructura de cuentas inteligente (Smart Bidding)</h2>
      <p>Confía en el piloto automático pero mantén el control. Los algoritmos de Smart Bidding de Google Ads funcionan mejor cuando se les da margen de maniobra, pero necesitan límites claros. Define límites de CPA (Costo por Adquisición) y objetivos de ROAS realistas basados en tu margen operativo para evitar que el algoritmo sobre-puje en subastas inútiles.</p>
    `,
    date: "2026-08-12T14:30:00.000Z",
    category: "Paid media",
    readingTime: 7,
    featuredImage: "/asteroide.webp",
    authorName: "Oficial de Vuelo",
    authorAvatar: "/isotipo_GRADIENT.svg",
    aiSummary: "Esta guía práctica detalla metodologías avanzadas de Paid Media para empresas B2B. Propone una estricta segmentación por cuadrantes (CTOs, CFOs, Directores) mediante exclusión de audiencias e integración de bases de datos de leads, combinada con el uso controlado de estrategias automáticas de Smart Bidding mediante límites máximos de CPA y metas de ROAS adaptadas a la viabilidad financiera de la empresa.",
    aiFaqs: [
      {
        question: "¿Cómo se define el público ideal para campañas de Paid Media B2B?",
        answer: "Se define limitando el alcance geográfico y profesional del target. En lugar de campañas masivas, se utilizan bases de datos personalizadas y filtros de puesto de cargo técnico para garantizar que cada clic provenga de una persona con capacidad de compra real."
      },
      {
        question: "¿Qué papel juega el Smart Bidding y cómo se controla?",
        answer: "El Smart Bidding aprovecha la inteligencia artificial para buscar la conversión ideal. Sin embargo, requiere control estricto: debes configurar topes de costo por conversión (CPA) y metas de retorno de inversión publicitaria (ROAS) coherentes para evitar pérdidas presupuestarias por sobre-pujas automáticas."
      }
    ],
    fuentes: [
      { name: "Google Ads Smart Bidding Best Practices", url: "https://support.google.com/google-ads" },
      { name: "Meta Business Suite Audience targeting Docs", url: "https://www.facebook.com/business" }
    ],
    herramientas: [
      { name: "Google Ads Editor", url: "https://ads.google.com" },
      { name: "Meta Ads Manager", url: "https://business.facebook.com" },
      { name: "Google Analytics 4 (GA4)", url: "https://analytics.google.com" }
    ]
  },
  {
    id: "mock-3",
    slug: "ecommerce-agujeros-negros-conversion",
    title: "Agujeros Negros de Conversión en Ecommerce y cómo Sellarlos",
    excerpt: "Detecta las fugas de energía en el túnel de pago de tu tienda online y eleva el ticket promedio de compra a través de micro-interacciones de pago ultra-rápidas.",
    content: `
      <p>Un carrito abandonado es un cargamento de suministros valiosos que se pierde en el horizonte de sucesos. Si tu tasa de conversión está por debajo del 2%, tu tienda en línea está sufriendo de fugas críticas de energía en su escudo de checkout.</p>
      
      <h2>1. Checkout en un solo salto (Single Click Checkout)</h2>
      <p>Cada campo adicional en tu formulario de pago es una micro-colisión de asteroides que ralentiza al usuario. Implementa pasarelas Express como Apple Pay, Google Pay y Link. Facilitar la transacción reduce la fricción cognitiva y eleva de manera inmediata la tasa de conversión.</p>
      
      <h2>2. Recuperación automatizada de cápsulas de compra</h2>
      <p>No dejes ir los carritos abandonados sin luchar. Configura una secuencia automatizada de correos electrónicos con incentivos dinámicos y telemetría de stock para recordar al comprador la urgencia de su orden antes de que la señal se pierda por completo.</p>
    `,
    date: "2026-08-08T09:15:00.000Z",
    category: "Ecommerce",
    readingTime: 5,
    featuredImage: "/asteroide.webp",
    authorName: "Ingeniero de Carga",
    authorAvatar: "/isotipo_GRADIENT.svg",
    aiSummary: "Un análisis detallado sobre cómo optimizar la tasa de conversión en ecommerce. Plantea tapar las fugas del checkout con Single Click Checkout (Apple Pay, Google Pay) para erradicar la fricción y configurar secuencias automatizadas e inteligentes de emails para la recuperación de carritos abandonados basadas en el stock restante.",
    aiFaqs: [
      {
        question: "¿Por qué ocurren los abandonos de carrito recurrentes?",
        answer: "Generalmente por el exceso de campos a llenar en formularios de pago y la falta de métodos rápidos. El usuario valora el tiempo; si el proceso requiere ingresar manualmente su tarjeta, la conversión cae."
      },
      {
        question: "¿Cuál es la efectividad de las pasarelas Express?",
        answer: "Las pasarelas Express como Apple Pay o Link reducen el tiempo promedio del checkout a menos de 10 segundos, lo que resulta en un incremento típico del 15% al 25% en la tasa de conversión móvil."
      }
    ],
    fuentes: [
      { name: "Stripe Ecommerce Conversion Study 2025", url: "https://stripe.com" },
      { name: "Baymard Institute Cart Abandonment Statistics", url: "https://baymard.com" }
    ],
    herramientas: [
      { name: "Stripe Checkout & Link", url: "https://stripe.com/payments/checkout" },
      { name: "Klaviyo Automated Flow Marketing", url: "https://www.klaviyo.com" }
    ]
  },
  {
    id: "mock-4",
    slug: "asistentes-ia-tripulacion-autonoma",
    title: "Tripulación Autónoma: Asistentes e Inteligencia Artificial en el Ecosistema B2B",
    excerpt: "Implementa agentes inteligentes que manejen la prospección, el filtrado de leads y la atención al cliente 24/7 mientras tu tripulación humana se enfoca en la estrategia.",
    content: `
      <p>El futuro del trabajo B2B no consiste en delegar tareas simples a macros obsoletas, sino en entrenar copilotos de inteligencia artificial capaces de tomar decisiones informadas dentro de tu embudo de ventas y operaciones.</p>
      
      <h2>1. Calificación de Leads autónoma en órbita</h2>
      <p>Mientras duermes, tu central de captación sigue activa. Un agente inteligente puede procesar y enriquecer la información de un lead en milisegundos utilizando bases de datos públicas, determinando su valor estratégico y asignándole una prioridad estelar antes del inicio del turno de operaciones.</p>
      
      <h2>2. Automatizaciones de flujos con lógica condicional avanzada</h2>
      <p>Conecta tus sistemas de mensajería, bases de datos y CRM para que la información fluya sin interrupciones. La sincronización en tiempo real elimina la latencia burocrática interna de las organizaciones.</p>
    `,
    date: "2026-08-05T11:00:00.000Z",
    category: "Asistentes IA & Automatizaciones",
    readingTime: 8,
    featuredImage: "/asteroide.webp",
    authorName: "Comandante Alie",
    authorAvatar: "/isotipo_GRADIENT.svg",
    aiSummary: "Este post aborda la implementación de agentes de IA para optimizar operaciones B2B. Abarca el uso de IA para la calificación automatizada de leads en tiempo real a través del enriquecimiento de datos y la estructuración de flujos integrados entre bases de datos y CRM para eliminar la latencia burocrática.",
    aiFaqs: [
      {
        question: "¿Cómo funciona la calificación autónoma de leads con IA?",
        answer: "El agente recibe la información básica de contacto, realiza búsquedas en bases de datos abiertas, extrae el sector de la empresa y tamaño, evalúa si cumple el perfil ideal y lo asigna de inmediato en el CRM con su puntaje de prioridad correspondiente."
      },
      {
        question: "¿Qué sistemas deben conectarse obligatoriamente?",
        answer: "Se recomienda conectar la landing de captura de leads, un validador de datos (como Clearbit o Lusha), tu CRM (HubSpot/Salesforce) y un canal de comunicación interna (como Slack o Teams) para notificaciones en tiempo real."
      }
    ],
    fuentes: [
      { name: "Salesforce State of Marketing AI Report", url: "https://www.salesforce.com" },
      { name: "Zapier Automation Trends B2B", url: "https://zapier.com" }
    ],
    herramientas: [
      { name: "Make.com Automation Workflow", url: "https://www.make.com" },
      { name: "HubSpot CRM", url: "https://www.hubspot.com" },
      { name: "OpenAI API & Assistant Models", url: "https://openai.com" }
    ]
  }
];

const MOCK_CATEGORIES: BlogCategory[] = [
  { id: "all", name: "Todos los Sectores", slug: "todos" },
  { id: 1, name: "SEO Técnico & AI", slug: "seo" },
  { id: 2, name: "Diseño de páginas web", slug: "diseno-paginas-web" },
  { id: 3, name: "Ecommerce", slug: "ecommerce" },
  { id: 4, name: "Paid media", slug: "paid-media" },
  { id: 5, name: "Redes sociales", slug: "redes-sociales" },
  { id: 6, name: "Email marketing", slug: "email-marketing" },
  { id: 7, name: "Asistentes IA & Automatizaciones", slug: "ia" },
  { id: 8, name: "Identidad Gráfica & Branding", slug: "identidad-grafica" }
];

// Helper para limpiar strings HTML de WordPress
function cleanHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}

// Estimar tiempo de lectura
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 220;
  const cleanText = cleanHtml(text);
  const words = cleanText.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function parseCustomField(field: any): Array<{ name: string; url: string }> | undefined {
  if (!field) return undefined;
  if (typeof field === "string") {
    try {
      const parsed = JSON.parse(field);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Intentar parsear formato alternativo "Nombre|URL, Nombre2|URL2"
      return field.split(",").map(item => {
        const [name, url] = item.split("|");
        return { name: name?.trim() || "", url: url?.trim() || "" };
      }).filter(item => item.name && item.url);
    }
  }
  if (Array.isArray(field)) return field;
  return undefined;
}

function generateDynamicSummary(title: string, content: string): string {
  const cleanText = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
  const sentences = cleanText.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 20);
  const summarySentences = sentences.slice(0, 3).join(". ") + ".";
  return `Los puntos clave de esta publicación giran en torno a: ${summarySentences}`;
}

function generateDynamicFaqs(title: string, content: string): Array<{ question: string; answer: string }> {
  const headingRegex = /<h2[^>]*>(.*?)<\/h2>/gi;
  const headings: string[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1].replace(/<\/?[^>]+(>|$)/g, "").trim());
  }

  if (headings.length >= 2) {
    return [
      {
        question: `¿Cuál es el núcleo central del debate sobre ${headings[0]}?`,
        answer: `El artículo expone de manera detallada las bases del concepto de ${headings[0]}, argumentando su importancia crítica en los flujos de optimización y automatización empresarial.`
      },
      {
        question: `¿Qué implicaciones tiene implementar ${headings[1]} según esta publicación?`,
        answer: `La implementación sistemática de ${headings[1]} disminuye drásticamente los cuellos de botella operativos, permitiendo a los equipos de marketing digital ejecutar procesos con mayor precisión y escalabilidad.`
      },
      {
        question: `¿Cómo beneficia este análisis a los líderes de operaciones?`,
        answer: `Ofrece un marco de referencia robusto para la toma de decisiones, estableciendo parámetros de gobernanza y control de calidad sobre sistemas inteligentes y herramientas autónomas.`
      }
    ];
  }

  return [
    {
      question: `¿Cuál es el tema principal tratado en "${title}"?`,
      answer: `El análisis aborda la intersección entre tecnología digital de vanguardia, optimización continua y cómo las organizaciones pueden escalar sus operaciones reduciendo la fricción.`
    },
    {
      question: `¿Qué pasos prácticos se recomiendan para empezar?`,
      answer: `Se sugiere auditar los procesos actuales, identificar cuellos de botella de latencia y configurar sistemas de telemetría inmutables para monitorear el desempeño.`
    },
    {
      question: `¿Quién se beneficia más de la lectura de esta bitácora?`,
      answer: `Directores de tecnología, líderes de Growth y equipos de automatización que buscan implementar flujos autónomos con supervisión humana estructurada.`
    }
  ];
}

export async function getWpPosts(): Promise<BlogPost[]> {
  const wpUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!wpUrl) {
    console.log("No WordPress URL defined. Loading mock data.");
    return MOCK_POSTS;
  }

  try {
    const res = await fetch(`${wpUrl.replace(/\/+$/, "")}/wp-json/wp/v2/posts?_embed&per_page=20`, {
      next: { revalidate: 60 }, // Revalidar cada minuto
    });

    if (!res.ok) {
      console.warn(`WordPress API returned status ${res.status}. Falling back to mock data.`);
      return MOCK_POSTS;
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return MOCK_POSTS;
    }

    return data.map((post: any) => {
      // Intentar extraer imagen destacada del objeto _embedded de WP
      let featuredImage = "/asteroide.webp"; // default fallback image
      if (post._embedded && post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"][0]) {
        featuredImage = post._embedded["wp:featuredmedia"][0].source_url || featuredImage;
      }

      // Intentar extraer nombre del autor
      let authorName = "Comandante Alie";
      let authorAvatar = "/isotipo_GRADIENT.svg";
      if (post._embedded && post._embedded["author"] && post._embedded["author"][0]) {
        authorName = post._embedded["author"][0].name || authorName;
        authorAvatar = post._embedded["author"][0].avatar_urls?.["96"] || authorAvatar;
      }

      // Intentar extraer categoría
      let category = "General";
      if (post._embedded && post._embedded["wp:term"] && post._embedded["wp:term"][0]) {
        const categories = post._embedded["wp:term"][0];
        if (categories.length > 0) {
          category = categories[0].name;
        }
      }

      const content = post.content?.rendered || "";
      const excerpt = cleanHtml(post.excerpt?.rendered || "").slice(0, 160) + "...";

      const fuentes = parseCustomField(post.meta?.fuentes || post.fuentes);
      const herramientas = parseCustomField(post.meta?.herramientas || post.herramientas);
      const aiSummary = generateDynamicSummary(post.title?.rendered || "", content);
      const aiFaqs = generateDynamicFaqs(post.title?.rendered || "", content);

      return {
        id: post.id,
        slug: post.slug,
        title: post.title?.rendered || "",
        content,
        excerpt,
        date: post.date,
        category,
        readingTime: calculateReadingTime(content),
        featuredImage,
        authorName,
        authorAvatar,
        fuentes,
        herramientas,
        aiSummary,
        aiFaqs
      };
    });
  } catch (error) {
    console.error("Failed to fetch from WordPress API, falling back to Mock posts:", error);
    return MOCK_POSTS;
  }
}

export async function getWpCategories(): Promise<BlogCategory[]> {
  const wpUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!wpUrl) {
    return MOCK_CATEGORIES;
  }

  try {
    const res = await fetch(`${wpUrl.replace(/\/+$/, "")}/wp-json/wp/v2/categories?per_page=50`, {
      next: { revalidate: 300 }, // Revalidar cada 5 minutos
    });

    if (!res.ok) {
      return MOCK_CATEGORIES;
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return MOCK_CATEGORIES;
    }

    const categoriesList = data
      .map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      }))
      .filter((cat) => cat.slug !== "uncategorized" && cat.slug !== "sin-categoria");

    // Insertar "Todos" al inicio
    return [{ id: "all", name: "Todos los Sectores", slug: "todos" }, ...categoriesList];
  } catch (error) {
    console.error("Failed to fetch categories, falling back to mock categories:", error);
    return MOCK_CATEGORIES;
  }
}

export async function getWpPostBySlug(slug: string): Promise<BlogPost | null> {
  const wpUrl = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!wpUrl) {
    return MOCK_POSTS.find((p) => p.slug === slug) || null;
  }

  try {
    const res = await fetch(`${wpUrl.replace(/\/+$/, "")}/wp-json/wp/v2/posts?_embed&slug=${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return MOCK_POSTS.find((p) => p.slug === slug) || null;
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return MOCK_POSTS.find((p) => p.slug === slug) || null;
    }

    const post = data[0];
    let featuredImage = "/asteroide.webp";
    if (post._embedded && post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"][0]) {
      featuredImage = post._embedded["wp:featuredmedia"][0].source_url || featuredImage;
    }

    let authorName = "Comandante Alie";
    let authorAvatar = "/isotipo_GRADIENT.svg";
    if (post._embedded && post._embedded["author"] && post._embedded["author"][0]) {
      authorName = post._embedded["author"][0].name || authorName;
      authorAvatar = post._embedded["author"][0].avatar_urls?.["96"] || authorAvatar;
    }

    let category = "General";
    if (post._embedded && post._embedded["wp:term"] && post._embedded["wp:term"][0]) {
      const categories = post._embedded["wp:term"][0];
      if (categories.length > 0) {
        category = categories[0].name;
      }
    }

    const content = post.content?.rendered || "";
    const excerpt = cleanHtml(post.excerpt?.rendered || "").slice(0, 160) + "...";

    const fuentes = parseCustomField(post.meta?.fuentes || post.fuentes);
    const herramientas = parseCustomField(post.meta?.herramientas || post.herramientas);
    const aiSummary = generateDynamicSummary(post.title?.rendered || "", content);
    const aiFaqs = generateDynamicFaqs(post.title?.rendered || "", content);

    return {
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered || "",
      content,
      excerpt,
      date: post.date,
      category,
      readingTime: calculateReadingTime(content),
      featuredImage,
      authorName,
      authorAvatar,
      fuentes,
      herramientas,
      aiSummary,
      aiFaqs
    };
  } catch (error) {
    console.error(`Failed to fetch post for slug ${slug}:`, error);
    return MOCK_POSTS.find((p) => p.slug === slug) || null;
  }
}
