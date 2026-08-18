"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost, BlogCategory } from "@/lib/wp";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogGrid({ initialPosts, categories }: BlogGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isPending, startTransition] = useTransition();

  // Filtrado de posts basado en la búsqueda y categoría
  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase() ||
      // Mapeo flexible para slugs de categorías
      (categories.find((c) => String(c.id) === selectedCategory)?.name || "")
        .toLowerCase() === post.category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;

  const handleCategoryChange = (catSlug: string) => {
    startTransition(() => {
      setSelectedCategory(catSlug);
      setVisibleCount(6); // reset pagination when category changes
    });
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="w-full">
      {/* ── CENTRAL DE COMUNICACIÓN Y BUSCADOR ── */}
      <div className="relative max-w-xl mx-auto mb-10 group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-orangeleader transition-colors duration-300">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar bitácoras stelares por palabra clave..."
          className="w-full pl-12 pr-6 py-4 bg-oled/50 border border-white/10 rounded-full font-mono text-sm text-starlight placeholder-white/30 focus:outline-none focus:border-orangeleader focus:ring-1 focus:ring-orangeleader/30 transition-all duration-300 backdrop-blur-md"
        />
        {/* Indicador de transmisión */}
        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[9px] text-white/30 tracking-widest uppercase">
          {searchQuery ? "TX_LIVE" : "STANDBY"}
        </span>
      </div>

      {/* ── SELECTORES DE SECTORES (CATEGORÍAS) ── */}
      <div className="w-full mb-12 flex flex-wrap gap-2.5 justify-start sm:justify-center pb-2">
        {categories
          .filter((cat) => cat.slug !== "uncategorized" && cat.slug !== "sin-categoria")
          .map((cat) => {
          const isSelected = selectedCategory === String(cat.id) || (cat.id === "all" && selectedCategory === "all");
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(String(cat.id))}
              className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest border transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-orangeleader border-orangeleader text-white shadow-[0_0_15px_rgba(235,63,27,0.4)]"
                  : "bg-oled/30 border-white/10 text-white/60 hover:text-white hover:border-white/30"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* ── CUADRÍCULA DE ARTÍCULOS ── */}
      <div className="relative">
        {displayedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {displayedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center glass-liquid rounded-2xl border border-white/10"
          >
            <svg
              className="w-12 h-12 text-orangeleader/60 mb-4 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h4 className="font-mono text-base text-starlight mb-1">CERO FRECUENCIAS DETECTADAS</h4>
            <p className="text-xs text-white/40 max-w-md px-6">
              No hemos encontrado bitácoras de vuelo que coincidan con los criterios de búsqueda estelar. Intente
              ajustar sus coordenadas.
            </p>
          </motion.div>
        )}
      </div>

      {/* ── PROPULSOR DE MÁS DATOS (PAGINACIÓN) ── */}
      {hasMore && (
        <div className="flex justify-center mt-16">
          <button
            onClick={handleLoadMore}
            disabled={isPending}
            className="relative px-8 py-4 bg-transparent border border-orangeleader/40 hover:border-orangeleader rounded-full text-starlight hover:text-white font-mono text-xs uppercase tracking-widest cursor-pointer transition-all duration-300 overflow-hidden group shadow-[0_0_15px_rgba(235,63,27,0.1)] hover:shadow-[0_0_25px_rgba(235,63,27,0.35)]"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orangeleader to-tangerine opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            ACTUALIZAR BITÁCORAS ESTELARES
          </button>
        </div>
      )}
    </div>
  );
}
