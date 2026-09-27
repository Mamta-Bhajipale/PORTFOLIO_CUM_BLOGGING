"use client";

import { useState } from "react";
import {
  Briefcase,
  Users,
  Building2,
  CalendarCheck,
  GraduationCap,
  MapPin,
  Activity,
  Eye,
  Heart,
  Shield,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cvData } from "@/lib/data";
import type { ExperienceMetric } from "@/lib/types";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";
import Highlight from "./ui/Highlight";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  building: Building2,
  calendar: CalendarCheck,
  graduation: GraduationCap,
  map: MapPin,
  activity: Activity,
  eye: Eye,
  heart: Heart,
  shield: Shield,
};

function MetricChips({ metrics }: { metrics: ExperienceMetric[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="grid sm:grid-cols-2 gap-3 ml-7 mt-5">
      {metrics.map((m, i) => {
        const isOpen = openIdx === i;
        const Icon = iconMap[m.icon] || Users;
        return (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIdx(isOpen ? null : i)}
            className={`w-full text-left rounded-xl border p-4 transition-colors ${
              isOpen
                ? "border-gold/50 bg-gold-muted"
                : "border-ivory/10 bg-dark hover:border-gold/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon size={15} className="text-gold shrink-0" />
              <span className="text-xl sm:text-2xl font-heading font-bold text-gold leading-none">
                {m.num}
              </span>
            </div>
            <p className="text-xs text-ivory/55 leading-snug mb-2">{m.label}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-gold/70">
                {isOpen ? "Hide insight" : "View insight"}
              </span>
              <ChevronDown
                size={13}
                className={`text-gold/70 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] mt-3 pt-3 border-t border-gold/20" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-xs text-ivory/50 leading-relaxed">{m.detail}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-dark relative paper-grain">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal>
          <SectionEyebrow number="02" label="Experience" />
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
                      <Highlight text={b} />
                    </li>
                  ))}
                </ul>
                {exp.metrics && exp.metrics.length > 0 && (
                  <MetricChips metrics={exp.metrics} />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}