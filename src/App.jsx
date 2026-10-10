import { useEffect, useState } from "react";
import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Projects/Projects";

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem("portfolio-theme");

  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  // Terminal design reads best dark; light is the day-shift variant via the toggle.
  return "dark";
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeSkills, setActiveSkills] = useState([]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <div className="relative min-h-screen w-full bg-background">
      {/* Terminal window chrome */}
      <div className="border-b border-border bg-card" aria-hidden="true">
        <div className="mx-auto flex w-[min(1280px,calc(100%-2.5rem))] items-center gap-2 py-2.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-4 truncate font-mono text-[0.8rem] text-muted-foreground">
            ajay@databricks: ~/portfolio — zsh
          </span>
          <span className="ml-auto hidden rounded border border-border px-2 py-0.5 font-mono text-[0.75rem] text-muted-foreground sm:block">
            ⎇ main
          </span>
        </div>
      </div>

      <Navbar
        theme={theme}
        onToggleTheme={() =>
          setTheme((currentTheme) =>
            currentTheme === "dark" ? "light" : "dark"
          )
        }
      />

      <main className="mx-auto w-[min(1280px,calc(100%-2.5rem))] pb-24">
        <Hero activeSkills={activeSkills} onActivate={setActiveSkills} />

        <div className="grid gap-x-12 gap-y-20 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="grid min-w-0 gap-24">
            <Projects theme={theme} activeSkills={activeSkills} onActivate={setActiveSkills} />
            <About />
            <Experience />
          </div>
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;
