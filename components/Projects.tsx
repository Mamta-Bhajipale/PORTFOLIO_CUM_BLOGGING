"use client";

import { FileText } from "lucide-react";
import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-cream relative paper-grain">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal>
          <SectionEyebrow number="03" label="Projects" />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-emerald mb-12">
            Research <em className="text-gold">&</em> projects
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {cvData.projects.map((project, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="rounded-xl border border-emerald/10 bg-ivory p-6 sm:p-8 h-full flex flex-col group hover:border-gold/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-heading text-4xl font-light text-gold/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-medium text-emerald/40 tracking-wider uppercase">
                    {project.period}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-emerald mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gold font-medium mb-4">{project.subtitle}</p>

                <div className="mt-2">
                  <p className="text-sm text-emerald/65 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-emerald/10">
                    {project.reportUrl && (
                      <a
                        href={project.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-emerald px-4 py-2 text-xs font-semibold text-ivory hover:bg-emerald-light transition-colors"
                      >
                        <FileText size={13} />
                        View Report →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}