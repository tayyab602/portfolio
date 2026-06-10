import { motion } from "framer-motion";

const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "C++", "HTML/CSS"]
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite"]
  },
  {
    category: "Backend & DB",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"]
  },
  {
    category: "Tools & Other",
    items: ["Git", "Docker", "Linux", "E-commerce Ops", "Customer Management"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-card/50">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-right"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4">SKILLS <span className="text-accent">/</span></h2>
          <div className="w-24 h-1 bg-gradient-to-l from-accent to-transparent ml-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, idx) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-mono text-white/50 border-b border-white/10 pb-4">
                {String(idx + 1).padStart(2, '0')}. {skillGroup.category}
              </h3>
              <ul className="space-y-3">
                {skillGroup.items.map((item, itemIdx) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx * 0.1) + (itemIdx * 0.05) }}
                    className="flex items-center gap-3 font-medium text-lg"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
