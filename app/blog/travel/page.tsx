import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { blogCategories } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Travel Stories — Mamta Bhajipale",
  description:
    "Honest, budget-friendly travel guides across India.",
};

export default function TravelPage() {
  const category = blogCategories.find((c) => c.slug === "travel")!;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-blog-beige)" }}>
      <div
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: "rgba(243,233,216,0.85)", backdropFilter: "blur(12px)" }}
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "var(--color-blog-travel)" }}
        >
          <ArrowLeft size={16} />
          All Stories
        </Link>
        <span
          className="font-heading text-sm font-semibold tracking-wider uppercase"
          style={{ color: "var(--color-blog-gold)" }}
        >
          Travel
        </span>
      </div>

      <div className="pt-24 pb-16 px-6 max-w-3xl mx-auto">
        <div className="mb-12">
          <div
            className="w-12 h-1 rounded-full mb-6"
            style={{ backgroundColor: "var(--color-blog-travel)" }}
          />
          <h1
            className="font-heading text-3xl sm:text-4xl font-semibold mb-4"
            style={{ color: "var(--color-blog-travel)" }}
          >
            {category.title}
          </h1>
          <p
            className="font-serif text-base leading-relaxed"
            style={{ color: "var(--color-blog-espresso)", opacity: 0.7 }}
          >
            {category.description}
          </p>
        </div>

        <div className="space-y-8">
          {category.posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/travel/${post.slug}`}
              className="block group rounded-xl border p-6 sm:p-8 transition-all duration-300 hover:shadow-lg"
              style={{
                borderColor: "rgba(27,42,74,0.15)",
                backgroundColor: "rgba(253,252,249,0.6)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-medium tracking-wider uppercase"
                  style={{ color: "var(--color-blog-espresso)", opacity: 0.4 }}
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-blog-gold)" }} />
                <span
                  className="text-xs font-medium flex items-center gap-1"
                  style={{ color: "var(--color-blog-espresso)", opacity: 0.4 }}
                >
                  <Clock size={11} />
                  {post.readTime}
                </span>
              </div>
              <h2
                className="font-heading text-xl font-semibold mb-2 transition-colors"
                style={{ color: "var(--color-blog-travel)" }}
              >
                {post.title}
              </h2>
              <p
                className="font-serif text-sm leading-relaxed"
                style={{ color: "var(--color-blog-espresso)", opacity: 0.65 }}
              >
                {post.excerpt}
              </p>
              <span
                className="inline-block mt-4 text-xs font-semibold transition-all group-hover:translate-x-1"
                style={{ color: "var(--color-blog-travel)" }}
              >
                Read story &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
