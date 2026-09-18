import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Projects</h2>

      <ul className={styles.list}>
        {projects.map((project, id) => (
          <ProjectCard key={project.title} project={project} index={id + 1} />
        ))}
      </ul>
    </section>
  );
};
