import PropTypes from "prop-types";
import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export const ProjectPreview = ({ open, onOpenChange, title, architecture, story, theme, source, demo, demoType }) => {
  const views = typeof architecture === "string" ? [{ slug: architecture, label: "Architecture" }] : architecture;
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const view = views[active] ?? views[0];

  return (
  <Dialog
    open={open}
    onOpenChange={(next) => {
      if (!next) setAutoplay(false);
      onOpenChange(next);
    }}
  >
    <DialogContent
      // Keep focus on the dialog, not the iframe, so Escape and the close button work.
      onOpenAutoFocus={(event) => {
        event.preventDefault();
        event.currentTarget.focus();
      }}
      className="grid h-[94vh] max-w-[98vw] grid-rows-[auto_minmax(0,1fr)] gap-2 p-3 sm:max-w-[min(98vw,1500px)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pr-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <DialogTitle className="text-[1.1rem]">{title}</DialogTitle>
          {views.length > 1 ? (
            <div className="flex gap-1" role="group" aria-label="Diagram views">
              {views.map((v, i) => (
                <Button
                  key={v.slug}
                  size="sm"
                  variant={i === active ? "secondary" : "ghost"}
                  aria-pressed={i === active}
                  onClick={() => {
                    setActive(i);
                    setAutoplay(false);
                  }}
                >
                  {v.label}
                </Button>
              ))}
            </div>
          ) : (
            <DialogDescription className="text-[0.85rem]">Architecture preview</DialogDescription>
          )}
        </div>
        <div className="flex items-center gap-1">
          {story ? (
            <Button size="sm" onClick={() => setAutoplay(true)}>
              <Play /> Play story
            </Button>
          ) : null}
          <Button asChild variant="outline" size="sm">
            <a href={`/architecture/${view.slug}.html?theme=${theme}`} target="_blank" rel="noreferrer">
              <ExternalLink /> Open full page
            </a>
          </Button>
          <Button asChild variant="link" size="sm">
            <a href={source} target="_blank" rel="noreferrer">Code on GitHub</a>
          </Button>
          {demo ? (
            <Button asChild variant="link" size="sm">
              <a href={demo} target="_blank" rel="noreferrer">
                {demoType === "video" ? "Watch the demo" : "Open live site"}
              </a>
            </Button>
          ) : null}
        </div>
      </div>
      <div className="min-h-0 overflow-auto rounded-md border bg-background">
      <iframe
        title={`${title} ${view.label.toLowerCase()} diagram`}
        key={`${view.slug}-${autoplay}`}
        src={`/architecture/${view.slug}.html?theme=${theme}${autoplay ? "&play=1" : ""}`}
        className="block h-full w-full min-w-[960px] bg-background"
        onLoad={(event) => {
          // Same-origin: forward Escape from inside the diagram so it still closes the dialog.
          event.currentTarget.contentWindow?.addEventListener("keydown", (e) => {
            if (e.key === "Escape") onOpenChange(false);
          });
        }}
      />
      </div>
    </DialogContent>
  </Dialog>
  );
};

ProjectPreview.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  architecture: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.shape({ slug: PropTypes.string, label: PropTypes.string })),
  ]).isRequired,
  story: PropTypes.bool.isRequired,
  theme: PropTypes.oneOf(["dark", "light"]).isRequired,
  source: PropTypes.string.isRequired,
  demo: PropTypes.string,
  demoType: PropTypes.oneOf(["video", "live"]),
};
