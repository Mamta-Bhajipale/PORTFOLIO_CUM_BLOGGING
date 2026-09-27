"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown, FileText } from "lucide-react";
import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";

export default function Projects() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx((cur) => (cur === i ? null : i));

  return (
    <section id="projects" className="py-20 bg-cream relative paper-grain">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal>
          <SectionEyebrow number="04" label="Projects" />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-emerald mb-12">
            Research <em className="text-gold">&</em> projects
          </h2>
        </Reveal>

        <div className="mt-2 grid items-start gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cvData.projects.map((project, i) => {
            const isOpen = openIdx === i;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <article
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(i);
                    }
                  }}
                  className="group relative flex min-h-[380px] w-full flex-col self-start overflow-hidden rounded-2xl border border-emerald/10 bg-ivory transition-all duration-300 ease-out hover:border-gold/45 hover:shadow-[0_26px_60px_-32px_rgba(14,59,46,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 sm:min-h-[420px] max-lg:cursor-pointer lg:cursor-default"
                >
                  <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8 sm:pb-6">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-heading text-4xl leading-none bg-clip-text text-transparent bg-[linear-gradient(180deg,#C6A664_-22.5%,#8a6f33_-0.55%,#E9D3A0_21.39%,#9a7c3f_96.88%)] sm:text-6xl">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <span className="mt-2 text-[11px] font-medium uppercase tracking-wider text-emerald/40">
                        {project.period}
                      </span>
                    </div>

                    <h3 className="mt-4 font-heading text-lg font-semibold leading-snug text-emerald sm:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium leading-snug text-gold">
                      {project.subtitle}
                    </p>

                    <div
                      className={`overflow-hidden text-sm leading-relaxed text-emerald/65 transition-all duration-500 ease-in-out sm:text-[0.9375rem] ${
                        isOpen
                          ? "mt-3 max-h-80 opacity-100"
                          : "max-h-0 opacity-0 lg:group-hover:mt-3 lg:group-hover:max-h-80 lg:group-hover:opacity-100"
                      }`}
                    >
                      <p>{project.description}</p>
                    </div>
                  </div>

                  <div className="relative h-[42%] min-h-[150px] shrink-0 overflow-hidden sm:min-h-[170px]">
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
                      className="absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-ivory to-transparent"
                    />

                    <div className="relative z-10 flex h-full flex-col items-start justify-end gap-3 p-6 sm:p-8">
                      {project.reportUrl ? (
                        <a
                          href={project.reportUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-full border border-emerald/15 bg-emerald px-4 py-2 text-xs font-semibold text-ivory transition-colors hover:bg-emerald-light"
                        >
                          <FileText size={13} />
                          View Report
                          <ArrowUpRight size={13} />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald/15 px-4 py-2 text-xs font-semibold text-emerald/70">
                          <FileText size={13} />
                          Read summary
                        </span>
                      )}

                      <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-emerald/40 transition-colors group-hover:text-gold">
                        {isOpen ? "Collapse" : "Expand"}
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
