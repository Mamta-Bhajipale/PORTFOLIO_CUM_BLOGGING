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
            <div id="education">
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-emerald mb-8">
                Academic <em className="text-gold">foundation</em>
              </h3>
              <div className="relative">
                <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-gold/30" />
                <div className="space-y-8">
                  {cvData.education.map((edu, i) => (
                    <Reveal key={i} delay={0.05 * i}>
                      <div className="relative pl-10 sm:pl-14">
                        <div className="absolute left-1 sm:left-2 top-1 w-3 h-3 rounded-full border-2 border-gold bg-cream z-10" />
                        <div className="rounded-xl border border-emerald/10 bg-ivory hover:border-gold/30 transition-colors p-5 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <h4 className="font-heading text-lg sm:text-xl font-semibold text-emerald">
                              {edu.degree}
                            </h4>
                            {edu.result && (
                              <span className="inline-block rounded-full bg-gold-muted px-3 py-1 text-xs font-semibold text-gold whitespace-nowrap self-start">
                                {edu.result}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-emerald/60">{edu.institution}</p>
                          {edu.year && (
                            <p className="text-xs text-emerald/40 mt-1 font-medium tracking-wider uppercase">
                              {edu.year}
                            </p>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}