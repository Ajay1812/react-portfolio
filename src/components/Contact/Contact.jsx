import styles from "./Contact.module.css";

export const Contact = () => {
  const links = [
    { label: "Email", value: "a.kumar01c@gmail.com", href: "mailto:a.kumar01c@gmail.com" },
    {
      label: "LinkedIn",
      value: "linkedin",
      href: "https://www.linkedin.com/in/nf-analyst/?skipRedirect=true",
    },
    {
      label: "GitHub",
      value: "github",
      href: "https://github.com/Ajay1812",
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
          email me
        </a>
        <ul className={styles.links}>
          {links.slice(1).map((link) => (
            <li key={link.label} className={styles.link}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
