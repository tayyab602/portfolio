import { motion } from "framer-motion";
import { APPLE_EASE, VIEWPORT, staggerContainer, fadeUp, lineReveal } from "@/lib/animations";

const timeline = [
  {
    year: "Present",
    title: "Computer Science Undergraduate",
    organization: "Air University Aerospace and Aviation Campus, Kamra",
    description:
      "Deepening my knowledge in algorithms, software engineering principles, and modern architectures. Building a strong theoretical foundation while applying it to real-world projects.",
  },
  {
    year: "Present",
    title: "Founder & Operator",
    organization: "WhatsApp Beauty Store",
    description:
      "Managing an end-to-end e-commerce operation. From supplier negotiations and inventory tracking to digital marketing and direct customer engagement over WhatsApp.",
  },
  {
    year: "2023",
    title: "Full-Stack Developer",
    organization: "Freelance & Independent Projects",
    description:
      "Started taking on independent software projects, building everything from automation scripts to web applications, learning how to deliver complete products.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container px-4 mx-auto max-w-4xl">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-16 md:mb-24"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-primary">/</span> PATH
          </motion.h2>
          <motion.div variants={lineReveal} className="w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
        </motion.div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: APPLE_EASE, delay: idx * 0.08 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: APPLE_EASE, delay: idx * 0.08 + 0.2 }}
                className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:border-primary transition-colors duration-500 z-10"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
              </motion.div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                <div className="flex flex-col mb-2">
                  <span className="font-mono text-primary text-sm mb-1">{item.year}</span>
                  <h3 className="font-bold text-xl">{item.title}</h3>
                  <span className="text-muted-foreground text-sm font-medium">{item.organization}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
