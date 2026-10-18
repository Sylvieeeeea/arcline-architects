import type { ReactNode } from "react";
import type { ArtTone, ArtVariant } from "@/types/content";

/**
 * Generated architectural-drawing placeholders.
 *
 * These stand in for photography until real images are supplied. They are
 * original compositions (no third-party artwork) drawn from the brand palette,
 * and are deterministic: the same `seed` always produces the same drawing.
 */

type Palette = { bg: string; ink: string; f1: string; f2: string; accent: string };

const palettes: Record<ArtTone, Palette> = {
  light: { bg: "#dcd4c6", ink: "#242522", f1: "#f6f4ef", f2: "#8c8b83", accent: "#777b65" },
  dark: { bg: "#242522", ink: "#dcd4c6", f1: "#5c5b54", f2: "#777b65", accent: "#f6f4ef" },
  olive: { bg: "#777b65", ink: "#242522", f1: "#dcd4c6", f2: "#f6f4ef", accent: "#242522" },
};

/** Small deterministic PRNG (mulberry32). */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Draw = (r: () => number, p: Palette) => ReactNode;

const elevation: Draw = (r, p) => {
  const ground = 600;
  const baseX = 150 + r() * 100;
  const baseW = 460 + r() * 180;
  const baseH = 170 + r() * 40;
  const upX = baseX + 140 + r() * 120;
  const upW = 380 + r() * 160;
  const upH = 120 + r() * 50;
  const louvreCount = 14;
  return (
    <>
      <circle cx="950" cy="230" r="110" fill="none" stroke={p.ink} strokeWidth="1.5" opacity="0.7" />
      <rect x={upX} y={ground - baseH - upH} width={upW} height={upH} fill={p.f2} stroke={p.ink} strokeWidth="2" />
      {Array.from({ length: louvreCount }, (_, i) => {
        const x = upX + 20 + (i * (upW - 40)) / (louvreCount - 1);
        return (
          <line key={i} x1={x} x2={x} y1={ground - baseH - upH + 14} y2={ground - baseH - 14} stroke={p.ink} strokeWidth="1" opacity="0.55" />
        );
      })}
      <rect x={baseX} y={ground - baseH} width={baseW} height={baseH} fill={p.f1} stroke={p.ink} strokeWidth="2" />
      <rect x={baseX + 30} y={ground - baseH + 40} width={baseW * 0.55} height="70" fill={p.bg} stroke={p.ink} strokeWidth="1.5" />
      <rect x={baseX + baseW * 0.72} y={ground - 110} width="52" height="110" fill={p.f2} stroke={p.ink} strokeWidth="1.5" />
      <line x1="0" x2="1200" y1={ground} y2={ground} stroke={p.ink} strokeWidth="2" />
      {Array.from({ length: 24 }, (_, i) => (
        <line key={i} x1={i * 52 + 20} x2={i * 52} y1={ground + 4} y2={ground + 38} stroke={p.ink} strokeWidth="1" opacity="0.25" />
      ))}
    </>
  );
};

const tower: Draw = (r, p) => {
  const ground = 620;
  const volumes = Array.from({ length: 4 }, (_, i) => ({
    x: 250 + i * 215,
    w: 150 + r() * 45,
    h: 260 + r() * 170,
    fill: i % 2 === 0 ? p.f1 : p.f2,
  }));
  return (
    <>
      <circle cx="1000" cy="290" r="170" fill="none" stroke={p.ink} strokeWidth="1.5" opacity="0.6" />
      {volumes.map((v, i) => {
        const top = 540 - v.h;
        const floors = Math.floor((540 - top) / 22);
        return (
          <g key={i}>
            <rect x={v.x} y={top} width={v.w} height={540 - top} fill={v.fill} stroke={p.ink} strokeWidth="2" />
            {Array.from({ length: floors - 1 }, (_, k) => (
              <line key={k} x1={v.x} x2={v.x + v.w} y1={top + (k + 1) * 22} y2={top + (k + 1) * 22} stroke={p.ink} strokeWidth="1" opacity="0.4" />
            ))}
            <line x1={v.x + v.w * 0.5} x2={v.x + v.w * 0.5} y1={top} y2={540} stroke={p.ink} strokeWidth="1" opacity="0.3" />
          </g>
        );
      })}
      <rect x="120" y="540" width="960" height="80" fill={p.f1} stroke={p.ink} strokeWidth="2" />
      <line x1="0" x2="1200" y1={ground} y2={ground} stroke={p.ink} strokeWidth="2" />
    </>
  );
};

const plan: Draw = (r, p) => {
  const vx = 200 + 300 + r() * 120;
  const h1 = 300 + r() * 90;
  const h2 = 420 + r() * 80;
  const door = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x - 6} y={y} width="12" height="70" fill={p.f1} />
      <line x1={x} y1={y} x2={x + 70} y2={y} stroke={p.ink} strokeWidth="1.5" />
      <path d={`M${x + 70} ${y} A70 70 0 0 1 ${x} ${y + 70}`} fill="none" stroke={p.ink} strokeWidth="1.25" />
    </g>
  );
  return (
    <>
      <line x1="200" x2="1000" y1="110" y2="110" stroke={p.ink} strokeWidth="1" opacity="0.6" />
      <line x1="200" x2="200" y1="100" y2="120" stroke={p.ink} strokeWidth="1" opacity="0.6" />
      <line x1="1000" x2="1000" y1="100" y2="120" stroke={p.ink} strokeWidth="1" opacity="0.6" />
      <rect x="200" y="150" width="800" height="500" fill={p.f1} stroke={p.ink} strokeWidth="9" />
      <rect x={vx + 60} y={h1 + 50} width={1000 - vx - 120} height={h2 - h1 - 100} fill="none" stroke={p.ink} strokeWidth="1.5" strokeDasharray="8 7" opacity="0.7" />
      <line x1={vx} x2={vx} y1="150" y2="650" stroke={p.ink} strokeWidth="6" />
      <line x1={vx} x2="1000" y1={h1} y2={h1} stroke={p.ink} strokeWidth="6" />
      <line x1="200" x2={vx} y1={h2} y2={h2} stroke={p.ink} strokeWidth="6" />
      {door(vx, h2 + 40)}
      {door(vx, 200)}
      <rect x={vx + 70} y="146" width="110" height="8" fill={p.f2} stroke={p.ink} strokeWidth="1.5" />
      <rect x="296" y="646" width="150" height="8" fill={p.f2} stroke={p.ink} strokeWidth="1.5" />
      <circle cx="400" cy="300" r="46" fill="none" stroke={p.ink} strokeWidth="1.25" opacity="0.6" />
    </>
  );
};

const section: Draw = (r, p) => {
  const slope = (x: number) => 300 + (x - 60) * (420 / 1100);
  const levels = 4;
  const jitter = r() * 20;
  return (
    <>
      <circle cx="1000" cy="170" r="95" fill="none" stroke={p.ink} strokeWidth="1.5" opacity="0.6" />
      <polygon points="60,300 1160,720 1160,780 60,780" fill={p.f2} opacity="0.55" />
      {Array.from({ length: levels }, (_, i) => {
        const x = 150 + i * 210;
        const slabY = slope(x) - 14 - jitter * (i % 2);
        return (
          <g key={i}>
            <rect x={x + 14} y={slabY - 92} width="352" height="92" fill={p.f1} stroke={p.ink} strokeWidth="1.5" />
            <rect x={x + 50} y={slabY - 70} width="120" height="46" fill={p.bg} stroke={p.ink} strokeWidth="1.25" />
            <rect x={x} y={slabY} width="380" height="14" fill={p.ink} />
            <line x1={x + 190} x2={x + 190} y1={slabY + 14} y2={slope(x + 190) + 40} stroke={p.ink} strokeWidth="2" />
          </g>
        );
      })}
      <line x1="60" y1="300" x2="1160" y2="720" stroke={p.ink} strokeWidth="2" />
    </>
  );
};

const interior: Draw = (r, p) => {
  const off = (r() - 0.5) * 60;
  const ax = 600 + off;
  return (
    <>
      <polygon points="0,0 360,210 360,550 0,800" fill={p.f1} opacity="0.55" />
      <polygon points="1200,0 840,210 840,550 1200,800" fill={p.f1} opacity="0.4" />
      <polygon points="0,0 1200,0 840,210 360,210" fill={p.f2} opacity="0.35" />
      <polygon points="0,800 1200,800 840,550 360,550" fill={p.f2} opacity="0.55" />
      <rect x="360" y="210" width="480" height="340" fill={p.f1} stroke={p.ink} strokeWidth="2" />
      <path d={`M${ax - 80} 550V380A80 80 0 0 1 ${ax + 80} 380V550Z`} fill={p.bg} stroke={p.ink} strokeWidth="2" />
      <polygon points={`${ax - 80},550 ${ax + 80},550 ${ax + 300},800 ${ax - 240},800`} fill={p.accent} opacity="0.22" />
      <rect x="430" y="508" width="120" height="42" fill={p.f2} stroke={p.ink} strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={360 + i * 120} x2={i * 300} y1="550" y2="800" stroke={p.ink} strokeWidth="1" opacity="0.35" />
      ))}
      <line x1="0" y1="0" x2="360" y2="210" stroke={p.ink} strokeWidth="1.5" />
      <line x1="1200" y1="0" x2="840" y2="210" stroke={p.ink} strokeWidth="1.5" />
      <line x1="0" y1="800" x2="360" y2="550" stroke={p.ink} strokeWidth="1.5" />
      <line x1="1200" y1="800" x2="840" y2="550" stroke={p.ink} strokeWidth="1.5" />
    </>
  );
};

const landscape: Draw = (r, p) => (
  <>
    <circle cx="960" cy="200" r="90" fill={p.f2} opacity="0.5" />
    {Array.from({ length: 10 }, (_, i) => {
      const y0 = 130 + i * 62;
      const a = y0 - 60 + r() * 40;
      const b = y0 + 50 - r() * 40;
      return (
        <path
          key={i}
          d={`M-20 ${y0} C250 ${a}, 500 ${b}, 760 ${y0 - 10} S1050 ${y0 + 40}, 1220 ${y0 - 20}`}
          fill="none"
          stroke={p.ink}
          strokeWidth="1.5"
          opacity="0.5"
        />
      );
    })}
    <path d="M220 800C300 620 520 560 600 470" fill="none" stroke={p.ink} strokeWidth="2" strokeDasharray="6 9" />
    <rect x="400" y="450" width="400" height="18" fill={p.f1} stroke={p.ink} strokeWidth="1.5" />
    <line x1="440" x2="440" y1="390" y2="450" stroke={p.ink} strokeWidth="3" />
    <line x1="760" x2="760" y1="390" y2="450" stroke={p.ink} strokeWidth="3" />
    <rect x="420" y="378" width="360" height="12" fill={p.ink} />
  </>
);

const drawings: Record<ArtVariant, Draw> = { elevation, tower, plan, section, interior, landscape };

type ProjectArtProps = {
  variant: ArtVariant;
  tone: ArtTone;
  seed: number;
  className?: string;
};

/** Renders a decorative drawing. Wrap in an element with role="img" and an accessible label. */
export function ProjectArt({ variant, tone, seed, className }: ProjectArtProps) {
  const palette = palettes[tone];
  const random = rng(seed * 9973 + variant.length);
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="1200" height="800" fill={palette.bg} />
      {drawings[variant](random, palette)}
    </svg>
  );
}
