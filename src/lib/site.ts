export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const SERVICES: NavLink[] = [
  { label: "SEO Técnico & AI", href: "/seo" },
  { label: "Diseño de páginas web", href: "/diseno-paginas-web" },
  { label: "Ecommerce", href: "/ecommerce" },
  { label: "Paid media", href: "/paid-media" },
  { label: "Redes sociales", href: "/redes-sociales" },
  { label: "Email marketing", href: "/email-marketing" },
  { label: "Asistentes IA & Automatizaciones", href: "/ia" },
  { label: "Identidad Gráfica & Branding", href: "/identidad-grafica" },
];

export const CITIES: NavLink[] = [
  {
    label: "Monterrey",
    href: "/monterrey",
    children: [
      { label: "Diseño de páginas web", href: "/monterrey/diseno-de-paginas-web" },
      { label: "Growth marketing B2B", href: "/monterrey/growth-marketing-b2b" },
    ],
  },
  {
    label: "Puebla",
    href: "/puebla",
    children: [
      { label: "Diseño de páginas web", href: "/puebla/diseno-de-paginas-web" },
      { label: "Growth marketing B2B", href: "/puebla/growth-marketing-b2b" },
    ],
  },
];

export const MAIN_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Servicios", href: "/servicios", children: SERVICES },
  ...CITIES,
  { label: "Casos de éxito", href: "/casos-de-exito" },
  { label: "Nosotros", href: "/agencia" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];
