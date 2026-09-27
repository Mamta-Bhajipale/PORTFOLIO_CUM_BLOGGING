"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";

interface Panel {
  title: string;
  sub?: string;
  items?: { line: string; note?: string }[];
  gradient: string;
}

const PANELS: Panel[] = [
  {
    title: "Certifications",
    sub: "Clinical, field and public-health training credentials.",
    items: cvData.certifications.map((c) => ({
      line: c.title,
      note: `${c.org}${c.duration ? ` · ${c.duration}` : ""}`,
    })),
    gradient: "linear-gradient(160deg,#0E3B2E,#061a12)",
  },
  {
    title: "Public Relations Committee Member",
    sub: `${cvData.leadership[0].org} · ${cvData.leadership[0].period}`,
    items: cvData.leadership[0].bullets.map((b) => ({ line: b })),
    gradient: "linear-gradient(160deg,#C6A664,#6b4f1d)",
  },
  {
    title: "Conference & Event Manager",
    sub: `${cvData.leadership[1].org} · ${cvData.leadership[1].period}`,
    items: cvData.leadership[1].bullets.map((b) => ({ line: b })),
    gradient: "linear-gradient(160deg,#1d6f5a,#0a2f24)",
  },
];

export default function CertificationsLeadership() {
  const [on, setOn] = useState(0);

  return (
    <section id="certifications" className="py-20 bg-cream relative paper-grain">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal>
          <SectionEyebrow number="06" label="Certifications & Leadership" />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-emerald mb-12">
            Credentials <em className="text-gold">&amp;</em> impact
          </h2>
        </Reveal>

        <Reveal>
          <div className="flex h-72 sm:h-80 w-full max-w-4xl gap-2">
            {PANELS.map((p, i) => (
              <motion.button
                key={p.title}
                type="button"
                onMouseEnter={() => setOn(i)}
                onFocus={() => setOn(i)}
                onClick={() => setOn(i)}
                animate={{ flexGrow: on === i ? 5 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className="relative min-w-0 basis-0 overflow-hidden rounded-2xl border border-emerald/15 text-left"
                style={{ background: p.gradient }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.18),transparent_60%)]" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <motion.div
                    animate={{
                      rotate: on === i ? 0 : -90,
                      x: on === i ? 0 : -6,
                      y: on === i ? 0 : -30,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="origin-bottom-left whitespace-nowrap font-heading text-sm sm:text-base font-medium text-white"
                  >
                    {p.title}
                  </motion.div>
                  <motion.div
                    animate={{
                      opacity: on === i ? 1 : 0,
                      y: on === i ? 0 : 8,
                    }}
                    transition={{ duration: 0.25, delay: on === i ? 0.08 : 0 }}
                    className="mt-2 space-y-2"
                  >
                    {p.sub && (
                      <p className="text-xs leading-5 text-white/75">{p.sub}</p>
                    )}
                    <ul className="space-y-1.5">
                      {p.items?.map((it, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-xs leading-5 text-white/80"
                        >
                          <span className="text-white/50 mt-1 shrink-0">•</span>
                          <span>
                            {it.line}
                            {it.note && (
                              <span className="block text-[11px] text-white/50">
                                {it.note}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
