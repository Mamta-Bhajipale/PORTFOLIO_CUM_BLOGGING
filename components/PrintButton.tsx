"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-emerald px-4 py-2 text-sm font-medium text-ivory hover:bg-emerald-light transition-colors"
    >
      <Printer size={15} />
      Print / Save as PDF
    </button>
  );
}