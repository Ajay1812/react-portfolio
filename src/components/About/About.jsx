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
      text: "Recent work leans toward event streaming, lakehouse builds, and analytics systems rather than one-off UI demos.",
    },
  ];

  const workingStyle = [
    "Prefer repeatable orchestration over manual fixes.",
    "Build validation into the pipeline, not after the incident.",
    "Optimize for observability, maintainability, and cost awareness.",
  ];

  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>

      <div className={styles.content}>
        <p>
          Current work is centered on Databricks migration, PySpark
          development, Delta Lake workflows, and validation-first data
          pipelines.
        </p>
        <p>
          The portfolio focuses on cloud ETL, orchestration, and practical
          engineering systems rather than generic showcase projects.
        </p>

        <ul className={styles.workingStyle}>
          {workingStyle.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <ul className={styles.highlights}>
        {highlights.map((item) => (
          <li key={item.title} className={styles.highlight}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
