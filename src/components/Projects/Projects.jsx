import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  return (
    <section className={styles.container} id="projects">
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>Selected Work</p>
        <h2 className={styles.title}>Projects that look and behave like engineering systems.</h2>
      </div>

      <div className={styles.projects}>
        {projects.map((project, id) => (
          <ProjectCard key={project.title} project={project} index={id + 1} />
        ))}
      </div>
    </section>
  );
};
