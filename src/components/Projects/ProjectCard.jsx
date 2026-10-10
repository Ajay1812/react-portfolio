import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { STAGES, STAGE_OF } from "@/data/stack";
import { ProjectPreview } from "./ProjectPreview";

export const ProjectCard = ({
  project: { title, description, outcome, skills, demo, demoType, source, architecture, channel, story },
  theme,
  activeSkills,
  onActivate,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  const dimmed = activeSkills.length > 0 && !skills.some((s) => activeSkills.includes(s));
  const lanes = [
    ...STAGES.map((s) => ({ ...s, items: skills.filter((k) => STAGE_OF[k] === s.id) })),
    { id: "tooling", label: "tooling", items: skills.filter((k) => !STAGE_OF[k]) },
  ].filter((lane) => lane.items.length > 0);

  return (
    <li
      className={`group relative flex flex-col gap-4 rounded-lg border border-border bg-card p-5 transition-colors duration-200 hover:border-ring ${architecture ? "cursor-pointer" : ""}`}
      style={{ opacity: dimmed ? 0.4 : 1 }}
      onMouseEnter={() => onActivate(skills)}
      onMouseLeave={() => onActivate([])}
      onFocus={() => onActivate(skills)}
      onBlur={() => onActivate([])}
      onClick={(event) => {
        // Whole card opens the architecture preview; real links keep their own
        // targets. The dialog renders in a React portal, so its clicks bubble
        // back here — never let them re-open (that broke the close button).
        if (!architecture) return;
        if (event.target.closest("a, [role='dialog']")) return;
        setPreviewOpen(true);
      }}
    >
      <div className="grid content-start gap-2.5">
        <h3 className="font-mono text-[1.3rem] leading-tight group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4"><span className="text-accent-foreground">$</span> {title}</h3>
        <p className="text-[0.95rem]">{description}</p>
        {outcome ? (
          <p className="font-mono text-[0.9rem] text-muted-foreground"><span className="font-bold text-accent-foreground">[ok]</span> {outcome}</p>
        ) : null}
      </div>

      <dl className="grid content-start gap-2 border-t border-border pt-3.5 text-[0.85rem]">
        {lanes.map((lane) => (
          <div key={lane.id} className="flex gap-3">
            <dt className="flex w-[4.6rem] shrink-0 items-center gap-2 font-mono text-muted-foreground">
              <span
                className="size-2.5 shrink-0 rounded-[3px] border border-border"
                style={{ background: lane.id === "tooling" ? "transparent" : `var(--${lane.id})`, borderStyle: lane.id === "tooling" ? "dashed" : "solid" }}
                aria-hidden="true"
              />
              {lane.label}
            </dt>
            <dd className="text-foreground">{lane.items.join(", ")}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-1">
        {architecture ? (
          <Button
            size="sm"
            className="cursor-pointer"
            onClick={() => setPreviewOpen(true)}
          >
            Preview architecture
          </Button>
        ) : null}
        <Button asChild variant="link" size="sm">
          <a href={source} target="_blank" rel="noreferrer">Code on GitHub</a>
        </Button>
        {channel ? (
          <Button asChild variant="link" size="sm">
            <a href={channel.href} target="_blank" rel="noreferrer">{channel.label}</a>
          </Button>
        ) : null}
        {demo ? (
          <Button asChild variant="link" size="sm">
            <a href={demo} target="_blank" rel="noreferrer">
              {demoType === "video" ? "Watch the demo" : "Open live site"}
            </a>
          </Button>
        ) : null}
      </div>

      {architecture ? (
        <ProjectPreview
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          title={title}
          architecture={architecture}
          story={story !== false}
          theme={theme}
          source={source}
          demo={demo}
          demoType={demoType}
        />
      ) : null}
    </li>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    outcome: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    demo: PropTypes.string,
    demoType: PropTypes.oneOf(["video", "live"]),
    source: PropTypes.string.isRequired,
    architecture: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.shape({ slug: PropTypes.string, label: PropTypes.string })),
    ]),
    story: PropTypes.bool,
    channel: PropTypes.shape({ label: PropTypes.string, href: PropTypes.string }),
  }).isRequired,
  theme: PropTypes.oneOf(["dark", "light"]).isRequired,
  activeSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  onActivate: PropTypes.func.isRequired,
};
