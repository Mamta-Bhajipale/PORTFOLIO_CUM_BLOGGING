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
    setTimeout(() => setExpandedCategory(null), 600);
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <motion.span
          key={activeCategory?.slug}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.025, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-[100px] sm:text-[160px] md:text-[200px] font-bold tracking-tighter"
          style={{ color: "var(--color-blog-espresso)" }}
        >
          {isHealth ? "HEALTH" : "TRAVEL"}
        </motion.span>
      </div>

      {/* Particles — always present, color shifts */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParticleField color={accentHex} count={30} />
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="relative z-10 h-full hidden md:flex">
        {/* LEFT: scrollable topic list — scrolls BEHIND the card */}
        <div className="w-[28%] lg:w-[30%] flex flex-col relative">
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Spacer so first item can reach center */}
            <div style={{ height: "45vh" }} />
            {allPosts.map((post, i) => {
              const dist = Math.abs(i - activeIndex);
              const opacity = dist === 0 ? 0.08 : dist <= 1 ? 0.3 : dist <= 2 ? 0.15 : 0.05;
              const blur = dist === 0 ? 3 : dist <= 1 ? 0 : Math.min(dist * 1.2, 3);
              const isActive = i === activeIndex;
              const catColor =
                post.category.slug === "health"
                  ? "var(--color-blog-health)"
                  : "var(--color-blog-travel)";

              return (
                <div
                  key={`${post.category.slug}-${post.slug}`}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className="flex items-center justify-end px-6 lg:px-10 cursor-pointer select-none"
                  style={{
                    height: "120px",
                    opacity,
                    filter: `blur(${blur}px)`,
                    transition: "opacity 0.5s cubic-bezier(0.25,0.1,0.25,1), filter 0.5s cubic-bezier(0.25,0.1,0.25,1)",
                  }}
                  onClick={() => scrollToIndex(i)}
                >
                  <span
                    className="font-heading text-sm lg:text-base font-semibold text-right leading-snug max-w-[180px] transition-colors duration-500"
                    style={{ color: isActive ? catColor : "var(--color-blog-espresso)" }}
                  >
                    {post.title}
                  </span>
                </div>
              );
            })}
            <div style={{ height: "45vh" }} />
          </div>
        </div>

        {/* CENTER: the FIXED card + 3D overlap — sits ON TOP of the scroll */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* 3D overlapping element — positioned relative to center, sticks out left into the scroll area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`icon-${activePost?.category.slug}`}
              initial={{ opacity: 0, x: -20, rotate: -12, scale: 0.7 }}
              animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, rotate: 12, scale: 0.7 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute z-30 pointer-events-none"
              style={{
                left: "max(-40px, calc(50% - 280px))",
                top: "50%",
                transform: "translateY(-50%)",
                filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.2))",
              }}
            >
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #C9A227 0%, #e8d48b 50%, #C9A227 100%)",
                  boxShadow: "0 12px 40px rgba(201,162,39,0.35), inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.1)",
                }}
              >
                {isHealth ? (
                  <Stethoscope size={32} className="text-white drop-shadow-sm" />
                ) : (
                  <MapPin size={32} className="text-white drop-shadow-sm" />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* The fixed card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${activePost?.category.slug}-${activePost?.slug}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-[420px] mx-4 lg:mx-0 lg:ml-8 xl:ml-12"
            >
              <div
                className="rounded-2xl p-7 sm:p-8 relative overflow-hidden cursor-pointer group"
                style={{
                  backgroundColor: accentVar,
                  boxShadow: `0 24px 80px ${accentHex}25, 0 4px 20px rgba(0,0,0,0.06)`,
                }}
                onClick={() => activeCategory && handleExpand(activeCategory)}
              >
                {/* Grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.035] pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
                    />
                    <p
                      className="text-[11px] font-bold tracking-[0.2em] uppercase"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {activeCategory?.title}
                    </p>
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>&middot;</span>
                    <p
                      className="text-[11px] font-medium flex items-center gap-1"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      <Clock size={10} />
                      {activePost?.readTime}
                    </p>
                  </div>

                  <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white leading-snug mb-3">
                    {activePost?.title}
                  </h2>

                  <p
                    className="font-serif text-[13px] sm:text-sm leading-relaxed mb-6"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {activePost?.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-[11px] font-medium"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {activePost && new Date(activePost.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/25"
                      style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                    >
                      <ArrowRight size={16} className="text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT: sidebar — "POPULAR" list */}
        <div
          className="w-[22%] lg:w-[24%] flex flex-col border-l"
          style={{ borderColor: "rgba(43,27,20,0.06)" }}
        >
          <div className="flex-1 flex flex-col justify-center px-5 xl:px-7">
            <p
              className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6"
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
                      className="font-heading text-[13px] font-semibold leading-snug mb-1 transition-colors group-hover:opacity-100"
                      style={{ color: "var(--color-blog-espresso)", opacity: 0.65 }}
                    >
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium" style={{ color: catColor, opacity: 0.5 }}>
                        {post.category.title}
                      </span>
                      <span className="w-0.5 h-0.5 rounded-full" style={{ backgroundColor: "var(--color-blog-espresso)", opacity: 0.2 }} />
                      <span className="text-[10px] flex items-center gap-1" style={{ color: "var(--color-blog-espresso)", opacity: 0.3 }}>
                        <Clock size={8} />
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
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase transition-colors"
                style={{ color: accentVar }}
              >
                View all {activeCategory?.title}
                <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="relative z-10 h-full flex flex-col md:hidden pt-8 px-5">
        {/* Mobile: scroll list */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="space-y-3">
            {allPosts.map((post, i) => {
              const isActive = i === activeIndex;
              const catColor =
                post.category.slug === "health"
                  ? "var(--color-blog-health)"
                  : "var(--color-blog-travel)";
              return (
                <div
                  key={`${post.category.slug}-${post.slug}`}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className="rounded-xl p-4 transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: isActive ? accentVar : "rgba(253,252,249,0.5)",
                    border: `1px solid ${isActive ? "transparent" : "rgba(43,27,20,0.06)"}`,
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  }}
                  onClick={() => {
                    if (isActive) {
                      if (activeCategory) handleExpand(activeCategory);
                    } else {
                      const container = scrollRef.current;
                      if (container) {
                        const el = itemRefs.current[i];
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }
                  }}
                >
                  <p
                    className="text-[10px] font-bold tracking-widest uppercase mb-1"
                    style={{ color: isActive ? "rgba(255,255,255,0.5)" : catColor }}
                  >
                    {post.category.title}
                  </p>
                  <p
                    className="font-heading text-sm font-semibold leading-snug"
                    style={{ color: isActive ? "white" : "var(--color-blog-espresso)" }}
                  >
                    {post.title}
                  </p>
                  {isActive && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {post.readTime}
                      </span>
                      <ArrowRight size={12} className="text-white/60" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== EXPANDED OVERLAY ===== */}
      <AnimatePresence>
        {expanded && expandedCategory && (
          <motion.div
            className="fixed inset-0 z-[70] flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Colored sidebar — morphs from the card */}
            <motion.div
              className="h-full flex flex-col justify-end p-8 sm:p-10 relative overflow-hidden"
              style={{
                backgroundColor: expandedCategory.slug === "health"
                  ? "var(--color-blog-health)"
                  : "var(--color-blog-travel)",
              }}
              initial={{ width: "420px", maxWidth: "90vw" }}
              animate={{ width: "38%", minWidth: "300px", maxWidth: "480px" }}
              exit={{ width: "420px", maxWidth: "90vw" }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* 3D element */}
              <motion.div
                className="absolute top-[20%] -left-6"
                initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.4, opacity: 0, rotate: -15 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div
                  className="w-28 h-28 rounded-3xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #C9A227 0%, #e8d48b 50%, #C9A227 100%)",
                    boxShadow: "0 16px 48px rgba(201,162,39,0.4), inset 0 2px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  {expandedCategory.slug === "health" ? (
                    <Stethoscope size={40} className="text-white" />
                  ) : (
                    <MapPin size={40} className="text-white" />
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="relative z-10"
              >
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {expandedCategory.title}
                </p>
                <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white mb-4 leading-tight">
                  {expandedCategory.title} Stories
                </h2>
                <p className="font-serif text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {expandedCategory.description}
                </p>

                <button
                  onClick={handleCollapse}
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  <ArrowLeft size={14} />
                  Back to topics
                </button>
              </motion.div>
            </motion.div>

            {/* Article grid — fades in from right */}
            <motion.div
              className="flex-1 overflow-y-auto"
              style={{ backgroundColor: "var(--color-blog-beige)" }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="p-8 sm:p-12 max-w-2xl">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-8" style={{ color: "var(--color-blog-gold)" }}>
                  Latest Articles
                </p>
                <div className="space-y-5">
                  {expandedCategory.posts.map((post, i) => {
                    const catColor =
                      expandedCategory.slug === "health"
                        ? "var(--color-blog-health)"
                        : "var(--color-blog-travel)";
                    return (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.25 + i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <Link
                          href={`/blog/${expandedCategory.slug}/${post.slug}`}
                          className="block group rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                          style={{
                            borderColor: `${catColor}12`,
                            backgroundColor: "rgba(253,252,249,0.7)",
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-medium" style={{ color: "var(--color-blog-espresso)", opacity: 0.35 }}>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-blog-gold)" }} />
                            <span className="text-[10px] flex items-center gap-1" style={{ color: "var(--color-blog-espresso)", opacity: 0.35 }}>
                              <Clock size={9} />
                              {post.readTime}
                            </span>
                          </div>
                          <h3
                            className="font-heading text-lg font-semibold mb-2 transition-colors group-hover:opacity-75"
                            style={{ color: catColor }}
                          >
                            {post.title}
                          </h3>
                          <p className="font-serif text-sm leading-relaxed" style={{ color: "var(--color-blog-espresso)", opacity: 0.55 }}>
                            {post.excerpt}
                          </p>
                          <span className="inline-block mt-3 text-xs font-semibold transition-transform group-hover:translate-x-1" style={{ color: catColor }}>
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
