import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Smartphone, Terminal, Package, Brain, Gamepad2, X, ExternalLink, Loader2, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  APPLE_EASE,
  VIEWPORT,
  staggerContainer,
  staggerItem,
  fadeUp,
  lineReveal,
} from "@/lib/animations";

const projects = [
  {
    title: "Tic Tac Toe Pro",
    type: "Flutter · Mobile Game",
    description:
      "Cross-platform game with PvP and smart AI modes across multiple difficulty levels. Features animated UI, move history, hints, turn timers, and scalable board sizes (3×3 to 5×5).",
    tech: ["Flutter", "Dart", "Android", "Game AI"],
    icon: Gamepad2,
    color: "from-cyan-500/15 to-blue-500/15",
    border: "border-border hover:border-cyan-400/40",
    url: "https://github.com/tayyab602/tictactoe-pro-ultimate",
    repo: "tayyab602/tictactoe-pro-ultimate",
  },
  {
    title: "Flutter Learn AI",
    type: "Flutter · AI Education",
    description:
      "AI-powered educational mobile app featuring an intelligent tutor, auto-generated flashcards, quiz engine, and smooth animations. Integrates the OpenRouter API for LLM responses.",
    tech: ["Flutter", "Dart", "OpenRouter API", "AI"],
    icon: Brain,
    color: "from-violet-500/15 to-purple-600/15",
    border: "border-border hover:border-violet-400/40",
    url: "https://github.com/tayyab602/flutter-learn-ai",
    repo: "tayyab602/flutter-learn-ai",
  },
  {
    title: "Inventory System",
    type: "Java · Desktop App",
    description:
      "Professional inventory management system with MySQL database integration, CSV report generation, automated sales reporting, and dynamic pricing with discount management.",
    tech: ["Java", "MySQL", "CSV Reports", "Desktop"],
    icon: Package,
    color: "from-orange-500/15 to-yellow-500/15",
    border: "border-border hover:border-orange-400/40",
    url: "https://github.com/tayyab602/Inventory-System",
    repo: "tayyab602/Inventory-System",
  },
  {
    title: "Brainy Bingo",
    type: "C++ · CLI Game",
    description:
      "Menu-driven C++ learning quiz game using ASCII art and Unicode emoji across multiple difficulty levels. Tracks per-game high scores with file I/O persistence.",
    tech: ["C++", "File I/O", "CLI", "Unicode"],
    icon: Terminal,
    color: "from-pink-500/15 to-rose-500/15",
    border: "border-border hover:border-pink-400/40",
    url: "https://github.com/tayyab602/BRAINYBINGO",
    repo: "tayyab602/BRAINYBINGO",
  },
  {
    title: "Mobile Learning AI Tool",
    type: "Flutter · Mobile",
    description:
      "Mobile computing project — an AI-assisted learning tool built with Flutter and Dart, designed to enhance student productivity with interactive content delivery.",
    tech: ["Flutter", "Dart", "Mobile Computing", "AI"],
    icon: Smartphone,
    color: "from-teal-500/15 to-green-500/15",
    border: "border-border hover:border-teal-400/40",
    url: "https://github.com/tayyab602/Mobile-Learning-AI-Tool",
    repo: "tayyab602/Mobile-Learning-AI-Tool",
  },
  {
    title: "WhatsApp Beauty Store",
    type: "Business · E-commerce",
    description:
      "A fully operational e-commerce business run entirely through WhatsApp. Managed product sourcing, inventory, customer relations, and digital marketing end-to-end.",
    tech: ["WhatsApp Business", "Inventory", "Marketing"],
    icon: Package,
    color: "from-green-500/15 to-emerald-500/15",
    border: "border-border hover:border-green-400/40",
    url: null,
    repo: null,
  },
];

const PAGE_START = 6;
const PAGE_STEP  = 3;

type Project = (typeof projects)[number];

/* ── README Modal ─────────────────────────────────────────────────── */
function ReadmeModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [readme,  setReadme]  = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    if (!project.repo) { setLoading(false); return; }
    setLoading(true); setError(false); setReadme(null);
    const tryFetch = (branch: string) =>
      fetch(`https://raw.githubusercontent.com/${project.repo}/${branch}/README.md`).then(r => {
        if (!r.ok) throw new Error("not found");
        return r.text();
      });
    tryFetch("main")
      .catch(() => tryFetch("master"))
      .then(text => { setReadme(text); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [project.repo]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.4, ease: APPLE_EASE }}
        className="flex flex-col w-full max-w-4xl mx-auto h-full"
      >
        {/* Top nav bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0 bg-card">
          <div className="flex items-center gap-3">
            <project.icon className="w-5 h-5 text-primary" />
            <span className="font-bold text-base">{project.title}</span>
            <span className="font-mono text-xs text-muted-foreground hidden sm:inline">{project.type}</span>
          </div>
          <div className="flex items-center gap-2">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-muted border border-border hover:border-primary/50 hover:bg-primary/5 rounded-lg text-sm font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">View on GitHub</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 border border-border transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 px-6 py-3 border-b border-border flex-shrink-0 bg-card/50">
          {project.tech.map(t => (
            <span key={t} className="px-2.5 py-0.5 bg-muted rounded-full text-xs font-mono text-muted-foreground border border-border">
              {t}
            </span>
          ))}
        </div>

        {/* Scrollable README content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {loading && (
            <div className="flex items-center justify-center h-40 gap-3 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-mono text-sm">Loading README…</span>
            </div>
          )}

          {!loading && (error || !readme) && (
            <div className="space-y-4">
              <p className="text-muted-foreground font-mono text-sm border-l-2 border-primary pl-4">
                No README found — showing project description
              </p>
              <p className="leading-relaxed">{project.description}</p>
            </div>
          )}

          {!loading && readme && (
            <div className="prose dark:prose-invert prose-sm max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-muted prose-pre:border prose-pre:border-border
              prose-blockquote:border-l-primary
              prose-strong:text-foreground prose-li:text-muted-foreground
            ">
              <ReactMarkdown>{readme}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Pinned bottom bar — always visible when scrolled down */}
        {project.url && (
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-t border-border bg-card">
            <span className="text-xs font-mono text-muted-foreground">
              {project.repo}
            </span>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              <Github className="w-4 h-4" />
              Open on GitHub
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── End-of-projects marker ───────────────────────────────────────── */
function ProjectsEnd() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: APPLE_EASE }}
      className="mt-16 flex flex-col items-center gap-4 select-none"
    >
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-border" />
        <span className="text-muted-foreground/40 text-lg">✦</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border to-border" />
      </div>
      <p className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground/50 uppercase">
        end of projects
      </p>
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-border" />
        <span className="text-muted-foreground/40 text-lg">✦</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border to-border" />
      </div>
    </motion.div>
  );
}

/* ── Main Projects section ────────────────────────────────────────── */
export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [visible,  setVisible]  = useState(PAGE_START);

  const hasMore   = visible < projects.length;
  const atEnd     = !hasMore;
  const displayed = projects.slice(0, visible);

  const showMore = () => {
    setVisible(v => Math.min(v + PAGE_STEP, projects.length));
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="container px-4 mx-auto">

        {/* Heading */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-16 md:mb-20"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-primary">/</span> FEATURED WORK
          </motion.h2>
          <motion.div variants={lineReveal} className="w-16 h-0.5 bg-primary mb-4" />
          <motion.p variants={fadeUp} className="text-muted-foreground font-mono text-sm">
            github.com/<span className="text-primary">tayyab602</span>
            <span className="ml-3 text-muted-foreground/50">· click any card to view README</span>
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {displayed.map((project) => (
              <motion.div
                key={project.title}
                layout
                variants={staggerItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -5, transition: { duration: 0.25, ease: APPLE_EASE } }}
                onClick={() => setSelected(project)}
                className={`group relative flex flex-col justify-between p-6 rounded-xl bg-card border ${project.border} overflow-hidden cursor-pointer transition-all hover:shadow-md`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-xs tracking-wide text-muted-foreground">{project.type}</span>
                    <project.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">{project.description}</p>
                </div>

                <div className="relative z-10 flex items-end justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-muted rounded-full text-xs font-mono text-muted-foreground border border-border">
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <span
                      className="flex-shrink-0 p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      onClick={(e) => { e.stopPropagation(); window.open(project.url!, "_blank"); }}
                      title="Open GitHub repo"
                    >
                      <Github className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={showMore}
              className="flex items-center gap-2 px-7 py-3 border border-border rounded-lg bg-card text-sm font-medium hover:border-primary/50 hover:bg-muted transition-all"
            >
              <ChevronDown className="w-4 h-4" />
              Show more projects
              <span className="ml-1 text-xs font-mono text-muted-foreground">
                ({projects.length - visible} remaining)
              </span>
            </button>
          </motion.div>
        )}

        {/* End marker — shown when all projects are visible */}
        {atEnd && displayed.length > 0 && <ProjectsEnd />}
      </div>

      {/* README modal */}
      <AnimatePresence>
        {selected && (
          <ReadmeModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
