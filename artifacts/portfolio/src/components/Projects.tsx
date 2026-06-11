import { motion } from "framer-motion";
import { Github, Smartphone, Terminal, Package, Brain, Gamepad2 } from "lucide-react";
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
  },
  {
    title: "WhatsApp Beauty Store",
    type: "Business & E-commerce",
    description:
      "A fully operational e-commerce business run entirely through WhatsApp. Managed product sourcing, inventory, customer relations, and digital marketing end-to-end.",
    tech: ["WhatsApp Business", "Inventory Mgmt", "Marketing", "Logistics"],
    icon: Package,
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30",
    url: null,
  },
];

export function Projects() {
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
              className={`group relative flex flex-col justify-between p-7 rounded-2xl bg-card border ${project.border} overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-5">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{project.type}</span>
                  <project.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors flex-shrink-0" />
                </div>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{project.description}</p>
              </div>

              <div className="relative z-10 flex items-end justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-white/5 rounded-full text-xs font-mono text-white/60">
                      {t}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/15 transition-colors"
                    aria-label="View on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
