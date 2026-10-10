"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ mode: "system", setMode: () => {} });

export function useThemeMode() {
  return useContext(ThemeContext);
}

function resolveDark(mode) {
  if (mode === "dark") return true;
  if (mode === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("system");

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme-mode");
    if (stored === "light" || stored === "dark" || stored === "system") {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    const apply = () => document.documentElement.classList.toggle("dark", resolveDark(mode));
    apply();
    localStorage.setItem("portfolio-theme-mode", mode);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => mode === "system" && apply();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode]);

  return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>;
}

/** Inline head script: sets the theme class before first paint (no flash). */
export function ThemeInitScript() {
  const code = `(function(){try{var m=localStorage.getItem("portfolio-theme-mode")||"system";var dark=m==="dark"||(m==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",dark);}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
