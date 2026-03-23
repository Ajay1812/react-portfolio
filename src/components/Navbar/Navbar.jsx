import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Navbar.module.css";
import resumeFile from "../../data/Ajay Kumar - Resume_V4.pdf";

const navItems = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export const Navbar = ({ theme, onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.wrapper}>
      <nav className={styles.navbar}>
        <a className={styles.brand} href="#home">
          <span className={styles.brandPrompt}>~/ajay</span>
          <span className={styles.brandSuffix}>data.engineer</span>
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
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.themeButton}
              onClick={() => {
                onToggleTheme();
                setMenuOpen(false);
              }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span className={styles.themeDot} aria-hidden="true" />
              <span>theme:{theme}</span>
            </button>

            <a
              className={styles.resumeLink}
              href={resumeFile}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.resumeIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M7.75 3h6.38c.73 0 1.42.29 1.94.8l3.12 3.12c.52.52.81 1.22.81 1.95v9.38A2.75 2.75 0 0 1 17.25 21H7.75A2.75 2.75 0 0 1 5 18.25V5.75A2.75 2.75 0 0 1 7.75 3m0 2a.75.75 0 0 0-.75.75v12.5c0 .41.34.75.75.75h9.5c.41 0 .75-.34.75-.75V9.5h-3.75A2.25 2.25 0 0 1 12 7.25V5zm6.25.44v1.81c0 .14.11.25.25.25h1.81zM9.5 12h5a1 1 0 1 1 0 2h-5a1 1 0 1 1 0-2m0 3h5a1 1 0 1 1 0 2h-5a1 1 0 1 1 0-2" />
                </svg>
              </span>
              resume
            </a>
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
