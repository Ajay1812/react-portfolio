import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { LineageGraph } from "./LineageGraph";

const stageNotes = [
  { id: "bronze", title: "Bronze", text: "Raw data lands exactly as it arrived: Kafka streams, S3 files, API pulls." },
  { id: "silver", title: "Silver", text: "PySpark and dbt clean it, and checks on row counts, columns and business rules run before anything moves on." },
  { id: "gold", title: "Gold", text: "Curated tables go to Athena, Redshift, Power BI or an app that people actually open." },
];

export const Hero = ({ activeSkills, onActivate }) => {
  return (
    <section id="home" className="grid gap-10 pb-20 pt-10 md:pt-16">
      <div className="grid gap-6">
        <h1 className="max-w-[18ch] text-[clamp(2.6rem,7vw,5rem)] leading-[1.02]">
          Pipelines that check their own work.
        </h1>
        <p className="max-w-[56ch] text-[1.1rem]">
          I&rsquo;m Ajay Kumar, a data engineer in Noida. I build lakehouse
          pipelines on Databricks and Spark across Azure and AWS, with
          validation built in before data reaches a dashboard.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button asChild size="lg">
            <a href="#projects">See the work</a>
          </Button>
          <Button asChild variant="link" className="px-0 text-body">
            <a href="mailto:a.kumar01c@gmail.com">Email me</a>
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <LineageGraph activeSkills={activeSkills} onActivate={onActivate} />
        <p className="text-[0.9rem] text-muted-foreground">
          Hover or focus a node to see which projects use it.
        </p>
        <dl className="grid gap-6 border-t pt-6 md:grid-cols-3">
          {stageNotes.map((s) => (
            <div key={s.id} className="grid content-start gap-1.5">
              <dt className="flex items-center gap-2 font-display text-[1rem] font-semibold text-foreground">
                <span className="size-2.5 rounded-full" style={{ background: `var(--${s.id})` }} aria-hidden="true" />
                {s.title}
              </dt>
              <dd className="text-[0.95rem]">{s.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

Hero.propTypes = {
  activeSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  onActivate: PropTypes.func.isRequired,
};
