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
    items: ["C++", "C#", "Java", "Dart", "JavaScript", "Assembly (iAPX8088)", "SQL", "HTML"],
  },
  {
    category: "Frontend / Mobile",
    items: ["Flutter", "Java (Android)", "Windows Forms (.NET)"],
  },
  {
    category: "Backend & Databases",
    items: ["Node.js", "Express", "MongoDB", "Firebase", "MySQL", "REST APIs", "phpMyAdmin", "XAMPP"],
  },
  {
    category: "Tools & IDEs",
    items: ["Git", "VS Code", "Android Studio", "Eclipse", "Visual Studio", "Postman", "phpMyAdmin"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-muted/30">
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
            <span className="text-primary">/</span> SKILLS
          </motion.h2>
          <motion.div variants={lineReveal} className="w-16 h-0.5 bg-primary" />
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
            <motion.div key={skillGroup.category} variants={staggerItem} className="space-y-5">
              <h3 className="text-sm font-mono font-semibold text-muted-foreground border-b border-border pb-3 uppercase tracking-wider">
                {String(idx + 1).padStart(2, "0")}. {skillGroup.category}
              </h3>
              <motion.ul
                variants={staggerContainer(0.07, 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_EARLY}
                className="space-y-2.5"
              >
                {skillGroup.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={staggerItemLeft}
                    className="flex items-center gap-2.5 text-sm font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>

        {/* 2D Tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-6 text-center">
            Technology Stack
          </p>
          <TechOrbs />
        </motion.div>
      </div>
    </section>
  );
}
