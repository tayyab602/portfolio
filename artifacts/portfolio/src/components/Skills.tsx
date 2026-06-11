import { motion } from "framer-motion";
import { TechOrbs } from "@/components/TechOrbs";
import {
  VIEWPORT,
  VIEWPORT_EARLY,
  staggerContainer,
  staggerItem,
  staggerItemLeft,
  fadeUp,
  lineReveal,
} from "@/lib/animations";

const skills = [
  {
    category: "Languages",
    items: ["C++", "C#", "Java", "Dart", "JavaScript"],
  },
  {
    category: "Frontend",
    items: ["Flutter", "Java (Android)", "React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite"],
    learning: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite"],
  },
  {
    category: "Backend & DB",
    items: ["Node.js", "Express", "MongoDB", "REST APIs", "Firebase", "MySQL", "XAMPP / phpMyAdmin"],
  },
  {
    category: "Tools & IDEs",
    items: ["Git", "VS Code", "Android Studio", "Eclipse", "Visual Studio", "Postman", "phpMyAdmin"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-card/50">
      <div className="container px-4 mx-auto">
        {/* Heading */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-16 md:mb-20 text-right"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black mb-4">
            SKILLS <span className="text-accent">/</span>
          </motion.h2>
          <motion.div variants={lineReveal} className="w-24 h-1 bg-gradient-to-l from-accent to-transparent ml-auto" />
        </motion.div>

        {/* Skill columns */}
        <motion.div
          variants={staggerContainer(0.18)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EARLY}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {skills.map((skillGroup, idx) => (
            <motion.div key={skillGroup.category} variants={staggerItem} className="space-y-6">
              <h3 className="text-xl font-mono text-white/50 border-b border-white/10 pb-4">
                {String(idx + 1).padStart(2, "0")}. {skillGroup.category}
              </h3>
              <motion.ul
                variants={staggerContainer(0.07, 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_EARLY}
                className="space-y-3"
              >
                {skillGroup.items.map((item) => {
                  const isLearning = skillGroup.learning?.includes(item);
                  return (
                    <motion.li
                      key={item}
                      variants={staggerItemLeft}
                      className="flex items-center gap-3 font-medium text-lg"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isLearning ? "bg-accent/50" : "bg-primary"}`}
                      />
                      <span className={isLearning ? "text-white/40" : ""}>
                        {item}
                        {isLearning && (
                          <span className="ml-2 text-xs font-mono text-accent/50 tracking-wide">learning</span>
                        )}
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Orbs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-center font-mono text-sm text-white/30 tracking-widest mb-6">
            TECHNOLOGY STACK · HOVER TO INTERACT
          </p>
          <TechOrbs />
        </motion.div>
      </div>
    </section>
  );
}
