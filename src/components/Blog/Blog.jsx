import styles from "./Blog.module.css";

export const Blog = () => {
  return (
    <section className={styles.container} id="blog">
      <h2 className={styles.title}>Writing</h2>

      <div className={styles.entry}>
        <div className={styles.head}>
          <h3 className={styles.entryTitle}>The Data Diary</h3>
          <a href="https://the-data-diary.vercel.app/" target="_blank" rel="noreferrer">
            Read the blog
          </a>
        </div>
        <p className={styles.description}>
          A daily dev-log: what I build, what breaks, and what I learn fixing it &mdash;
          lakehouse builds, SQL practice, and notes from the field.
        </p>
      </div>
    </section>
  );
};
