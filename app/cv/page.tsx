import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cvData } from "@/lib/data";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Mamta Bhajipale — CV",
  description:
    "Curriculum vitae of Mamta Bhajipale, Public Health Professional specializing in government health systems strengthening.",
};

export default function CVPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="no-print sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <PrintButton />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="border-b-2 border-emerald pb-6 mb-8">
          <h1 className="font-heading text-3xl font-semibold text-emerald">
            {cvData.name}
          </h1>
          <p className="font-heading text-lg text-gold italic mt-1">{cvData.role}</p>
          <p className="text-sm text-neutral-500 mt-3">
            {cvData.location} | {cvData.email} | {cvData.phone} | {cvData.linkedin}
          </p>
        </header>

        <section className="mb-8">
          <h2 className="font-heading text-base font-semibold uppercase tracking-wider text-gold mb-3 border-b border-neutral-200 pb-2">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-neutral-700">{cvData.summary}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-base font-semibold uppercase tracking-wider text-gold mb-3 border-b border-neutral-200 pb-2">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5">
            {cvData.competencies.map((c) => (
              <p key={c} className="text-sm text-neutral-700 flex gap-2">
                <span className="text-gold">•</span>
                {c}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-base font-semibold uppercase tracking-wider text-gold mb-3 border-b border-neutral-200 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {cvData.experience.map((exp, i) => (
              <article key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h3 className="font-heading text-sm font-semibold text-neutral-900">
                    {exp.role} — {exp.org}
                  </h3>
                  <span className="text-xs text-neutral-500">{exp.period}</span>
                </div>
                <p className="text-xs text-neutral-500 mb-1.5">
                  {exp.org} · {exp.location}
                </p>
                <ul className="space-y-1">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-neutral-700 flex gap-2 leading-relaxed">
                      <span className="text-gold">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-base font-semibold uppercase tracking-wider text-gold mb-3 border-b border-neutral-200 pb-2">
            Project Work
          </h2>
          {cvData.projects.map((p, i) => (
            <article key={i} className="mb-4">
              <h3 className="font-heading text-sm font-semibold text-neutral-900">
                {p.title}
              </h3>
              <p className="text-xs text-neutral-500 mb-1.5">
                {p.subtitle} · {p.period}
              </p>
              {p.description && (
                <p className="text-sm text-neutral-700 leading-relaxed mb-2">{p.description}</p>
              )}
              {p.bullets && p.bullets.length > 0 && (
                <ul className="space-y-1">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-neutral-700 flex gap-2 leading-relaxed">
                      <span className="text-gold">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {p.reportUrl && (
                <a
                  href={p.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs font-semibold text-emerald hover:underline"
                >
                  View Report →
                </a>
              )}
            </article>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-base font-semibold uppercase tracking-wider text-gold mb-3 border-b border-neutral-200 pb-2">
            Education
          </h2>
          <div className="space-y-2.5">
            {cvData.education.map((edu, i) => (
              <div key={i} className="flex flex-wrap items-baseline justify-between gap-1">
                <p className="text-sm text-neutral-700">
                  <span className="font-semibold text-neutral-900">{edu.degree}</span> — {edu.institution}
                  {edu.result && <span> | {edu.result}</span>}
                </p>
                <span className="text-xs text-neutral-500">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-base font-semibold uppercase tracking-wider text-gold mb-3 border-b border-neutral-200 pb-2">
            Certifications
          </h2>
          <ul className="space-y-1.5">
            {cvData.certifications.map((cert, i) => (
              <li key={i} className="text-sm text-neutral-700 flex gap-2">
                <span className="text-gold">•</span>
                {cert.title} — {cert.org}
                {cert.duration && ` (${cert.duration})`}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-base font-semibold uppercase tracking-wider text-gold mb-3 border-b border-neutral-200 pb-2">
            Awards
          </h2>
          <ul className="space-y-1.5">
            {cvData.awards.map((a, i) => (
              <li key={`a-${i}`} className="text-sm text-neutral-700 flex gap-2">
                <span className="text-gold">•</span>
                {a}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}