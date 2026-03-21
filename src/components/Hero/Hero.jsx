import styles from "./Hero.module.css";
import { getImageUrl } from "../../utilis";

const commandLines = [
  {
    command: "dbx deploy --target production",
    output: "quality gates passed · bronze -> silver -> gold",
  },
  {
    command: "spark-submit jobs/stream_processor.py",
    output: "kafka ingestion active · throughput stabilized",
  },
  {
    command: "airflow dags trigger reddit_etl",
    output: "s3 -> glue -> athena -> redshift",
  },
];

const focusAreas = [
  "Databricks",
  "PySpark",
  "Delta Lake",
  "Airflow",
  "Kafka",
  "Azure + AWS",
];

const statCards = [
  { value: "Lakehouse", label: "medallion pipelines and validation" },
  { value: "Streaming", label: "event ingestion and near real-time analytics" },
  { value: "Cloud ETL", label: "Azure + AWS production workflows" },
];

const codeLines = [
  {
    line: "01",
    segments: [
      { tone: "keyword", text: "pipeline" },
      { tone: "plain", text: " = build_flow(" },
      { tone: "string", text: '"telemetry"' },
      { tone: "plain", text: ")" },
    ],
  },
  {
    line: "02",
    segments: [
      { tone: "plain", text: "  ." },
      { tone: "keyword", text: "source" },
      { tone: "plain", text: "(" },
      { tone: "string", text: '"kafka://cityflux"' },
      { tone: "plain", text: ")" },
    ],
  },
  {
    line: "03",
    segments: [
      { tone: "plain", text: "  ." },
      { tone: "keyword", text: "validate" },
      { tone: "plain", text: "(" },
      { tone: "string", text: '"row_counts + schema + business_rules"' },
      { tone: "plain", text: ")" },
    ],
  },
  {
    line: "04",
    segments: [
      { tone: "plain", text: "  ." },
      { tone: "keyword", text: "transform" },
      { tone: "plain", text: "(" },
      { tone: "callout", text: '"bronze -> silver -> gold"' },
      { tone: "plain", text: ")" },
    ],
  },
  {
    line: "05",
    segments: [
      { tone: "plain", text: "  ." },
      { tone: "keyword", text: "publish" },
      { tone: "plain", text: "(" },
      { tone: "string", text: '"athena, redshift, powerbi"' },
      { tone: "plain", text: ")" },
    ],
  },
];

export const Hero = () => {
  return (
    <section className={styles.container} id="home">
      <div className={styles.copyColumn}>
        <p className={styles.kicker}>Data engineer / Databricks / PySpark / Cloud ETL</p>

        <h1 className={styles.title}>
          Hi, I am Ajay.
          <span className={styles.titleAccent}>
            I build data pipelines, lakehouse workflows, and cloud ETL systems.
          </span>
        </h1>

        <p className={styles.description}>
          Focused on lakehouse pipelines, pipeline validation, and orchestration-heavy
          data systems across Azure and AWS.
        </p>

        <div className={styles.buttonContainer}>
          <a href="#projects" className={styles.primaryBtn}>
            View Projects
          </a>
          <a href="mailto:a.kumar01c@gmail.com" className={styles.secondaryBtn}>
            Contact Me
          </a>
        </div>

        <div className={styles.focusRow}>
          {focusAreas.map((item) => (
            <span key={item} className={styles.focusChip}>
              {item}
            </span>
          ))}
        </div>

        <div className={styles.metaGrid}>
          <div className={styles.metaCard}>
            <span>current role</span>
            <strong>Data Engineer</strong>
          </div>
          <div className={styles.metaCard}>
            <span>core stack</span>
            <strong>Databricks + Spark</strong>
          </div>
          <div className={styles.metaCard}>
            <span>focus</span>
            <strong>Cloud pipelines and validation</strong>
          </div>
        </div>
      </div>

      <div className={styles.workspace}>
        <div className={styles.workspaceHeader}>
          <div className={styles.workspaceLabel}>
            <span>workspace</span>
            <strong>portfolio.console</strong>
          </div>
          <div className={styles.windowDots} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className={styles.workspaceBody}>
          <div className={styles.profileCard}>
            <div className={styles.profileImageWrap}>
              <img
                src={getImageUrl("hero/profile.png")}
                alt="Ajay Kumar portrait"
                className={styles.heroImg}
              />
            </div>
            <div className={styles.profileCopy}>
              <p className={styles.profileName}>Ajay Kumar</p>
              <p className={styles.profileRole}>Data Engineer / Lakehouse Builder</p>
              <div className={styles.profileTags}>
                <span>azure</span>
                <span>aws</span>
                <span>batch + streaming</span>
              </div>
            </div>
          </div>

          <div className={styles.codeCard}>
            <div className={styles.codeHeader}>
              <span>pipeline.py</span>
              <span>lineage-ready</span>
            </div>

            <div className={styles.codeBlock}>
              {codeLines.map((line) => (
                <div key={line.line} className={styles.codeLine}>
                  <span className={styles.lineNumber}>{line.line}</span>
                  <p className={styles.codeText}>
                    {line.segments.map((segment, index) => (
                      <span
                        key={`${line.line}-${index}`}
                        className={styles[segment.tone]}
                      >
                        {segment.text}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.metricsGrid}>
            {statCards.map((card) => (
              <div key={card.value} className={styles.metricCard}>
                <strong>{card.value}</strong>
                <span>{card.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.terminalCard}>
            {commandLines.map((line) => (
              <div key={line.command} className={styles.terminalLine}>
                <p className={styles.command}>
                  <span className={styles.prompt}>ajay@portfolio:~$</span> {line.command}
                </p>
                <p className={styles.output}>{line.output}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
