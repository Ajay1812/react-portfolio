"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ArchModal({ open, onClose, title, src, source }) {
  const frameRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Forward Escape from inside the iframe too.
    const frame = frameRef.current;
    const onLoad = () => {
      try {
        frame.contentWindow.addEventListener("keydown", (e) => {
          if (e.key === "Escape") onClose();
        });
      } catch {
        /* cross-origin: ignore */
      }
    };
    frame?.addEventListener("load", onLoad);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      frame?.removeEventListener("load", onLoad);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} architecture`}
    >
      <div
        className="flex max-h-[92vh] w-[min(1020px,100%)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
          <h3 className="text-lg">{title} — architecture</h3>
          <div className="flex items-center gap-2">
            {source && (
              <Button asChild variant="outline" size="sm">
                <a href={source} target="_blank" rel="noreferrer">
                  <ExternalLink /> GitHub
                </a>
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
              <X />
            </Button>
          </div>
        </div>
        <div className="min-h-0 flex-1 bg-white">
          <iframe
            ref={frameRef}
            src={src}
            title={`${title} architecture diagram`}
            className="h-[70vh] w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
