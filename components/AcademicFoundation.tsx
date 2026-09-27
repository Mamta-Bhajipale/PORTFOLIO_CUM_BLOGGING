"use client";

import { GraduationCap } from "lucide-react";
import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";

export default function AcademicFoundation() {
  return (
    <section id="education" className="py-20 bg-ivory">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionEyebrow number="02" label="Academic Foundation" />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-emerald mb-12">
            Academic <em className="text-gold">foundation</em>
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cvData.education.map((edu, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <article className="group relative flex min-h-[420px] w-full flex-col self-start overflow-hidden rounded-2xl border border-emerald/10 bg-cream transition-all duration-300 ease-out hover:border-gold/45 hover:shadow-[0_26px_60px_-32px_rgba(14,59,46,0.45)]">
                <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-heading text-4xl leading-none bg-clip-text text-transparent bg-[linear-gradient(180deg,#C6A664_-22.5%,#8a6f33_-0.55%,#E9D3A0_21.39%,#9a7c3f_96.88%)] sm:text-6xl">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    {edu.year && (
                      <span className="mt-2 text-[11px] font-medium uppercase tracking-wider text-emerald/40">
                        {edu.year}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-heading text-xl font-semibold leading-snug text-emerald sm:text-2xl">
                    {edu.degree}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-emerald/65">
                    {edu.institution}
                  </p>

                  {edu.result && (
                    <span className="mt-4 inline-block w-fit rounded-full bg-gold-muted px-3 py-1 text-xs font-semibold text-gold">
                      {edu.result}
                    </span>
                  )}
                </div>

                <div className="relative h-[30%] min-h-[120px] shrink-0 overflow-hidden">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(14,59,46,0.07)_0_1px,transparent_1px_11px)] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_130%,rgba(198,166,100,0.35),transparent_62%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-6 -right-2 font-heading text-[7rem] leading-none text-emerald/[0.06] select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-cream to-transparent"
                  />

                  <div className="relative z-10 flex h-full flex-col items-start justify-end gap-2 p-6 sm:p-8">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald/55 transition-colors group-hover:text-gold">
                      <GraduationCap size={16} />
                      {edu.year ? "Completed" : "In progress"}
                    </span>
                    <span className="h-px w-full bg-gradient-to-r from-gold/60 via-gold/25 to-transparent" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
