import { motion } from "framer-motion";
import { APPLE_EASE, VIEWPORT, staggerContainer, fadeUp, lineReveal } from "@/lib/animations";
import { GraduationCap, Store } from "lucide-react";

const timeline = [
  {
    period: "Spring 2026",
    label: "Current Semester",
    title: "Assembly, Mobile & Backend",
    items: [
      "Assembly Language (iAPX 8088)",
      "Flutter + Dart + Firebase",
      "MongoDB, MySQL via XAMPP & phpMyAdmin",
      "Node.js",
      "Software Engineering — SRS documentation",
    ],
  },
  {
    period: "Fall 2025",
    label: "Semester 3",
    title: "DSA, C# & .NET",
    items: [
      "C++ Data Structures & Algorithms",
      "C# with .NET Framework",
      "Windows Forms applications",
    ],
  },
  {
    period: "Spring 2025",
    label: "Semester 2",
    title: "OOP, Java & Databases",
    items: [
      "C++ Object-Oriented Programming",
      "Java",
      "MySQL",
    ],
  },
  {
    period: "Fall 2024",
    label: "Semester 1",
    title: "Foundations",
    items: [
      "C++ Programming Fundamentals",
      "MS Office Suite — Word, PowerPoint, Excel, Access",
      "Basic HTML, CSS & JavaScript",
    ],
  },
];

const always = [
  {
    icon: GraduationCap,
    title: "CS Undergraduate",
    sub: "Air University AAC, Kamra",
    desc: "Pursuing a B.S. in Computer Science at Air University Aerospace and Aviation Campus.",
  },
  {
    icon: Store,
    title: "WhatsApp Beauty Store",
    sub: "Founder & Operator",
    desc: "Running an end-to-end e-commerce operation — sourcing, inventory, customer relations, and digital marketing.",
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
          className="mb-16 md:mb-20"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-primary">/</span> PATH
          </motion.h2>
          <motion.div variants={lineReveal} className="w-16 h-0.5 bg-primary" />
        </motion.div>

        {/* Always-on cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {always.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: APPLE_EASE }}
              className="flex gap-4 p-5 rounded-xl bg-card border border-border"
            >
              <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-base">{item.title}</p>
                <p className="text-sm text-primary font-medium mb-1">{item.sub}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Semester timeline */}
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-8 border-l-2 border-primary pl-3">
          Academic Timeline — Air University AAC
        </p>

        <div className="space-y-6">
          {timeline.map((sem, idx) => (
            <motion.div
              key={sem.period}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.55, ease: APPLE_EASE, delay: idx * 0.07 }}
              className="grid sm:grid-cols-[140px_1fr] gap-4 items-start p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors"
            >
              <div>
                <p className="font-bold text-primary text-sm">{sem.period}</p>
                <p className="text-xs text-muted-foreground font-mono">{sem.label}</p>
              </div>
              <div>
                <p className="font-bold text-base mb-2">{sem.title}</p>
                <ul className="space-y-1">
                  {sem.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
