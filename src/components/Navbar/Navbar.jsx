import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Navbar.module.css";

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
              className={styles.githubLink}
              href="https://github.com/Ajay1812"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              github
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
