import skills from "../../data/skills.json";
import history from "../../data/history.json";
import styles from "./Experience.module.css";

const stackGroups = [
  {
    title: "Lakehouse",
    items: ["Databricks", "PySpark", "Delta Lake", "Apache Spark", "ADLS Gen2"],
  },
  {
    title: "Orchestration",
    items: ["Airflow", "Kafka", "Azure Data Factory", "AWS Glue", "Docker"],
  },
  {
    title: "Query + Storage",
    items: [
      "Athena",
      "Redshift",
      "SQL",
      "PostgreSQL",
      "MongoDB",
      "Power BI",
      "Python",
    ],
  },
];

export const Experience = () => {
  const groupedSkills = stackGroups.map((group) => ({
    ...group,
    skills: skills.filter((skill) => group.items.includes(skill.title)),
  }));

  return (
    <section className={styles.container} id="experience">
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>Experience</p>
        <h2 className={styles.title}>Career progression and core stack.</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.stackPanel}>
          <div className={styles.stackIntro}>
            <span className={styles.panelLabel}>core_stack</span>
            <h3>Databricks, Spark, orchestration, and analytics tooling.</h3>
          </div>

          <div className={styles.skillGroups}>
            {groupedSkills.map((group) => (
              <div key={group.title} className={styles.skillGroup}>
                <div className={styles.skillGroupHeader}>
                  <span>{group.title}</span>
                  <strong>{group.skills.length}</strong>
                </div>
                <div className={styles.skillChips}>
                  {group.skills.map((skill) => (
                    <span key={skill.title} className={styles.skillChip}>
                      {skill.title}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ul className={styles.history}>
          {history.map((historyItem, index) => (
            <li
              key={`${historyItem.organisation}-${historyItem.startDate}`}
              className={styles.historyItem}
            >
              <span
                className={`${styles.stageBadge} ${
                  index === 0 ? styles.currentBadge : styles.previousBadge
                }`}
              >
                {index === 0 ? "Current" : "Previous"}
              </span>

              <div className={styles.historyHead}>
                <div className={styles.historyRole}>
                  <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                  <p className={styles.historyDates}>
                    {historyItem.startDate} - {historyItem.endDate}
                  </p>
                </div>
              </div>

              <p className={styles.historySummary}>{historyItem.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
