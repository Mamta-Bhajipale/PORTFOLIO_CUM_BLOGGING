"use client";

import { Sparkles } from "lucide-react";
import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";

export default function Hobbies() {
  return (
    <section id="interests" className="py-20 bg-ivory">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionEyebrow number="06" label="Interests" />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-emerald mb-12">
            Beyond <em className="text-gold">work</em>
          </h2>
        </Reveal>

        <div className="flex flex-wrap gap-4">
          {cvData.hobbies.map((hobby, i) => (
            <Reveal key={hobby} delay={i * 0.08}>
              <div className="flex items-center gap-3 rounded-xl border border-gold/25 bg-gold-muted px-6 py-4 hover:border-gold/50 transition-colors">
                <Sparkles size={18} className="text-gold shrink-0" />
                <span className="font-heading text-base font-semibold text-emerald">
                  {hobby}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}