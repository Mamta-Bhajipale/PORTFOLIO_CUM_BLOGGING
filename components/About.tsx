"use client";

import { Award } from "lucide-react";
import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";
import GoldDivider from "./ui/GoldDivider";

export default function About() {
  return (
    <section id="about" className="py-20 bg-cream relative paper-grain">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal>
          <SectionEyebrow number="01" label="About" />
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-12 mt-8">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-emerald mb-6">
                A commitment to <em className="text-gold">strengthening</em> health systems
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-emerald/75 leading-relaxed text-base sm:text-lg mb-8">
                {cvData.summary}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <GoldDivider className="mb-8" />
            </Reveal>

            <Reveal delay={0.2}>
              <h3 className="font-heading text-lg font-semibold text-emerald mb-4">
                Core Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {cvData.competencies.map((c) => (
                  <span
                    key={c}
                    className="inline-block rounded-full border border-emerald/15 bg-ivory px-3.5 py-1.5 text-xs font-medium text-emerald/70"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            <Reveal direction="right">
              <div className="rounded-xl border border-gold/20 bg-ivory p-6">
                <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center mb-4">
                  <span className="font-heading text-xl font-semibold text-emerald italic">
                    {cvData.initials}
                  </span>
                </div>
                <p className="font-heading text-lg font-semibold text-emerald">{cvData.name}</p>
                <p className="text-sm text-emerald/60 mt-1">{cvData.role}</p>
                <div className="gold-divider-left mt-4 mb-4" />
                <p className="text-xs text-emerald/50 leading-relaxed">{cvData.location}</p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div className="rounded-xl border border-emerald/10 bg-ivory p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award size={16} className="text-gold" />
                  <h3 className="font-heading text-sm font-semibold text-emerald uppercase tracking-wider">
                    Awards
                  </h3>
                </div>
                {cvData.awards.map((a) => (
                  <p key={a} className="text-sm text-emerald/70">{a}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
