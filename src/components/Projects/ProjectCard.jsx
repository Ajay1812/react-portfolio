import PropTypes from "prop-types";
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({ project: { title, description, skills, demo, source }, index }) => {
  return (
    <li className={styles.container}>
      <span className={styles.index}>0{index}</span>

      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.links}>
            <a href={source} target="_blank" rel="noreferrer">
              Code
            </a>
            {demo ? (
              <a href={demo} target="_blank" rel="noreferrer">
                Demo
              </a>
            ) : null}
          </div>
        </div>

        <p className={styles.description}>{description}</p>
        <p className={styles.skills}>{skills.join(", ")}</p>
      </div>
    </li>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    demo: PropTypes.string,
    source: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
