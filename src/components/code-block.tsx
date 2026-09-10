import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { SampleCode } from "@/data/types";

export function CodeBlock({ sample }: { sample: SampleCode }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(sample.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <figure className="overflow-hidden rounded-lg bg-code text-code-fg shadow-[var(--shadow-card)]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
        <span className="text-xs font-medium tracking-wide text-white/80">
          {sample.title}
          <span className="ml-2 font-mono text-[10px] uppercase text-white/40">{sample.lang}</span>
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-9 items-center gap-1.5 rounded-sm px-2 text-xs text-white/70 hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Kopyalandı" : "Kopyala"}
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono">{sample.code}</code>
      </pre>
      {sample.notes ? <p className="border-t border-white/10 px-4 py-2 text-xs text-white/60">{sample.notes}</p> : null}
    </figure>
  );
}
