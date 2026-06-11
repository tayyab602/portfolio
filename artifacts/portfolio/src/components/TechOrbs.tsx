import { useEffect, useRef } from "react";

// Tayyab's actual skills + duplicates to fill the canvas area
const SKILLS = [
  { name: "JavaScript", slug: "javascript",  color: "#f7df1e", bg: "#323330" },
  { name: "TypeScript", slug: "typescript",  color: "#3178c6", bg: "#fff"    },
  { name: "HTML5",      slug: "html5",       color: "#e34f26", bg: "#fff"    },
  { name: "CSS3",       slug: "css3",        color: "#1572b6", bg: "#fff"    },
  { name: "React",      slug: "react",       color: "#61dafb", bg: "#20232a" },
  { name: "Flutter",    slug: "flutter",     color: "#54c5f8", bg: "#20232a" },
  { name: "Dart",       slug: "dart",        color: "#00b4ab", bg: "#fff"    },
  { name: "MongoDB",    slug: "mongodb",     color: "#47a248", bg: "#fff"    },
  { name: "Firebase",   slug: "firebase",    color: "#ffca28", bg: "#fff"    },
  { name: "MySQL",      slug: "mysql",       color: "#00758f", bg: "#fff"    },
  { name: "Express",    slug: "express",     color: "#cccccc", bg: "#323330" },
  { name: "C++",        slug: "cplusplus",   color: "#9b4dca", bg: "#fff"    },
  { name: "Java",       slug: "java",        color: "#f89820", bg: "#fff"    },
  { name: "Node.js",    slug: "nodedotjs",   color: "#417e38", bg: "#fff"    },
  { name: "Git",        slug: "git",         color: "#f05032", bg: "#fff"    },
  { name: "Figma",      slug: "figma",       color: "#f24e1e", bg: "#fff"    },
  { name: "Python",     slug: "python",      color: "#3776ab", bg: "#fff"    },
  { name: "Docker",     slug: "docker",      color: "#2496ed", bg: "#fff"    },
  { name: "Linux",      slug: "linux",       color: "#fcc624", bg: "#1a1a1a" },
  { name: "VS Code",    slug: "visualstudiocode", color: "#007acc", bg: "#fff" },
  { name: "Android",    slug: "android",     color: "#3ddc84", bg: "#fff"    },
  { name: "GitHub",     slug: "github",      color: "#cccccc", bg: "#1a1a1a" },
  { name: "Postman",    slug: "postman",     color: "#ff6c37", bg: "#fff"    },
  { name: "Vue.js",     slug: "vuedotjs",    color: "#42b883", bg: "#fff"    },
];

const ORB_RADIUS   = 34;
const REPEL_R      = 150;
const REPEL_F      = 800;
const SEP_K        = 0.7;
const ATTRACT      = 0.055;   // spring back to home when hovering
const DAMPING      = 0.78;
const RETURN_LERP  = 0.12;    // lerp speed back to home when cursor gone
const SNAP_THRESH  = 0.4;     // px — snap to exact home below this

interface Orb {
  homeX: number; homeY: number;
  x: number; y: number;
  vx: number; vy: number;
  sk: (typeof SKILLS)[number];
  radius: number;
}

export function TechOrbs() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef      = useRef<Orb[]>([]);
  const logoImgs     = useRef<Record<string, HTMLImageElement | null>>({});
  const mxRef        = useRef(-9999);
  const myRef        = useRef(-9999);
  const mActiveRef   = useRef(false);
  const rafRef       = useRef(0);

  useEffect(() => {
    const canvas    = canvasRef.current!;
    const container = containerRef.current!;
    const ctx       = canvas.getContext("2d")!;

    // ── Pre-load all logos ──────────────────────────────────────────────
    let loadedCount = 0;
    function onLoad() {
      loadedCount++;
      if (loadedCount >= SKILLS.length) startLoop();
    }
    SKILLS.forEach(sk => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = `https://cdn.simpleicons.org/${sk.slug}/${sk.color.replace("#", "")}`;
      img.onload  = () => { logoImgs.current[sk.slug] = img; onLoad(); };
      img.onerror = () => { logoImgs.current[sk.slug] = null; onLoad(); };
    });

    // ── Layout helpers ──────────────────────────────────────────────────
    function buildHomePositions(W: number, H: number) {
      const cols    = Math.max(4, Math.floor(W / (ORB_RADIUS * 2 + 18)));
      const rows    = Math.ceil(SKILLS.length / cols);
      const cellW   = W / cols;
      const cellH   = H / rows;

      return SKILLS.map((sk, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return {
          homeX:  cellW * col + cellW / 2,
          homeY:  cellH * row + cellH / 2,
          x:      cellW * col + cellW / 2,
          y:      cellH * row + cellH / 2,
          vx: 0, vy: 0,
          sk,
          radius: ORB_RADIUS + Math.random() * 6 - 3,
        } as Orb;
      });
    }

    function setup() {
      const rect     = container.getBoundingClientRect();
      canvas.width   = rect.width;
      canvas.height  = rect.height;
      orbsRef.current = buildHomePositions(canvas.width, canvas.height);
    }
    setup();

    const ro = new ResizeObserver(setup);
    ro.observe(container);

    // ── Mouse / touch ───────────────────────────────────────────────────
    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mxRef.current     = e.clientX - rect.left;
      myRef.current     = e.clientY - rect.top;
      mActiveRef.current = true;
    }
    function onLeave() { mActiveRef.current = false; }
    function onTouch(e: TouchEvent) {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mxRef.current     = e.touches[0].clientX - rect.left;
      myRef.current     = e.touches[0].clientY - rect.top;
      mActiveRef.current = true;
    }
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", onTouch, { passive: false });
    canvas.addEventListener("touchend", onLeave);

    // ── Draw one orb ────────────────────────────────────────────────────
    function drawOrb(o: Orb) {
      const { x, y, radius: r, sk } = o;
      const img = logoImgs.current[sk.slug];

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.clip();

      ctx.fillStyle = sk.bg;
      ctx.fill();

      const shine = ctx.createRadialGradient(x - r * 0.28, y - r * 0.28, 0, x, y, r);
      shine.addColorStop(0,   "rgba(255,255,255,0.45)");
      shine.addColorStop(0.5, "rgba(255,255,255,0.05)");
      shine.addColorStop(1,   "rgba(0,0,0,0.35)");
      ctx.fillStyle = shine;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      if (img) {
        const pad  = r * 0.28;
        const size = (r - pad) * 2;
        ctx.globalAlpha = 0.92;
        ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
        ctx.globalAlpha = 1;
      } else {
        ctx.fillStyle    = sk.color;
        ctx.font         = `bold ${r * 0.55}px 'Space Grotesk', monospace`;
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(sk.name.slice(0, 3), x, y);
      }
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = sk.color + "66";
      ctx.lineWidth   = 2;
      ctx.stroke();
      ctx.restore();
    }

    // ── Physics tick ────────────────────────────────────────────────────
    function tick() {
      const os      = orbsRef.current;
      const mx      = mxRef.current;
      const my      = myRef.current;
      const mActive = mActiveRef.current;

      for (let i = 0; i < os.length; i++) {
        const o = os[i];

        if (!mActive) {
          // ── At rest: lerp to home and kill velocity ──
          o.vx = 0;
          o.vy = 0;
          const dx = o.homeX - o.x;
          const dy = o.homeY - o.y;
          if (Math.abs(dx) < SNAP_THRESH && Math.abs(dy) < SNAP_THRESH) {
            o.x = o.homeX;
            o.y = o.homeY;
          } else {
            o.x += dx * RETURN_LERP;
            o.y += dy * RETURN_LERP;
          }
          continue;
        }

        // ── Hovering: full physics ──
        // spring toward home
        o.vx += (o.homeX - o.x) * ATTRACT;
        o.vy += (o.homeY - o.y) * ATTRACT;

        // cursor repulsion
        const cdx  = o.x - mx;
        const cdy  = o.y - my;
        const dist = Math.sqrt(cdx * cdx + cdy * cdy) || 0.1;
        if (dist < REPEL_R) {
          const force = REPEL_F * Math.pow(1 - dist / REPEL_R, 2) / dist;
          o.vx += cdx * force;
          o.vy += cdy * force;
        }

        // orb–orb separation
        for (let j = 0; j < os.length; j++) {
          if (j === i) continue;
          const b    = os[j];
          const sdx  = o.x - b.x;
          const sdy  = o.y - b.y;
          const d    = Math.sqrt(sdx * sdx + sdy * sdy) || 0.1;
          const minD = o.radius + b.radius;
          if (d < minD) {
            const push = (minD - d) * SEP_K / d;
            o.vx += sdx * push;
            o.vy += sdy * push;
          }
        }

        o.vx *= DAMPING;
        o.vy *= DAMPING;
        o.x  += o.vx;
        o.y  += o.vy;
      }
    }

    // ── Main loop ───────────────────────────────────────────────────────
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick();
      orbsRef.current.forEach(drawOrb);
      rafRef.current = requestAnimationFrame(loop);
    }

    function startLoop() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(loop);
    }

    // Start loop immediately (logos load asynchronously; orbs render as they arrive)
    startLoop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full" style={{ height: 420 }}>
      <canvas ref={canvasRef} className="w-full h-full cursor-none" />
    </div>
  );
}
