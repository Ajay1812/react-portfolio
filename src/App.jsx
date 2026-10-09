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

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
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
      <Navbar
        theme={theme}
        onToggleTheme={() =>
          setTheme((currentTheme) =>
            currentTheme === "dark" ? "light" : "dark"
          )
        }
      />

      <main className="mx-auto w-[min(1080px,calc(100%-3rem))] pb-24">
        <Hero activeSkills={activeSkills} onActivate={setActiveSkills} />

        <div className="grid gap-x-16 gap-y-20 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="grid min-w-0 gap-24">
            <About />
            <Projects theme={theme} activeSkills={activeSkills} onActivate={setActiveSkills} />
            <Experience />
          </div>
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;
