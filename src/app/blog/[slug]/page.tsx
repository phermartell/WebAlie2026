import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getWpPostBySlug, getWpPosts } from "@/lib/wp";
import BlogPostInteractive from "@/components/BlogPostInteractive";
import PostPlayer from "@/components/PostPlayer";
import OnThisPage from "@/components/OnThisPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getWpPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado | Alié Digital",
      description: "La bitácora estelar solicitada no pudo ser localizada.",
    };
  }

  const url = `https://aliedigital.com/blog/${post.slug}/`;

  return {
    title: `${post.title} | Blog Alié Digital`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      siteName: "Alié Digital",
      title: `${post.title} | Blog Alié Digital`,
      description: post.excerpt,
      url: url,
      type: "article",
      publishedTime: post.date,
      authors: [post.authorName],
      images: [
        {
          url: post.featuredImage || "https://aliedigital.com/og-home.webp",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Blog Alié Digital`,
      description: post.excerpt,
      images: [post.featuredImage || "https://aliedigital.com/og-home.webp"],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getWpPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Cargar otros posts para la sección de "Siguientes Destinos"
  const allPosts = await getWpPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  // Formatear fecha estelar
  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Extraer puntos clave de forma ficticia pero coherente para el bloque de takeaways
  const getMockKeyTakeaways = (slug: string) => {
    if (slug === "agentic-ai-workflow-governance-operating-model") {
      return [
        "La autonomía del agente escala con la madurez de la gobernanza, no con la calidad del modelo; el modelo operativo es la clave de lanzamiento.",
        "Un RACI ejecutable coloca al agente en la columna de Responsable y a un único humano nombrado como Responsable Final por flujo de trabajo.",
        "Cuatro niveles de autorización orbital (observar, redactar, operar en límites, piloto autónomo) cubren casi todos los flujos de marketing.",
        "Las bitácoras de telemetría de auditoría deben capturar identidad, gatillo, datos consultados, acción realizada y justificación lógica de forma inmutable.",
        "Las políticas de escalación y límites de seguridad (Kill Switches) deben estar codificadas en el sistema en lugar de depender del juicio del agente."
      ];
    }
    // Fallbacks para otros posts
    return [
      "Optimización de recursos estelares reduciendo la fricción de respuesta y latencia técnica.",
      "Definición de telemetría de conversión clara para monitorear pérdidas de energía/presupuesto.",
      "Asignación de responsabilidades individuales y automatizaciones con piloto automático supervisado."
    ];
  };

  const keyTakeaways = getMockKeyTakeaways(post.slug);

  // Schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://aliedigital.com/blog/${post.slug}/#article`,
    "isPartOf": {
      "@type": "WebPage",
      "@id": `https://aliedigital.com/blog/${post.slug}/`,
      "url": `https://aliedigital.com/blog/${post.slug}/`,
      "name": post.title,
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage || "https://aliedigital.com/og-home.webp",
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.authorName,
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://aliedigital.com/#organization",
      "name": "Alié Digital",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aliedigital.com/logo.svg",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Base de Mando",
        "item": "https://aliedigital.com/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Bitácoras Estelares",
        "item": "https://aliedigital.com/blog/",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://aliedigital.com/blog/${post.slug}/`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <BlogPostInteractive />

      <main className="w-full relative z-10 pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb HUD y Regresar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-wider text-white/40">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-tangerine transition-colors">Base de Mando</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-tangerine transition-colors">Bitácoras</Link>
              <span>/</span>
              <span className="text-tangerine">{post.category}</span>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-orangeleader transition-colors duration-300 group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
                &larr;
              </span>
              RETORNAR A PANEL DE BITÁCORAS
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Columna Principal del Contenido */}
            <article className="lg:col-span-3 space-y-8">
              {/* Cabecera del Artículo */}
              <header className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deepspace/40 border border-white/10 font-mono text-[10px] uppercase tracking-widest text-tangerine">
                  <span className="w-1.5 h-1.5 rounded-full bg-tangerine animate-pulse" />
                  Transmisión de Bitácora Estelar
                </div>

                <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  {post.title}
                </h1>

                <p className="text-starlight/70 text-base sm:text-lg leading-relaxed font-sans border-l-2 border-orangeleader pl-4 py-1">
                  {post.excerpt}
                </p>

                {/* Meta de Cabecera HUD */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  {/* Autor */}
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar || "/isotipo_GRADIENT.svg"}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full border border-white/20"
                    />
                    <div>
                      <p className="font-mono text-xs text-white font-medium tracking-wide">{post.authorName}</p>
                      <p className="font-mono text-[9px] text-white/40 uppercase">Tripulación Alié</p>
                    </div>
                  </div>

                  {/* Detalles estelares */}
                  <div className="flex items-center gap-6 font-mono text-[10px] text-white/50">
                    <div>
                      <span className="block text-white/30 text-[8px] uppercase">Órbita de lectura</span>
                      <span className="text-white font-medium">{post.readingTime} Minutos</span>
                    </div>
                    <div className="h-6 w-[1px] bg-white/10" />
                    <div>
                      <span className="block text-white/30 text-[8px] uppercase">Fecha Estelar</span>
                      <span className="text-white font-medium">{formatDate(post.date)}</span>
                    </div>
                  </div>
                </div>
              </header>

              {/* Resumen IA */}
              {post.aiSummary && (
                <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-deepspace/20 p-6 glass-liquid">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-tangerine/5 blur-3xl rounded-full pointer-events-none" />
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tangerine opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-tangerine"></span>
                    </span>
                    <h4 className="font-mono text-[10px] tracking-widest text-tangerine uppercase font-bold">
                      Resumen Analítico Inteligencia Artificial (IA)
                    </h4>
                  </div>
                  <p className="text-starlight/90 text-[11px] sm:text-xs leading-relaxed font-sans italic">
                    "{post.aiSummary}"
                  </p>
                </section>
              )}

              {/* Reproductor de Audio del Post */}
              <PostPlayer postTitle={post.title} postContent={post.content} />

              {/* Imagen Destacada Enmarcada */}
              {post.featuredImage && (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-oled/50">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-oled via-transparent to-transparent opacity-40" />
                </div>
              )}

              {/* Puntos clave (Key Takeaways) */}
              <section className="glass-liquid rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orangeleader/5 blur-3xl rounded-full" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-tangerine mb-4 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-orangeleader transform rotate-45" />
                  Puntos Clave de la Misión
                </h3>
                <ul className="space-y-3 font-sans text-xs sm:text-sm text-starlight/90">
                  {keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="font-mono text-orangeleader text-xs font-semibold">[{idx + 1}]</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Contenido del Artículo */}
              <div className="prose prose-invert max-w-none text-starlight/85 text-xs sm:text-sm leading-relaxed space-y-6 blog-content-wrapper">
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="blog-content"
                />
              </div>

              {/* Bloque de Herramientas Mencionadas */}
              {post.herramientas && post.herramientas.length > 0 && (
                <section className="pt-8 border-t border-white/10">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-tangerine mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tangerine animate-pulse" />
                    Herramientas en esta publicación
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {post.herramientas.map((tool, idx) => (
                      <a
                        key={idx}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-tangerine/30 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                      >
                        <span className="font-sans text-xs text-white font-medium group-hover:text-tangerine transition-colors">
                          {tool.name}
                        </span>
                        <span className="font-mono text-[10px] text-white/40 group-hover:text-white transition-colors">
                          EXPLORAR &rarr;
                        </span>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Bloque de Preguntas Frecuentes (FAQ IA) */}
              {post.aiFaqs && post.aiFaqs.length > 0 && (
                <section className="pt-8 border-t border-white/10 space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-tangerine mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tangerine animate-pulse" />
                    Preguntas Frecuentes (Generadas por IA)
                  </h3>
                  <div className="space-y-3">
                    {post.aiFaqs.map((faq, idx) => (
                      <details
                        key={idx}
                        className="group border border-white/10 rounded-xl bg-deepspace/10 overflow-hidden transition-all duration-300 [&_summary::-webkit-details-marker]:hidden"
                      >
                        <summary className="flex items-center justify-between p-4 font-sans text-xs sm:text-sm font-semibold text-white cursor-pointer hover:bg-white/5 transition-colors select-none">
                          <span>{faq.question}</span>
                          <span className="transition-transform duration-300 group-open:rotate-180 text-tangerine shrink-0 ml-4">
                            ▼
                          </span>
                        </summary>
                        <div className="p-4 border-t border-white/5 text-starlight/80 text-xs sm:text-sm leading-relaxed bg-black/20 font-sans">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Bloque de Fuentes de Referencia */}
              {post.fuentes && post.fuentes.length > 0 && (
                <section className="pt-8 border-t border-white/10">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-tangerine mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tangerine animate-pulse" />
                    Fuentes y Referencias
                  </h3>
                  <ul className="space-y-2">
                    {post.fuentes.map((source, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-sans text-starlight/70">
                        <span className="text-white/30 font-mono">[{idx + 1}]</span>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orangeleader hover:text-tangerine underline transition-colors cursor-pointer"
                        >
                          {source.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>

            {/* Barra Lateral (TOC + Contacto) */}
            <aside className="space-y-8 lg:col-span-1">
              {/* Contenedor interactivo para TOC */}
              <div className="sticky top-28 space-y-8">
                <OnThisPage />

                {/* Herramienta rápida de contacto / CTA */}
                <div className="glass-liquid rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-orangeleader/10 rounded-full blur-2xl" />
                  <h4 className="font-mono text-[10px] tracking-widest text-white/40 uppercase mb-2">Comandos de Misión</h4>
                  <h3 className="font-sans text-base font-bold text-white mb-2 leading-tight">¿Listo para despegar tu automatización?</h3>
                  <p className="text-starlight/75 text-[11px] leading-relaxed mb-4">
                    Diseñamos sistemas autónomos de IA alineados a modelos de gobernanza estables y seguros desde el día uno.
                  </p>
                  <Link
                    href="/contacto"
                    className="block w-full py-2.5 px-4 rounded-xl bg-orangeleader hover:bg-tangerine text-white text-center font-mono text-[10px] tracking-wider uppercase font-semibold transition-all duration-300 shadow-[0_4px_12px_rgba(235,63,27,0.3)] hover:shadow-[0_4px_20px_rgba(255,134,67,0.5)] active:scale-95"
                  >
                    Agendar Llamada Estelar &rarr;
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Siguientes Destinos / Post Relacionados */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 pt-12 border-t border-white/10">
              <h2 className="font-mono text-xs uppercase tracking-widest text-tangerine mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tangerine animate-pulse" />
                Siguientes Destinos en la Bitácora
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.id}
                    href={`/blog/${rPost.slug}`}
                    className="glass-l1 rounded-2xl p-5 border border-white/10 flex flex-col justify-between group h-full hover:border-white/20 transition-all duration-300"
                  >
                    <div>
                      <div className="font-mono text-[9px] text-tangerine uppercase tracking-wider mb-3">
                        {rPost.category}
                      </div>
                      <h3 className="font-sans text-base font-bold text-white group-hover:text-tangerine transition-colors line-clamp-2 leading-snug">
                        {rPost.title}
                      </h3>
                      <p className="text-starlight/60 text-xs mt-2 line-clamp-3 leading-relaxed">
                        {rPost.excerpt}
                      </p>
                    </div>
                    <div className="font-mono text-[10px] text-white/40 group-hover:text-white transition-colors mt-6 flex items-center justify-between">
                      <span>{rPost.readingTime} Min de Órbita</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Estilos adicionales locales para formatear el contenido de WP */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content {
          font-family: var(--font-sans);
          letter-spacing: -0.01em;
        }
        .blog-content h2 {
          font-family: var(--font-sans);
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 0.5rem;
        }
        .blog-content h3 {
          font-family: var(--font-sans);
          font-size: 1.15rem;
          font-weight: 600;
          color: #ffffff;
          margin-top: 2.25rem;
          margin-bottom: 1rem;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
          color: rgba(224, 224, 224, 0.85);
          line-height: 1.7;
        }
        .blog-content blockquote {
          background: rgba(22, 38, 79, 0.25);
          border-left: 3px solid #eb3f1b;
          border-radius: 0 12px 12px 0;
          padding: 1.25rem 1.5rem;
          font-style: italic;
          color: #ff8643;
          margin: 2rem 0;
          font-size: 0.95rem;
          border-right: 1px solid rgba(255,255,255,0.05);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .blog-content ul {
          list-style: none;
          margin-bottom: 1.5rem;
          padding-left: 0.5rem;
          space-y: 0.5rem;
        }
        .blog-content ul li {
          position: relative;
          padding-left: 1.25rem;
          margin-bottom: 0.5rem;
          color: rgba(224, 224, 224, 0.85);
        }
        .blog-content ul li::before {
          content: "▲";
          position: absolute;
          left: 0;
          top: 0.25rem;
          font-size: 8px;
          color: #ff8643;
        }
        .blog-content ol {
          list-style: decimal;
          margin-bottom: 1.5rem;
          padding-left: 1.25rem;
        }
        .blog-content ol li {
          margin-bottom: 0.5rem;
          padding-left: 0.25rem;
          color: rgba(224, 224, 224, 0.85);
        }
        .blog-content code {
          background-color: rgba(22, 38, 79, 0.6);
          color: #ff8643;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.85em;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .blog-content .table-container {
          overflow-x: auto;
          margin: 2rem 0;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          background: rgba(10, 15, 30, 0.4);
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.85rem;
        }
        .blog-content th {
          background: rgba(22, 38, 79, 0.5);
          color: #ffffff;
          padding: 0.75rem 1rem;
          font-weight: 600;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          font-family: var(--font-sans);
        }
        .blog-content td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: rgba(224, 224, 224, 0.8);
        }
        .blog-content tr:last-child td {
          border-bottom: none;
        }
        .blog-content tr:hover td {
          background: rgba(255, 255, 255, 0.02);
          color: #ffffff;
        }
      `}} />
    </>
  );
}

