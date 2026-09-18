import styles from "./Hero.module.css";
import { getImageUrl } from "../../utilis";

const focusAreas = ["Databricks", "PySpark", "Delta Lake", "Airflow", "Kafka", "Azure + AWS"];

export const Hero = () => {
  return (
    <section className={styles.container} id="home">
      <div className={styles.profileRow}>
        <img
          src={getImageUrl("hero/profile.png")}
          alt="Ajay Kumar"
          className={styles.profileImg}
        />
        <p className={styles.kicker}>Data engineer, based in Noida</p>
      </div>

      <h1 className={styles.title}>
        I build data pipelines, lakehouse workflows, and cloud ETL systems.
      </h1>

      <p className={styles.description}>
        Focused on lakehouse pipelines, pipeline validation, and
        orchestration-heavy data systems across Azure and AWS &mdash; from
        Databricks migrations to streaming ingestion.
      </p>

      <div className={styles.buttonContainer}>
        <a href="#projects" className={styles.primaryBtn}>
          View projects
        </a>
        <a href="mailto:a.kumar01c@gmail.com" className={styles.secondaryBtn}>
          Contact me
        </a>
      </div>

      <ul className={styles.focusRow}>
        {focusAreas.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
};
