interface SectionEyebrowProps {
  number: string;
  label: string;
}

export default function SectionEyebrow({ number, label }: SectionEyebrowProps) {
  return (
    <p className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-gold mb-4">
      {number} — {label}
    </p>
  );
}
