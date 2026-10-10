"use client";

import { useState } from "react";
import { Bot, Database, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal, Tilt } from "@/lib/motion";
import { ArchModal } from "./ArchModal";
import projects from "@/data/projects.json";

const tabs = [
  { id: "all", label: "All" },
  { id: "lakehouse", label: "Lakehouse" },
  { id: "streaming", label: "Streaming" },
  { id: "genai", label: "GenAI" },
];

const categoryIcons = { lakehouse: Database, streaming: Radio, genai: Bot };

function archSrc(arch, theme) {
  if (!arch) return null;
  const slug = Array.isArray(arch) ? arch[0].slug : arch;
  return `/architecture/${slug}.html?theme=${theme}`;
}

function archViews(arch) {
  if (!arch) return [];
  return Array.isArray(arch) ? arch : [{ label: "Architecture", slug: arch }];
}

export function Projects() {
  const [tab, setTab] = useState("all");
  const [modal, setModal] = useState(null);

  const openModal = (project) =>
    setModal({
      title: project.title,
      views: archViews(project.architecture),
      source: project.source,
      dark: document.documentElement.classList.contains("dark"),
    });

  const visible = tab === "all" ? projects : projects.filter((p) => p.category === tab);

  return (
    <section id="projects" className="mx-auto w-[min(1240px,calc(100%-2.5rem))] py-14 md:py-20">
      <Reveal>
        <h2 className="text-[0.85rem] font-extrabold tracking-[0.3em] text-primary">
          SELECTED WORK
        </h2>
      </Reveal>

      <Reveal delay={0.08} className="mt-7">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            {tabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </Reveal>

      <ul key={tab} className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => {
          const Icon = categoryIcons[project.category] || Database;
          const views = archViews(project.architecture);
          return (
            <Reveal key={project.title} delay={Math.min(i * 0.06, 0.24)} className="h-full">
              <Tilt className="h-full">
              <Card
                className={`shine-card group flex h-full flex-col gap-3 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(37,99,235,0.16)] ${
                  views.length ? "cursor-pointer" : ""
                }`}
                onClick={(e) => {
                  if (!views.length || e.target.closest("a")) return;
                  openModal(project);
                }}
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-6" />
                </span>
                <h3 className="text-[1.3rem]">{project.title}</h3>
                <p className="line-clamp-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                {project.outcome && (
                  <p className="text-[0.9rem] font-bold text-gold">✓ {project.outcome}</p>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                  {views.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal(project)}
                    >
                      Preview architecture
                    </Button>
                  )}
                  <Button asChild variant="link" size="sm" className="px-0">
                    <a href={project.source} target="_blank" rel="noreferrer">
                      Code on GitHub
                    </a>
                  </Button>
                  {project.channel && (
                    <Button asChild variant="link" size="sm" className="px-0">
                      <a href={project.channel.href} target="_blank" rel="noreferrer">
                        {project.channel.label}
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button asChild variant="link" size="sm" className="px-0">
                      <a href={project.demo} target="_blank" rel="noreferrer">
                        {project.demoType === "video" ? "Watch the demo" : "Open live site"}
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
              </Tilt>
            </Reveal>
          );
        })}
      </ul>

      {modal && (
        <ModalWithViews
          title={modal.title}
          views={modal.views}
          source={modal.source}
          dark={modal.dark}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}

function ModalWithViews({ title, views, source, dark, onClose }) {
  const [view, setView] = useState(0);
  const theme = dark ? "dark" : "light";
  return (
    <>
      {views.length > 1 && (
        <div className="fixed bottom-6 left-1/2 z-[101] flex -translate-x-1/2 gap-2">
          {views.map((v, i) => (
            <Badge
              key={v.slug}
              variant={i === view ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setView(i)}
            >
              {v.label}
            </Badge>
          ))}
        </div>
      )}
      <ArchModal
        open
        onClose={onClose}
        title={views.length > 1 ? `${title} — ${views[view].label}` : title}
        src={`/architecture/${views[view].slug}.html?theme=${theme}`}
        source={source}
      />
    </>
  );
}
