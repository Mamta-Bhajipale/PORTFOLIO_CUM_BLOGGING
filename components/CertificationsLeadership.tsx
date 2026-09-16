"use client";

import { Award } from "lucide-react";
import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";

export default function CertificationsLeadership() {
  return (
    <section id="certifications" className="py-20 bg-cream relative paper-grain">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal>
          <SectionEyebrow number="06" label="Certifications" />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-emerald mb-12">
            Credentials <em className="text-gold">&amp;</em> impact
          </h2>
        </Reveal>

        <Reveal>
          <div className="rounded-xl border border-emerald/10 bg-ivory p-6 sm:p-8 max-w-3xl">
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
      </div>
    </section>
  );
}