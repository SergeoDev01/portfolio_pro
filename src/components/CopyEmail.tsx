"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("sergeolimta@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 text-[#1D0101]/50 hover:text-[#1D0101] transition-colors group text-sm"
    >
      {copied ? (
        <Check size={14} className="text-[#E6C200]" />
      ) : (
        <Copy size={14} className="group-hover:text-[#E6C200] transition-colors" />
      )}
      <span className="font-mono">
        {copied ? "Copié !" : "sergeolimta@gmail.com"}
      </span>
    </button>
  );
}
