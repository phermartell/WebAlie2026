import type { MetadataRoute } from "next";
import { getWpPosts } from "@/lib/wp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aliedigital.com";

  // Rutas estáticas del sitio
  const staticRoutes = [
    "",
    "/agencia",
    "/aviso-de-privacidad",
    "/blog",
    "/casos-de-exito",
    "/contacto",
    "/diseno-de-paginas-web",
    "/diseno-paginas-web",
    "/ecommerce",
    "/email-marketing",
    "/growth-marketing-b2b",
    "/ia",
    "/identidad-grafica",
    "/monterrey",
    "/monterrey/diseno-de-paginas-web",
    "/monterrey/growth-marketing-b2b",
    "/nosotros",
    "/paid-media",
    "/puebla",
    "/puebla/diseno-de-paginas-web",
    "/puebla/diseno-paginas-web",
    "/puebla/growth-marketing-b2b",
    "/redes-sociales",
    "/seo",
    "/servicios",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    const posts = await getWpPosts();
    const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
    return [...sitemapEntries, ...blogEntries];
  } catch (error) {
    console.error("Error generating sitemap dynamic blog entries:", error);
    return sitemapEntries;
  }
}
