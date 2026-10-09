import PropTypes from "prop-types";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = ({ theme, activeSkills, onActivate }) => (
  <section id="projects" className="grid gap-8">
    <h2 className="text-[clamp(1.7rem,3.4vw,2.3rem)]">Selected work</h2>
    <ul className="grid">
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
