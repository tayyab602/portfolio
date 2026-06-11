import { useEffect, useRef } from "react";

const TECHS = [
  { label: "JS",       color: "#f7df1e", text: "#000" },
  { label: "HTML",     color: "#e34c26", text: "#fff" },
  { label: "CSS",      color: "#264de4", text: "#fff" },
  { label: "Flutter",  color: "#54c5f8", text: "#000" },
  { label: "Dart",     color: "#00b4ab", text: "#fff" },
  { label: "MongoDB",  color: "#4db33d", text: "#fff" },
  { label: "Firebase", color: "#ffca28", text: "#000" },
  { label: "MySQL",    color: "#00758f", text: "#fff" },
  { label: "Express",  color: "#aaaaaa", text: "#000" },
  { label: "C++",      color: "#9b4dca", text: "#fff" },
  { label: "Java",     color: "#f89820", text: "#fff" },
];

const ORB_RADIUS = 32;
const ATTRACT = 0.018;
const REPEL_DIST = ORB_RADIUS * 2.8;
const DAMPING = 0.82;

interface Orb {
  x: number; y: number;
  vx: number; vy: number;
  tx: number; ty: number;
  label: string; color: string; text: string;
}

export function TechOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafId = useRef<number>(0);
  const orbs = useRef<Orb[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const container = containerRef.current!;

    const setup = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      orbs.current = TECHS.map((t, i) => {
        const angle = (i / TECHS.length) * Math.PI * 2;
        const r = Math.min(cx, cy) * 0.55;
        return {
          x: cx + Math.cos(angle) * r + (Math.random() - 0.5) * 40,
          y: cy + Math.sin(angle) * r + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          tx: cx, ty: cy,
          label: t.label, color: t.color, text: t.text,
        };
      });
    };
    setup();

    const ro = new ResizeObserver(setup);
    ro.observe(container);

    ctx.font = `bold 11px 'Space Grotesk', monospace`;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      const os = orbs.current;

      for (let i = 0; i < os.length; i++) {
        const a = os[i];
        a.tx = cx; a.ty = cy;

        // attract to centre
        a.vx += (a.tx - a.x) * ATTRACT;
        a.vy += (a.ty - a.y) * ATTRACT;

        // repel from siblings
        for (let j = 0; j < os.length; j++) {
          if (i === j) continue;
          const b = os[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 0.1;
          if (d < REPEL_DIST) {
            const force = (REPEL_DIST - d) / REPEL_DIST;
            a.vx += (dx / d) * force * 0.9;
            a.vy += (dy / d) * force * 0.9;
          }
        }

        a.vx *= DAMPING;
        a.vy *= DAMPING;
        a.x += a.vx;
        a.y += a.vy;

        // draw orb
        const grad = ctx.createRadialGradient(a.x - 6, a.y - 6, 2, a.x, a.y, ORB_RADIUS);
        grad.addColorStop(0, a.color + "ee");
        grad.addColorStop(1, a.color + "88");
        ctx.beginPath();
        ctx.arc(a.x, a.y, ORB_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.shadowColor = a.color;
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;

        // label
        ctx.font = `bold 11px 'Space Grotesk', monospace`;
        ctx.fillStyle = a.text;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(a.label, a.x, a.y);
      }

      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full" style={{ height: 320 }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
