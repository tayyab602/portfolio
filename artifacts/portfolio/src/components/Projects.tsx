import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Smartphone, Terminal, Package, Brain, Gamepad2, X, ExternalLink, Loader2 } from "lucide-react";
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
    color: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30",
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
    color: "from-violet-500/20 to-purple-600/20",
    border: "border-violet-500/30",
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
    color: "from-orange-500/20 to-yellow-500/20",
    border: "border-orange-500/30",
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
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
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
    color: "from-teal-500/20 to-green-500/20",
    border: "border-teal-500/30",
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
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30",
    url: null,
    repo: null,
  },
];

type Project = (typeof projects)[number];

function ReadmeModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [readme, setReadme]   = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    if (!project.repo) { setLoading(false); return; }
    setLoading(true);
    setError(false);
    setReadme(null);

    // Try main branch, fall back to master
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

  // Trap body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(5,7,15,0.92)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.4, ease: APPLE_EASE }}
        className="flex flex-col w-full max-w-4xl mx-auto h-full max-h-screen"
      >
        {/* ── Nav bar ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0 bg-[#07090f]/80">
          <div className="flex items-center gap-3">
            <project.icon className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">{project.title}</span>
            <span className="font-mono text-xs text-white/40 hidden sm:inline">{project.type}</span>
          </div>
          <div className="flex items-center gap-2">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/40 rounded-lg text-sm font-semibold transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">View on GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Tech tags ── */}
        <div className="flex flex-wrap gap-2 px-6 py-3 border-b border-white/5 flex-shrink-0">
          {project.tech.map(t => (
            <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-primary/80">
              {t}
            </span>
          ))}
        </div>

        {/* ── Content ── */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {loading && (
            <div className="flex items-center justify-center h-40 gap-3 text-white/40">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-mono text-sm">Loading README…</span>
            </div>
          )}

          {!loading && (error || !readme) && (
            <div className="space-y-4">
              <p className="text-white/50 font-mono text-sm border-l-2 border-primary pl-4">
                No README available — showing project description
              </p>
              <p className="text-white/80 leading-relaxed text-base">{project.description}</p>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-primary/10 border border-primary/30 text-primary rounded-lg font-semibold hover:bg-primary/20 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View Full Repository
                </a>
              )}
            </div>
          )}

          {!loading && readme && (
            <div className="prose prose-invert prose-sm max-w-none
              prose-headings:font-black prose-headings:tracking-tight
              prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
              prose-blockquote:border-l-primary prose-blockquote:text-white/60
              prose-strong:text-white prose-li:text-white/80
            ">
              <ReactMarkdown>{readme}</ReactMarkdown>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container px-4 mx-auto">
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
          <motion.div variants={lineReveal} className="w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
          <motion.p variants={fadeUp} className="text-muted-foreground mt-4 font-mono text-sm">
            github.com/<span className="text-primary">tayyab602</span>
            <span className="ml-3 text-white/30">· click any card to view README</span>
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: APPLE_EASE } }}
              onClick={() => setSelected(project)}
              className={`group relative flex flex-col justify-between p-7 rounded-2xl bg-card border ${project.border} overflow-hidden cursor-pointer`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-5">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{project.type}</span>
                  <project.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors flex-shrink-0" />
                </div>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>
              </div>

              <div className="relative z-10 flex items-end justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-white/5 rounded-full text-xs font-mono text-white/60">
                      {t}
                    </span>
                  ))}
                </div>
                {project.url ? (
                  <span
                    className="flex-shrink-0 flex items-center gap-1 text-xs font-mono text-primary/60 group-hover:text-primary transition-colors"
                    onClick={(e) => { e.stopPropagation(); window.open(project.url!, "_blank"); }}
                  >
                    <Github className="w-4 h-4" />
                  </span>
                ) : null}
              </div>

              {/* "click to read" hint */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono text-white/30">README →</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
