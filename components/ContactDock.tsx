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
  theme,
}: {
  mouse: ReturnType<typeof useMotionValue<number>>;
  item: ContactItem;
  theme: "dark" | "light";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const dist = useTransform(mouse, (x) => {
    const b = ref.current?.getBoundingClientRect();
    return b ? x - (b.left + b.width / 2) : 999;
  });

  const size = useSpring(useTransform(dist, [-140, 0, 140], [44, 76, 44]), {
    stiffness: 380,
    damping: 26,
  });

  const chipClass =
    theme === "dark"
      ? "bg-dark-lighter text-gold hover:text-gold-light"
      : "bg-ivory text-emerald hover:text-gold border border-emerald/10 hover:border-gold/40";

  const tipClass =
    theme === "dark"
      ? "bg-gold text-dark"
      : "bg-emerald text-ivory";

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      aria-label={item.label}
      style={{ width: size, height: size }}
      className={`group relative grid shrink-0 place-items-center rounded-2xl transition-colors ${chipClass}`}
    >
      <item.icon size={24} className="size-[45%]" />
      <span className={`pointer-events-none absolute -top-9 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold opacity-0 transition-opacity duration-150 group-hover:opacity-100 ${tipClass}`}>
        {item.value}
      </span>
    </motion.a>
  );
}

export default function ContactDock({
  items,
  theme = "dark",
}: {
  items: ContactItem[];
  theme?: "dark" | "light";
}) {
  const mouse = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouse.set(e.clientX)}
      onMouseLeave={() => mouse.set(Infinity)}
      className="flex h-[88px] items-end gap-3"
    >
      {items.map((it) => (
        <MagnifyItem key={it.label} mouse={mouse} item={it} theme={theme} />
      ))}
    </div>
  );
}

export type { ContactItem };