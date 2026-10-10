import PropTypes from "prop-types";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = ({ theme, activeSkills, onActivate }) => (
  <section id="projects" className="grid gap-8">
    <h2 className="font-mono text-[clamp(1.5rem,3vw,2.1rem)]"><span className="text-accent-foreground">##</span> selected_work</h2>
    <ul className="grid gap-5 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.title}
          project={project}
          theme={theme}
          activeSkills={activeSkills}
          onActivate={onActivate}
        />
      ))}
    </ul>
  </section>
);

Projects.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]).isRequired,
  activeSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  onActivate: PropTypes.func.isRequired,
};
