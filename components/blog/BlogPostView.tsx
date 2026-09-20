"use client";

import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPostViewProps {
  title: string;
  date: string;
  readTime: string;
  content: string[];
  categorySlug: "health" | "travel";
  categoryLabel: string;
}

export default function BlogPostView({
  title,
  date,
  readTime,
  content,
  categorySlug,
  categoryLabel,
}: BlogPostViewProps) {
  const accentVar =
    categorySlug === "health" ? "var(--color-blog-health)" : "var(--color-blog-travel)";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-blog-beige)" }}>
      <div
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: "rgba(243,233,216,0.85)", backdropFilter: "blur(12px)" }}
      >
        <Link
          href={`/blog/${categorySlug}`}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: accentVar }}
        >
          <ArrowLeft size={16} />
          {categoryLabel} Stories
        </Link>
        <Link
          href="/blog"
          className="text-xs font-semibold tracking-wider uppercase"
          style={{ color: "var(--color-blog-gold)" }}
        >
          Blog
        </Link>
      </div>

      <article className="pt-24 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[680px] mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-xs font-medium tracking-wider uppercase"
              style={{ color: "var(--color-blog-espresso)", opacity: 0.4 }}
            >
              {new Date(date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "var(--color-blog-gold)" }}
            />
            <span
              className="text-xs font-medium flex items-center gap-1"
              style={{ color: "var(--color-blog-espresso)", opacity: 0.4 }}
            >
              <Clock size={11} />
              {readTime}
            </span>
          </div>

          <h1
            className="font-heading text-3xl sm:text-4xl font-semibold leading-tight mb-10"
            style={{ color: accentVar }}
          >
            {title}
          </h1>

          <div
            className="w-10 h-0.5 rounded-full mb-10"
            style={{ backgroundColor: "var(--color-blog-gold)", opacity: 0.5 }}
          />

          <div className="space-y-6">
            {content.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                className="font-serif text-base sm:text-[17px] leading-[1.85]"
                style={{ color: "var(--color-blog-espresso)", opacity: 0.85 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t" style={{ borderColor: "rgba(43,27,20,0.1)" }}>
            <Link
              href={`/blog/${categorySlug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: accentVar }}
            >
              <ArrowLeft size={14} />
              More {categoryLabel} Stories
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
