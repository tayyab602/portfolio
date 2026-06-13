import { motion } from "framer-motion";

const TECH = [
  { name: "C++",            color: "#9b4dca" },
  { name: "C#",             color: "#239120" },
  { name: "Java",           color: "#f89820" },
  { name: "Dart",           color: "#00b4ab" },
  { name: "JavaScript",     color: "#f7df1e" },
  { name: "Assembly",       color: "#6e4c13" },
  { name: "SQL",            color: "#336791" },
  { name: "HTML",           color: "#e34f26" },
  { name: "Flutter",        color: "#54c5f8" },
  { name: "Android / Java", color: "#3ddc84" },
  { name: ".NET Forms",     color: "#512bd4" },
  { name: "Node.js",        color: "#5fa04e" },
  { name: "Express",        color: "#888888" },
  { name: "MongoDB",        color: "#47a248" },
  { name: "Firebase",       color: "#ffca28" },
  { name: "MySQL",          color: "#4479a1" },
  { name: "REST APIs",      color: "#6ba539" },
  { name: "XAMPP",          color: "#fb7a24" },
  { name: "phpMyAdmin",     color: "#6c78af" },
  { name: "Git",            color: "#f05032" },
  { name: "VS Code",        color: "#007acc" },
  { name: "Android Studio", color: "#3ddc84" },
  { name: "Eclipse",        color: "#2c2255" },
  { name: "Visual Studio",  color: "#5c2d91" },
  { name: "Postman",        color: "#ff6c37" },
];

export function TechOrbs() {
  return (
    <div className="flex flex-wrap gap-2.5 justify-center">
      {TECH.map((tech, i) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-border bg-card text-sm font-medium cursor-default hover:border-primary/50 hover:shadow-sm transition-all"
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: tech.color }}
          />
          {tech.name}
        </motion.div>
      ))}
    </div>
  );
}
