"use client";

import { cvData, sectionNames } from "@/lib/data";
import GoldDivider from "./ui/GoldDivider";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-dark pt-12 pb-8">
      <div className="mx-auto max-w-6xl px-6">
        <GoldDivider className="mb-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="w-10 h-10 rounded-full border-2 border-gold/40 flex items-center justify-center mb-3 mx-auto sm:mx-0">
              <span className="font-heading text-sm font-semibold text-ivory/70">
                {cvData.initials}
              </span>
            </div>
            <p className="text-sm text-ivory/50">
              &copy; {year} {cvData.name}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {sectionNames.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="text-xs text-ivory/35 hover:text-gold transition-colors uppercase tracking-wider font-medium"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
