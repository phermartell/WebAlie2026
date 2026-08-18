"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/lib/wp";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Formatear fecha estelar (e.g. "Día Estelar 15.08.2026")
  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `BITÁCORA ${day}.${month}.${year}`;
    } catch {
      return "BITÁCORA DESCONOCIDA";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative flex flex-col h-full glass-liquid rounded-2xl overflow-hidden border border-white/10"
    >
      {/* Imagen Destacada del Artículo / Contenedor Espacial */}
      <div className="relative aspect-video w-full overflow-hidden bg-oled/50 border-b border-white/5">
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-deepspace to-oled relative">
            <div className="starfield absolute inset-0 opacity-45" />
            <span className="font-mono text-xs text-white/20">SECTOR_{post.slug.substring(0, 5).toUpperCase()}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-oled via-transparent to-transparent opacity-60" />
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="flex-1 flex flex-col p-6">
        {/* Categoría / Sector */}
        <span className="font-mono text-xs text-tangerine uppercase tracking-[0.2em] mb-3">
          {post.category || "Órbita General"}
        </span>

        {/* Título */}
        <h3 className="font-sans text-xl font-semibold text-starlight mb-3 group-hover:text-white transition-colors duration-300 line-clamp-2 leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:underline focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Extracto */}
        <p className="text-starlight/70 text-xs leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer de Tarjeta con Tiempo de Lectura e Info Estelar */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40 tracking-wider">
          <div className="flex items-center gap-1.5 text-tangerine">
            <span className="w-1.5 h-1.5 rounded-full bg-tangerine animate-pulse" />
            <span>{post.readingTime} MIN DE ÓRBITA</span>
          </div>
          <span>{formatDate(post.date)}</span>
        </div>
      </div>

      {/* Líneas Decorativas Esquina Estilo HUD */}
      <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-orangeleader/30 group-hover:bg-orangeleader transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-orangeleader/30 group-hover:bg-orangeleader transition-colors duration-300" />
    </motion.div>
  );
}
