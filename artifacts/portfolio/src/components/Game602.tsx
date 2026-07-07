import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, RotateCcw, Trophy } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */
type Board = (number | null)[][];
type Dir = "up" | "down" | "left" | "right";

/* ── Pure game logic ───────────────────────────────────────────────── */
function createBoard(): Board {
  const b: Board = Array.from({ length: 4 }, () => Array(4).fill(null));
  return addTile(addTile(b));
}

function addTile(b: Board): Board {
  const empty: [number, number][] = [];
  b.forEach((row, r) => row.forEach((v, c) => { if (!v) empty.push([r, c]); }));
  if (!empty.length) return b;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const next = b.map(row => [...row]);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function slideRow(row: (number | null)[]): { row: (number | null)[]; score: number } {
  const vals = row.filter(Boolean) as number[];
  let score = 0;
  const merged: number[] = [];
  let i = 0;
  while (i < vals.length) {
    if (i + 1 < vals.length && vals[i] === vals[i + 1]) {
      merged.push(vals[i] * 2);
      score += vals[i] * 2;
      i += 2;
    } else {
      merged.push(vals[i]);
      i++;
    }
  }
  while (merged.length < 4) merged.push(0);
  return { row: merged.map(v => v || null), score };
}

function move(b: Board, dir: Dir): { board: Board; score: number; moved: boolean } {
  let total = 0;
  let moved = false;
  let rows = b.map(r => [...r]);

  const rotate = (m: Board) => m[0].map((_, c) => m.map(r => r[c]).reverse());
  const rotateBack = (m: Board) => m[0].map((_, c) => m.map(r => r[c])).map(r => r.reverse());

  if (dir === "up") rows = rotate(rows);
  if (dir === "right") rows = rows.map(r => [...r].reverse());
  if (dir === "down") { rows = rotate(rows); rows = rows.map(r => [...r].reverse()); }

  const next = rows.map(row => {
    const { row: nr, score } = slideRow(row);
    total += score;
    if (nr.some((v, i) => v !== row[i])) moved = true;
    return nr;
  });

  let result = next;
  if (dir === "up") result = rotateBack(next);
  if (dir === "right") result = next.map(r => [...r].reverse());
  if (dir === "down") { result = next.map(r => [...r].reverse()); result = rotateBack(result); }

  return { board: result, score: total, moved };
}

function isGameOver(b: Board): boolean {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (!b[r][c]) return false;
      if (c < 3 && b[r][c] === b[r][c + 1]) return false;
      if (r < 3 && b[r][c] === b[r + 1][c]) return false;
    }
  }
  return true;
}

function hasWon(b: Board): boolean {
  return b.some(row => row.some(v => v === 602));
}

/* ── Tile colour map ───────────────────────────────────────────────── */
const TILE_COLORS: Record<number, { bg: string; text: string }> = {
  2:    { bg: "#f5ede0", text: "#776e65" },
  4:    { bg: "#ede0c8", text: "#776e65" },
  8:    { bg: "#f2b179", text: "#fff" },
  16:   { bg: "#f59563", text: "#fff" },
  32:   { bg: "#f67c5f", text: "#fff" },
  64:   { bg: "#f65e3b", text: "#fff" },
  128:  { bg: "#edcf72", text: "#fff" },
  256:  { bg: "#edcc61", text: "#fff" },
  512:  { bg: "#edc850", text: "#fff" },
  602:  { bg: "#E07230", text: "#fff" },  // special — brand orange
  1024: { bg: "#edc53f", text: "#fff" },
  2048: { bg: "#edc22e", text: "#fff" },
};
function tileStyle(v: number) {
  const c = TILE_COLORS[v] ?? { bg: "#3c3a32", text: "#fff" };
  return { background: c.bg, color: c.text };
}
function tileFontSize(v: number) {
  if (v >= 1000) return "1rem";
  if (v >= 100)  return "1.25rem";
  return "1.6rem";
}

/* ── Background tile grid (ambient, scroll-driven) ─────────────────── */
export function BackgroundTiles() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.28], [0, 0.55, 0.55, 0]);

  const staticValues = [2, 4, 8, 16, 32, 64, 128, 256, 512, 2, 4, 8, 16, 32, 64, 128];
  return (
    <motion.div
      style={{ opacity }}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: "repeat(4,1fr)", gap: "8px", padding: "20vh 10vw" }}
      >
        {staticValues.map((v, i) => (
          <div
            key={i}
            className="rounded-lg flex items-center justify-center font-black select-none"
            style={{
              ...tileStyle(v),
              fontSize: tileFontSize(v),
              aspectRatio: "1/1",
              opacity: 0.35,
            }}
          >
            {v}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Game Modal ─────────────────────────────────────────────────────── */
function GameModal({ onClose }: { onClose: () => void }) {
  const [board, setBoard] = useState<Board>(createBoard);
  const [score, setScore] = useState(0);
  const [best, setBest]   = useState(() => Number(localStorage.getItem("602-best") || 0));
  const [over, setOver]   = useState(false);
  const [won, setWon]     = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const applyMove = useCallback((dir: Dir) => {
    setBoard(prev => {
      const { board: next, score: gained, moved } = move(prev, dir);
      if (!moved) return prev;
      const withTile = addTile(next);
      setScore(s => {
        const ns = s + gained;
        setBest(b => { const nb = Math.max(b, ns); localStorage.setItem("602-best", String(nb)); return nb; });
        return ns;
      });
      if (hasWon(withTile)) setWon(true);
      else if (isGameOver(withTile)) setOver(true);
      return withTile;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
        w: "up", s: "down", a: "left", d: "right",
      };
      if (map[e.key]) { e.preventDefault(); applyMove(map[e.key]); }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [applyMove, onClose]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
    if (Math.abs(dx) > Math.abs(dy)) applyMove(dx > 0 ? "right" : "left");
    else applyMove(dy > 0 ? "down" : "up");
  };

  const restart = () => { setBoard(createBoard()); setScore(0); setOver(false); setWon(false); };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-card border border-border rounded-2xl p-6 w-full max-w-[360px] mx-4 shadow-lg"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-black text-2xl tracking-tight" style={{ color: "#E07230" }}>
              PLAY <span className="text-foreground">602</span>
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">reach the 602 tile</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-center px-3 py-1.5 bg-muted rounded-lg">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Score</p>
              <p className="font-black text-sm">{score}</p>
            </div>
            <div className="text-center px-3 py-1.5 bg-muted rounded-lg">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Best</p>
              <p className="font-black text-sm">{best}</p>
            </div>
            <button
              onClick={restart}
              className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
              title="New game"
            >
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Board */}
        <div
          className="relative rounded-xl overflow-hidden select-none"
          style={{ background: "#bbada0", padding: "8px", gap: "8px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}
        >
          {/* Background cells */}
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="rounded-md" style={{ background: "#cdc1b4", aspectRatio: "1/1" }} />
          ))}

          {/* Tile layer */}
          <div className="absolute inset-0" style={{ padding: "8px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px" }}>
            {board.map((row, r) =>
              row.map((v, c) => (
                <AnimatePresence key={`${r}-${c}`}>
                  {v ? (
                    <motion.div
                      key={`${r}-${c}-${v}`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-md flex items-center justify-center font-black"
                      style={{
                        ...tileStyle(v),
                        fontSize: tileFontSize(v),
                        aspectRatio: "1/1",
                      }}
                    >
                      {v}
                    </motion.div>
                  ) : (
                    <div key={`empty-${r}-${c}`} style={{ aspectRatio: "1/1" }} />
                  )}
                </AnimatePresence>
              ))
            )}
          </div>

          {/* Overlay: won / game over */}
          <AnimatePresence>
            {(over || won) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-xl"
                style={{ background: won ? "rgba(224,114,48,0.88)" : "rgba(238,228,218,0.73)" }}
              >
                {won ? (
                  <>
                    <Trophy className="w-10 h-10 text-white mb-2" />
                    <p className="font-black text-2xl text-white">You hit 602!</p>
                  </>
                ) : (
                  <p className="font-black text-2xl text-[#776e65]">Game over</p>
                )}
                <button
                  onClick={restart}
                  className="mt-4 px-5 py-2 rounded-lg font-bold text-sm"
                  style={{ background: won ? "#fff" : "#E07230", color: won ? "#E07230" : "#fff" }}
                >
                  Try again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-muted-foreground font-mono mt-4">
          Arrow keys / WASD / swipe
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── Exported: button trigger + ambient bg ──────────────────────────── */
export function Game602Button() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-primary/10 hover:border-primary/50 transition-colors text-sm font-mono font-medium text-muted-foreground hover:text-primary"
      >
        <span className="text-primary font-black">▶</span> Play 602
      </button>
      <AnimatePresence>
        {open && <GameModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
