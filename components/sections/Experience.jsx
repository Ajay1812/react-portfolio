"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/lib/motion";
import history from "@/data/history.json";

const skillChips = [
  "Databricks",
  "PySpark",
  "Delta Lake",
  "dbt",
  "Airflow",
  "Kafka",
  "SQL",
  "Python",
  "Azure",
  "AWS",
];

export function Experience() {
  return (
    <section id="experience" className="mx-auto w-[min(1240px,calc(100%-2.5rem))] py-14 md:py-20">
      <Reveal>
        <h2 className="text-[0.85rem] font-extrabold tracking-[0.3em] text-primary">
          EXPERIENCE
        </h2>
      </Reveal>

      <ol className="mt-8 grid gap-5 md:grid-cols-2">
        {history.map((item, i) => (
          <Reveal key={item.organisation} delay={i * 0.08}>
            <Card className="shine-card h-full p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(37,99,235,0.14)]">
              <h3 className="text-[1.3rem]">Data Engineer — {item.organisation}</h3>
              <p className="mt-1.5 text-[0.8rem] font-extrabold tracking-[0.15em] text-primary">
                {item.startDate.toUpperCase()} – {item.endDate.toUpperCase()}
              </p>
              <Separator className="my-4" />
              <p className="text-[0.97rem] leading-relaxed text-muted-foreground">
                {item.experiences[0]}
              </p>
            </Card>
          </Reveal>
        ))}
      </ol>

      <div id="skills" className="mt-14">
        <Reveal>
          <h3 className="text-[0.85rem] font-extrabold tracking-[0.3em] text-primary">
            SKILLS
          </h3>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {skillChips.map((chip, i) => (
              <Badge
                key={chip}
                variant="secondary"
                className="px-5 py-2.5 text-[0.92rem] normal-case tracking-normal transition-all hover:scale-105 hover:bg-accent hover:text-accent-foreground"
                style={{ transitionDelay: `${Math.min(i * 15, 150)}ms` }}
              >
                {chip}
              </Badge>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
