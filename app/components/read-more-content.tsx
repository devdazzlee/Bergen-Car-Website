"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Collapsible prose block: first paragraph visible, the rest behind
 * Read more / Read less. Used for bottom-of-page SEO content.
 */
export default function ReadMoreContent({
  paragraphs,
  previewCount = 1,
}: {
  paragraphs: ReactNode[];
  /** How many paragraphs stay visible before the toggle. Default 1. */
  previewCount?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const regionId = useId();

  if (paragraphs.length === 0) return null;

  const hasMore = paragraphs.length > previewCount;
  const visible = hasMore && !expanded ? paragraphs.slice(0, previewCount) : paragraphs;
  const hidden = hasMore ? paragraphs.slice(previewCount) : [];

  return (
    <div className="space-y-3 text-[15px] leading-7 text-navy-600">
      {visible.map((p, i) => (
        <div key={i}>{p}</div>
      ))}

      {hasMore && !expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-expanded={false}
          aria-controls={regionId}
          className="mt-1 text-sm font-semibold text-navy underline decoration-line-strong underline-offset-2 transition-colors hover:text-red hover:decoration-red"
        >
          Read more
        </button>
      ) : null}

      {hasMore && expanded ? (
        <div id={regionId} className="space-y-3">
          {hidden.map((p, i) => (
            <div key={i}>{p}</div>
          ))}
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-expanded={true}
            aria-controls={regionId}
            className="mt-1 text-sm font-semibold text-navy underline decoration-line-strong underline-offset-2 transition-colors hover:text-red hover:decoration-red"
          >
            Read less
          </button>
        </div>
      ) : null}
    </div>
  );
}
