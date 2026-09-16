"use client";

import { Mail, Linkedin, Phone, Send } from "lucide-react";
import { cvData } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionEyebrow from "./ui/SectionEyebrow";
import { FormEvent, useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoBody = message || `\n\n— Sent by ${name} (${email})`;
    const mailtoSubject = subject || `Portfolio inquiry from ${name}`;
    window.location.href = `mailto:${cvData.email}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;
  };

  return (
    <section id="contact" className="py-20 bg-dark relative paper-grain">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal>
          <SectionEyebrow number="08" label="Contact" />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-ivory mb-12">
            Let&apos;s <em className="text-gold">connect</em>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="space-y-8">
              <div className="space-y-5">
                {[
                  { icon: Mail, label: "Email", value: cvData.email, href: `mailto:${cvData.email}` },
                  { icon: Linkedin, label: "LinkedIn", value: cvData.linkedin, href: cvData.linkedinUrl, external: true },
                  { icon: Phone, label: "Phone", value: cvData.phone, href: `tel:${cvData.phone.replace(/\s/g, "")}` },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full border border-ivory/15 flex items-center justify-center group-hover:border-gold/50 transition-colors shrink-0">
                      <item.icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-ivory/40 uppercase tracking-wider font-medium">
                        {item.label}
                      </p>
                      <p className="text-sm text-ivory/80 group-hover:text-gold transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-ivory/10 bg-dark-lighter p-6 sm:p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs text-ivory/40 uppercase tracking-wider mb-1.5 font-medium">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-ivory/15 bg-dark px-4 py-3 text-sm text-ivory/90 placeholder-ivory/25 focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs text-ivory/40 uppercase tracking-wider mb-1.5 font-medium">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-ivory/15 bg-dark px-4 py-3 text-sm text-ivory/90 placeholder-ivory/25 focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-xs text-ivory/40 uppercase tracking-wider mb-1.5 font-medium">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-ivory/15 bg-dark px-4 py-3 text-sm text-ivory/90 placeholder-ivory/25 focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="How can I help?"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs text-ivory/40 uppercase tracking-wider mb-1.5 font-medium">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full rounded-lg border border-ivory/15 bg-dark px-4 py-3 text-sm text-ivory/90 placeholder-ivory/25 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                  placeholder="Write your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-dark hover:bg-gold-light transition-colors"
              >
                <Send size={15} />
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
