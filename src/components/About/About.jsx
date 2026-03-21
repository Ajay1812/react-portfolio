import styles from "./About.module.css";

export const About = () => {
  const highlights = [
    {
      title: "Databricks engineering",
      text: "Hands-on with Databricks, Delta Lake, PySpark, and Spark SQL for modernization, medallion architecture, and durable production pipelines.",
    },
    {
      title: "Cloud data platforms",
      text: "Comfortable across Azure and AWS data services including ADF, ADLS Gen2, Glue, Athena, Redshift, and Docker-based local environments.",
    },
    {
      title: "Pipeline-first projects",
      text: "Recent GitHub work leans toward event streaming, ETL orchestration, and analytics systems rather than one-off UI demos.",
    },
  ];

  const workingStyle = [
    "Prefer repeatable orchestration over manual fixes.",
    "Build validation into the pipeline, not after the incident.",
    "Optimize for observability, maintainability, and cost awareness.",
  ];

  return (
    <section className={styles.container} id="about">
      <div className={styles.header}>
        <p className={styles.eyebrow}>About</p>
        <h2 className={styles.title}>Focused on data workflows that stay clean, scalable, and easy to operate.</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.copyPanel}>
          <div className={styles.copyBlock}>
            <span className={styles.panelLabel}>Focus</span>
            <p>
              Current work is centered on Databricks migration, PySpark
              development, Delta Lake workflows, and validation-first data
              pipelines.
            </p>
            <p>
              The portfolio focuses on cloud ETL, orchestration, and practical
              engineering systems rather than generic showcase projects.
            </p>
          </div>

          <div className={styles.statementCard}>
            <span className={styles.statementLabel}>working_style.sh</span>
            <div className={styles.statementLines}>
              {workingStyle.map((item) => (
                <p key={item}>
                  <span>$</span> {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <ul className={styles.aboutItems}>
          {highlights.map((item, index) => (
            <li key={item.title} className={styles.aboutItem}>
              <span className={styles.indexMarker}>0{index + 1}</span>
              <div className={styles.aboutItemText}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
