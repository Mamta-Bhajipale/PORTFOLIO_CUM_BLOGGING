"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Clock, Stethoscope, MapPin } from "lucide-react";
import { blogCategories, type BlogCategory } from "@/lib/blog-data";
import ParticleField from "./ParticleField";

const allPosts = blogCategories.flatMap((c) =>
  c.posts.map((p) => ({ ...p, category: c }))
);

export default function BlogLanding() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<BlogCategory | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const ITEM_HEIGHT = 110;

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const center = scrollTop + container.clientHeight / 2;
    let closest = 0;
    let minDist = Infinity;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const elCenter = el.offsetTop + el.offsetHeight / 2;
      const dist = Math.abs(elCenter - center);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToIndex = (i: number) => {
    const el = itemRefs.current[i];
    if (!el || !scrollRef.current) return;
    const container = scrollRef.current;
    const top = el.offsetTop - container.clientHeight / 2 + el.offsetHeight / 2;
    container.scrollTo({ top, behavior: "smooth" });
  };

  const activePost = allPosts[activeIndex];
  const activeCategory = activePost?.category;
  const isHealth = activeCategory?.slug === "health";
  const accentVar = isHealth ? "var(--color-blog-health)" : "var(--color-blog-travel)";
  const accentHex = isHealth ? "#1F3D2B" : "#1B2A4A";

  const handleExpand = (cat: BlogCategory) => {
    setExpandedCategory(cat);
    setExpanded(true);
  };

  const handleCollapse = () => {
    setExpanded(false);
    setTimeout(() => setExpandedCategory(null), 500);
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "100vh" }}>
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span
          className="font-heading text-[120px] sm:text-[180px] font-bold tracking-tighter"
          style={{ color: "var(--color-blog-espresso)", opacity: 0.025 }}
        >
          TOPICS
        </span>
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParticleField color={accentHex} count={25} />
      </div>

      {/* Main layout: left scroll + center card + right sidebar */}
      <div className="relative z-10 h-full flex">
        {/* Left: scrollable topic list */}
        <div className="hidden lg:flex flex-col items-end w-[30%] xl:w-[32%]">
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto scrollbar-hide"
            style={{ scrollSnapType: "y mandatory" }}
          >
            <div style={{ height: "40vh" }} />
            {allPosts.map((post, i) => {
              const dist = Math.abs(i - activeIndex);
              const opacity = dist === 0 ? 1 : dist === 1 ? 0.35 : dist === 2 ? 0.15 : 0.06;
              const blur = dist === 0 ? 0 : Math.min(dist * 1.5, 4);
              const isActive = i === activeIndex;
              const catColor =
                post.category.slug === "health"
                  ? "var(--color-blog-health)"
                  : "var(--color-blog-travel)";

              return (
                <div
                  key={`${post.category.slug}-${post.slug}`}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className="flex items-center justify-end px-6 sm:px-10 cursor-pointer"
                  style={{
                    height: `${ITEM_HEIGHT}px`,
                    scrollSnapAlign: "center",
                    opacity,
                    filter: `blur(${blur}px)`,
                    transition: "opacity 0.4s ease, filter 0.4s ease",
                  }}
                  onClick={() => scrollToIndex(i)}
                >
                  <span
                    className="font-heading text-base sm:text-lg font-semibold text-right leading-tight max-w-[200px] transition-colors duration-300"
                    style={{ color: isActive ? catColor : "var(--color-blog-espresso)" }}
                  >
                    {post.title}
                  </span>
                </div>
              );
            })}
            <div style={{ height: "40vh" }} />
          </div>
        </div>

        {/* Center: fixed active card */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-8">
          <AnimatePresence mode="wait">
            {activePost && (
              <motion.div
                key={`${activePost.category.slug}-${activePost.slug}`}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full max-w-md"
              >
                {/* 3D overlapping element */}
                <div
                  className="absolute -left-6 sm:-left-10 top-1/2 -translate-y-1/2 z-20"
                  style={{
                    filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))",
                  }}
                >
                  <motion.div
                    key={activePost.category.slug}
                    initial={{ rotate: -8, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, var(--color-blog-gold), #e0c060)`,
                      boxShadow: "0 8px 32px rgba(201,162,39,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
                    }}
                  >
                    {isHealth ? (
                      <Stethoscope size={28} className="text-white" />
                    ) : (
                      <MapPin size={28} className="text-white" />
                    )}
                  </motion.div>
                </div>

                {/* The main card */}
                <div
                  className="rounded-2xl p-6 sm:p-8 relative overflow-hidden cursor-pointer group"
                  style={{
                    backgroundColor: accentVar,
                    boxShadow: `0 20px 60px ${accentHex}30, 0 4px 16px rgba(0,0,0,0.08)`,
                  }}
                  onClick={() => handleExpand(activeCategory!)}
                >
                  {/* Subtle grid texture on card */}
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />

                  <div className="relative z-10">
                    <p
                      className="text-xs font-semibold tracking-widest uppercase mb-3"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {activeCategory?.title} &middot; {activePost.readTime}
                    </p>
                    <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white leading-snug mb-4">
                      {activePost.title}
                    </h2>
                    <p
                      className="font-serif text-sm leading-relaxed mb-5"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {activePost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-medium"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        {new Date(activePost.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                      >
                        <ArrowRight size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile: scrollable post list below card */}
                <div className="lg:hidden mt-8 space-y-3">
                  {allPosts
                    .filter((_, i) => i !== activeIndex)
                    .slice(0, 3)
                    .map((post) => {
                      const catColor =
                        post.category.slug === "health"
                          ? "var(--color-blog-health)"
                          : "var(--color-blog-travel)";
                      return (
                        <Link
                          key={`${post.category.slug}-${post.slug}`}
                          href={`/blog/${post.category.slug}/${post.slug}`}
                          className="block rounded-xl border p-4 transition-all hover:shadow-md"
                          style={{
                            borderColor: `${accentHex}15`,
                            backgroundColor: "rgba(253,252,249,0.6)",
                          }}
                        >
                          <p
                            className="text-[10px] font-semibold tracking-wider uppercase mb-1"
                            style={{ color: catColor, opacity: 0.6 }}
                          >
                            {post.category.title}
                          </p>
                          <p
                            className="font-heading text-sm font-semibold leading-snug"
                            style={{ color: "var(--color-blog-espresso)" }}
                          >
                            {post.title}
                          </p>
                        </Link>
                      );
                    })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: sidebar */}
        <div className="hidden lg:flex flex-col w-[22%] xl:w-[24%] border-l"
          style={{ borderColor: "rgba(43,27,20,0.06)" }}
        >
          <div className="flex-1 flex flex-col justify-center px-6 xl:px-8">
            <p
              className="text-[10px] font-bold tracking-[0.25em] uppercase mb-6"
              style={{ color: "var(--color-blog-gold)" }}
            >
              Popular
            </p>
            <div className="space-y-5">
              {allPosts.slice(0, 4).map((post) => {
                const catColor =
                  post.category.slug === "health"
                    ? "var(--color-blog-health)"
                    : "var(--color-blog-travel)";
                return (
                  <Link
                    key={`${post.category.slug}-${post.slug}`}
                    href={`/blog/${post.category.slug}/${post.slug}`}
                    className="block group"
                  >
                    <p
                      className="font-heading text-sm font-semibold leading-snug mb-1 transition-colors group-hover:opacity-100"
                      style={{
                        color: "var(--color-blog-espresso)",
                        opacity: 0.7,
                      }}
                    >
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-medium"
                        style={{ color: catColor, opacity: 0.5 }}
                      >
                        {post.category.title}
                      </span>
                      <span className="w-0.5 h-0.5 rounded-full" style={{ backgroundColor: "var(--color-blog-espresso)", opacity: 0.2 }} />
                      <span
                        className="text-[10px] flex items-center gap-1"
                        style={{ color: "var(--color-blog-espresso)", opacity: 0.35 }}
                      >
                        <Clock size={9} />
                        {post.readTime}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-10 pt-6 border-t" style={{ borderColor: "rgba(43,27,20,0.06)" }}>
              <Link
                href={`/blog/${activeCategory?.slug}`}
                className="inline-flex items-center gap-2 text-xs font-semibold transition-colors"
                style={{ color: accentVar }}
              >
                View all {activeCategory?.title} stories
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && expandedCategory && (
          <motion.div
            className="fixed inset-0 z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Red/maroon sidebar panel */}
            <motion.div
              className="h-full flex flex-col justify-end p-8 sm:p-10 relative overflow-hidden"
              style={{ backgroundColor: expandedCategory.slug === "health" ? "var(--color-blog-health)" : "var(--color-blog-travel)" }}
              initial={{ width: "100%", maxWidth: "400px" }}
              animate={{ width: "35%", minWidth: "280px" }}
              exit={{ width: "100%", maxWidth: "400px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* 3D element on sidebar */}
              <motion.div
                className="absolute top-1/4 -left-4"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, var(--color-blog-gold), #e0c060)",
                    boxShadow: "0 12px 40px rgba(201,162,39,0.4)",
                  }}
                >
                  {expandedCategory.slug === "health" ? (
                    <Stethoscope size={36} className="text-white" />
                  ) : (
                    <MapPin size={36} className="text-white" />
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {expandedCategory.title}
                </p>
                <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white mb-4 leading-tight">
                  {expandedCategory.title} Stories
                </h2>
                <p className="font-serif text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {expandedCategory.description}
                </p>

                <button
                  onClick={handleCollapse}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back to topics
                </button>
              </motion.div>
            </motion.div>

            {/* Article content area */}
            <motion.div
              className="flex-1 overflow-y-auto"
              style={{ backgroundColor: "var(--color-blog-beige)" }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="p-8 sm:p-12 max-w-2xl">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-8" style={{ color: "var(--color-blog-gold)" }}>
                  Latest Articles
                </p>
                <div className="space-y-6">
                  {expandedCategory.posts.map((post, i) => {
                    const catColor =
                      expandedCategory.slug === "health"
                        ? "var(--color-blog-health)"
                        : "var(--color-blog-travel)";
                    return (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                      >
                        <Link
                          href={`/blog/${expandedCategory.slug}/${post.slug}`}
                          className="block group rounded-xl border p-6 transition-all duration-300 hover:shadow-lg"
                          style={{
                            borderColor: `${catColor}15`,
                            backgroundColor: "rgba(253,252,249,0.7)",
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-medium" style={{ color: "var(--color-blog-espresso)", opacity: 0.4 }}>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-blog-gold)" }} />
                            <span className="text-[10px] flex items-center gap-1" style={{ color: "var(--color-blog-espresso)", opacity: 0.4 }}>
                              <Clock size={9} />
                              {post.readTime}
                            </span>
                          </div>
                          <h3
                            className="font-heading text-lg font-semibold mb-2 transition-colors group-hover:opacity-80"
                            style={{ color: catColor }}
                          >
                            {post.title}
                          </h3>
                          <p className="font-serif text-sm leading-relaxed" style={{ color: "var(--color-blog-espresso)", opacity: 0.6 }}>
                            {post.excerpt}
                          </p>
                          <span className="inline-block mt-3 text-xs font-semibold" style={{ color: catColor }}>
                            Read story &rarr;
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
