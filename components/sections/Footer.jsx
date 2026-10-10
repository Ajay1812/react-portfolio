"use client";

import { BookOpen, Github, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/lib/motion";

const socialLinks = [
  { label: "Blog — The Data Diary", href: "https://the-data-diary.vercel.app/", Icon: BookOpen },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nf-analyst/?skipRedirect=true", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/Ajay1812", Icon: Github },
  { label: "YouTube", href: "https://www.youtube.com/@DataPipelineDiaries", Icon: Youtube },
  { label: "Instagram", href: "https://www.instagram.com/datapipelinediaries/", Icon: Instagram },
];

export function Footer() {
  return (
    <footer id="contact" className="mx-auto w-[min(1240px,calc(100%-2.5rem))] pb-14">
      <Reveal>
        <div className="relative grid gap-8 overflow-hidden rounded-3xl bg-[#111418] p-10 text-white md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-14">
          <div
            className="hero-glow left-[10%] top-[-40%] h-[380px] w-[380px] bg-[radial-gradient(circle,rgba(37,99,235,0.35),transparent_70%)]"
            aria-hidden="true"
          />
          <h2 className="relative text-[clamp(1.9rem,4vw,2.8rem)] leading-tight text-white">
            Hire the engineer who <span className="gradient-text">proves</span> his data.
          </h2>
          <div className="relative grid content-start gap-6">
            <Button asChild size="lg" className="px-8">
              <a href="mailto:a.kumar01c@gmail.com">a.kumar01c@gmail.com</a>
            </Button>
            <ul className="flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                      <Icon />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
      <p className="pt-8 text-center text-[0.85rem] text-muted-foreground">
        &copy; {new Date().getFullYear()} Ajay Kumar · Built with Next.js, shadcn &amp; GSAP
      </p>
    </footer>
  );
}
