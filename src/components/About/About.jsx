const principles = [
  "Prefer repeatable orchestration over manual fixes.",
  "Build validation into the pipeline, not after the incident.",
  "Optimize for observability, maintainability, and cost awareness.",
];

export const About = () => (
  <section id="about" className="grid gap-8">
    <h2 className="font-mono text-[clamp(1.5rem,3vw,2.1rem)]"><span className="text-accent-foreground">##</span> how_i_work</h2>
    <p className="max-w-[60ch]">
      Right now that means Databricks migration, PySpark development, Delta
      Lake workflows, and pipelines that prove their data is right before they
      publish it.
    </p>
    <ul className="grid">
      {principles.map((line, i) => (
        <li
          key={line}
          className="flex items-baseline gap-4 border-t border-border py-5 font-mono text-[clamp(1.02rem,2vw,1.25rem)] font-medium leading-snug text-foreground last:border-b"
        >
          <span className="shrink-0 font-bold text-accent-foreground" aria-hidden="true">
            rule_0{i + 1}:
          </span>
          {line}
        </li>
      ))}
    </ul>
  </section>
);
