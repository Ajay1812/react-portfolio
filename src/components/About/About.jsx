const principles = [
  "Prefer repeatable orchestration over manual fixes.",
  "Build validation into the pipeline, not after the incident.",
  "Optimize for observability, maintainability, and cost awareness.",
];

export const About = () => (
  <section id="about" className="grid gap-8">
    <h2 className="text-[clamp(1.7rem,3.4vw,2.3rem)]">How I work</h2>
    <p className="max-w-[60ch]">
      Right now that means Databricks migration, PySpark development, Delta
      Lake workflows, and pipelines that prove their data is right before they
      publish it.
    </p>
    <ul className="grid">
      {principles.map((line) => (
        <li
          key={line}
          className="border-t py-5 font-display text-[clamp(1.2rem,2.4vw,1.55rem)] font-medium leading-snug tracking-[-0.01em] text-foreground last:border-b"
        >
          {line}
        </li>
      ))}
    </ul>
  </section>
);
