"use client";

import { useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Counter, Magnetic, useStaggerIn } from "@/lib/motion";

const trackRecord = [
  { value: 100, suffix: " GB/day", note: "migrated to Databricks" },
  { value: 50, suffix: "+ tables", note: "DQ-checked every run" },
  { value: 50, prefix: "−", suffix: "% runtime", note: "after Spark tuning" },
  { value: 1, suffix: " book", note: "published on KDP" },
];

const stripGroups = [
  ["Databricks", "PySpark", "Delta Lake"],
  ["Airflow", "dbt", "Kafka"],
  ["Azure", "AWS", "SQL", "Python"],
];

export function Hero() {
  const ref = useRef(null);
  useStaggerIn(ref);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden">
      {/* glow orbs */}
      <div className="hero-glow animate-drift left-[-10%] top-[-10%] h-[480px] w-[480px] bg-[radial-gradient(circle,rgba(37,99,235,0.16),transparent_70%)]" />
      <div className="hero-glow animate-drift-slow right-[-8%] top-[20%] h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(124,58,237,0.12),transparent_70%)]" />

      <div className="relative mx-auto grid w-[min(1240px,calc(100%-2.5rem))] gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
        <div className="grid content-start gap-6">
          <Badge variant="accent" className="stagger-in w-fit">
            <span className="size-2 rounded-full bg-primary" />
            OPEN TO WORK · REMOTE
          </Badge>
          <h1 className="stagger-in text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.04]">
            Reliable data,
            <br />
            <span className="gradient-text">engineered.</span>
          </h1>
          <p className="stagger-in max-w-[46ch] text-[1.12rem] leading-relaxed text-muted-foreground">
            Data Engineer with 1.5 years building lakehouse pipelines on
            Databricks, PySpark and Delta Lake — quality checks inside every
            layer, dashboards people can trust.
          </p>
          <div className="stagger-in flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button asChild size="lg">
                <a href="#projects">
                  View my work <ArrowRight />
                </a>
              </Button>
            </Magnetic>
            <Magnetic strength={0.18}>
              <Button asChild variant="outline" size="lg">
                <a href="mailto:a.kumar01c@gmail.com">
                  <Mail /> Contact me
                </a>
              </Button>
            </Magnetic>
          </div>
        </div>

        <Card className="stagger-in glass shine-card p-8 md:p-10">
          <h2 className="text-[0.78rem] font-extrabold tracking-[0.3em] text-muted-foreground">
            TRACK RECORD
          </h2>
          <dl className="mt-6 grid gap-5">
            {trackRecord.map((row) => (
              <div
                key={row.note}
                className="flex items-baseline justify-between gap-6 border-b border-border pb-5 last:border-b-0 last:pb-0"
              >
                <dd className="text-[1.4rem] font-extrabold tracking-tight">
                  {row.prefix}
                  <Counter to={row.value} />
                  {row.suffix}
                </dd>
                <dt className="text-right text-[0.88rem] font-bold text-gold">
                  <span aria-hidden="true">▲ </span>
                  {row.note}
                </dt>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <div className="marquee-mask relative overflow-hidden bg-[#111418] text-white">
        <div className="animate-marquee flex w-max items-center py-5 text-[0.95rem]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {stripGroups.map((group) => (
                <p key={`${copy}-${group[0]}`} className="mx-8 whitespace-nowrap">
                  {group.map((s, j) => (
                    <span key={s}>
                      {j === 0 ? <b className="text-[#7dd3fc]">{s}</b> : s}
                      {j < group.length - 1 && <span className="text-white/50"> · </span>}
                    </span>
                  ))}
                  <span className="ml-16 text-white/25">✦</span>
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
