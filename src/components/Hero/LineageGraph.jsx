import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EDGES, NODES, STAGES, TOOL_NODE } from "@/data/stack";

const H = 46;
const GAP = 22;
const NARROW_QUERY = "(max-width: 767px)";

function useIsNarrow() {
  const [narrow, setNarrow] = useState(() => window.matchMedia(NARROW_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(NARROW_QUERY);
    const onChange = () => setNarrow(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return narrow;
}

function buildLayout(narrow) {
  const byStage = STAGES.map((s) => NODES.filter((n) => n.stage === s.id));
  const pos = {};
  const headers = [];
  let bottom;
  let width;

  if (narrow) {
    width = 340;
    const step = 22 + H + 40;
    byStage.forEach((nodes, si) => {
      const w = (width - (nodes.length - 1) * 8) / nodes.length;
      const y = si * step + 22;
      headers.push({ ...STAGES[si], x: 0, y: y - 10 });
      nodes.forEach((n, i) => {
        pos[n.id] = { x: i * (w + 8), y, w, h: H };
      });
    });
    bottom = (STAGES.length - 1) * step + 22 + H;
  } else {
    width = 880;
    const colW = 210;
    const colX = [0, (width - colW) / 2, width - colW];
    const maxN = Math.max(...byStage.map((a) => a.length));
    const top = 34;
    byStage.forEach((nodes, si) => {
      const offset = ((maxN - nodes.length) * (H + GAP)) / 2;
      headers.push({ ...STAGES[si], x: colX[si], y: 14 });
      nodes.forEach((n, i) => {
        pos[n.id] = { x: colX[si], y: top + offset + i * (H + GAP), w: colW, h: H };
      });
    });
    bottom = top + maxN * H + (maxN - 1) * GAP;
  }

  const tool = { x: 0, y: bottom + 26, w: width, h: 36 };
  return { width, height: tool.y + tool.h + 2, pos, headers, tool, narrow };
}

function edgePath(a, b, narrow) {
  if (narrow) {
    const x1 = a.x + a.w / 2;
    const y1 = a.y + a.h;
    const x2 = b.x + b.w / 2;
    const y2 = b.y;
    const d = (y2 - y1) / 2;
    return `M${x1} ${y1} C${x1} ${y1 + d} ${x2} ${y2 - d} ${x2} ${y2}`;
  }
  const x1 = a.x + a.w;
  const y1 = a.y + a.h / 2;
  const x2 = b.x;
  const y2 = b.y + b.h / 2;
  const d = (x2 - x1) / 2;
  return `M${x1} ${y1} C${x1 + d} ${y1} ${x2 - d} ${y2} ${x2} ${y2}`;
}

const center = (p) => ({ x: p.x + p.w / 2, y: p.y + p.h / 2 });
const stageColor = (stage) => `var(--${stage})`;
const TRAVEL = ["kafka", "dbx", "delta", "bi"];

export function LineageGraph({ activeSkills, onActivate }) {
  const root = useRef(null);
  const narrow = useIsNarrow();
  const layout = buildLayout(narrow);
  const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));

  const hasActive = activeSkills.length > 0;
  const isLit = (match) => !hasActive || match.some((m) => activeSkills.includes(m));

  // The page's single orchestrated moment: layers appear, edges draw, one record
  // travels bronze -> silver -> gold.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const edges = gsap.utils.toArray("[data-edge]", root.current);
        edges.forEach((edge) => {
          const length = edge.getTotalLength();
          gsap.set(edge, { strokeDasharray: length, strokeDashoffset: length });
        });
        gsap.set("[data-node], [data-tool]", { autoAlpha: 0 });

        const first = center(layout.pos[TRAVEL[0]]);
        gsap.set("[data-dot]", { attr: { cx: first.x, cy: first.y, fill: stageColor("bronze") }, autoAlpha: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 0.15 });
        STAGES.forEach((stage) => {
          const stageEdges = `[data-edge][data-to="${stage.id}"]`;
          if (root.current.querySelector(stageEdges)) {
            tl.to(stageEdges, { strokeDashoffset: 0, duration: 0.5, stagger: 0.05 }, ">-0.1");
          }
          tl.to(`[data-node][data-stage="${stage.id}"]`, { autoAlpha: 1, duration: 0.4, stagger: 0.07 }, "<0.1");
        });
        tl.to("[data-tool]", { autoAlpha: 1, duration: 0.4 }, ">-0.2");

        tl.to("[data-dot]", { autoAlpha: 1, duration: 0.2 });
        TRAVEL.slice(1).forEach((id, i) => {
          const c = center(layout.pos[id]);
          const stage = nodeById[id].stage;
          tl.to("[data-dot]", { attr: { cx: c.x, cy: c.y, fill: stageColor(stage) }, duration: 0.7, ease: "power1.inOut" });
          if (i === TRAVEL.length - 2) tl.to("[data-dot]", { autoAlpha: 0, duration: 0.3 });
        });
      });
    },
    { scope: root, dependencies: [narrow], revertOnUpdate: true }
  );

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className="w-full"
      role="group"
      aria-label="Data lineage from raw sources through Databricks to served tables. Focus a node to see which projects use it."
    >
      {layout.headers.map((h) => (
        <g key={h.id}>
          <circle cx={h.x + 4} cy={h.y - 4} r="4" fill={stageColor(h.id)} />
          <text x={h.x + 14} y={h.y} className="fill-muted-foreground font-display text-[12px]">
            {h.label}
            <tspan className="font-serif italic"> · {h.note}</tspan>
          </text>
        </g>
      ))}

      {EDGES.map(([from, to]) => {
        const target = nodeById[to];
        const lit = !hasActive || isLit(nodeById[from].match) || isLit(target.match);
        return (
          <path
            key={`${from}-${to}`}
            data-edge
            data-to={target.stage}
            d={edgePath(layout.pos[from], layout.pos[to], layout.narrow)}
            fill="none"
            stroke={stageColor(target.stage)}
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ opacity: lit ? (hasActive ? 1 : 0.55) : 0.1, transition: "opacity 200ms" }}
          />
        );
      })}

      {NODES.map((n) => {
        const p = layout.pos[n.id];
        const lit = isLit(n.match);
        const hot = hasActive && lit;
        const interactive = n.match.length > 0;
        return (
          <g key={n.id} data-node data-stage={n.stage}>
            <g
              tabIndex={interactive ? 0 : undefined}
              aria-label={interactive ? `${n.label[0]}: highlight projects that use it` : `${n.label[0]}, ${n.label[1]}`}
              onMouseEnter={interactive ? () => onActivate(n.match) : undefined}
              onMouseLeave={interactive ? () => onActivate([]) : undefined}
              onFocus={interactive ? () => onActivate(n.match) : undefined}
              onBlur={interactive ? () => onActivate([]) : undefined}
              className="outline-none [&:focus-visible>rect:last-of-type]:stroke-[3]"
              style={{ opacity: lit ? 1 : 0.28, transition: "opacity 200ms", cursor: interactive ? "pointer" : "default" }}
            >
              <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="6" fill="var(--card)" />
              <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="6" fill={stageColor(n.stage)} style={{ opacity: hot ? 0.2 : 0.07, transition: "opacity 200ms" }} />
              <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="6" fill="none" stroke={stageColor(n.stage)} strokeWidth="1.5" />
              <text x={p.x + 12} y={p.y + 19} className="fill-foreground font-display text-[13px] font-semibold">
                {n.label[0]}
              </text>
              <text x={p.x + 12} y={p.y + 35} className="fill-muted-foreground font-serif text-[11px]">
                {n.label[1]}
              </text>
            </g>
          </g>
        );
      })}

      <g
        data-tool
        tabIndex={0}
        aria-label={`${TOOL_NODE.label[0]}: highlight projects that use it`}
        onMouseEnter={() => onActivate(TOOL_NODE.match)}
        onMouseLeave={() => onActivate([])}
        onFocus={() => onActivate(TOOL_NODE.match)}
        onBlur={() => onActivate([])}
        className="outline-none [&:focus-visible>rect]:stroke-[3]"
        style={{ opacity: isLit(TOOL_NODE.match) ? 1 : 0.28, transition: "opacity 200ms", cursor: "pointer" }}
      >
        <rect x={layout.tool.x} y={layout.tool.y} width={layout.tool.w} height={layout.tool.h} rx="6" fill="none" stroke="var(--silver)" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x={layout.tool.x + 12} y={layout.tool.y + 22} className="fill-foreground font-display text-[13px] font-semibold">
          {TOOL_NODE.label[0]}
          <tspan className="fill-muted-foreground font-serif text-[11px] font-normal"> · {TOOL_NODE.label[1]}</tspan>
        </text>
      </g>

      <circle data-dot r="5" cx="0" cy="0" fill="var(--bronze)" style={{ visibility: "hidden" }} pointerEvents="none" />
    </svg>
  );
}

LineageGraph.propTypes = {
  activeSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  onActivate: PropTypes.func.isRequired,
};
