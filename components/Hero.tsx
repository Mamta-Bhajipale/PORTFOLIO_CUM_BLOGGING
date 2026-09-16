"use client";

import { motion, type Variants } from "framer-motion";
import { Mail, Linkedin, Phone, MapPin, ArrowDown, Briefcase } from "lucide-react";
import { cvData } from "@/lib/data";

export default function Hero() {
  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 hero-grid paper-grain overflow-hidden">
      <div className="mx-auto max-w-6xl w-full px-6 relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <div className="w-28 h-28 rounded-full border-[3px] border-gold flex items-center justify-center bg-ivory shadow-[0_0_0_8px_rgba(198,166,100,0.08)]">
              <span className="font-heading text-4xl font-semibold text-emerald italic">
                {cvData.initials}
              </span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-muted px-4 py-2 mb-6">
              <MapPin size={14} className="text-gold" />
              <span className="text-xs font-medium text-emerald/80 tracking-wide uppercase">
                {cvData.location}
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-5xl sm:text-6xl md:text-7xl font-semibold text-emerald leading-[1.1] mb-4"
          >
            {cvData.name.split(" ").map((word, i) => (
              <span key={i}>
                {i === 1 ? (
                  <em className="text-emerald/70"> {word}</em>
                ) : (
                  <>{i > 0 ? " " : ""}{word}</>
                )}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-heading text-xl sm:text-2xl text-gold font-light italic mb-2"
          >
            {cvData.role}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-emerald/60 tracking-wider uppercase font-medium mb-8"
          >
            {cvData.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full bg-emerald px-7 py-3.5 text-sm font-semibold text-ivory hover:bg-emerald-light transition-colors"
            >
              <Briefcase size={16} />
              View Projects
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-7 py-3.5 text-sm font-semibold text-gold hover:bg-gold hover:text-dark transition-colors"
            >
              Get in Touch
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm text-emerald/60">
            <a
              href={`mailto:${cvData.email}`}
              className="inline-flex items-center gap-2 hover:text-gold transition-colors"
              aria-label="Email"
            >
              <Mail size={15} />
              {cvData.email}
            </a>
            <a
              href={cvData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-gold transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
              {cvData.linkedin}
            </a>
            <a
              href={`tel:${cvData.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 hover:text-gold transition-colors"
              aria-label="Phone"
            >
              <Phone size={15} />
              {cvData.phone}
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="w-full max-w-2xl">
            <div className="gold-divider mb-6" />
            <div className="grid grid-cols-2 gap-6">
              {cvData.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="font-heading text-2xl sm:text-3xl font-semibold text-emerald">
                    {stat.value}
                  </p>
                  <p className="text-xs text-emerald/50 mt-1 uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="gold-divider mt-6" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="text-gold/40 hover:text-gold transition-colors"
            aria-label="Scroll to About section"
          >
            <ArrowDown size={20} className="animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
