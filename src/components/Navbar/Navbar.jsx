import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Navbar.module.css";
import resumeFile from "../../data/Ajay Kumar - Data Engineer.pdf";

const navItems = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "blog", href: "https://the-data-diary.vercel.app/", external: true },
  { label: "contact", href: "#contact" },
];

export const Navbar = ({ theme, onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.wrapper}>
      <nav className={styles.navbar}>
        <a className={styles.brand} href="#home">
          Ajay Kumar
        </a>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((currentState) => !currentState)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? "close" : "menu"}
        </button>

        <div className={`${styles.actions} ${menuOpen ? styles.actionsOpen : ""}`}>
          <ul className={styles.links} onClick={() => setMenuOpen(false)}>
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.controls}>
            <a
              className={styles.resumeLink}
              href={resumeFile}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Resume
            </a>

            <button
              type="button"
              className={styles.themeButton}
              onClick={() => {
                onToggleTheme();
                setMenuOpen(false);
              }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 4.5V2m0 20v-2.5M4.5 12H2m20 0h-2.5M5.64 5.64 3.87 3.87m16.26 16.26-1.77-1.77M5.64 18.36l-1.77 1.77M20.13 3.87l-1.77 1.77M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.74 14.51a8.5 8.5 0 0 1-10.25-10.25.75.75 0 0 0-.94-.94A10 10 0 1 0 21.68 15.45a.75.75 0 0 0-.94-.94" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]).isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};
