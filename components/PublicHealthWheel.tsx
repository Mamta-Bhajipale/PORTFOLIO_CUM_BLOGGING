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
  labelPos: { x: number; y: number };
};

const ORGS: Org[] = [
  {
    name: "NHM",
    color: "#25e6c1",
    role: "Administrative Intern · Maharashtra",
    note: "Health-system structure analysis · IPHS benchmarking · Screening camps",
    stats: [
      { value: 200, suffix: "+", label: "Reached" },
      { value: 80, suffix: "+", label: "Girls educated" },
    ],
    labelPos: { x: 347, y: 93 },
  },
  {
    name: "JIOVIO",
    color: "#4d7cff",
    role: "Deployment Executive · Dhule",
    note: "Wearable vitals for HRP · SaveMOM product pitch",
    stats: [
      { value: 2, suffix: "", label: "ANC camps" },
      { value: 73, suffix: "", label: "Attendees" },
    ],
    labelPos: { x: 400, y: 220 },
  },
  {
    name: "EKJUT",
    color: "#b98cff",
    role: "Administrative Intern · Ranchi",
    note: "PHQ tool co-design · Creche impact · Community mapping",
    stats: [
      { value: 500, suffix: "+", label: "Residents mapped" },
      { value: 20, suffix: "+", label: "Supervisors trained" },
    ],
    labelPos: { x: 220, y: 400 },
  },
  {
    name: "PIRAMAL",
    color: "#ff4d78",
    role: "Medical Fellow · Muzaffarpur",
    note: "FRU strengthening · NQAS & LaQshya certification",
    stats: [
      { value: 500, suffix: "+", label: "ASHAs & ANMs" },
      { value: 5, suffix: "", label: "Facilities certified" },
    ],
    labelPos: { x: 40, y: 220 },
  },
];

const R = 150;
const C = 2 * Math.PI * R;
const GAP = C * (18 / 360);
const ARC = C / 4 - GAP;

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 0 : 800;
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

  return (
    <div className="w-full">
      <div className="relative mx-auto w-full max-w-[420px]">
        {/* SVG wheel */}
        <svg viewBox="0 0 440 440" className="block w-full h-auto">
          {/* track ring */}
          <circle
            cx="220"
            cy="220"
            r={R}
            fill="none"
            stroke="rgba(14,59,46,0.08)"
            strokeWidth="22"
          />
          {/* segment arcs */}
          <g transform="translate(220,220) rotate(-90)">
            {ORGS.map((o, i) => {
              const isActive = active === i;
              return (
                <g
                  key={o.name}
                  transform={`rotate(${i * 90 + 45})`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Explore ${o.name}`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                  className="outline-none"
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r={R}
                    fill="none"
                    stroke={o.color}
                    strokeWidth={isActive ? 28 : 18}
                    strokeLinecap="round"
                    strokeDasharray={`${ARC} ${C}`}
                    strokeDashoffset={ARC}
                    style={{
                      transition: "stroke-width 0.4s ease, opacity 0.4s ease",
                      opacity: isActive ? 1 : 0.7,
                    }}
                  />
                </g>
              );
            })}
          </g>

          {/* segment labels */}
          {ORGS.map((o, i) => (
            <button
              key={o.name}
              type="button"
              onClick={() => setActive(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide border-2 transition-all duration-300"
              style={{
                left: `${(o.labelPos.x / 440) * 100}%`,
                top: `${(o.labelPos.y / 440) * 100}%`,
                borderColor: active === i ? o.color : "rgba(14,59,46,0.12)",
                background: active === i ? o.color : "#FDFCF9",
                color: active === i ? "#FDFCF9" : "#0E3B2E",
              }}
            >
              {o.name}
            </button>
          ))}
        </svg>

        {/* center hub */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-[64%] rounded-2xl border-2 bg-ivory/95 backdrop-blur-sm px-4 py-4 text-center shadow-lg pointer-events-auto"
            style={{ borderColor: org.color }}
          >
            <p
              className="font-heading text-xl font-bold"
              style={{ color: org.color }}
            >
              {org.name}
            </p>
            <p className="text-[11px] text-emerald/60 font-medium mt-0.5">
              {org.role}
            </p>

            <div className="my-2.5 h-px bg-emerald/10" />

            <div className="flex justify-center gap-4">
              {org.stats.map((s, si) => (
                <div key={si} className="text-center">
                  <p className="font-heading text-2xl font-bold text-emerald tabular-nums leading-none">
                    <CountUp
                      key={`${active}-${si}`}
                      to={s.value}
                      suffix={s.suffix}
                    />
                  </p>
                  <p className="text-[10px] text-emerald/50 mt-1 leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-2.5 text-[10px] text-emerald/45 leading-snug">
              {org.note}
            </p>
          </motion.div>
        </div>
      </div>

      <p className="text-center mt-4 text-[10px] uppercase tracking-[0.2em] text-emerald/35 font-semibold">
        4 Organizations · 3 States · 2021 – Present
      </p>
    </div>
  );
}