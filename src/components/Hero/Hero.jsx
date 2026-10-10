import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { LineageGraph } from "./LineageGraph";
import resumeFile from "../../data/Ajay Kumar - Data Engineer.pdf";

const stageNotes = [
  { id: "bronze", title: "Bronze", text: "Raw data lands exactly as it arrived: Kafka streams, S3 files, API pulls." },
  { id: "silver", title: "Silver", text: "PySpark and dbt clean it, and checks on row counts, columns and business rules run before anything moves on." },
  { id: "gold", title: "Gold", text: "Curated tables go to Athena, Redshift, Power BI or an app that people actually open." },
];

// Proof points a recruiter can verify in the Experience / Selected work sections below.
const proofPoints = [
  { value: "100 GB/day", label: "Informatica ETL migrated to Databricks" },
  { value: "50+ tables", label: "under data-quality checks before publish" },
  { value: "40–50%", label: "faster pipelines after Spark tuning" },
  { value: "exit 0", label: "author, Data Engineering Interview Prep" },
];

const outputLines = [
  { key: "migration", value: "Informatica → Databricks · 100 GB/day · +40% perf" },
  { key: "validation", value: "row-count + column checks + SQL rules · 50+ tables" },
  { key: "tuning", value: "Spark jobs −50% runtime" },
];

export const Hero = ({ activeSkills, onActivate }) => {
  return (
    <section id="home" className="grid gap-10 pb-20 pt-10 md:pt-14">
      <div className="grid gap-6">
        <p className="font-mono text-[0.95rem] text-muted-foreground" aria-label="whoami command">
          <span className="font-bold text-accent-foreground">➜ ~</span>{" "}
          whoami --role &quot;Data Engineer&quot; --location &quot;Noida, IN&quot;
          <span className="term-cursor" aria-hidden="true" />
        </p>
        <h1 className="max-w-[18ch] text-[clamp(2.5rem,6.5vw,4.6rem)] leading-[1.05]">
          Pipelines that{" "}
          <span className="text-accent-foreground">check</span> their{" "}
          <span className="text-secondary">own work.</span>
        </h1>
        <p className="max-w-[58ch] text-[1.05rem]">
          Data Engineer with 1.5 years building lakehouse pipelines on
          Databricks, PySpark and Delta Lake across Azure and AWS — validation
          built in before data reaches a dashboard, not bolted on after an
          incident. Open to <strong className="font-bold text-foreground">Data Engineer and
          Analytics Engineer</strong> roles: Noida (hybrid / on-site) and remote across India.
        </p>

        <div className="grid gap-1 border-l-2 border-border pl-5 font-mono text-[0.92rem]" aria-label="Career highlights">
          {outputLines.map((line) => (
            <p key={line.key} className="text-muted-foreground">
              <span className="text-secondary">{line.key}</span>
              {" ......... "}
              <span className="text-foreground">{line.value}</span>
            </p>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Button asChild size="lg">
            <a href="#projects">$ view --work</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={resumeFile} target="_blank" rel="noreferrer">$ cat resume.pdf</a>
          </Button>
          <Button asChild variant="link" className="px-0">
            <a href="mailto:a.kumar01c@gmail.com">$ mail ajay</a>
          </Button>
          <Button asChild variant="link" className="px-0">
            <a href="https://www.linkedin.com/in/nf-analyst/" target="_blank" rel="noreferrer">linkedin ↗</a>
          </Button>
        </div>

        {/* Compact contact row for small screens: the full contact sidebar sits
            after Experience in the stacked layout, so this keeps Email/Resume
            one tap away at the top on mobile. Hidden once the sidebar shows. */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 font-mono text-[0.9rem] lg:hidden">
          <span className="font-bold text-accent-foreground">status: open-to-work</span>
          <a className="underline decoration-2 underline-offset-4" href="mailto:a.kumar01c@gmail.com">email</a>
          <a className="underline decoration-2 underline-offset-4" href={resumeFile} target="_blank" rel="noreferrer">resume</a>
          <a className="underline decoration-2 underline-offset-4" href="https://www.linkedin.com/in/nf-analyst/" target="_blank" rel="noreferrer">linkedin</a>
          <a className="underline decoration-2 underline-offset-4" href="https://github.com/Ajay1812" target="_blank" rel="noreferrer">github</a>
        </div>

        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {proofPoints.map((point) => (
            <div key={point.label} className="grid content-start gap-1 rounded-lg border border-border bg-card p-3.5">
              <dt className="sr-only">{point.label}</dt>
              <dd className="font-mono text-[1.25rem] font-extrabold leading-none text-foreground">{point.value}</dd>
              <dd className="text-[0.85rem] font-medium leading-snug text-muted-foreground">{point.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid gap-6">
        <LineageGraph activeSkills={activeSkills} onActivate={onActivate} />
        <p className="font-mono text-[0.85rem] text-muted-foreground">
          <span className="text-accent-foreground">#</span> tap, hover or focus a node to see which projects use it
        </p>
        <dl className="grid gap-6 border-t border-border pt-6 md:grid-cols-3">
          {stageNotes.map((s) => (
            <div key={s.id} className="grid content-start gap-1.5">
              <dt className="flex items-center gap-2 font-mono text-[0.98rem] font-bold text-foreground">
                <span className="size-2.5 rounded-[3px] border border-border" style={{ background: `var(--${s.id})` }} aria-hidden="true" />
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
