import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import resumeFile from "../../data/Ajay Kumar - Data Engineer.pdf";

const navItems = [
  { label: "./work", href: "#projects" },
  { label: "./how-i-work", href: "#about" },
  { label: "./experience", href: "#experience" },
  { label: "./contact", href: "#contact" },
];

const linkClass = (active) =>
  cn(
    "font-mono text-[0.92rem] transition-colors hover:text-accent-foreground",
    active ? "text-accent-foreground underline decoration-[2px] underline-offset-8" : "text-muted-foreground"
  );

export const Navbar = ({ theme, onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const root = useRef(null);

  useGSAP(
    () => {
      navItems
        .filter((item) => !item.external)
        .forEach(({ href }) => {
          const target = document.querySelector(href);
          if (!target) return;
          ScrollTrigger.create({
            trigger: target,
            start: "top 40%",
            end: "bottom 40%",
            onToggle: (self) => self.isActive && setActive(href),
          });
        });
    },
    { scope: root }
  );

  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const nextTheme = theme === "dark" ? "light" : "dark";

  const links = (onNavigate) =>
    navItems.map((item) => (
      <li key={item.label}>
        <a
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
          className={linkClass(active === item.href)}
          aria-current={active === item.href ? "true" : undefined}
          onClick={onNavigate}
        >
          {item.label}
        </a>
      </li>
    ));

  const themeButton = (
    <Button
      variant="outline"
      size="icon"
      className="size-[2.1rem] rounded-full text-body"
      onClick={onToggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <ThemeIcon />
    </Button>
  );

  return (
    <header ref={root} className="sticky top-0 z-50 bg-background">
      <nav className="mx-auto flex w-[min(1280px,calc(100%-2.5rem))] items-center justify-between gap-4 border-b border-border py-5 max-md:py-4">
        <a href="#home" className="font-mono text-[1.02rem] font-bold tracking-tight text-foreground">
          <span className="text-accent-foreground">~/</span>ajay-kumar
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-5">{links()}</ul>
          <a
            href={resumeFile}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-primary px-3.5 py-1.5 font-mono text-[0.9rem] font-bold text-primary-foreground transition-opacity hover:opacity-85"
          >
            resume.pdf ↓
          </a>
          {themeButton}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {themeButton}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 border-l border-border">
              <SheetTitle className="px-4 pt-4 font-mono">~/ajay-kumar</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <ul className="grid gap-4 px-4 text-base">{links(() => setMenuOpen(false))}</ul>
              <a
                href={resumeFile}
                target="_blank"
                rel="noreferrer"
                className="px-4 font-mono text-[0.92rem] font-bold text-accent-foreground"
              >
                resume.pdf ↓
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]).isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};
