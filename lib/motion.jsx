"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureGSAP() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

/** Fade-up reveal on scroll. */
export function Reveal({ children, className, delay = 0, y = 28, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    ensureGSAP();
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = 1;
      return;
    }
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={`reveal ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

/** Stagger children on mount (hero entrance). */
export function useStaggerIn(ref, selector = ".stagger-in", stagger = 0.12) {
  useEffect(() => {
    ensureGSAP();
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll(selector).forEach((el) => (el.style.opacity = 1));
      return;
    }
    const tween = gsap.fromTo(
      root.querySelectorAll(selector),
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.9, stagger, ease: "power3.out", delay: 0.1 }
    );
    return () => tween.kill();
  }, [ref, selector, stagger]);
}

/** Animated counter. `to` is a number; renders into the element's text. */
export function Counter({ to, className }) {
  const ref = useRef(null);
  useEffect(() => {
    ensureGSAP();
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = to;
      return;
    }
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: to,
      duration: 1.6,
      ease: "power2.out",
      delay: 0.4,
      onUpdate: () => {
        el.textContent = Math.round(obj.v);
      },
    });
    return () => tween.kill();
  }, [to]);
  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

/** 3D tilt on hover — subtle premium card feel. */
export function Tilt({ children, className, max = 7, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    ensureGSAP();
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const strength = max;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, {
        rotateY: px * strength,
        rotateX: -py * strength,
        transformPerspective: 900,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    const onLeave = () =>
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.6)" });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return (
    <div ref={ref} className={`tilt ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

/** Magnetic pull toward the cursor for CTAs. */
export function Magnetic({ children, className, strength = 0.25, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    ensureGSAP();
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}

/** Thin gradient progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    ensureGSAP();
    const el = ref.current;
    if (!el) return;
    const tween = gsap.to(el, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
