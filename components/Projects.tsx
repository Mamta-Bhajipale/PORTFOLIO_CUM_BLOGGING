"use client";

import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 bg-cream relative paper-grain">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal>
          <SectionEyebrow number="04" label="Projects" />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-emerald mb-12">
            Research <em className="text-gold">&</em> projects
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {cvData.projects.map((project, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`rounded-xl border bg-ivory p-6 sm:p-8 h-full flex flex-col cursor-pointer transition-colors group ${
                    isOpen ? "border-gold/50" : "border-emerald/10 hover:border-gold/30"
                  }`}
                  role="button"
                  aria-expanded={isOpen}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenIndex(isOpen ? null : i);
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-heading text-4xl font-light text-gold/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-emerald/40 tracking-wider uppercase">
                        {project.period}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-emerald mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gold font-medium mb-4">{project.subtitle}</p>

                  {/* Description - always visible with animation */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`desc-${project.title}`}
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      className="mb-4 overflow-hidden"
                    >
                      <p className="text-sm text-emerald/65 leading-relaxed">
                        {project.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Report link - always visible with animation */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`report-${project.title}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                      className="mt-4 pt-4 border-t border-emerald/10"
                    >
                      {project.reportUrl && (
                        <a
                          href={project.reportUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-full bg-emerald px-4 py-2 text-xs font-semibold text-ivory hover:bg-emerald-light transition-colors"
                        >
                          <FileText size={13} />
                          View Report →
                        </a>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Additional details on expand */}
                  <AnimatePresence mode="wait">
                    {isOpen && project.bullets && project.bullets.length > 0 && (
                      <motion.div
                        key={`bullets-${project.title}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.35, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                        className="mt-4 pt-4 border-t border-emerald/10"
                      >
                        <ul className="space-y-2">
                          {project.bullets.map((b, j) => (
                            <li key={j} className="text-sm text-emerald/65 leading-relaxed flex gap-2">
                              <span className="text-gold mt-1.5 shrink-0">•</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}