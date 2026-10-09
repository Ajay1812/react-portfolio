import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { STAGES, STAGE_OF } from "@/data/stack";
import { getImageUrl } from "../../utilis";
import { Lightbox } from "./Lightbox";
import { ProjectPreview } from "./ProjectPreview";

export const ProjectCard = ({
  project: { title, description, skills, demo, demoType, source, images, architecture, channel, story },
  theme,
  activeSkills,
  onActivate,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const imageUrls = (images ?? []).map((path) => getImageUrl(path));

  const dimmed = activeSkills.length > 0 && !skills.some((s) => activeSkills.includes(s));
  const lanes = [
    ...STAGES.map((s) => ({ ...s, items: skills.filter((k) => STAGE_OF[k] === s.id) })),
    { id: "tooling", label: "tooling", items: skills.filter((k) => !STAGE_OF[k]) },
  ].filter((lane) => lane.items.length > 0);

  return (
    <li
      className="group relative grid gap-6 border-t py-8 transition-opacity duration-200 last:border-b md:grid-cols-[minmax(0,1fr)_15rem] md:gap-10"
      style={{ opacity: dimmed ? 0.4 : 1 }}
      onMouseEnter={() => onActivate(skills)}
      onMouseLeave={() => onActivate([])}
      onFocus={() => onActivate(skills)}
      onBlur={() => onActivate([])}
    >
      <div className="grid content-start gap-3">
        <h3 className="text-[1.5rem] leading-tight group-hover:underline group-hover:decoration-silver group-hover:underline-offset-4">{title}</h3>
        <p className="max-w-[62ch]">{description}</p>
        <div className="-ml-3 flex flex-wrap items-center">
          {architecture ? (
            <Button
              variant="link"
              size="sm"
              className="cursor-pointer after:absolute after:inset-0 after:content-['']"
              onClick={() => setPreviewOpen(true)}
            >
              Preview architecture
            </Button>
          ) : null}
          <Button asChild variant="link" size="sm" className="relative z-10">
            <a href={source} target="_blank" rel="noreferrer">Code on GitHub</a>
          </Button>
          {imageUrls.length > 0 ? (
            <Button variant="link" size="sm" className="relative z-10" onClick={() => setLightboxIndex(0)}>
              View screenshots
            </Button>
          ) : null}
          {channel ? (
            <Button asChild variant="link" size="sm" className="relative z-10">
              <a href={channel.href} target="_blank" rel="noreferrer">{channel.label}</a>
            </Button>
          ) : null}
          {demo ? (
            <Button asChild variant="link" size="sm" className="relative z-10">
              <a href={demo} target="_blank" rel="noreferrer">
                {demoType === "video" ? "Watch the demo" : "Open live site"}
              </a>
            </Button>
          ) : null}
        </div>
      </div>

      <dl className="grid content-start gap-3 text-[0.9rem]">
        {lanes.map((lane) => (
          <div key={lane.id} className="flex gap-3">
            <dt className="flex w-[4.6rem] shrink-0 items-center gap-2 font-display text-muted-foreground">
              <span
                className="size-2 rounded-full"
                style={{ background: lane.id === "tooling" ? "transparent" : `var(--${lane.id})`, border: lane.id === "tooling" ? "1.5px dashed var(--silver)" : "none" }}
                aria-hidden="true"
              />
              {lane.label}
            </dt>
            <dd className="text-foreground">{lane.items.join(", ")}</dd>
          </div>
        ))}
      </dl>

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

      <Lightbox
        images={imageUrls}
        index={lightboxIndex ?? 0}
        open={lightboxIndex !== null}
        title={title}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </li>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    demo: PropTypes.string,
    demoType: PropTypes.oneOf(["video", "live"]),
    source: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
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
