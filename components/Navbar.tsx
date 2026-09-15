"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { cvData, sectionNames } from "@/lib/data";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

          <div className="hidden md:flex items-center gap-8">
            {sectionNames.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="text-sm font-medium text-emerald/70 hover:text-emerald transition-colors"
              >
                {s.label}
              </button>
            ))}
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
            {sectionNames.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="py-3 text-left text-lg font-medium text-emerald hover:text-gold transition-colors border-b border-emerald/10"
              >
                {s.label}
              </button>
            ))}
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
