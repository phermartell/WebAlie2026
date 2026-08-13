export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const SERVICES: NavLink[] = [
  { label: "Diseño de páginas web", href: "/diseno-de-paginas-web" },
  { label: "Desarrollo web", href: "/desarrollo-web" },
  { label: "Ecommerce", href: "/ecommerce" },
  { label: "Growth marketing B2B", href: "/growth-marketing-b2b" },
  { label: "Paid media", href: "/paid-media" },
  { label: "Redes sociales", href: "/redes-sociales" },
  { label: "Email marketing", href: "/email-marketing" },
  { label: "Analytics", href: "/analytics" },
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
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];
