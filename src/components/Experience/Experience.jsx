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
    title: "Query + storage",
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
      <h2 className={styles.title}>Experience</h2>

      <ol className={styles.history}>
        {history.map((historyItem, index) => (
          <li
            key={`${historyItem.organisation}-${historyItem.startDate}`}
            className={styles.historyItem}
          >
            <span className={styles.historyIndex}>0{index + 1}</span>
            <div className={styles.historyBody}>
              <div className={styles.historyHead}>
                <h3>
                  {historyItem.role}, {historyItem.organisation}
                </h3>
                <p className={styles.historyDates}>
                  {historyItem.startDate} &ndash; {historyItem.endDate}
                </p>
              </div>
              <p className={styles.historySummary}>{historyItem.summary}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.stack}>
        <h3 className={styles.stackHeading}>Core stack</h3>
        <div className={styles.skillGroups}>
          {groupedSkills.map((group) => (
            <div key={group.title} className={styles.skillGroup}>
              <span className={styles.skillGroupTitle}>{group.title}</span>
              <p className={styles.skillList}>
                {group.skills.map((skill) => skill.title).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
