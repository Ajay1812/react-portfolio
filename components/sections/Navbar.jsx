"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "https://the-data-diary.vercel.app/", external: true },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = (item, mobile = false) => (
    <a
      href={item.href}
      {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...(mobile ? { onClick: () => setOpen(false) } : {})}
      className={cn(
        mobile
          ? "flex items-center gap-1.5 rounded-lg px-3 py-2.5 font-medium text-foreground hover:bg-accent"
          : "inline-flex items-center gap-1 text-[0.95rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
      )}
    >
      {item.label}
      {item.external && <ArrowUpRight className="size-3.5 opacity-60" />}
    </a>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/80 shadow-[0_4px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          : "border-transparent bg-background/60 backdrop-blur-md"
      )}
    >
      <nav className="mx-auto flex w-[min(1240px,calc(100%-2.5rem))] items-center justify-between gap-4 py-4">
        <a href="#home" className="text-[1.05rem] font-extrabold tracking-tight">
          Ajay Kumar{" "}
          <span className="ml-1 text-[0.85rem] font-medium text-muted-foreground">
            Data Engineer
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.label}>{link(item)}</li>
            ))}
          </ul>
          <Button asChild>
            <a href="/Ajay Kumar - Data Engineer.pdf" target="_blank" rel="noreferrer">
              Resume ↓
            </a>
          </Button>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <ul className="grid gap-1 px-6 py-4">
            {navItems.map((item) => (
              <li key={item.label}>{link(item, true)}</li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
