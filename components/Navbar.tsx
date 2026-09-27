"use client";

import { useState, useEffect, useId } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { cvData, sectionNames } from "@/lib/data";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const lensId = useId();
  const lens = hover ?? active;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = sectionNames.findIndex((s) => s.id === entry.target.id);
          if (idx >= 0) setActive(idx);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sectionNames.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ivory/85 backdrop-blur-md shadow-[0_1px_0_rgba(198,166,100,0.2)]"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
            aria-label="Scroll to top"
          >
            <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center bg-ivory transition-colors group-hover:bg-gold/10">
              <span className="font-heading text-sm font-semibold text-emerald tracking-wide">
                {cvData.initials}
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-4">
            <nav
              className="flex items-center rounded-full border border-emerald/15 bg-ivory/70 p-1 backdrop-blur-sm"
              onPointerLeave={() => setHover(null)}
              aria-label="Section navigation"
            >
              {sectionNames.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActive(i);
                    scrollTo(s.id);
                  }}
                  onPointerEnter={() => setHover(i)}
                  aria-current={active === i ? "true" : undefined}
                  className="relative whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium focus-visible:outline-none"
                >
                  {lens === i && (
                    <motion.span
                      layoutId={`${lensId}-lens`}
                      className="absolute inset-0 rounded-full border border-gold/45 bg-gold-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_14px_rgba(14,59,46,0.12)]"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <motion.span
                    initial={false}
                    className="relative inline-block"
                    animate={{
                      scale: lens === i ? 1.08 : 1,
                      color:
                        active === i
                          ? "#0E3B2E"
                          : lens === i
                            ? "#1a5c45"
                            : "rgba(14,59,46,0.55)",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  >
                    {s.label}
                  </motion.span>
                  {active === i && (
                    <motion.span
                      layoutId={`${lensId}-dot`}
                      className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-gold"
                      transition={{ type: "spring", stiffness: 420, damping: 26 }}
                    />
                  )}
                </button>
              ))}
            </nav>
            <Link
              href="/blog"
              className="text-sm font-medium text-emerald/70 hover:text-emerald transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-sm font-medium text-gold hover:bg-gold hover:text-dark transition-colors"
            >
              <Download size={14} />
              CV
            </Link>
          </div>

          <button
            className="md:hidden text-emerald p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-dark/30 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-ivory shadow-xl flex flex-col pt-20 px-8">
            {sectionNames.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setActive(i);
                  scrollTo(s.id);
                }}
                className={`py-3 text-left text-lg font-medium border-b border-emerald/10 transition-colors ${
                  active === i ? "text-gold" : "text-emerald hover:text-gold"
                }`}
              >
                {s.label}
              </button>
            ))}
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-left text-lg font-medium text-emerald hover:text-gold transition-colors border-b border-emerald/10"
            >
              Blog
            </Link>
            <Link
              href="/cv"
              onClick={() => setMenuOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-gold px-6 py-3 text-base font-medium text-gold hover:bg-gold hover:text-dark transition-colors"
            >
              <Download size={16} />
              Download CV
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
