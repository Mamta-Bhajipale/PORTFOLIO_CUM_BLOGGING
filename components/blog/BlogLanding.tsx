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

type Phase = "split" | "scroll";

export default function BlogLanding() {
  const [phase, setPhase] = useState<Phase>("split");
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<BlogCategory | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const categoryPosts = selectedCategory
    ? allPosts.filter((p) => p.category.slug === selectedCategory.slug)
    : [];

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
    if (phase !== "scroll") return;
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll, phase]);

  const scrollToIndex = (i: number) => {
    const el = itemRefs.current[i];
    if (!el || !scrollRef.current) return;
    const container = scrollRef.current;
    const top = el.offsetTop - container.clientHeight / 2 + el.offsetHeight / 2;
    container.scrollTo({ top, behavior: "smooth" });
  };

  const handleCategoryClick = (cat: BlogCategory) => {
    setSelectedCategory(cat);
    setActiveIndex(0);
    setPhase("scroll");
  };

  const handleBackToSplit = () => {
    setPhase("split");
    setSelectedCategory(null);
    setActiveIndex(0);
    setExpandedCategory(null);
    itemRefs.current = [];
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const activePost = categoryPosts[activeIndex];
  const isHealth = selectedCategory?.slug === "health";
  const accentVar = isHealth ? "var(--color-blog-health)" : "var(--color-blog-travel)";
  const accentHex = isHealth ? "#1F3D2B" : "#1B2A4A";

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>
      <AnimatePresence mode="wait">
        {/* PHASE 1: SPLIT-SCREEN CATEGORY PICKER */}
        {phase === "split" && (
          <motion.div
            key="split"
            className="absolute inset-0 z-10 flex flex-col md:flex-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Left half - Health */}
            <motion.div
              className="relative flex-1 flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
              style={{ backgroundColor: "var(--color-blog-health)" }}
              onClick={() => handleCategoryClick(blogCategories[0])}
              whileHover={{ flex: 1.1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
              />
              <div className="absolute inset-0 pointer-events-none">
                <ParticleField color="#3a7a54" count={20} />
              </div>
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20"
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #C9A227 0%, #e8d48b 50%, #C9A227 100%)", boxShadow: "0 16px 48px rgba(201,162,39,0.4), inset 0 2px 0 rgba(255,255,255,0.2)" }}
                >
                  <Stethoscope size={36} className="text-white drop-shadow-sm" />
                </div>
              </motion.div>
              <div className="relative z-10 text-center px-6 max-w-sm">
                <motion.p className="text-[10px] sm:text-[11px] font-bold tracking-[0.35em] uppercase mb-4"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
                >Explore</motion.p>
                <motion.h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
                >Health</motion.h2>
                <motion.p className="font-serif text-sm sm:text-base leading-relaxed mb-6"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
                >Stories from the ground - real experiences in public health across India&apos;s primary care system.</motion.p>
                <motion.div className="flex items-center justify-center gap-3"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
                >
                  <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>3 Stories</span>
                  <span className="w-8 h-px" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
                  <ArrowRight size={14} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </motion.div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at center, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
              />
            </motion.div>

            {/* Center divider */}
            <div className="hidden md:flex relative z-30 items-center justify-center w-0">
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="absolute">
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--color-blog-gold), #e0c060)", boxShadow: "0 8px 32px rgba(201,162,39,0.35), inset 0 1px 0 rgba(255,255,255,0.25)" }}
                >
                  <span className="text-white font-heading text-lg font-bold">&amp;</span>
                </div>
              </motion.div>
            </div>

            {/* Right half - Travel */}
            <motion.div
              className="relative flex-1 flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
              style={{ backgroundColor: "var(--color-blog-travel)" }}
              onClick={() => handleCategoryClick(blogCategories[1])}
              whileHover={{ flex: 1.1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
              />
              <div className="absolute inset-0 pointer-events-none">
                <ParticleField color="#2a4a7a" count={20} />
              </div>
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
                initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #C9A227 0%, #e8d48b 50%, #C9A227 100%)", boxShadow: "0 16px 48px rgba(201,162,39,0.4), inset 0 2px 0 rgba(255,255,255,0.2)" }}
                >
                  <MapPin size={36} className="text-white drop-shadow-sm" />
                </div>
              </motion.div>
              <div className="relative z-10 text-center px-6 max-w-sm">
                <motion.p className="text-[10px] sm:text-[11px] font-bold tracking-[0.35em] uppercase mb-4"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
                >Explore</motion.p>
                <motion.h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
                >Travel</motion.h2>
                <motion.p className="font-serif text-sm sm:text-base leading-relaxed mb-6"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
                >Honest, budget-friendly travel guides - where to go, how to get there, and what it&apos;s really like.</motion.p>
                <motion.div className="flex items-center justify-center gap-3"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
                >
                  <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>3 Stories</span>
                  <span className="w-8 h-px" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
                  <ArrowRight size={14} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </motion.div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at center, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* PHASE 2: SCROLL-DRIVEN BROWSE */}
        {phase === "scroll" && selectedCategory && (
          <motion.div
            key={`scroll-${selectedCategory.slug}`}
            className="absolute inset-0 z-10 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Background watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
              <motion.span
                key={selectedCategory.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.025, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="font-heading text-[100px] sm:text-[160px] md:text-[200px] font-bold tracking-tighter"
                style={{ color: "var(--color-blog-espresso)" }}
              >
                {isHealth ? "HEALTH" : "TRAVEL"}
              </motion.span>
            </div>

            <div className="absolute inset-0 pointer-events-none z-0">
              <ParticleField color={accentHex} count={30} />
            </div>

            {/* Back button */}
            <motion.button
              className="absolute top-6 left-6 z-30 inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full"
              style={{ color: accentVar, backgroundColor: "rgba(253,252,249,0.85)", backdropFilter: "blur(8px)" }}
              onClick={handleBackToSplit}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <ArrowLeft size={14} />
              All Topics
            </motion.button>

            {/* Desktop layout */}
            <div className="relative z-10 h-full hidden md:flex">
              {/* LEFT: scrollable topic list */}
              <div className="w-[28%] lg:w-[30%] flex flex-col relative">
                <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                  <div style={{ height: "45vh" }} />
                  {categoryPosts.map((post, i) => {
                    const dist = Math.abs(i - activeIndex);
                    const opacity = dist === 0 ? 0.08 : dist <= 1 ? 0.3 : dist <= 2 ? 0.15 : 0.05;
                    const blur = dist === 0 ? 3 : dist <= 1 ? 0 : Math.min(dist * 1.2, 3);
                    const isActive = i === activeIndex;
                    return (
                      <div
                        key={post.slug}
                        ref={(el) => { itemRefs.current[i] = el; }}
                        className="flex items-center justify-end px-6 lg:px-10 cursor-pointer select-none"
                        style={{ height: "120px", opacity, filter: `blur(${blur}px)`, transition: "opacity 0.5s cubic-bezier(0.25,0.1,0.25,1), filter 0.5s cubic-bezier(0.25,0.1,0.25,1)" }}
                        onClick={() => scrollToIndex(i)}
                      >
                        <span className="font-heading text-sm lg:text-base font-semibold text-right leading-snug max-w-[180px] transition-colors duration-500"
                          style={{ color: isActive ? accentVar : "var(--color-blog-espresso)" }}
                        >{post.title}</span>
                      </div>
                    );
                  })}
                  <div style={{ height: "45vh" }} />
                </div>
              </div>

              {/* CENTER: fixed card + 3D overlap */}
              <div className="flex-1 flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`icon-${activePost?.slug}`}
                    initial={{ opacity: 0, x: -20, rotate: -12, scale: 0.7 }}
                    animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, rotate: 12, scale: 0.7 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute z-30 pointer-events-none"
                    style={{ left: "max(-40px, calc(50% - 280px))", top: "50%", transform: "translateY(-50%)", filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.2))" }}
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #C9A227 0%, #e8d48b 50%, #C9A227 100%)", boxShadow: "0 12px 40px rgba(201,162,39,0.35)" }}
                    >
                      {isHealth ? <Stethoscope size={32} className="text-white drop-shadow-sm" /> : <MapPin size={32} className="text-white drop-shadow-sm" />}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`card-${activePost?.slug}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full max-w-[420px] mx-4 lg:mx-0 lg:ml-8 xl:ml-12"
                  >
                    <div className="rounded-2xl p-7 sm:p-8 relative overflow-hidden cursor-pointer group"
                      style={{ backgroundColor: accentVar, boxShadow: `0 24px 80px ${accentHex}25, 0 4px 20px rgba(0,0,0,0.06)` }}
                      onClick={() => selectedCategory && setExpandedCategory(selectedCategory)}
                    >
                      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                      />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
                          <p className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>{selectedCategory.title}</p>
                          <span style={{ color: "rgba(255,255,255,0.2)" }}>&middot;</span>
                          <p className="text-[11px] font-medium flex items-center gap-1" style={{ color: "rgba(255,255,255,0.4)" }}><Clock size={10} />{activePost?.readTime}</p>
                        </div>
                        <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white leading-snug mb-3">{activePost?.title}</h2>
                        <p className="font-serif text-[13px] sm:text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>{activePost?.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
                            {activePost && new Date(activePost.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/25" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                            <ArrowRight size={16} className="text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* RIGHT: sidebar */}
              <div className="w-[22%] lg:w-[24%] flex flex-col border-l" style={{ borderColor: "rgba(43,27,20,0.06)" }}>
                <div className="flex-1 flex flex-col justify-center px-5 xl:px-7">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: "var(--color-blog-gold)" }}>All in {selectedCategory.title}</p>
                  <div className="space-y-5">
                    {categoryPosts.map((post, i) => {
                      const isActive = i === activeIndex;
                      return (
                        <button
                          key={post.slug}
                          className="block text-left w-full group"
                          onClick={() => scrollToIndex(i)}
                        >
                          <p className="font-heading text-[13px] font-semibold leading-snug mb-1 transition-colors"
                            style={{ color: "var(--color-blog-espresso)", opacity: isActive ? 1 : 0.5, fontWeight: isActive ? 700 : 500 }}
                          >{post.title}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] flex items-center gap-1" style={{ color: "var(--color-blog-espresso)", opacity: 0.3 }}>
                              <Clock size={8} />{post.readTime}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile scroll layout */}
            <div className="relative z-10 h-full flex flex-col md:hidden pt-16 px-5">
              <div className="flex-1 overflow-y-auto pb-4" style={{ scrollbarWidth: "none" }}>
                <div className="space-y-3">
                  {categoryPosts.map((post, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <div
                        key={post.slug}
                        ref={(el) => { itemRefs.current[i] = el; }}
                        className="rounded-xl p-4 transition-all duration-300 cursor-pointer"
                        style={{ backgroundColor: isActive ? accentVar : "rgba(253,252,249,0.5)", border: `1px solid ${isActive ? "transparent" : "rgba(43,27,20,0.06)"}`, transform: isActive ? "scale(1.02)" : "scale(1)" }}
                        onClick={() => { if (isActive) { setExpandedCategory(selectedCategory); } else { scrollToIndex(i); } }}
                      >
                        <p className="font-heading text-sm font-semibold leading-snug" style={{ color: isActive ? "white" : "var(--color-blog-espresso)" }}>{post.title}</p>
                        {isActive && <div className="flex items-center gap-2 mt-2"><span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{post.readTime}</span><ArrowRight size={12} className="text-white/60" /></div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXPANDED OVERLAY */}
      <AnimatePresence>
        {expandedCategory && (
          <motion.div className="fixed inset-0 z-[70] flex"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          >
            <motion.div
              className="h-full flex flex-col justify-end p-8 sm:p-10 relative overflow-hidden"
              style={{ backgroundColor: expandedCategory.slug === "health" ? "var(--color-blog-health)" : "var(--color-blog-travel)" }}
              initial={{ width: "420px", maxWidth: "90vw" }}
              animate={{ width: "38%", minWidth: "300px", maxWidth: "480px" }}
              exit={{ width: "420px", maxWidth: "90vw" }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div className="absolute top-[20%] -left-6"
                initial={{ scale: 0.4, opacity: 0, rotate: -15 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0.4, opacity: 0, rotate: -15 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="w-28 h-28 rounded-3xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #C9A227 0%, #e8d48b 50%, #C9A227 100%)", boxShadow: "0 16px 48px rgba(201,162,39,0.4)" }}
                >
                  {expandedCategory.slug === "health" ? <Stethoscope size={40} className="text-white" /> : <MapPin size={40} className="text-white" />}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} transition={{ duration: 0.45, delay: 0.15 }} className="relative z-10">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>{expandedCategory.title}</p>
                <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white mb-4 leading-tight">{expandedCategory.title} Stories</h2>
                <p className="font-serif text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>{expandedCategory.description}</p>
                <button onClick={() => setExpandedCategory(null)} className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <ArrowLeft size={14} />Back to browse
                </button>
              </motion.div>
            </motion.div>
            <motion.div className="flex-1 overflow-y-auto" style={{ backgroundColor: "var(--color-blog-beige)" }}
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="p-8 sm:p-12 max-w-2xl">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-8" style={{ color: "var(--color-blog-gold)" }}>Latest Articles</p>
                <div className="space-y-5">
                  {expandedCategory.posts.map((post, i) => {
                    const catColor = expandedCategory.slug === "health" ? "var(--color-blog-health)" : "var(--color-blog-travel)";
                    return (
                      <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}>
                        <Link href={`/blog/${expandedCategory.slug}/${post.slug}`} className="block group rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                          style={{ borderColor: `${catColor}12`, backgroundColor: "rgba(253,252,249,0.7)" }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-medium" style={{ color: "var(--color-blog-espresso)", opacity: 0.35 }}>
                              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </span>
                            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-blog-gold)" }} />
                            <span className="text-[10px] flex items-center gap-1" style={{ color: "var(--color-blog-espresso)", opacity: 0.35 }}><Clock size={9} />{post.readTime}</span>
                          </div>
                          <h3 className="font-heading text-lg font-semibold mb-2 transition-colors group-hover:opacity-75" style={{ color: catColor }}>{post.title}</h3>
                          <p className="font-serif text-sm leading-relaxed" style={{ color: "var(--color-blog-espresso)", opacity: 0.55 }}>{post.excerpt}</p>
                          <span className="inline-block mt-3 text-xs font-semibold transition-transform group-hover:translate-x-1" style={{ color: catColor }}>Read story &rarr;</span>
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
