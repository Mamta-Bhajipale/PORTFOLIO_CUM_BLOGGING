"use client";

import { Briefcase } from "lucide-react";
import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-dark relative paper-grain">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal>
          <SectionEyebrow number="03" label="Experience" />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-ivory mb-12">
            Professional <em className="text-gold">journey</em>
          </h2>
        </Reveal>

        <div className="space-y-6">
          {cvData.experience.map((exp, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group rounded-xl border border-ivory/10 bg-dark-lighter p-6 sm:p-8 hover:border-gold/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <Briefcase size={16} className="text-gold shrink-0" />
                      <h3 className="font-heading text-lg sm:text-xl font-semibold text-ivory">
                        {exp.role}
                      </h3>
                    </div>
                    <p className="text-sm text-gold/80 ml-7">
                      {exp.org} — {exp.location}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-ivory/40 tracking-wider uppercase whitespace-nowrap ml-7 sm:ml-0">
                    {exp.period}
                    {exp.isPresent && (
                      <span className="ml-2 inline-block w-2 h-2 rounded-full bg-gold animate-pulse" />
                    )}
                  </span>
                </div>
                <ul className="space-y-2 ml-7">
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="text-sm text-ivory/60 leading-relaxed flex gap-2"
                    >
                      <span className="text-gold/50 mt-1.5 shrink-0">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
