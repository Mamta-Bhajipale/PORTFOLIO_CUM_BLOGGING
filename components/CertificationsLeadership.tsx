"use client";

import { Award, Users } from "lucide-react";
import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";

export default function CertificationsLeadership() {
  return (
    <section id="certifications" className="py-20 bg-cream relative paper-grain">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal>
          <SectionEyebrow number="05" label="Certifications & Leadership" />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-emerald mb-12">
            Credentials <em className="text-gold">&amp;</em> impact
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="rounded-xl border border-emerald/10 bg-ivory p-6 sm:p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <Award size={18} className="text-gold" />
                <h3 className="font-heading text-lg font-semibold text-emerald">
                  Certifications
                </h3>
              </div>
              <div className="space-y-5">
                {cvData.certifications.map((cert, i) => (
                  <div key={i} className="border-l-2 border-gold/30 pl-4">
                    <h4 className="font-heading text-sm font-semibold text-emerald leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-emerald/50 mt-1">
                      {cert.org}
                      {cert.duration && ` · ${cert.duration}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="rounded-xl border border-emerald/10 bg-ivory p-6 sm:p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <Users size={18} className="text-gold" />
                <h3 className="font-heading text-lg font-semibold text-emerald">
                  Positions of Responsibility
                </h3>
              </div>
              <div className="space-y-6">
                {cvData.leadership.map((lead, i) => (
                  <div key={i}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <h4 className="font-heading text-sm font-semibold text-emerald">
                        {lead.role}
                      </h4>
                      <span className="text-xs text-emerald/40 tracking-wider uppercase whitespace-nowrap">
                        {lead.period}
                      </span>
                    </div>
                    <p className="text-xs text-gold font-medium mb-2">{lead.org}</p>
                    <ul className="space-y-1.5">
                      {lead.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="text-sm text-emerald/60 leading-relaxed flex gap-2"
                        >
                          <span className="text-gold/50 mt-1.5 shrink-0">•</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
