import styles from "./Blog.module.css";

const topics = ["lakehouse builds", "sql practice", "what broke and why"];

export const Blog = () => {
  return (
    <section className={styles.container} id="blog">
      <h2 className={styles.title}>Writing</h2>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h3 className={styles.entryTitle}>The Data Diary</h3>
          <p className={styles.description}>
            A daily dev-log: what I build, what breaks, and what I learn
            fixing it.
          </p>

          <ul className={styles.topics}>
            {topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>

        <a
          className={styles.cta}
          href="https://the-data-diary.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          Read the blog
        </a>
      </div>
    </section>
  );
};
