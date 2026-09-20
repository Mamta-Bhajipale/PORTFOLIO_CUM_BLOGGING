import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogLanding from "@/components/blog/BlogLanding";

export const metadata: Metadata = {
  title: "Blog — Mamta Bhajipale",
  description:
    "Stories from public health work and budget travel across India.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-blog-beige)" }}>
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: "rgba(243,233,216,0.85)", backdropFilter: "blur(12px)" }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "var(--color-blog-maroon)" }}
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>
        <span
          className="font-heading text-sm font-semibold tracking-wider uppercase"
          style={{ color: "var(--color-blog-gold)" }}
        >
          Blog
        </span>
      </div>

      <div className="pt-16">
        <div className="text-center py-12 px-6">
          <h1
            className="font-heading text-3xl sm:text-4xl font-semibold mb-3"
            style={{ color: "var(--color-blog-espresso)" }}
          >
            Two sides of the same story
          </h1>
          <p
            className="font-serif text-base max-w-lg mx-auto"
            style={{ color: "var(--color-blog-espresso)", opacity: 0.6 }}
          >
            Health work from the ground. Travel stories that actually help you plan.
          </p>
        </div>
        <BlogLanding />
      </div>
    </div>
  );
}
