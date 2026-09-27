"use client";

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

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
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
              <GoldDivider className="max-w-md" />
            </Reveal>
          </div>

          <Reveal direction="right" delay={0.15}>
            <div className="rounded-2xl border border-emerald/10 bg-ivory p-6 sm:p-8">
              <h3 className="font-heading text-lg font-semibold text-emerald mb-4">
                Core Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {cvData.competencies.map((c) => (
                  <span
                    key={c}
                    className="inline-block rounded-full border border-emerald/15 bg-cream px-3.5 py-1.5 text-xs font-medium text-emerald/70"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}