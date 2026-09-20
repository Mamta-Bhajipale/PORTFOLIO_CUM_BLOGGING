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
      {/* Fixed header */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] px-6 py-4 flex items-center justify-between"
        style={{
          backgroundColor: "rgba(243,233,216,0.85)",
          backdropFilter: "blur(12px)",
        }}
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

      {/* Full-screen blog landing */}
      <div className="pt-14">
        <BlogLanding />
      </div>
    </div>
  );
}
