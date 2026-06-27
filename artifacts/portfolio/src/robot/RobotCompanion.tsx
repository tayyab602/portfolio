import { useEffect, useRef, useState, useCallback } from "react";
import robotSrc from "@assets/robot-602.png";
import { useRobot } from "./RobotContext";
import "./robot.css";

const ROBOT_ASPECT = 395 / 460; // width / height of the source asset
const TILE_SPACING = 70;

type Tile = { worldY: number; x: number };

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

// deterministic 0..1 pseudo-random, purely a function of the index — no
// Math.random anywhere, so the tile layout is identical every single time.
function seededFrac(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function tileWidth(laneWidth: number) {
  return clamp(laneWidth * 0.55, 24, 46);
}

function buildTiles(docHeight: number, laneWidth: number): Tile[] {
  const tw = tileWidth(laneWidth);
  const count = Math.ceil(docHeight / TILE_SPACING) + 1;
  const tiles: Tile[] = [];
  for (let i = 0; i < count; i++) {
    tiles.push({
      worldY: docHeight - i * TILE_SPACING,
      x: seededFrac(i) * Math.max(0, laneWidth - tw),
    });
  }
  return tiles;
}

// reads the project's --primary CSS variable ("H S% L%") so the lane
// matches the site's actual accent color in both light and dark mode
function readPrimaryHSL() {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim();
  return v || "24 85% 50%";
}

function darken(hsl: string, amount: number) {
  const [h, s, l] = hsl.split(" ");
  const lNum = Math.max(0, parseFloat(l) - amount);
  return `${h} ${s} ${lNum}%`;
}

export function RobotCompanion() {
  const { mode, setMode } = useRobot();
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [status, setStatus] = useState<"running" | "won" | "lost">("running");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const modeRef = useRef(mode);
  const statusRef = useRef<"running" | "won" | "lost">("running");
  const reducedMotionRef = useRef(false);
  const robotImgRef = useRef<HTMLImageElement | null>(null);
  const tRef = useRef(0);
  const keyStack = useRef<Array<"left" | "right">>([]);
  const highScoreRef = useRef(0);
  const primaryHSLRef = useRef("24 85% 50%");

  const world = useRef<{ tiles: Tile[]; docHeight: number; laneWidth: number }>({
    tiles: [],
    docHeight: 0,
    laneWidth: 0,
  });
  const g = useRef({
    vw: 0,
    vh: 0,
    robotW: 0,
    robotH: 0,
    maxScroll: 0,
    startScroll: 0,
    scrollY: 0,
    player: { x: 0, worldY: 0, vy: -8 },
    bestWorldY: 0,
  });

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const img = new Image();
    img.onload = () => console.log("[602] robot image loaded ok", img.naturalWidth, img.naturalHeight);
    img.onerror = (e) => console.error("[602] robot image FAILED to load:", robotSrc, e);
    img.src = robotSrc;
    robotImgRef.current = img;

    const stored = Number(localStorage.getItem("robot602HighScore") || 0);
    setHighScore(stored);

    primaryHSLRef.current = readPrimaryHSL();
    const observer = new MutationObserver(() => {
      primaryHSLRef.current = readPrimaryHSL();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const ensureWorld = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight;
    const laneWidth = Math.min(320, Math.max(60, window.innerWidth * 0.2));
    const w = world.current;
    if (
      w.tiles.length === 0 ||
      Math.abs(w.docHeight - docHeight) > 40 ||
      Math.abs(w.laneWidth - laneWidth) > 10
    ) {
      w.tiles = buildTiles(docHeight, laneWidth);
      w.docHeight = docHeight;
      w.laneWidth = laneWidth;
    }
    return w;
  }, []);

  function press(dir: "left" | "right") {
    const arr = keyStack.current;
    const i = arr.indexOf(dir);
    if (i !== -1) arr.splice(i, 1);
    arr.push(dir);
  }
  function release(dir: "left" | "right") {
    const arr = keyStack.current;
    const i = arr.indexOf(dir);
    if (i !== -1) arr.splice(i, 1);
  }
  function currentVX() {
    const last = keyStack.current[keyStack.current.length - 1];
    return last === "left" ? -3 : last === "right" ? 3 : 0;
  }

  const startRound = useCallback(() => {
    const w = ensureWorld();
    const vh = window.innerHeight;
    const vw = w.laneWidth;
    const robotH = clamp(vw * 0.55, 50, 130);
    const robotW = robotH * ROBOT_ASPECT;
    const startScroll = window.scrollY;
    g.current = {
      vw,
      vh,
      robotW,
      robotH,
      maxScroll: Math.max(0, w.docHeight - vh),
      startScroll,
      scrollY: startScroll,
      player: { x: (vw - robotW) / 2, worldY: startScroll + vh * 0.6, vy: -8 },
      bestWorldY: startScroll + vh * 0.6,
    };
    keyStack.current = [];
    setScore(0);
    statusRef.current = "running";
    setStatus("running");
  }, [ensureWorld]);

  function exitToCompanion() {
    document.body.style.overflow = "";
    document.documentElement.style.scrollBehavior = "";
    window.scrollTo({ top: g.current.startScroll, behavior: "smooth" });
    setMode("companion");
  }

  // lock real page scroll + disable the site's CSS smooth-scroll while
  // playing (it would otherwise fight our own per-frame window.scrollTo)
  useEffect(() => {
    if (mode === "playing") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.scrollBehavior = "auto";
      startRound();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.scrollBehavior = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, [mode, startRound]);

  // single persistent draw/physics loop, branches on mode each frame
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") ?? null;

    function resize() {
      const w = ensureWorld();
      if (canvas) {
        canvas.width = w.laneWidth;
        canvas.height = window.innerHeight;
      }
    }
    resize();
    window.addEventListener("resize", resize);

    function drawTile(x: number, y: number, w: number, alpha: number) {
      if (!ctx || alpha <= 0.01) return;
      const hsl = primaryHSLRef.current;
      ctx.fillStyle = `hsl(${hsl} / ${alpha})`;
      ctx.fillRect(x, y, w, 9);
      ctx.fillStyle = `hsl(${darken(hsl, 18)} / ${alpha})`;
      ctx.fillRect(x, y + 9, w, 4);
    }

    function frame() {
      const w = ensureWorld();
      const vh = window.innerHeight;
      const vw = w.laneWidth;
      if (canvas && (canvas.width !== vw || canvas.height !== vh)) {
        canvas.width = vw;
        canvas.height = vh;
      }
      if (!ctx || !canvas) {
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const img = robotImgRef.current;
      const robotH = clamp(vw * 0.55, 50, 130);
      const robotW = robotH * ROBOT_ASPECT;

      if (modeRef.current === "companion") {
        const scrollY = window.scrollY;
        const anchorWorldY = scrollY + vh * 0.45;
        tRef.current += reducedMotionRef.current ? 0 : 0.05;
        const bob = reducedMotionRef.current ? 0 : Math.sin(tRef.current) * 4;
        const tw = tileWidth(vw);

        for (const tile of w.tiles) {
          const sy = tile.worldY - scrollY;
          if (sy < -40 || sy > vh + 40) continue;
          const dist = Math.abs(tile.worldY - anchorWorldY) / TILE_SPACING;
          const alpha = Math.max(0, 1 - dist / 3);
          drawTile(tile.x, sy, tw, alpha);
        }

        if (img && img.complete && img.naturalWidth > 0) {
          const ry = vh * 0.45 + bob;
          const rx = (vw - robotW) / 2;
          ctx.drawImage(img, rx, ry, robotW, robotH);
        }
      } else if (statusRef.current === "running") {
        const s = g.current;
        const p = s.player;
        p.vy += 0.35;
        p.worldY += p.vy;
        p.x += currentVX();
        if (p.x < -s.robotW) p.x = s.vw;
        if (p.x > s.vw) p.x = -s.robotW;

        if (p.vy > 0) {
          const tw = tileWidth(s.vw);
          for (const tile of w.tiles) {
            if (
              p.x + s.robotW > tile.x &&
              p.x < tile.x + tw &&
              p.worldY + s.robotH > tile.worldY &&
              p.worldY + s.robotH < tile.worldY + 20
            ) {
              p.vy = -9;
            }
          }
        }

        if (p.worldY < s.bestWorldY) {
          s.bestWorldY = p.worldY;
          setScore(Math.floor((s.startScroll + s.vh * 0.6 - s.bestWorldY) / 4));
        }

        const screenY = p.worldY - s.scrollY;
        let target = s.scrollY;
        if (screenY < s.vh * 0.35) target = p.worldY - s.vh * 0.35;
        else if (screenY > s.vh * 0.65) target = p.worldY - s.vh * 0.65;
        target = clamp(target, 0, s.maxScroll);
        s.scrollY += (target - s.scrollY) * 0.2;
        window.scrollTo(0, s.scrollY);

        const tw = tileWidth(s.vw);
        for (const tile of w.tiles) {
          const sy = tile.worldY - s.scrollY;
          if (sy < -40 || sy > s.vh + 40) continue;
          drawTile(tile.x, sy, tw, 1);
        }
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, p.x, p.worldY - s.scrollY, s.robotW, s.robotH);
        }

        if (s.scrollY <= 1 && p.worldY < s.vh * 0.12) {
          statusRef.current = "won";
          setStatus("won");
          setScore((cur) => {
            if (cur > highScoreRef.current) {
              setHighScore(cur);
              localStorage.setItem("robot602HighScore", String(cur));
            }
            return cur;
          });
        } else if (p.worldY > s.maxScroll + s.vh + 60) {
          statusRef.current = "lost";
          setStatus("lost");
          setScore((cur) => {
            if (cur > highScoreRef.current) {
              setHighScore(cur);
              localStorage.setItem("robot602HighScore", String(cur));
            }
            return cur;
          });
        }
      } else {
        // frozen frame while a win/lose toast is showing
        const s = g.current;
        const tw = tileWidth(s.vw);
        for (const tile of w.tiles) {
          const sy = tile.worldY - s.scrollY;
          if (sy < -40 || sy > s.vh + 40) continue;
          drawTile(tile.x, sy, tw, 1);
        }
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, s.player.x, s.player.worldY - s.scrollY, s.robotW, s.robotH);
        }
      }
    }

    let frameErrorLogged = false;
    function loop() {
      try {
        frame();
      } catch (err) {
        if (!frameErrorLogged) {
          console.error("[602] frame error, continuing without crashing the loop:", err);
          frameErrorLogged = true;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    function onKeyDown(e: KeyboardEvent) {
      if (modeRef.current !== "playing") return;
      if (e.key === "ArrowLeft" || e.key === "a") press("left");
      if (e.key === "ArrowRight" || e.key === "d") press("right");
    }
    function onKeyUp(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "a") release("left");
      if (e.key === "ArrowRight" || e.key === "d") release("right");
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="robot-lane" aria-hidden="true">
        <canvas ref={canvasRef} />
      </div>

      {mode === "playing" && (
        <>
          <div className="rc-hud">
            <span>
              score <b>{score}</b> · best <b>{highScore}</b>
            </span>
            <button className="rc-pixel-btn" onClick={exitToCompanion} aria-label="Exit game">
              ×
            </button>
          </div>
          <div className="rc-controls">
            <button
              className="rc-pixel-btn"
              onPointerDown={() => press("left")}
              onPointerUp={() => release("left")}
              onPointerLeave={() => release("left")}
              aria-label="Move left"
            >
              ◀
            </button>
            <button
              className="rc-pixel-btn"
              onPointerDown={() => press("right")}
              onPointerUp={() => release("right")}
              onPointerLeave={() => release("right")}
              aria-label="Move right"
            >
              ▶
            </button>
          </div>
          {status !== "running" && (
            <div className="rc-toast">
              <p className="rc-toast-title">
                {status === "won" ? "reached the top!" : "fell off the page"}
              </p>
              <p className="rc-toast-score">score {score}</p>
              <div className="rc-toast-actions">
                <button className="rc-pixel-btn" onClick={startRound}>
                  retry
                </button>
                <button className="rc-pixel-btn" onClick={exitToCompanion}>
                  exit
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
