"use client";

import React, { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogPostInteractive() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);

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
      rootMargin: "-100px 0px -60% 0px",
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

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
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

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-50">
      <div
        className="h-full bg-gradient-to-r from-orangeleader via-tangerine to-orangeleader shadow-[0_0_8px_#eb3f1b]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
