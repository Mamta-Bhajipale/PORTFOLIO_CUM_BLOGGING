"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Stat = { value: number; suffix: string; label: string };

type Org = {
  name: string;
  color: string;
  role: string;
  note: string;
  stats: [Stat, Stat];
  label: { x: number; y: number };
};

const ORGS: Org[] = [
  {
    name: "NHM",
    color: "#25e6c1",
    role: "Administrative Intern · Maharashtra",
    note: "IPHS & health-system structure analysis · Polio, TB & eye screening camps · VHSNC revival",
    stats: [
      { value: 200, suffix: "+", label: "Reached through camps" },
      { value: 80, suffix: "+", label: "Adolescent health education" },
    ],
    label: { x: 347.3, y: 92.7 },
  },
  {
    name: "JIOVIO",
    color: "#4d7cff",
    role: "Deployment Executive · Dhule, Maharashtra",
    note: "Wearable vitals-data trend analysis for HRP · SaveMOM product pitch",
    stats: [
      { value: 2, suffix: "", label: "ANC camps led" },
      { value: 73, suffix: "", label: "Attendees analyzed" },
    ],
    label: { x: 400, y: 220 },
  },
  {
    name: "EKJUT",
    color: "#b98cff",
    role: "Administrative Intern · Ranchi, Jharkhand",
    note: "PHQ screening tool co-design · CPAM & creche evaluation · PVTG engagement",
    stats: [
      { value: 500, suffix: "+", label: "Residents health-mapped" },
      { value: 20, suffix: "", label: "Supervisors trained (PLA)" },
    ],
    label: { x: 220, y: 400 },
  },
  {
    name: "PIRAMAL",
    color: "#ff4d78",
    role: "Medical Fellow · Muzaffarpur, Bihar",
    note: "FRU strengthening · NQAS & LaQshya certification · HMIS gap analysis",
    stats: [
      { value: 500, suffix: "+", label: "ASHAs & ANMs trained" },
      { value: 5, suffix: "", label: "Facility certifications" },
    ],
    label: { x: 40, y: 220 },
  },
];

const R = 150;
const C = 2 * Math.PI * R;
const GAP = C * (16 / 360);
const ARC = C / 4 - GAP;

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 0 : 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);

  return (
    <span>
      {n}
      {suffix}
    </span>
  );
}

export default function PublicHealthWheel() {
  const [active, setActive] = useState(1);
  const org = ORGS[active];

  const select = (i: number) => () => setActive(i);
  const onKeyDown = (i: number) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(i);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-7">
        <p className="font-heading text-2xl font-semibold text-emerald">
          Public Health Impact{" "}
          <span className="text-gold italic font-light">— At a Glance</span>
        </p>
        <p className="text-sm text-emerald/60 mt-1">Tap a chapter of the wheel to explore.</p>
      </div>

      <div className="relative mx-auto w-full max-w-[440px]">
        <svg viewBox="0 0 440 440" className="block w-full h-auto">
          <circle cx="220" cy="220" r={R} fill="none" stroke="rgba(14,59,46,0.10)" strokeWidth="24" />
          <g transform="translate(220,220) rotate(-90)">
            {ORGS.map((o, i) => (
              <g
                key={o.name}
                transform={`rotate(${2 + i * 90})`}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${o.name}`}
                onClick={select(i)}
                onKeyDown={onKeyDown(i)}
                className="outline-none focus-visible:opacity-100"
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx="0"
                  cy="0"
                  r={R}
                  fill="none"
                  stroke={o.color}
                  strokeWidth={active === i ? 30 : 20}
                  strokeLinecap="round"
                  strokeDasharray={`${ARC} ${C}`}
                  strokeDashoffset={ARC}
                  style={{
                    transition: "stroke-width 0.5s ease, opacity 0.5s ease",
                    opacity: active === i ? 1 : 0.85,
                  }}
                />
              </g>
            ))}
          </g>
        </svg>

        {ORGS.map((o, i) => (
          <button
            key={o.name}
            type="button"
            onClick={select(i)}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide border transition-colors"
            style={{
              left: `${(o.label.x / 440) * 100}%`,
              top: `${(o.label.y / 440) * 100}%`,
              borderColor: o.color,
              background: active === i ? o.color : "rgba(253,252,249,0.9)",
            }}
          >
            {o.name}
          </button>
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-[58%] rounded-2xl border bg-ivory/90 backdrop-blur px-5 py-5 text-center shadow-[0_12px_40px_rgba(14,59,46,0.12)]"
            style={{ borderColor: org.color }}
          >
            <p className="font-heading text-2xl font-semibold" style={{ color: org.color }}>
              {org.name}
            </p>
            <p className="text-xs text-emerald/70 font-medium mt-1 leading-snug">{org.role}</p>
            <div className="my-3 h-px bg-emerald/10" />
            {org.stats.map((s, si) => (
              <div key={si} className="flex items-baseline justify-center gap-2">
                <span className="font-heading text-2xl font-semibold text-emerald tabular-nums">
                  <CountUp key={`${active}-${si}`} to={s.value} suffix={s.suffix} />
                </span>
                <span className="text-[11px] text-emerald/60 leading-tight text-left">{s.label}</span>
              </div>
            ))}
            <p className="mt-3 text-[11px] text-emerald/55 leading-snug">{org.note}</p>
          </motion.div>
        </div>
      </div>

      <p className="text-center mt-5 text-[11px] uppercase tracking-[0.2em] text-emerald/40 font-semibold">
        4 Organizations · 3 States · 2021 – Present
      </p>
    </div>
  );
}