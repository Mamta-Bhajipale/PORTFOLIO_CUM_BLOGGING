"use client";

import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";

export default function Education() {
  return (
    <section id="education" className="py-20 bg-ivory">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionEyebrow number="02" label="Education" />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-emerald mb-12">
            Academic <em className="text-gold">foundation</em>
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gold/30" />

          <div className="space-y-8">
            {cvData.education.map((edu, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative pl-12 sm:pl-16">
                  <div className="absolute left-2.5 sm:left-4.5 top-1 w-3 h-3 rounded-full border-2 border-gold bg-ivory z-10" />
                  <div className="rounded-xl border border-emerald/10 bg-ivory hover:border-gold/30 transition-colors p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="font-heading text-lg sm:text-xl font-semibold text-emerald">
                        {edu.degree}
                      </h3>
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
    </section>
  );
}
