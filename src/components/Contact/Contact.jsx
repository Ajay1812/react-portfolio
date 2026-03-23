import styles from "./Contact.module.css";
import resumeFile from "../../data/Ajay Kumar - Resume_V4.pdf";

export const Contact = () => {
  const links = [
    {
      label: "LinkedIn",
      value: "linkedin",
      href: "https://www.linkedin.com/in/nf-analyst/?skipRedirect=true",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.83v1.64h.05c.53-1 1.84-2.05 3.79-2.05C21 8.59 21 11 21 14.12V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.22V21h-4z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "github",
      href: "https://github.com/Ajay1812",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.1c-3.34.73-4.04-1.43-4.04-1.43-.55-1.37-1.33-1.73-1.33-1.73-1.08-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.06 1.82 2.79 1.29 3.47.99.11-.77.42-1.29.75-1.58-2.67-.3-5.48-1.34-5.48-5.94 0-1.31.47-2.39 1.24-3.24-.13-.3-.54-1.53.12-3.2 0 0 1.01-.32 3.3 1.24a11.4 11.4 0 0 1 6 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.67.25 2.9.12 3.2.77.85 1.24 1.93 1.24 3.24 0 4.61-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.23v3.3c0 .32.21.69.83.58A12 12 0 0 0 12 .5z" />
        </svg>
      ),
    },
  ];

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <p className={styles.eyebrow}>Contact</p>
        <h2 className={styles.title}>Let’s connect.</h2>
        <p>
          Open to data engineering, Databricks, Spark, and cloud pipeline roles.
        </p>
      </div>

      <div className={styles.actions}>
        <a className={styles.primaryCta} href="mailto:a.kumar01c@gmail.com">
          <span className={styles.icon} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25zm2.17-.25L12 11.08 18.83 6.5zM19 7.52l-6.5 4.36a.9.9 0 0 1-1 0L5 7.52v9.73c0 .41.34.75.75.75h12.5c.41 0 .75-.34.75-.75z" />
            </svg>
          </span>
          email me
        </a>
        <a
          className={styles.secondaryCta}
          href={resumeFile}
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.icon} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M7.75 3h6.38c.73 0 1.42.29 1.94.8l3.12 3.12c.52.52.81 1.22.81 1.95v9.38A2.75 2.75 0 0 1 17.25 21H7.75A2.75 2.75 0 0 1 5 18.25V5.75A2.75 2.75 0 0 1 7.75 3m0 2a.75.75 0 0 0-.75.75v12.5c0 .41.34.75.75.75h9.5c.41 0 .75-.34.75-.75V9.5h-3.75A2.25 2.25 0 0 1 12 7.25V5zm6.25.44v1.81c0 .14.11.25.25.25h1.81zM9.5 12h5a1 1 0 1 1 0 2h-5a1 1 0 1 1 0-2m0 3h5a1 1 0 1 1 0 2h-5a1 1 0 1 1 0-2" />
            </svg>
          </span>
          resume
        </a>
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.label} className={styles.link}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
              >
                <span className={styles.icon} aria-hidden="true">{link.icon}</span>
                {link.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
