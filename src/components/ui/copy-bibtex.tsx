import { useState } from "react";

interface CopyBibtexProps {
  bibtex: string;
}

/** Citation block with a one-click copy button + transient "Copied" state. */
export function CopyBibtex({ bibtex }: CopyBibtexProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <div className="bibtex-wrap">
      <div className="bibtex-head">
        <span>
          <span className="dot" aria-hidden />
          BibTeX
        </span>
        <button
          type="button"
          className={`copy-btn ${copied ? "is-copied" : ""}`}
          onClick={copy}
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{bibtex}</code>
      </pre>
    </div>
  );
}
