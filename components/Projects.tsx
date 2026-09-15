"use client";

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
            Research <em className="text-gold">&amp;</em> projects
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {cvData.projects.map((project, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="rounded-xl border border-emerald/10 bg-ivory p-6 sm:p-8 hover:border-gold/30 transition-colors h-full flex flex-col">
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
                <ul className="space-y-2 mt-auto">
                  {project.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="text-sm text-emerald/65 leading-relaxed flex gap-2"
                    >
                      <span className="text-gold mt-1.5 shrink-0">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
                {(project.repoUrl || project.liveUrl) && (
                  <div className="flex gap-3 mt-5 pt-4 border-t border-emerald/10">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-gold hover:underline"
                      >
                        Repository →
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-gold hover:underline"
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
