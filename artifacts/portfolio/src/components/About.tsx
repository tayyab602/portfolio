import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Store, GraduationCap, Github } from "lucide-react";
import { GitHubStats } from "@/components/GitHubStats";
import {
  VIEWPORT,
  staggerContainer,
  staggerItem,
  slideLeft,
  fadeUp,
  lineReveal,
} from "@/lib/animations";

/* ── Animated code snippet ─────────────────────────────────────────── */
const CODE = `// tayyab602 — building since Fall 2024
const tayyab = {
  university: "Air University AAC, Kamra",
  stack: ["Flutter", "Node.js", "C++", "Java"],
  databases: ["MySQL", "MongoDB", "Firebase"],
  currentlyLearning: "Assembly (iAPX8088)",
  alsoRuns: "WhatsApp Beauty Store 🛍️",
  motto: "learn by building",
};`;

function CodeBlock() {
  const ref = useRef<HTMLPreElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.pre
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-xs sm:text-sm leading-relaxed font-mono rounded-xl bg-muted/70 border border-border p-5 overflow-x-auto text-left"
      style={{ tabSize: 2 }}
    >
      {CODE.split("\n").map((line, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: inView ? 0.1 + i * 0.07 : 0, ease: [0.22, 1, 0.36, 1] }}
          className="block"
        >
          {line
            .replace(/(\/\/.+$)/, '<comment>$1</comment>')
            .split(/(<comment>.+?<\/comment>|"[^"]*"|:\s|\b(const|let|var)\b)/)
            .map((part, j) => {
              if (part?.startsWith('<comment>'))
                return <span key={j} className="text-muted-foreground/60">{part.replace(/<\/?comment>/g, '')}</span>;
              if (part?.startsWith('"'))
                return <span key={j} className="text-primary">{part}</span>;
              if (part === 'const' || part === 'let' || part === 'var')
                return <span key={j} className="text-blue-500 dark:text-blue-400">{part}</span>;
              return <span key={j}>{part}</span>;
            })
          }
        </motion.span>
      ))}
    </motion.pre>
  );
}

const aboutCards = [
  {
    icon: GraduationCap,
    title: "CS Undergraduate",
    desc: "Air University Aerospace and Aviation Campus, Kamra. Solid foundations in algorithms, DSA, software engineering.",
    color: "text-primary",
  },
  {
    icon: Code2,
    title: "Developer",
    desc: "Mobile (Flutter), backend (Node.js), desktop (Java, C#), databases (MySQL, MongoDB, Firebase). I ship real projects.",
    color: "text-primary",
  },
  {
    icon: Store,
    title: "Entrepreneur",
    desc: "Running a WhatsApp beauty store — sourcing, inventory, marketing. I understand the business behind the code.",
    color: "text-primary",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container px-4 mx-auto">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-16 md:mb-20"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-primary">/</span> ABOUT ME
          </motion.h2>
          <motion.div variants={lineReveal} className="w-16 h-0.5 bg-primary" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: paragraphs */}
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="space-y-5 text-base text-muted-foreground leading-relaxed"
          >
            {[
              <>I'm a CS student at <span className="text-foreground font-semibold">Air University AAC, Kamra</span>. I started writing code in Fall 2024 and have been building real projects ever since.</>,
              <>My stack grew semester by semester — C++ and Java first, then Flutter, databases, and now backend with Node.js and Assembly. I learn by shipping.</>,
              <>Alongside my studies, I run a WhatsApp beauty store in SKP. It keeps me grounded: software only matters when it solves real problems.</>,
            ].map((para, i) => (
              <motion.p key={i} variants={slideLeft}>{para}</motion.p>
            ))}

            {/* GitHub CTA */}
            <motion.a
              variants={slideLeft}
              href="https://github.com/tayyab602"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              <Github className="w-4 h-4" />
              github.com/tayyab602
            </motion.a>
          </motion.div>

          {/* Right: animated code block */}
          <CodeBlock />
        </div>

        {/* GitHub stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-5">
            GitHub Activity
          </p>
          <GitHubStats />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-3 gap-4"
        >
          {aboutCards.map((card) => (
            <motion.div
              key={card.title}
              variants={staggerItem}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all"
            >
              <card.icon className={`w-6 h-6 mb-3 ${card.color}`} />
              <h3 className="text-base font-bold mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
