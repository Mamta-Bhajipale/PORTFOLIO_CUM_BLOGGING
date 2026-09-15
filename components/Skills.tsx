"use client";

import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-ivory">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionEyebrow number="05" label="Skills" />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-emerald mb-12">
            Expertise <em className="text-gold">&amp;</em> tools
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cvData.skills.map((group, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div>
                <h3 className="font-heading text-base font-semibold text-emerald mb-4 flex items-center gap-2">
                  <span className="w-6 h-px bg-gold" />
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-block rounded-full border border-gold/25 bg-gold-muted px-3.5 py-1.5 text-xs font-medium text-emerald/75 hover:bg-gold/20 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
