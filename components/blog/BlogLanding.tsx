"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { blogCategories } from "@/lib/blog-data";
import ParticleField from "./ParticleField";

export default function BlogLanding() {
  const [hoveredSide, setHoveredSide] = useState<"health" | "travel" | null>(null);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {blogCategories.map((cat) => {
        const isHealth = cat.slug === "health";
        const accentVar = isHealth ? "var(--color-blog-health)" : "var(--color-blog-travel)";
        const accentHex = isHealth ? "#1F3D2B" : "#1B2A4A";
        const isHovered = hoveredSide === cat.slug;
        const isOtherHovered = hoveredSide !== null && hoveredSide !== cat.slug;

        return (
          <Link
            key={cat.slug}
            href={`/blog/${cat.slug}`}
            className="relative flex-1 flex flex-col items-center justify-center px-8 py-16 md:py-0 overflow-hidden transition-all duration-500 ease-out cursor-pointer group"
            style={{
              backgroundColor: "var(--color-blog-beige)",
              flex: isHovered ? 1.4 : isOtherHovered ? 0.85 : 1,
            }}
            onMouseEnter={() => setHoveredSide(cat.slug as "health" | "travel")}
            onMouseLeave={() => setHoveredSide(null)}
          >
            <div className="absolute inset-0 opacity-30">
              <ParticleField color={accentHex} count={30} />
            </div>

            <div className="relative z-10 text-center max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: isHealth ? 0.2 : 0.35 }}
              >
                <div
                  className="w-16 h-1 rounded-full mx-auto mb-6"
                  style={{ backgroundColor: accentVar }}
                />
                <h2
                  className="font-heading text-4xl sm:text-5xl font-semibold mb-4"
                  style={{ color: accentVar }}
                >
                  {cat.title}
                </h2>
                <p
                  className="font-serif text-base sm:text-lg leading-relaxed mb-8"
                  style={{ color: "var(--color-blog-espresso)", opacity: 0.7 }}
                >
                  {cat.description}
                </p>

                <div
                  className="space-y-3 transition-all duration-500"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(10px)",
                  }}
                >
                  {cat.previewTitles.map((title, i) => (
                    <p
                      key={i}
                      className="font-serif text-sm flex items-center gap-2 justify-center"
                      style={{ color: "var(--color-blog-espresso)", opacity: 0.6 }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: accentVar, opacity: 0.5 }}
                      />
                      {title}
                    </p>
                  ))}
                </div>

                <div
                  className="inline-flex items-center gap-2 mt-6 font-body text-sm font-semibold transition-all duration-300"
                  style={{ color: accentVar }}
                >
                  Explore {cat.title}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentHex}33, transparent)`,
              }}
            />
          </Link>
        );
      })}
    </div>
  );
}
