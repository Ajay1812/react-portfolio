"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useThemeMode } from "./theme-provider";

const options = [
  { id: "light", label: "Light", Icon: Sun },
  { id: "dark", label: "Dark", Icon: Moon },
  { id: "system", label: "System", Icon: Monitor },
];

export function ThemeToggle({ className }) {
  const { mode, setMode } = useThemeMode();
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const CurrentIcon = options.find((o) => o.id === mode)?.Icon || Monitor;

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  return (
    <div ref={root} className={cn("relative", className)}>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => setOpen((o) => !o)}
        aria-label="Theme settings"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <CurrentIcon />
      </Button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-popover p-1.5 shadow-xl"
        >
          {options.map(({ id, label, Icon }) => (
            <button
              key={id}
              role="menuitemradio"
              aria-checked={mode === id}
              onClick={() => {
                setMode(id);
                setOpen(false);
              }}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[0.9rem] font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                mode === id ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <Icon className="size-4" />
              <span className="flex-1 text-left">{label}</span>
              {mode === id && <Check className="size-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
