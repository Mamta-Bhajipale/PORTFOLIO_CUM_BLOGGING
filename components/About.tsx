"use client";

import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";
import GoldDivider from "./ui/GoldDivider";
import PublicHealthWheel from "./PublicHealthWheel";

export default function About() {
  return (
    <section id="about" className="py-20 bg-cream relative paper-grain">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal>
          <SectionEyebrow number="01" label="About" />
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
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

          <Reveal direction="right" delay={0.15} className="lg:sticky lg:top-24">
            <PublicHealthWheel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
