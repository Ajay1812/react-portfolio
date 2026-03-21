import PropTypes from "prop-types";
import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utilis";

const projectNotes = {
  "CityFlux Event Streaming": {
    mode: "Streaming",
    command: "docker compose up kafka spark-worker",
    output: "vehicle + gps + weather events flowing into analytics layers",
  },
  "RedditFlow Scalable ETL": {
    mode: "Batch ETL",
    command: "airflow dags trigger reddit_pipeline",
    output: "ingest -> transform -> warehouse-ready reporting tables",
  },
  "Airflow Docker Projects": {
    mode: "Local Airflow",
    command: "docker compose up airflow-webserver airflow-scheduler",
    output: "repeatable local experimentation for pipeline development",
  },
};

const GithubMark = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.repoIcon}>
    <path
      fill="currentColor"
      d="M8 0C3.58 0 0 3.67 0 8.2c0 3.63 2.29 6.71 5.47 7.8.4.08.55-.18.55-.4 0-.2-.01-.86-.01-1.56-2.01.38-2.53-.51-2.69-.97-.09-.24-.46-.97-.79-1.17-.27-.15-.65-.54-.01-.55.61-.01 1.05.58 1.2.82.69 1.18 1.8.85 2.24.65.07-.51.27-.85.49-1.05-1.78-.2-3.64-.92-3.64-4.08 0-.9.31-1.64.82-2.21-.08-.21-.36-1.05.08-2.18 0 0 .67-.22 2.2.84A7.42 7.42 0 0 1 8 3.79c.68 0 1.37.09 2.01.28 1.53-1.07 2.2-.84 2.2-.84.44 1.13.16 1.97.08 2.18.51.57.82 1.3.82 2.21 0 3.17-1.87 3.88-3.65 4.08.29.26.54.75.54 1.51 0 1.09-.01 1.96-.01 2.23 0 .22.15.49.55.4A8.19 8.19 0 0 0 16 8.2C16 3.67 12.42 0 8 0Z"
    />
  </svg>
);

export const ProjectCard = ({ project: { title, imageSrc, description, skills, demo, source }, index }) => {
  const note = projectNotes[title] ?? {
    mode: "pipeline",
    command: "open README.md",
    output: "project details and setup",
  };

  return (
    <article className={styles.container}>
      <div className={styles.visualColumn}>
        <div className={styles.imageWrap}>
          <img
            src={getImageUrl(imageSrc)}
            alt={`Visual for ${title}`}
            className={styles.image}
          />
          <div className={styles.imageOverlay} />
          <div className={styles.commandBar}>
            <p className={styles.commandLine}>
              <span>$</span> {note.command}
            </p>
            <p className={styles.commandOutput}>{note.output}</p>
          </div>
        </div>
      </div>

      <div className={styles.detailsColumn}>
        <div className={styles.header}>
          <div>
            <p className={styles.projectTag}>Case Study 0{index}</p>
            <h3 className={styles.title}>{title}</h3>
          </div>
          <span className={styles.modeTag}>{note.mode}</span>
        </div>

        <p className={styles.description}>{description}</p>

        <ul className={styles.skills}>
          {skills.map((skill) => (
            <li key={skill} className={styles.skill}>
              {skill}
            </li>
          ))}
        </ul>

        <div className={styles.links}>
          {demo ? (
            <a href={demo} className={styles.link} target="_blank" rel="noreferrer">
              live
            </a>
          ) : (
            <span className={styles.mutedLink}>source-only</span>
          )}
          <a
            href={source}
            className={`${styles.link} ${styles.repoLink}`}
            target="_blank"
            rel="noreferrer"
          >
            <GithubMark />
            <span>Code</span>
          </a>
        </div>
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    demo: PropTypes.string,
    source: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
