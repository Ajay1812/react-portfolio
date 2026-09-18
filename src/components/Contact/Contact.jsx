import styles from "./Contact.module.css";
import resumeFile from "../../data/Ajay Kumar - Data Engineer.pdf";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nf-analyst/?skipRedirect=true",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.83v1.64h.05c.53-1 1.84-2.05 3.79-2.05C21 8.59 21 11 21 14.12V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.22V21h-4z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Ajay1812",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.1c-3.34.73-4.04-1.43-4.04-1.43-.55-1.37-1.33-1.73-1.33-1.73-1.08-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.06 1.82 2.79 1.29 3.47.99.11-.77.42-1.29.75-1.58-2.67-.3-5.48-1.34-5.48-5.94 0-1.31.47-2.39 1.24-3.24-.13-.3-.54-1.53.12-3.2 0 0 1.01-.32 3.3 1.24a11.4 11.4 0 0 1 6 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.67.25 2.9.12 3.2.77.85 1.24 1.93 1.24 3.24 0 4.61-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.23v3.3c0 .32.21.69.83.58A12 12 0 0 0 12 .5z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@DataPipelineDiaries",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.9 4.75 12 4.75 12 4.75s-5.9 0-7.64.49a2.75 2.75 0 0 0-1.94 1.95A28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.95c1.74.49 7.64.49 7.64.49s5.9 0 7.64-.49a2.75 2.75 0 0 0 1.94-1.95c.32-1.58.47-3.2.42-4.81a28.6 28.6 0 0 0-.42-4.81M9.9 15.02V8.98L15.27 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/datapipelinediaries/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.5.5.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53c.64-.25 1.37-.42 2.43-.47C8.94.01 9.28 0 12 0zm0 5.35a6.65 6.65 0 1 0 0 13.3 6.65 6.65 0 0 0 0-13.3M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8m6.9-1.85a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0" />
      </svg>
    ),
  },
];

export const Contact = () => {
  return (
    <footer id="contact" className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <h2 className={styles.title}>Let&rsquo;s connect</h2>
          <p className={styles.description}>
            Open to data engineering, Databricks, Spark, and cloud pipeline
            roles.
          </p>
        </div>

        <div className={styles.actions}>
          <a className={styles.primaryLink} href="mailto:a.kumar01c@gmail.com">
            Email me
          </a>
          <a
            className={styles.primaryLink}
            href={resumeFile}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>

          <ul className={styles.socials}>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.meta}>
          &copy; {new Date().getFullYear()} Ajay Kumar
        </p>
      </div>
    </footer>
  );
};
