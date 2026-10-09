import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import resumeFile from "../../data/Ajay Kumar - Data Engineer.pdf";

const navItems = [
  { label: "how I work", href: "#about" },
  { label: "work", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];

const linkClass = (active) =>
  cn(
    "font-display text-[0.92rem] transition-colors hover:text-foreground",
    active ? "text-foreground underline decoration-2 underline-offset-8" : "text-body"
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
      <nav className="mx-auto flex w-[min(1080px,calc(100%-3rem))] items-center justify-between gap-4 border-b py-5 max-md:py-4">
        <a href="#home" className="font-display text-[1.1rem] font-semibold tracking-[-0.02em] text-foreground">
          Ajay Kumar
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-5">{links()}</ul>
          <a
            href={resumeFile}
            target="_blank"
            rel="noreferrer"
            className="font-display text-[0.92rem] text-body transition-colors hover:text-foreground"
          >
            resume
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
            <SheetContent side="right" className="w-64">
              <SheetTitle className="px-4 pt-4 font-display">Ajay Kumar</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <ul className="grid gap-4 px-4 text-base">{links(() => setMenuOpen(false))}</ul>
              <a
                href={resumeFile}
                target="_blank"
                rel="noreferrer"
                className="px-4 font-display text-[0.92rem] text-body hover:text-foreground"
              >
                resume
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
