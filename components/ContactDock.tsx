"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ContactItem {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  icon: LucideIcon;
}

function MagnifyItem({
  mouse,
  item,
  variant,
}: {
  mouse: ReturnType<typeof useMotionValue<number>>;
  item: ContactItem;
  variant: "icon" | "labeled";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const dist = useTransform(mouse, (x) => {
    const b = ref.current?.getBoundingClientRect();
    return b ? x - (b.left + b.width / 2) : 999;
  });

  const iconSize = useSpring(useTransform(dist, [-140, 0, 140], [44, 76, 44]), {
    stiffness: 380,
    damping: 26,
  });
  const labelSize = useSpring(useTransform(dist, [-170, 0, 170], [48, 78, 48]), {
    stiffness: 380,
    damping: 26,
  });

  const size = variant === "labeled" ? labelSize : iconSize;

  if (variant === "labeled") {
    return (
      <motion.a
        ref={ref}
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        aria-label={item.label}
        style={{ height: size }}
        className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-ivory border border-emerald/10 hover:border-gold/40 text-emerald px-5 transition-colors"
      >
        <motion.span style={{ width: size, height: size }} className="grid place-items-center rounded-full bg-emerald text-ivory shrink-0">
          <item.icon size={20} />
        </motion.span>
        <span className="text-sm font-medium whitespace-nowrap pr-1">{item.value}</span>
      </motion.a>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      aria-label={item.label}
      style={{ width: size, height: size }}
      className="group relative grid shrink-0 place-items-center rounded-2xl bg-dark-lighter text-gold hover:text-gold-light transition-colors"
    >
      <item.icon size={24} className="size-[45%]" />
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-full bg-gold px-3 py-1 text-[11px] font-semibold text-dark opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {item.value}
      </span>
    </motion.a>
  );
}

export default function ContactDock({
  items,
  variant = "icon",
}: {
  items: ContactItem[];
  variant?: "icon" | "labeled";
}) {
  const mouse = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouse.set(e.clientX)}
      onMouseLeave={() => mouse.set(Infinity)}
      className={variant === "labeled" ? "flex flex-wrap justify-center items-center gap-3" : "flex h-[88px] items-end gap-3"}
    >
      {items.map((it) => (
        <MagnifyItem key={it.label} mouse={mouse} item={it} variant={variant} />
      ))}
    </div>
  );
}

export type { ContactItem };