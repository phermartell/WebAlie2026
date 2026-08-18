"use client";

import React, { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function OnThisPage() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const contentEl = document.querySelector(".blog-content");
    if (!contentEl) return;

    const headings = contentEl.querySelectorAll("h2, h3");
    const items: TocItem[] = [];

    headings.forEach((heading, index) => {
      let id = heading.id;
      if (!id) {
        id = heading.textContent
          ? heading.textContent
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
          : `heading-${index}`;
        heading.id = id;
      }

      items.push({
        id,
        text: heading.textContent || "",
        level: heading.tagName.toLowerCase() === "h3" ? 3 : 2,
      });
    });

    setToc(items);

    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    headings.forEach((heading) => observer.observe(heading));

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (toc.length === 0) return null;

  return (
    <div className="glass-liquid rounded-2xl p-6 border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-tangerine/5 blur-3xl rounded-full" />
      <h3 className="font-mono text-[10px] tracking-widest text-white/40 uppercase mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-tangerine animate-pulse" />
        En esta página
      </h3>
      <ul className="space-y-3 font-sans text-xs">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? "12px" : "0px" }}
            className="relative"
          >
            {item.level === 3 && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20">•</span>
            )}
            <button
              onClick={() => scrollToHeading(item.id)}
              className={
                "text-left transition-all duration-300 hover:text-tangerine focus:outline-none cursor-pointer leading-snug " +
                (activeId === item.id ? "text-orangeleader font-medium translate-x-1" : "text-starlight/60")
              }
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
