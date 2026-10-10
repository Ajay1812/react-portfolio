import skills from "../../data/skills.json";
import history from "../../data/history.json";

const stackGroups = [
  { title: "Primary stack", items: ["Databricks", "PySpark", "Delta Lake", "Apache Spark", "SQL", "Python", "Airflow", "Azure Data Factory", "ADLS Gen2"] },
  { title: "Cloud and platform", items: ["AWS Glue", "Athena", "Redshift", "dbt", "Kafka", "Snowflake", "Docker", "Linux"] },
  { title: "Also worked with", items: ["PostgreSQL", "MySQL", "MongoDB", "Cassandra", "Power BI", "Hadoop", "IBM Cognos"] },
];

const certifications = [
  "AWS Cloud Practitioner Essentials, Amazon Web Services",
  "IBM Data Engineering Professional Certificate and Data Warehousing Certificate, IBM on Coursera",
  "CS50's Introduction to Databases with SQL, CS50",
  "LangChain and LangGraph for Generative AI, CampusX",
];

export const Experience = () => {
  const groups = stackGroups.map((group) => ({
    ...group,
    skills: skills.filter((s) => group.items.includes(s.title)).map((s) => s.title),
  }));

  return (
    <section id="experience" className="grid gap-8">
      <h2 className="font-mono text-[clamp(1.5rem,3vw,2.1rem)]"><span className="text-accent-foreground">##</span> experience.log</h2>

      <ol className="relative ml-[7px] grid gap-10 border-l border-border pl-8">
        {history.map((item, index) => (
          <li key={`${item.organisation}-${item.startDate}`} className="relative grid gap-3">
            <span
              className={`absolute -left-[38px] top-[0.5rem] size-3 rounded-[3px] border border-border ${index === 0 ? "bg-gold" : "bg-silver"}`}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-[1.25rem] leading-snug">
                {item.role}, {item.organisation}
              </h3>
              <p className="text-[0.88rem] text-muted-foreground">
                {item.startDate} to {item.endDate}
              </p>
            </div>
            <p className="max-w-[62ch]">{item.summary}</p>
            <ul className="grid max-w-[62ch] list-disc gap-2 pl-5 text-[0.97rem] marker:text-silver">
              {item.experiences.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="grid gap-4 border-t border-border pt-8">
        <h3 className="text-[1.15rem]">Core stack</h3>
        <dl className="grid gap-3 text-[0.95rem]">
          {groups.map((group) => (
            <div key={group.title} className="grid gap-1 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4">
              <dt className="font-display text-muted-foreground">{group.title}</dt>
              <dd className="text-foreground">{group.skills.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid gap-4 border-t border-border pt-8">
        <h3 className="text-[1.15rem]">Education</h3>
        <p className="text-foreground">
          B.Tech in Computer Science Engineering, Hindustan College of Science
          and Technology, Mathura (2022)
        </p>
        <ul className="grid max-w-[62ch] list-disc gap-1.5 pl-5 text-[0.95rem] marker:text-silver">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
